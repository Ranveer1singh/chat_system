import { useState, type JSX } from "react"
import DotsMobileStepper from "../Footer/DotsMobileStepper"
import SplashOne from "./SplashOne"
import SplashThree from "./SplashThree"
import SplashTwo from "./SplashTwo"
import Steepper from "../custome/Steepper"

const SplashContainer = () => {
    const [activeStep, setActiveStep] = useState(0);
    console.log("activeStep", activeStep);
    const handleNextScreen =()=>{
        setActiveStep((prev)=> prev +1)
    }
    const renderSplashScreen = (index: number): JSX.Element | null => {
        switch (index) {
            case 0:
                return <SplashOne splashScreen={handleNextScreen} />;
            case 1:
                return <SplashTwo splashScreen={handleNextScreen}/>;
            case 2:
                return <SplashThree splashScreen={handleNextScreen}/>;
            default:
                return null;
        }
    }
  return (
    <>
    <section className="splash-container min-h-screen bg-[#E7E8E3] ">
        <div className="">
            {renderSplashScreen(activeStep)}
    {/* <SplashOne splashScreen={handleNextScreen}/> */}
        </div>
        {/* <DotsMobileStepper /> */}
        <Steepper totalSteps={3} activeStep={activeStep} />
    {/* <SplashTwo/>
    <SplashThree/> */}
    </section>
    </>
  )
}

export default SplashContainer