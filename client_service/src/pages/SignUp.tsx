import { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, Email, Person, Lock, ArrowBack, Phone } from '@mui/icons-material';
import AnimatedChatIcon from '../component/lord-icon/AnimatedChatIcon';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (

        <div className="flex min-h-screen bg-[#F8F9F8] overflow-x-hidden">
            <div className="hidden md:flex md:w-1/2 bg-[#E8F0E8] flex-col items-center justify-center p-12">
                <div className="max-w-md text-center">
                    <AnimatedChatIcon />
                    <h2 className="text-4xl font-bold text-[#2D6936] mt-8">
                        Connect with Nature
                    </h2>
                    <p className="text-[#2D6936]/70 mt-4 text-lg">
                        Join thousands of users chatting in our eco-friendly workspace.
                        Smooth, fast, and secure.
                    </p>
                </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12 md:px-16 relative">

                {/* <div className="absolute top-6 left-6">
                    <IconButton className="!text-[#2D6936]">
                        <ArrowBack />
                    </IconButton>
                </div> */}

                <div className="w-full max-w-[400px]">
                    <div className="mb-10 ">
                        <h1 className="text-3xl font-bold text-[#2D6936]">Create Account</h1>
                        <p className="text-[#2D6936]/60 mt-2">Let’s begin your journey.</p>
                    </div>

                    <div className="space-y-5">
                        <TextField
                            fullWidth
                            label="Full Name"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Person className="text-[#2D6936]" /></InputAdornment>,
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Phone Number"
                            variant="outlined"
                            type="tel"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <div className="flex items-center gap-1 border-r pr-2 mr-2 border-gray-300">
                                            <Phone className="text-[#2D6936] text-sm" />
                                            <span className="text-sm font-semibold text-gray-600">+91</span>
                                        </div>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Lock className="text-[#2D6936]" /></InputAdornment>,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div className="mt-10">
                        <Button
                            fullWidth
                            variant="contained"
                            className="!bg-[#2D6936] !rounded-full !py-4 !text-lg shadow-md hover:!bg-[#23522a]"
                        >
                            Sign Up
                        </Button>

                        <p className="text-center mt-6 text-gray-600">
                            Already have an account?
                            <span className="text-[#2D6936] font-bold ml-1 cursor-pointer hover:underline">
                                Log In
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;