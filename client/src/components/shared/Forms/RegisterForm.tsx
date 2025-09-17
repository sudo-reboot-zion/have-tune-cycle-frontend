import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { CgClose } from 'react-icons/cg'
import * as Yup from 'yup'
import AuthButton from './AuthButton'
import { ManagePopUpTypes } from '@/types/global.dt'
import { FormInput } from './FormInput'
import PasswordInput from './PasswordInput'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { RegisterFormValues } from '@/types/auth.dt'

const RegisterSchema = Yup.object().shape({
    first_name: Yup.string()
        .required('First name is required'),
    last_name: Yup.string()
        .required('Last name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    username: Yup.string()
        .required('Username is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
    role: Yup.string()
        .oneOf(['artist', 'buyer'], 'Please select a valid role')
        .required('Please select your role'),
    bio: Yup.string()
        .max(500, 'Bio must be less than 500 characters')
})

function Register({ closeModal, setActiveModal }: ManagePopUpTypes) {
    const { register } = useAuth()
    const router = useRouter()

const handleSubmit = async (values: RegisterFormValues, { setSubmitting, setFieldError }: FormikHelpers<RegisterFormValues>) => {
    try {
        const result = await register({
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            username: values.username,
            password: values.password,
            confirm_password: values.confirm_password,
            role: values.role as 'artist' | 'buyer', 
            bio: values.bio
        });

        if (result.success) {
            closeModal();
           
            if (values.role === 'artist') {
                router.push('/for_artist')
            } else {
                router.push('/market_place')
            }
        } else {
            setFieldError('email', result.error || 'Registration Failed')
        }
    } catch {
        setFieldError('email', 'Something went wrong with registration')
    } finally {
        setSubmitting(false)
    }
}
    return (
        <div className='w-full bg-primaryColor h-auto text-white font-outfit font-extralight'>
            <div className='w-full mx-auto'>
                {/* Header with close button */}
                <div className='flex items-center justify-between bg-darkBackground w-full p-4 mb-6'>
                    <div className='flex-1'/>
                    <div className='flex-1 flex items-center justify-between'>
                        <h1 className='text-2xl font-bowlby'>SignUp</h1>
                        <CgClose 
                            onClick={closeModal} 
                            className='text-3xl cursor-pointer hover:opacity-70' 
                        />
                    </div>
                </div>

                {/* Content section */}
                <div className='flex items-start justify-between gap-10 px-10 py-5 pb-6'>
                    <div className='flex-1'>
                        <Formik
                            initialValues={{
                                first_name: '',
                                last_name: '',
                                email: '',
                                password: '',
                                confirm_password: '',
                                username: '',
                                role: '',
                                bio: ''
                            }}
                            validationSchema={RegisterSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, values, setFieldValue }) => (
                                <Form>
                                    <div className='flex gap-5'>
                                        <FormInput
                                            label="Username"
                                            name="username"
                                            type="text"
                                            placeholder='Enter username'
                                        />
                                        <FormInput
                                            label="First Name"
                                            name="first_name"
                                            type="text"
                                            placeholder='Enter first name'
                                        />
                                    </div>

                                    <FormInput
                                        label="Last Name"
                                        name="last_name"
                                        type="text"
                                        placeholder='Enter last name'
                                    />

                                    <FormInput
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        placeholder='johndoe@gmail.com'
                                    />

                                    {/* Role Selection */}
                                    <div className='mb-4'>
                                        <label className='block text-sm font-medium mb-2'>
                                            I want to join {" "} <span className='uppercase font-poltwaski'>tuncecycle</span> as:
                                        </label>
                                        <div className='flex gap-4'>
                                            <label className='flex items-center cursor-pointer'>
                                                <input
                                                    type="radio"
                                                    name="role"
                                                    value="artist"
                                                    checked={values.role === 'artist'}
                                                    onChange={() => setFieldValue('role', 'artist')}
                                                    className='mr-2'
                                                />
                                                <span className='text-sm'>Artist (Upload & sell music)</span>
                                            </label>
                                            <label className='flex items-center cursor-pointer'>
                                                <input
                                                    type="radio"
                                                    name="role"
                                                    value="buyer"
                                                    checked={values.role === 'buyer'}
                                                    onChange={() => setFieldValue('role', 'buyer')}
                                                    className='mr-2'
                                                />
                                                <span className='text-sm'>Buyer (License music)</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Bio field - show for artists */}
                                    {values.role === 'artist' && (
                                        <div className='mb-4'>
                                            <label className='block text-sm font-medium mb-2'>
                                                Bio (Optional)
                                            </label>
                                            <textarea
                                                name="bio"
                                                placeholder='Tell us about your music...'
                                                className='w-full p-3 bg-darkBackground border border-gray-600 rounded-md text-white'
                                                rows={3}
                                                maxLength={500}
                                                onChange={(e) => setFieldValue('bio', e.target.value)}
                                                value={values.bio}
                                            />
                                        </div>
                                    )}

                                    <PasswordInput 
                                        label="Password" 
                                        name="password" 
                                        placeholder='*************'
                                    />
                                    <PasswordInput 
                                        label="Confirm Password" 
                                        name="confirm_password" 
                                        placeholder='*************' 
                                    />

                                    <AuthButton
                                        className='gradiento text-primaryColor rounded-md font-outfit'
                                        text='Create Account' 
                                        isLoading={isSubmitting} 
                                    />

                                    <div className='flex items-center justify-center py-5'>
                                        <button 
                                            type="button"
                                            className='hover:underline text-white rounded-full' 
                                            onClick={() => setActiveModal('login')}
                                        >
                                            Already have an account? Login
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
