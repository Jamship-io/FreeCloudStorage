"use client"
import React from 'react'
import { signIn } from 'next-auth/react'

function Signin() {
  return (
    <button onClick={async()=>{await signIn()}} className='border'>Sign in</button>
    
  )
}

export default Signin;