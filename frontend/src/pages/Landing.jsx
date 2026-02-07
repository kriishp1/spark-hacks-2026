import SignUp from "./SignUp";
import { Link } from "react-router-dom";

function Landing() {
  console.log("Landing is rendering");
  return (
    <div>
      <h1>Welcome to the Landing Page!</h1>
      <p>This is the landing page content</p>
      <Link to="/SignUp">
        <button>Click this to go to the login page!</button>
      </Link>
    </div>
  )
}

export default Landing