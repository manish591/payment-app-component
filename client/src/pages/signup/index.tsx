import { Button } from "../../components/button";
import { Input } from "../../components/input";

export function Signup() {
  return (
    <div className="font-mono">
      <div className="w-11/12 lg:max-w-md bg-white mx-auto py-8 px-8 rounded-lg mt-10">
        <section className="text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="mt-4">Enter your information<br/> to create an account</p>
        </section>
        <form className="mt-12">
          <section>
            <Input label="First Name" />
          </section>
          <section className="mt-4">
            <Input label="Last Name" />
          </section>
          <section className="mt-4">
            <Input label="Email" type="email" />
          </section>
          <section className="mt-4">
            <Input label="Password" type="password" />
          </section>

          <Button type="submit" className="bg-black text-white py-3 rounded-md w-full mt-8">Sign Up</Button>
          
          <section className="flex gap-2 mt-2">
            <p>Already have an account?</p>
            <Button className="underline">Signin</Button>
          </section>
        </form>
      </div>
    </div>
  )
}