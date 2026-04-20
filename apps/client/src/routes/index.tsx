import { createFileRoute } from '@tanstack/react-router'
import Home from '../pages/Home'
import SplashContainer from '../component/Splash/SplashContainer'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <>
    <SplashContainer/>
    {/* <Home /> */}
    </>
  )
}