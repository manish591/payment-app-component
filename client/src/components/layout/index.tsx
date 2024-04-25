import { Outlet } from "react-router-dom"

export function Layout() {
  return (
    <div className="font-mono">
      <nav className="w-full bg-gray-200 py-8">
        <div className="mx-auto w-11/12 max-w-screen-lg flex justify-between">
          <h1 className="text-3xl">Payment App</h1>
          <section className="flex gap-4 items-center">
            <h3 className="font-bold text-xl">Hello, User</h3>
            <div className="w-8 text-white h-8 rounded-full bg-green-400 flex items-center justify-center">
              <p>MD</p>
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