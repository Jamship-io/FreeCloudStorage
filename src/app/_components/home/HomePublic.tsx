import React from 'react'
import Signin from '../auth/Signin'
// import { fontFamily } from 'tailwindcss/defaultTheme';

function HomePublic() {
  return (
    <div className='flex min-w-screen min-h-screen flex-col items-center justify-center'>
      <h1 className='text-[#B5ADFF] font-yoshida text-9xl pb-5'>STEAL STORAGE</h1>
      <h1 className='text-white font-yoshida text-4xl pb-5'>A FREE CLOUD STORAGE TO <span className='text-[#05FF00]'>SAVE ALL YOUR FILES FOR FREE</span></h1>
      <Signin></Signin>
    </div>

  )
}

export default HomePublic