import { Outlet } from "react-router-dom";
import { useUserData } from "../../hooks/useUserData";

export function Layout() {
  const { userData } = useUserData();
  const { first_name, last_name } = userData;
  return (
    <div className="font-mono">
      <nav className="w-full bg-gray-200 py-8">
        <div className="mx-auto w-11/12 max-w-screen-lg flex justify-between">
          <h1 className="text-3xl">Payment App</h1>
          <section className="flex gap-4 items-center">
            <h3 className="font-bold text-xl">Hello, { first_name }</h3>
            <div className="w-8 text-white h-8 rounded-full bg-green-400 flex items-center justify-center">
              <p>{ first_name[0] }{last_name[0]}</p>
            </div>
          </section>
        </div>
      </nav>
      <div className="w-11/12 mx-auto max-w-screen-lg">
        <Outlet />
      </div>
    </div>
  )
}