import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom'
//test
export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useNavigate()
  // Create the submit method.
  const submit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    // Create the POST requuest
    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/token/`, user,
      {
        headers: { "Content-Type": "application/json" },
      },
      {
        withCredentials: true
      },
    );

    // Initialize the access & refresh token in localstorage.
    localStorage.clear();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data["access"]}`

    setUser(user)
    // window.location.href = "/"; 
  }

  return (
    <div className="Auth-form-container flex justify-center items-center min-h-screen">
      <form className="Auth-form w-full max-w-lg" onSubmit={submit}>
        <div className="Auth-form-content card card-compact bg-base-100 shadow-xl p-4">
          <h3 className="Auth-form-title text-2xl font-bold">Sign In</h3>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="input input-bordered"
              name="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              className="input input-bordered"
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-accent">
              Submit
            </button>
            <p className="mt-2 text-center">Don't Have an Account?&nbsp;
              <Link to='/signup'>
                <span className="underline">Sign Up Here</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}