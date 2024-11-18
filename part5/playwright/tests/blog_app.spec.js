const { test, expect, request, describe } = require('@playwright/test');

let apiContext;
// create a new context for the API
test.beforeAll(async () => {
  apiContext = await request.newContext({
    baseURL: 'http://127.0.0.1:3003', // using the backend port
  });
});

test.beforeEach(async ({ page }) => {
  // reset the database
  const resetResponse = await apiContext.delete('/api/reset');
  console.log('Database reset status:', resetResponse.status());

  if (resetResponse.status() !== 204) {
    throw new Error('Failed to reset database');
  }

  // create a new user
  const userResponse = await apiContext.post('/api/users', {
    data: {
      username: 'shiritori-cat',
      name: 'Shiritori Cat',
      password: 'salasana',
    },
  });
  console.log('User creation status:', userResponse.status());

  if (userResponse.status() !== 201) {
    throw new Error('Failed to create user');
  }

  // Navigate to the front-end application
  await page.goto('http://localhost:5173');
});


describe('Login form', () => { // 5.17


  test('Login form is shown', async ({ page }) => { // 5.17
    const locator = page.getByText('log in to application');
    await expect(locator).toBeVisible();
  });

  test('succeeds with correct credentials', async ({ page }) => { // 5.18

    // input the username and password
    await page.getByTestId('username-input').fill('shiritori-cat');
    await page.getByTestId('password-input').fill('salasana');

    // click the login button
    await page.getByTestId('login-button').click();

    // check that the user is logged in
    const loggedInMessage = page.getByText(/Shiritori Cat logged in/i);
    await expect(loggedInMessage).toBeVisible();

  });

  test('fails with wrong credentials', async ({ page }) => { // 5.18

    // input the username and password
    await page.getByTestId('username-input').fill('shiritori-cat');
    await page.getByTestId('password-input').fill('salasana');


    // click the login button
    await page.getByTestId('login-button').click();

    // check that the user is not logged in
    const loggedInMessage = page.getByText(/Shiritori Cat logged in/i);
    await expect(loggedInMessage).not.toBeVisible();
  });


});



