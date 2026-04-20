import { createFileRoute } from '@tanstack/react-router'
import SignIn from '../../pages/SignIn'

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <SignIn/>
  </div>
}
