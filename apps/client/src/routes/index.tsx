import { createFileRoute , redirect } from '@tanstack/react-router'
import Home from '../pages/Home'
// import SplashContainer from '../component/Splash/SplashContainer'
export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
      credentials: 'include',
    });

    if (!response.ok) {
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
