import { Button } from "../../components/button";
import { Input } from "../../components/input";

export function Signin() {
  return (
    <div className="font-mono">
      <div className="w-11/12 lg:max-w-md bg-white mx-auto py-8 px-8 rounded-lg mt-32">
        <section className="text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="mt-4">Enter your credentials<br/> to access your account</p>
        </section>
        <form className="mt-12">
          <section className="mt-4">
            <Input label="Email" type="email" />
          </section>
          <section className="mt-4">
            <Input label="Password" type="password" />
          </section>

          <Button type="submit" className="bg-black text-white py-3 rounded-md w-full mt-8">Sign In</Button>
          
          <section className="flex gap-2 mt-2">
            <p>Don't have an account?</p>
            <Button className="underline">Signup</Button>
          </section>
        </form>
      </div>
    </div>
  )
}