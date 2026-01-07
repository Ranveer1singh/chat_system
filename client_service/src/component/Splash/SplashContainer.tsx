import { useState, type JSX } from "react"
import DotsMobileStepper from "../Footer/DotsMobileStepper"
import SplashOne from "./SplashOne"
import SplashThree from "./SplashThree"
import SplashTwo from "./SplashTwo"
import Steepper from "../custome/Steepper"

const SplashContainer = () => {
    const [activeStep, setActiveStep] = useState(0);
    const TOTAL_STEPS = 3;
    console.log("activeStep", activeStep);
    const handleNext  =()=>{
         setActiveStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
    }
      const handleFinish = () => {
    // example: navigate("/login")
    console.log("Onboarding completed");
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
    <section className="splash-container min-h-screen bg-[#E7E8E3] ">
        <div className="">
            {renderSplashScreen(activeStep)}
        </div>
        <Steepper totalSteps={3} activeStep={activeStep} />
    </section>
    </>
  )
}

export default SplashContainer