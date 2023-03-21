// 2.17 creating error message for handling errors
const ErrorMessage = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }

  return (
    <div className="error">
      {errorMessage}
    </div>
  )
}


export default ErrorMessage