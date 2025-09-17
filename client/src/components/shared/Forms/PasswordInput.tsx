import { Field, ErrorMessage } from 'formik';
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { PasswordInputProps } from '@/types/auth.dt';



function PasswordInput({label, name, ...rest}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility=()=>{
        setShowPassword((prev)=> !prev)
    }

  return (
    <div className='mb-6'>
        <label>{label}</label>
        <div className='relative'>
            <Field
                name={name}
                type={showPassword ? 'text' : 'password'}
                id={name}
                className="text-white w-full border-b border-gray-300 py-2 px-0 pr-10 focus:outline-none focus:border-gray-900 bg-transparent"
                {...rest}
            />

            
                <button
                    type='button'
                    className='absolute right-0 top-1/s transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none'
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? (
                     <FaRegEyeSlash size={20}/>
                    ): (
                        <FaRegEye size={20}/>
                    )}      
                </button>

            
            <ErrorMessage
             name={name}
             component="div"
             className='text-red-500'
            />
        </div>
    </div>
  )
}

export default PasswordInput