import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div>Welcome
        <Link to="/auth/register">Register</Link>
        <Link to="/login">Login</Link>
    </div>
  )
}

export default Welcome