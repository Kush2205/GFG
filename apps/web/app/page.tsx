"use client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "motion/react";

export default function Page() {
  const router = useRouter();
  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth();
   
  const words = ["Code", "Create", "Connect"];

  
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  
 

  if (!isSignedIn) {
    return (
      <div className=" w-full min-h-screen">
        
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              
              <motion.h1 
                className="relative text-6xl md:text-8xl lg:text-9xl font-bold mb-8 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
               
              >
                GeeksforGeeks
                
              </motion.h1>
              
             
              <div className="relative  flex items-center justify-center mb-12">
                {words.map((word, index) => (
                  <motion.h2
                    key={word}
                    className="text-white text-4xl md:text-5xl font-semibold absolute"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: [0, 1, 1, 0],
                      y: [20, 0, 0, -20]
                    }}
                    transition={{
                      duration: 2,
                      delay: index * 2 + 1,
                      times: [0, 0.2, 0.8, 1],
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: words.length * 2
                    }}
                  >
                    {word}
                  </motion.h2>
                ))}
              </div>

              
              <motion.p 
                className="text-gray-300 text-xl md:text-2xl mb-12 max-w-2xl mx-auto px-4 mt-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Join millions of developers in the ultimate coding community. 
                Learn, practice, and grow your programming skills.
              </motion.p>

             
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center items-center px-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                <motion.button 
                  onClick={() => router.push("/signin")}
                  className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-2xl text-white text-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-green-500/25 min-w-[140px]"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
                
                <motion.button 
                  onClick={() => router.push("/signup")}
                  className="bg-transparent border-2 border-green-500 hover:bg-green-500 px-8 py-4 rounded-2xl text-green-400 hover:text-black text-xl font-semibold transition-all duration-300 min-w-[140px]"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

       
        <motion.div 
          className="py-20 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-white text-4xl md:text-5xl font-bold text-center mb-16"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Why Choose GeeksforGeeks?
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Learn",
                  description: "Master programming with our comprehensive tutorials and courses",
                  icon: "📚"
                },
                {
                  title: "Practice",
                  description: "Solve coding problems and improve your problem-solving skills",
                  icon: "💻"
                },
                {
                  title: "Compete",
                  description: "Participate in coding contests and challenge yourself",
                  icon: "🏆"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 text-center hover:border-green-500/40 transition-all duration-300"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-green-400 text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-300 text-lg">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

 
  return null;
}