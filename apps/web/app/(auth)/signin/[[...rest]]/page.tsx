"use client";
import {SignIn } from "@clerk/nextjs";
import {dark} from "@clerk/themes";
import {motion} from "motion/react"

export default function SignInPage() {
  return(
    <div className=" w-full h-screen flex items-center justify-center">
      
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
         <SignIn appearance={{
          baseTheme: dark,
        }}/>
      </motion.div>
       
    </div>
  )
}