type Props = {
  label?: string
  type?: "text" | "email" | "password" | "number",
  placeholder?: string,
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Input({ label, value, type = "text", onChange, placeholder }: Readonly<Props>) {
  return (
    <section>
      {label && <label htmlFor={label} className="text-black font-bold mb-2">{label}</label> }
      <input id={label} value={value} placeholder={placeholder} type={type} onChange={onChange} className="w-full border rounded-md border-gray-200 block px-2 py-1"></input>
    </section>
  )
}