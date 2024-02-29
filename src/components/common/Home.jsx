import { currentUser } from "../../lib/auth/currentUser"

export default function Home() {

  console.log(currentUser().user_id)

  return (
    <div>Home</div>
  )
}
