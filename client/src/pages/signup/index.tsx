import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { BASE_URL } from "../../constants/url";

export function Signup() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignupUser(e: React.SyntheticEvent) {
    e.preventDefault();

    try {
      const result = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          username
        })
      });
      if(result.status == 200) {
        navigate("/signin");
      }
    } catch(err) {
      console.log("ERROR OCCURED: Unable to create your account");
    }
  }

  return (
    <div className="font-mono">
      <div className="w-11/12 lg:max-w-md bg-white mx-auto py-8 px-8 rounded-lg mt-10">
        <section className="text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="mt-4">Enter your information<br/> to create an account</p>
        </section>
        <form className="mt-12" onSubmit={handleSignupUser}>
          <section>
            <Input 
              label="First Name" 
              value={firstName} 
              onChange={(e) => {
                setFirstName(e.target.value);
              }} 
            />
          </section>
          <section className="mt-4">
            <Input 
              label="Last Name" 
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </section>
          <section className="mt-4">
            <Input 
              label="Username" 
              value={username} 
              onChange={(e) => {
                setUsername(e.target.value);
              }} 
            />
          </section>
          <section className="mt-4">
            <Input 
              label="Email" 
              type="email" 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </section>
          <section className="mt-4">
            <Input 
              label="Password" 
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </section>

          <Button type="submit" className="bg-black text-white py-3 rounded-md w-full mt-8">Sign Up</Button>
        </form>

        <section className="flex gap-2 mt-2">
          <p>Already have an account?</p>
          <Link to="/signin">
            <Button className="underline">Signin</Button>
          </Link>
        </section>
      </div>
    </div>
  )
}