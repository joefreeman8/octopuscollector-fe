import { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export default function Signup() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate()
  // Create the submit method.
  const submit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      email: email,
      password: password,
    };
    // Create the POST requuest
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup/`, user,
      {
        headers: { "Content-Type": "application/json" },
      },
      {
        withCredentials: true
      },
    );

    // Initialize the access & refresh token in localstorage.
    navigate("/login")
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
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              className="input input-bordered"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Password Confirmation</span>
            </label>
            <input
              name="password-confirmation"
              type="password"
              className="input input-bordered"
              placeholder="Enter password"
              value={passwordConfirmation}
              required
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <div className="form-control mt-6">
            {!password === passwordConfirmation ? (
              <button type="submit" disabled className="btn btn-accent">
                Submit
              </button>
            ) : (
              <button type="submit" className="btn btn-accent">
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
