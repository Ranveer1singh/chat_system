import { Button } from "@mui/material";
import FloatingParticles from "../../component/canvas/FloatingParticles";
import AnimatedChatIcon from "../lord-icon/AnimatedChatIcon";

interface SplashThreeProps {
  onFinish: () => void;
}

const SplashThree: React.FC<SplashThreeProps> = ({ onFinish }) => {
  return (
    <div className="min-h-[90vh] flex flex-col justify-between px-6 py-12">
      <div>
        <h2 className="text-3xl font-bold text-[#2D6936]">
          Ready to Chat
        </h2>
        <p className="mt-4 text-[#2D6936]/80 max-w-md">
          Let’s begin your journey.
        </p>
      </div>

    
      <div className="img-container flex justify-center items-center">
        <div className="relative">
             <FloatingParticles />
            
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatedChatIcon/>
             </div>
        </div>
      </div>

      <Button
        variant="contained"
        sx={{ backgroundColor: '#2D6936', '&:hover': { backgroundColor: '#23522a' } }}
        className="!rounded-full self-end px-8 py-3"
        onClick={onFinish}
      >
        Start Chatting
      </Button>
    </div>
  );
};

export default SplashThree;