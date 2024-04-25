import { Button } from "../../components/button";
import { Input } from "../../components/input";

export function Transaction() {
  return (
    <div className="font-mono">
      <div className="w-11/12 lg:max-w-md bg-white mx-auto py-8 px-8 rounded-lg mt-32">
        <section className="text-center">
          <h1 className="text-3xl font-bold">Send Money</h1>
        </section>
        <section className="flex gap-4 mt-12 items-center">
          <div className="w-10 text-white h-10 rounded-full bg-green-400 flex items-center justify-center">
            <p>MD</p>
          </div>
          <h3 className="font-bold text-xl">Manish Devrani</h3>
        </section>
        <form className="mt-4">
          <section className="mt-4">
            <Input label="Amount (In Rs)" type="number" />
          </section>
          <Button type="submit" className="bg-green-400 text-white py-3 rounded-md w-full mt-8">Initiate Transfer</Button>
        </form>
      </div>
    </div>
  )
}