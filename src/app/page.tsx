import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div onLoad={redirect('/products')}></div>
  )
}
