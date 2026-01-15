import { createFileRoute } from '@tanstack/react-router'
import SignUp from '../../pages/SignUp'

export const Route = createFileRoute('/(auth)/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <SignUp />
  </div>
}
