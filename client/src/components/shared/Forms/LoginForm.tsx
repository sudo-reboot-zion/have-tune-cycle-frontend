import { useAuth } from '@/hooks/useAuth';
import { LoginFormValues } from '@/types/auth.dt';
import { useRouter } from 'next/navigation';
import { CgClose } from 'react-icons/cg';
import { Form, Formik, FormikHelpers } from 'formik';
import { FormInput } from './FormInput';
import PasswordInput from './PasswordInput';
import AuthButton from './AuthButton';
import * as Yup from 'yup'
import { ManagePopUpTypes } from '@/types/global.dt';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
})

function LoginForm({ closeModal, setActiveModal }: ManagePopUpTypes) {
  const { login, isLoading } = useAuth()
  const router = useRouter();

  const handleSubmit = async (
    values: LoginFormValues, 
    { setSubmitting, setStatus }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      setStatus(null); 
      
      const result = await login({
        email: values.email,
        password: values.password,
    
      });

      if (result.success && result.data) {
        closeModal();
        
        const userRole = result.data.user.role;
        if (userRole === 'artist') {
          router.push('/for_artist');
        } else if (userRole === 'buyer') {
          router.push('/market_place');
        } else {
          // Fallback route
          router.push('/dashboard');
        }
      } else {
        // Set form-level error instead of field-level
        setStatus(result.error || 'Login failed. Please check your credentials.');
      }
      
    } catch (error) {
      console.error('Login submission error:', error);
      setStatus('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const initialValues: LoginFormValues = {
    email: '',
    password: ''
  };

  return (
    <div className='w-full bg-primaryColor h-auto text-white font-outfit font-extralight shadow-2xl'>
      <div className='w-full mx-auto'>
        {/* Header with close button */}
        <div className='flex items-center justify-between bg-darkBackground w-full p-4 mb-6'>
          <div className='flex-1'/>
          <div className='flex-1 flex items-center justify-between'>
            <h1 className='text-2xl font-bowlby'>Login</h1>
            <CgClose 
              onClick={closeModal} 
              className='text-3xl cursor-pointer hover:opacity-70' 
              aria-label="Close login modal"
            />
          </div>
        </div>

        {/* Content section */}
        <div className='items-center justify-center gap-10 px-10 py-5 pb-6'>
          <div className='flex-1'>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, status }) => (
                <Form>
                  {/* Display form-level errors */}
                  {status && (
                    <div className='mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200 text-sm'>
                      {status}
                    </div>
                  )}

                  <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder='johndoe@gmail.com'
                  />

                  <PasswordInput
                    label="Password"
                    name="password"
                    placeholder='*************************'
                  />

                  <AuthButton
                    className='gradiento text-primaryColor rounded-md'
                    text='Login' 
                    isLoading={isSubmitting || isLoading}
                    disabled={isSubmitting || isLoading}
                  />

                  <div className='flex items-center justify-center py-5'>
                    <button 
                      type="button"  
                      className='hover:underline transition-all duration-200' 
                      onClick={() => setActiveModal('signup')}
                      disabled={isSubmitting || isLoading}
                    >
                      Don&apos;t have an account? Sign Up
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

export default LoginForm