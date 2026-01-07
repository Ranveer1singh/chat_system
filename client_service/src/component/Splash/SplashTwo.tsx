import { Button } from "@mui/material"
import type { splashOneProps } from "./SplashOne"
const SplashTwo:React.FC<splashOneProps> = ({onNext}) => {
  return (
   <div className="h-full flex flex-col justify-between px-6 py-12">
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