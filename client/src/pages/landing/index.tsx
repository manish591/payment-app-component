import { Link } from "react-router-dom";
import { Button } from "../../components/button";
import { useUserData } from "../../hooks/useUserData";

export function Landing() {
  const { isLoggedIn } = useUserData();
  return (
    <div className="w-11/12 max-w-2xl mx-auto mt-40">
      <h1 className="text-6xl font-bold text-center">Introducing Paytm The Future of Seamless Payments!</h1>
      { isLoggedIn ? (
        <div className="mt-12 flex justify-center">
          <Link to="/dashboard">
            <Button className="bg-blue-300 py-4 px-12 rounded-md">Go To Dashboard</Button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-4 justify-center mt-12">
          <Link to="/signin">
            <Button className="bg-blue-300 py-4 px-12 rounded-md">Signin</Button>
          </Link>
          <Link to="/signup">
            <Button className="border border-blue-400 py-4 px-12 rounded-md">Signup</Button>
          </Link>
        </div>
      ) }
    </div>
  )
}