describe('New blog form', () => { // 5.19
  test.beforeEach(async ({ page }) => {
    // login the user
    await page.getByTestId('username-input').fill('shiritori-cat');
    await page.getByTestId('password-input').fill('salasana');
    await page.getByTestId('login-button').click();

    // check that the user is logged in
    const loggedInMessage = page.locator('text=Shiritori Cat logged in');

    await expect(loggedInMessage).toBeVisible();
  });

  test('a new blog can be created', async ({ page }) => { // 5.19

    // click the new blog button
    await page.getByTestId('new-blog-button').click();

    // fill in the form
    await page.getByTestId('title-input').fill('A new blog');
    await page.getByTestId('author-input').fill('Test Author');
    await page.getByTestId('url-input').fill('http://testblog.com');

    // submit the new blog form
    await page.getByTestId('submit-new-blog-button').click();

    // verify the new blog appears in the list
    const blogLocator = page.getByText('A new blog Test Author');
    await expect(blogLocator).toBeVisible();
  });




  test('a new blog can be liked', async ({ page }) => { // 5.20

    // click the new blog button
    await page.getByTestId('new-blog-button').click();

    // fill in the form
    await page.getByTestId('title-input').fill('A new blog');
    await page.getByTestId('author-input').fill('Test Author');
    await page.getByTestId('url-input').fill('http://testblog.com');

    // submit the new blog form
    await page.getByTestId('submit-new-blog-button').click();

    // click the view button
    await page.getByTestId('view-blog-details-button').click();

    // click the like button
    await page.getByTestId('like-blog-button').click();

    // check that the blog has been liked
    const likesLocator = page.getByText('likes 1');
    await expect(likesLocator).toBeVisible();
  }
  );


  test('a new blog can be deleted', async ({ page }) => { // 5.21
    // click the new blog button
    await page.getByTestId('new-blog-button').click();

    // fill in the form
    await page.getByTestId('title-input').fill('A new blog');
    await page.getByTestId('author-input').fill('Test Author');
    await page.getByTestId('url-input').fill('http://testblog.com');

    // submit the new blog form
    await page.getByTestId('submit-new-blog-button').click();

    // click the view button
    await page.getByTestId('view-blog-details-button').click();

    // listen for the dialog and accept it
    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toBe('Remove blog A new blog by Test Author'); // confirmation message
      await dialog.accept();
    });

    // click the delete button
    await page.getByTestId('delete-blog-button').click();

    // check that the blog has been deleted
    const blogLocator = page.locator('text=A new blog Test Author');
    await expect(blogLocator).not.toBeVisible();
  });


  test('only the user who created the blog can delete it', async ({ page }) => { // 5.22
    // click the new blog button
    await page.getByTestId('new-blog-button').click();

    // fill in the form
    await page.getByTestId('title-input').fill('A new blog');
    await page.getByTestId('author-input').fill('Test Author');
    await page.getByTestId('url-input').fill('http://testblog.com');

    // submit the new blog form
    await page.getByTestId('submit-new-blog-button').click();

    // click the logout button
    await page.getByTestId('logout-button').click();

    // create second user
    const userResponse = await apiContext.post('/api/users', {
      data: {
        username: 'shiritori-cat1',
        name: 'Shiritori Cat 1',
        password: 'salasana',
      },
    });

    if (userResponse.status() !== 201) {
      throw new Error('Failed to create user');
    }

    // login a new user
    await page.getByTestId('username-input').fill('shiritori-cat1');
    await page.getByTestId('password-input').fill('salasana');
    await page.getByTestId('login-button').click();

    // check that the user is logged in
    const loggedInMessage = page.getByText(/Shiritori Cat 1 logged in/i);
    await expect(loggedInMessage).toBeVisible();

    // click the view button
    await page.getByTestId('view-blog-details-button').click();

    // check that the delete button is not visible
    const deleteButtonLocator = page.getByTestId('delete-blog-button');
    await expect(deleteButtonLocator).not.toBeVisible();
  });



  test('blogs are ordered by likes in descending order', async ({ page }) => { // 5.23
    const blogs = [
      { title: 'First Blog', author: 'Author One', url: 'http://firstblog.com' },
      { title: 'Second Blog', author: 'Author Two', url: 'http://secondblog.com' },
      { title: 'Third Blog', author: 'Author Three', url: 'http://thirdblog.com' },
    ];

    // function creates a blog and returns its ID
    const createBlog = async (blog) => {
      await page.getByTestId('new-blog-button').click();
      await page.getByTestId('title-input').fill(blog.title);
      await page.getByTestId('author-input').fill(blog.author);
      await page.getByTestId('url-input').fill(blog.url);
      await page.getByTestId('submit-new-blog-button').click();

      // get the blog's id from the data-testid attribute after creation
      const blogLocator = page.locator(`[data-testid^="blog-id"]:has-text("${blog.title} ${blog.author}")`);
      const id = await blogLocator.evaluate((el) => el.getAttribute('data-testid').split('-')[2]);
      return id;
    };

    // create multiple blogs and store their IDs
    const blogIds = [];
    for (const blog of blogs) {
      const id = await createBlog(blog);
      blogIds.push({ ...blog, id });
    }

    // helper function to like a blog multiple times
    const likeBlog = async (id, times) => {
      const blogLocator = page.locator(`[data-testid="blog-id-${id}"]`);
      await blogLocator.getByTestId('view-blog-details-button').click();

      const likeButton = blogLocator.getByTestId('like-blog-button');
      for (let i = 0; i < times; i++) {
        await likeButton.click();
        // Wait for the UI to update after each click
        await page.waitForTimeout(500);
      }
    };


    // like blogs in reverse order
    for (let i = 0; i < blogIds.length; i++) {
      await likeBlog(blogIds[i].id, i + 1);
    }

    // verify the order of blogs
    const blogEntries = await page.locator('[data-testid^="blog-id"]').evaluateAll((elements) =>
      elements.map((el) => {
        const content = el.querySelector('[data-testid="blog-title-author"]').textContent.trim();
        const likesText = el.querySelector('[data-testid="blog-likes"]').textContent.trim();
        const likes = parseInt(likesText.split(' ')[1], 10);

        // extract only the title and author (remove URL and likes info)
        const blogTitle = content.split(' ').slice(0, 2).join(' ');
        return { title: `${blogTitle}`, likes };
      })
    );

    // verify expected order explicitly
    expect(blogEntries).toEqual([
      { title: 'Third Blog', likes: 3 },
      { title: 'Second Blog', likes: 2 },
      { title: 'First Blog', likes: 1 },
    ]);
  });

});