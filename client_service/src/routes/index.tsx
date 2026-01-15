import { createFileRoute } from '@tanstack/react-router'
import SplashContainer from '../component/Splash/SplashContainer'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <>
    <SplashContainer />s
    </>
  )
}