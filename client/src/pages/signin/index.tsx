import { useState } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/url";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLoginUser(e: React.SyntheticEvent) {
    e.preventDefault();

    try {
      const result = await fetch(`${BASE_URL}/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      if(result.status == 200) {
        navigate("/dashboard");
      }
    } catch(err) {
      console.log("ERROR OCCURED: Unable to login");
    }
  }

  return (
    <div className="font-mono">
      <div className="w-11/12 lg:max-w-md bg-white mx-auto py-8 px-8 rounded-lg mt-32">
        <section className="text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="mt-4">Enter your credentials<br/> to access your account</p>
        </section>
        <form className="mt-12" onSubmit={handleLoginUser}>
          <section className="mt-4">
            <Input 
              label="username"
              value={username} 
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </section>
          <section className="mt-4">
            <Input 
              label="Password" 
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </section>

          <Button type="submit" className="bg-black text-white py-3 rounded-md w-full mt-8">Sign In</Button>
          
          <section className="flex gap-2 mt-2">
            <p>Don't have an account?</p>
            <Link to="/signup">
              <Button className="underline">Signup</Button>
            </Link>
          </section>
        </form>
      </div>
    </div>
  )
}