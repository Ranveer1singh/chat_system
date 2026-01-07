import { Button } from "@mui/material"
interface SplashThreeProps {
  onFinish: () => void;
}
const SplashThree:React.FC<SplashThreeProps> = ({onFinish}) => {
  return (
      <div className="h-full flex flex-col justify-between px-6 py-12">
      <div>
        <h2 className="text-3xl font-bold text-[#2D6936]">
          Ready to Chat
        </h2>
        <p className="mt-4 text-[#2D6936]/80 max-w-md">
          Let’s begin your journey.
        </p>
      </div>

      <Button
        variant="contained"
        color="success"
        className="!rounded-full self-end"
        onClick={onFinish}
      >
        Start Chatting
      </Button>
    </div>
  )
}

export default SplashThree