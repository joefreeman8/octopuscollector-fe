import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export default function Navbar() {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true)
    }
  }, [isAuth])

  return (
    <nav className="navbar bg-base-300 shadow-lg">
      <div className="flex-1">
        <Link to="/" className="text-base-content btn btn-ghost">Home</Link>
      </div>
      <div className="flex-none gap-2">
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <Link to="/octopus" className="text-base-content btn btn-ghost">Octopus</Link>
            {isAuth ? (
              <Link to="/logout" className="text-base-content btn btn-ghost">Logout</Link>
            ) : (
              <>
                <Link to="/login" className="text-base-content btn btn-ghost">Login</Link>
                <Link to="/signup" className="text-base-content btn btn-ghost">Sign Up</Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
