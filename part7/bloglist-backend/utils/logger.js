// this file is used to print out information to the console
const info = (...params) => {
  // info function takes params and prints them to the console
  if (process.env.NODE_ENV === 'test') {
    console.log(...params);
  }
};

const error = (...params) => {
  // error function takes params and prints them to the console
  if (process.env.NODE_ENV === 'test') {
    console.error(...params);
  }
};

module.exports = {
  info,
  error,
};
