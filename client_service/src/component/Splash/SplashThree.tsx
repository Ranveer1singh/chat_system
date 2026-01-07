import { Button, Typography } from "@mui/material"
import type { splashOneProps } from "./SplashOne"

const SplashThree:React.FC<splashOneProps> = ({splashScreen}) => {
  return (
     <section className="min-h-screen bg-[#E7E8E3] flex flex-col">
      {/* Content */}
      <div className="flex-1 flex flex-col justify-between px-6 sm:px-10 lg:px-20 py-12 max-w-7xl mx-auto w-full">
        
        {/* Text Section */}
        <div>
          <Typography
            variant="h3"
            className="!font-bold !text-[#2D6936]"
          >
            Welcome 3
          </Typography>

          <Typography
            variant="body1"
            className="mt-4 max-w-md text-[#2D6936]/80"
          >
            We’re glad that you’re here. Let’s help you get started with a
            smarter and smoother chat experience.
          </Typography>
        </div>

        {/* Button Section */}
        <div className="flex justify-end">
          <Button
          onClick={splashScreen}
            variant="contained"
            color="success"
            size="large"
            className="!rounded-full !px-8 !py-3"
          >
            Let’s Get Started
          </Button>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="pb-6 flex justify-center">
        <DotsMobileStepper />
      </div> */}
    </section>
  )
}

export default SplashThree