import { Button } from "../../components/button";
import { Input } from "../../components/input";

export function DashBoard() {
  return (
    <div className="bg-white py-10 px-16 rounded-lg mt-20">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Your Balance: <strong>$5000</strong></h1>
        <Input placeholder="Search Users..." />
      </div>
      <div className="mt-20 grid grid-cols-1 gap-8">
        <div className="flex items-center justify-between">
          <section className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
              <p>MD</p>
            </div>
            <h3 className="text-xl">Manish Devrani</h3>
          </section>
          <Button className="bg-black py-2 px-4 rounded-md text-white">Send Money</Button>
        </div>
        <div className="flex items-center justify-between">
          <section className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
              <p>PR</p>
            </div>
            <h3 className="text-xl">Prachi Rautela</h3>
          </section>
          <Button className="bg-black py-2 px-4 rounded-md text-white">Send Money</Button>
        </div>
        <div className="flex items-center justify-between">
          <section className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
              <p>AR</p>
            </div>
            <h3 className="text-xl">Anjali Rana</h3>
          </section>
          <Button className="bg-black py-2 px-4 rounded-md text-white">Send Money</Button>
        </div>
        <div className="flex items-center justify-between">
          <section className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
              <p>MN</p>
            </div>
            <h3 className="text-xl">Mansi Negi</h3>
          </section>
          <Button className="bg-black py-2 px-4 rounded-md text-white">Send Money</Button>
        </div>
      </div>
    </div>
  )
}