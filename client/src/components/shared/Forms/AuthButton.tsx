import clsx from 'clsx';
import React from 'react'

type AuthButtonProps = {
    text: string;
    isLoading: boolean;  
    className?: string;
    type?: 'button' | 'submit' | 'reset'; 
    disabled?:boolean
}

function AuthButton({ text, isLoading, className, type = 'submit' }: AuthButtonProps) {
    return (
        <div className={clsx('flex items-center justify-center', className)}>
            <button 
                type={type} 
                disabled={isLoading} 
                className={clsx(
                    'bg-trustBlue py-3 px-10   font-medium',
                    isLoading ? 'bg-tertiaryColor w-full text-primaryColor cursor-not-allowed' : 'hover:bg-trustBlue/90'
                )}
            >
                {isLoading ? 'Submitting...' : text}
            </button>
        </div>
    )
}

export default AuthButton