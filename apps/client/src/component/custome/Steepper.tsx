interface StepperProps {
  totalSteps: number;
  activeStep: number;
}

const Stepper = ({ totalSteps, activeStep }: StepperProps) => {
  return (
    <div className="pb-6">
      <div className="flex justify-center gap-3">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-2 w-8 rounded-full transition-all ${
              index === activeStep ? "bg-green-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Stepper;
