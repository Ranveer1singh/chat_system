import { Button } from "@mui/material"
import type { splashOneProps } from "./SplashOne"
const SplashTwo:React.FC<splashOneProps> = ({onNext}) => {
  return (
   <div className="min-h-[90vh] flex flex-col justify-between px-6 py-12">
    <div className="img-container">
      <img src="https://plus.unsplash.com/premium_photo-1684761949804-fd8eb9a5b6cc?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
    </div>
      <div>
        <h2 className="text-3xl font-bold text-[#2D6936]">
          Secure Chats
        </h2>
        <p className="mt-4 text-[#2D6936]/80 max-w-md">
          Your messages are end-to-end encrypted.
        </p>
      </div>

      <Button
        variant="contained"
        color="success"
        className="!rounded-full self-end"
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  )
}

export default SplashTwo