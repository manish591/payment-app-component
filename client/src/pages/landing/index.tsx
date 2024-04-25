import { Button } from "../../components/button";

export function Landing() {
  return (
    <div className="w-11/12 max-w-2xl mx-auto mt-40">
      <h1 className="text-6xl font-bold text-center">Introducing Paytm The Future of Seamless Payments!</h1>
      <div className="flex gap-4 justify-center mt-12">
        <Button className="bg-blue-300 py-4 px-12 rounded-md">Signin</Button>
        <Button className="border border-blue-400 py-4 px-12 rounded-md">Signup</Button>
      </div>
    </div>
  )
}