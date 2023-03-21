// 2.16 creating Notification component
const Notification = ({ message }) => {
  if (message === null) {
    return
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}


export default Notification