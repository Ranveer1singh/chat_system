import { useState, type JSX } from "react"
import SplashOne from "./SplashOne"
import SplashThree from "./SplashThree"
import SplashTwo from "./SplashTwo"
import Steepper from "../custome/Steepper"
import { useNavigate } from "@tanstack/react-router"

const SplashContainer = () => {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();
    const TOTAL_STEPS = 3;
    console.log("activeStep", activeStep);
    const handleNext  =()=>{
         setActiveStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
    }
      const handleFinish = () => {
        navigate({ to: "/register" });
  };

    const renderSplashScreen = (index: number): JSX.Element | null => {
        switch (index) {
            case 0:
                return <SplashOne onNext={handleNext} />;
            case 1:
                return <SplashTwo onNext={handleNext}/>;
            case 2:
                return <SplashThree onFinish={handleFinish}/>;
            default:
                return null;
        }
    }
  return (
    <>
    <section className="splash-container min-h-screen bg-[#E7E8E3] flex flex-col justify-between">
        <div className="">
            {renderSplashScreen(activeStep)}
        </div>
        <Steepper totalSteps={3} activeStep={activeStep} />
    </section>
    </>
  )
}

export default SplashContainer