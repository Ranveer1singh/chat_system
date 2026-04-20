import { createFileRoute , redirect } from '@tanstack/react-router'
import Home from '../pages/Home'
// import SplashContainer from '../component/Splash/SplashContainer'
export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const token = localStorage.getItem('token')

    if (!token) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: Index,
})

function Index() {
  return (
    <>
    {/* <SplashContainer/> */}
    <Home />  
    </>
  )
}