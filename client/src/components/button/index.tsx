type Props = {
  className?: string,
  children: string | React.ReactNode,
  onClick?: () => void,
  type?: "button" | "submit"
}

export function Button({ className, children, onClick, type = "button" }: Readonly<Props>) {
  return <button className={className} type={type} onClick={onClick}>{children}</button>
}