import { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment, Checkbox, FormControlLabel } from '@mui/material';
import { Visibility, VisibilityOff, Lock, Phone } from '@mui/icons-material';
import { useNavigate } from '@tanstack/react-router';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { loginUser } from '../service/auth/thunk';
const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            phone: '',
            password: ''
        }
    });
    const [showPassword, setShowPassword] = useState(false);
    const onSubmit = async (data: any) => {
        const resultAction = await dispatch(loginUser({
            phone: data.phone,
            password: data.password
        }));

        if (loginUser.fulfilled.match(resultAction)) {
            navigate({ to: '/' });
        }
    };


    return (
        <div className="flex min-h-screen bg-[#F8F9F8] overflow-x-hidden">


            <div className="hidden md:flex md:w-1/2 bg-[#E8F0E8] flex-col items-center justify-center p-12">
                <div className="max-w-md text-center">
                    <lord-icon
                        src="https://cdn.lordicon.com/khheayfj.json"
                        trigger="loop"
                        delay="1500"
                        colors="primary:#2D6936,secondary:#A5D6A7"
                        style={{ width: '250px', height: '250px' }}
                    />
                    <h2 className="text-4xl font-bold text-[#2D6936] mt-8">
                        Secure Access
                    </h2>
                    <p className="text-[#2D6936]/70 mt-4 text-lg leading-relaxed">
                        Your privacy is our priority. Log in to your encrypted
                        chat workspace and stay connected safely.
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE: Login Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12 md:px-16">

                <div className="w-full max-w-[400px]">
                    <div className="mb-10 ">
                        <h1 className="text-3xl font-bold text-[#2D6936]">Login</h1>
                        <p className="text-[#2D6936]/60 mt-2">Sign in to continue your journey</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="space-y-5">
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ required: 'Phone is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Phone Number"
                                        variant="outlined"
                                        type="tel"
                                        placeholder="99999 99999"
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
                            <div className="">
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
                                                    ),
                                                },
                                            }}
                                        />
                                    )}
                                />

                                <div className="flex justify-end mt-2">
                                    <span className="text-sm text-[#2D6936] font-medium cursor-pointer hover:underline">
                                        Forgot Password?
                                    </span>
                                </div>
                            </div>

                        </div>
                        <div className="mt-2">
                            <FormControlLabel
                                control={<Checkbox size="small" sx={{ color: '#2D6936', '&.Mui-checked': { color: '#2D6936' } }} />}
                                label={<span className="text-sm text-gray-600">Remember me on this device</span>}
                            />
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm bg-red-50 p-2 rounded mb-4 text-center">
                                {error}
                            </p>
                        )}
                        <div className="mt-8">
                            <Button
                                disabled={loading}
                                fullWidth
                                type="submit"
                                variant="contained"
                                className="!bg-[#2D6936] !rounded-full !py-4 !text-lg shadow-md hover:!bg-[#23522a] !transition-all"
                            >
                                Log In
                            </Button>


                            <div className="relative flex py-8 items-center">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="flex-shrink mx-4 text-gray-400 text-sm italic">or continue with</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>

                            <p className="text-center text-gray-600">
                                Don't have an account?
                                <span onClick={() => navigate({ to: "/register" })} className="text-[#2D6936] font-bold ml-1 cursor-pointer hover:underline">
                                    Sign Up
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;