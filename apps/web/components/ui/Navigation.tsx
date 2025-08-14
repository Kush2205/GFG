"use client";
import React from 'react';
import { motion } from 'motion/react';
import { UserButton } from '@clerk/nextjs';
import { NavItem } from '../../types/dashboard';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  navItems: NavItem[];
}

export default function Navigation({ activeTab, setActiveTab, navItems }: NavigationProps) {
  return (
    <>
      <motion.nav 
        className="bg-gray-800/80 backdrop-blur-sm border-b border-green-500/20 px-6 py-4 sticky top-0 z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              GeeksforGeeks
            </motion.h1>
            
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                    activeTab === item.id 
                      ? 'bg-green-600 text-white shadow-lg shadow-green-500/25' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
          </div>
        </div>
      </motion.nav>

      <motion.div 
        className="md:hidden bg-gray-800/80 backdrop-blur-sm border-b border-green-500/20 px-4 py-2 sticky top-[76px] z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex space-x-1 overflow-x-auto">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-2 rounded-lg transition-all duration-300 flex items-center space-x-1 whitespace-nowrap ${
                activeTab === item.id 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
