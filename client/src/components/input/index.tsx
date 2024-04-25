type Props = {
  label?: string
  type?: "text" | "email" | "password" | "number",
  placeholder?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Input({ label, type = "text", onChange, placeholder }: Readonly<Props>) {
  return (
    <section>
      {label && <label htmlFor={label} className="text-black font-bold">{label}</label> }
      <input id={label} placeholder={placeholder} type={type} onChange={onChange} className="w-full border rounded-md border-gray-200 block mt-2 px-2 py-1"></input>
    </section>
  )
}