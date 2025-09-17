import React from 'react'

function GetSupport() {
  return (
    <div className='py-10 text-white'>

    <div className='flex items-center flex-col justify-center space-y-5'>
        <div className='space-y-3'>
        <h1 className='font-monoBold text-2xl font-poppins'>Get Support</h1>
        <h1 className='text-[18px] capitalize font-bold font-outfit'>need help? contact us</h1>
        </div>

        <div className='flex-col space-y-5'>

            <div className='bg-[#202020] border border-[#2d2d2d] rounded-[5px] p-2'>
                <h1 className='text-center font-bold'>+233 556216554</h1>
            </div>
            
            <div className='bg-[#202020] border border-[#2d2d2d] rounded-[5px] p-2'>
            <h1 className='text-center font-bold'>Tunecycle247@gmail.com</h1>
            </div>
        </div>
    </div>

    <div className='mt-5 flex justify-center '>
        <h1 className='w-[80%] font-outfit font-extralight text-[18px]'>We&apos;re here to support you with dedicated assistance, 24/7. Whether you have a quick question or need in-depth help with licensing, royalties, or anything else, our team and resources are available to empower you on your musical journey.</h1>
    </div>
    
</div>
  )
}

export default GetSupport