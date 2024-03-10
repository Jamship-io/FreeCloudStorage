"use client"
import React from 'react'
import { signIn } from 'next-auth/react'

function Signin() {
  return (
    <button onClick={async()=>{await signIn()}} className='px-44 py-2 rounded-full bg-[#343244] text-[#B5ADFF] font-yoshida'><h1 className='text-4xl'>GET STARTED</h1></button>
    
  )
}

export default Signin;