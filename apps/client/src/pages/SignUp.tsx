import { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock, Phone } from '@mui/icons-material';
import AnimatedChatIcon from '../component/lord-icon/AnimatedChatIcon';
import { useNavigate } from '@tanstack/react-router';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { createUser } from '../service/auth/thunk';
const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userName: '',
            fullName: '',
            phone: '',
            password: ''
        }
    });

   const onSubmit = (data: any) => {
    dispatch(createUser(data)).then((resultAction) => {
        if (createUser.fulfilled.match(resultAction)) {
            navigate({ to: '/' });
        }
    });
};

    return (
        <div className="flex min-h-screen bg-[#F8F9F8] overflow-x-hidden">
            {/* LEFT SIDE: Branding */}
            <div className="hidden md:flex md:w-1/2 bg-[#E8F0E8] flex-col items-center justify-center p-12 text-center">
                <AnimatedChatIcon />
                <h2 className="text-4xl font-bold text-[#2D6936] mt-8">Connect with Nature</h2>
                <p className="text-[#2D6936]/70 mt-4 text-lg">
                    Join thousands of users chatting in our eco-friendly workspace.
                </p>
            </div>

            {/* RIGHT SIDE: Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12 md:px-16 relative">
                <div className="w-full max-w-[400px]">
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-[#2D6936]">Create Account</h1>
                        <p className="text-[#2D6936]/60 mt-2">Let’s begin your journey.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="!space-y-5">

                        {/* User Name Field */}
                        <Controller
                            name="userName"
                            control={control}
                            rules={{ required: 'Username is required' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="User Name"
                                    error={!!errors.userName}
                                    helperText={errors.userName?.message}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person className="text-[#2D6936]" />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            )}
                        />

                        {/* Full Name Field */}
                        <Controller
                            name="fullName"
                            control={control}
                            rules={{ required: 'Full name is required' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Full Name"
                                    error={!!errors.fullName}
                                    helperText={errors.fullName?.message}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person className="text-[#2D6936]" />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            )}
                        />

                        {/* Phone Number Field */}
                        <Controller
                            name="phone"
                            control={control}
                            rules={{
                                required: 'Phone is required',
                                pattern: { value: /^[0-9]{10}$/, message: 'Invalid phone number' }
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Phone Number"
                                    type="tel"
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <div className="flex items-center gap-1 border-r pr-2 mr-2 border-gray-300">
                                                        <Phone className="text-[#2D6936] text-sm" />
                                                        <span className="text-sm font-semibold text-gray-600">+91</span>
                                                    </div>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            )}
                        />

                        {/* Password Field */}
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Minimum 6 characters' }
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                     autoComplete="new-password"
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock className="text-[#2D6936]" />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        },
                                    }}
                                />
                            )}
                        />
                        {error && (
                            <p className="text-red-500 text-sm bg-red-50 p-2 rounded mb-4 text-center">
                                {error}
                            </p>
                        )}

                        <div className="mt-10">
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                className="!bg-[#2D6936] !rounded-full !py-4 !text-lg shadow-md hover:!bg-[#23522a]"
                                disabled={loading}
                            >
                                Sign Up
                            </Button>

                            <p className="text-center mt-6 text-gray-600">
                                Already have an account?
                                <span onClick={() => navigate({ to: "/login" })} className="text-[#2D6936] font-bold ml-1 cursor-pointer hover:underline">
                                    Log In
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;