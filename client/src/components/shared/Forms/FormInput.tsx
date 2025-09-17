'use client'

import { FormInputProps } from '@/types/auth.dt'
import {Field, ErrorMessage} from 'formik'


export const FormInput=({label, name, type="text", ...rest}: FormInputProps)=>{
    return(
        <div className="mb-5">
            <label htmlFor={name} className="text-white">{label}</label>
            <Field
              name={name}
              type={type}
              id={name}
              className='w-full border-b text-white border-gray-30 px-0 focus:outline-none focus:border-gray-900 bg-transparent'
              {...rest}
            />
            <ErrorMessage
             name={name}
             component="div"
             className="text-red-500 text-sm mt-1"
            />
        </div>
    )
}