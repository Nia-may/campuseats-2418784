import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <>
      <h2>Page not found</h2>

      <p>That page does not exist.</p>

      <Link to="/">Go to the home page</Link>
    </>
  )
}

export default NotFoundPage
//This page appears whenever the user visits a URL that doesn't match your defined routes: