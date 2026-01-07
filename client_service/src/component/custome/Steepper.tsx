import type React from "react";


interface SteepperProps {
    totalSteps: number;
    activeStep: number;
    // handleNext: () => void;
    // handleBack: () => void;
}
const Steepper:React.FC<SteepperProps>  = ({totalSteps, activeStep}) => {
  return (
    <div className="stepper-container p-1">
        <div className="steps flex justify-center gap-4 my-4">
            {Array.from({length : totalSteps}).map((_, index)=>(
                <div className="">
                    <div className={`w-10 h-3  rounded-xl ${index === activeStep ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                </div>
            ))}

        </div>
    </div>
  )
}

export default Steepper