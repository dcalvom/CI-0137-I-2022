import { MdPermIdentity } from "react-icons/md";

export default function Home() {
  return (
    <div className="flex h-16 w-full bg-slate-300 sm:px-4 md:px-8 lg:px-16">
      <div className="w-6/12">
        <img className="h-16 w-16" src="https://rb.gy/3ueukh" alt="Logo Swap it" />
      </div>
      <div className="flex gap-2 items-center justify-end w-6/12">
        <p>¡Bienvenido!</p>
        <MdPermIdentity className="h-8 w-8" />
      </div>
    </div>
  )
}