"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePlatformContext } from '../../contexts/PlatformContext';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: 'github' | 'leetcode' | 'codeforces';
  onConnect: (data: Record<string, string>, apiResponse?: any) => void;
}

export default function ConnectModal({ isOpen, onClose, platform, onConnect }: ConnectModalProps) {
  const { user } = useUser();
  
  const platformConfig = {
    github: {
      name: 'GitHub',
      icon: '🐙',
      color: 'green',
      bgColor: 'bg-gray-900',
      borderColor: 'border-green-500',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      description: 'Connect your GitHub account to track your repositories, stars, and contributions.',
      fields: [
        { key: 'username', label: 'GitHub Username', placeholder: 'your-username', type: 'text', required: true },
        { key: 'token', label: 'Personal Access Token (Optional)', placeholder: 'ghp_xxxxxxxxxxxx', type: 'password', required: false }
      ],
      instructions: [
        'Enter your GitHub username',
        'Optionally provide a Personal Access Token for private repo access',
        'Go to GitHub Settings > Developer settings > Personal access tokens to create one'
      ]
    },
    leetcode: {
      name: 'LeetCode',
      icon: '🧩',
      color: 'orange',
      bgColor: 'bg-orange-600',
      borderColor: 'border-orange-500',
      buttonColor: 'bg-orange-600 hover:bg-orange-700',
      description: 'Connect your LeetCode account to track your problem-solving progress.',
      fields: [
        { key: 'username', label: 'LeetCode Username', placeholder: 'your-username', type: 'text', required: true },
        { key: 'session', label: 'Session Cookie (Optional)', placeholder: 'LEETCODE_SESSION=...', type: 'password', required: false }
      ],
      instructions: [
        'Enter your LeetCode username',
        'For detailed stats, provide your session cookie',
        'Find it in browser dev tools > Application > Cookies > leetcode.com'
      ]
    },
    codeforces: {
      name: 'Codeforces',
      icon: '⚡',
      color: 'blue',
      bgColor: 'bg-blue-600',
      borderColor: 'border-blue-500',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      description: 'Connect your Codeforces account to track your competitive programming stats.',
      fields: [
        { key: 'handle', label: 'Codeforces Handle', placeholder: 'your-handle', type: 'text', required: true },
        { key: 'apiKey', label: 'API Key (Optional)', placeholder: 'your-api-key', type: 'password', required: false }
      ],
      instructions: [
        'Enter your Codeforces handle',
        'API key is optional for basic stats',
        'Get API key from Codeforces settings for enhanced features'
      ]
    }
  };

  const config = platformConfig[platform];
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Function to update platform ID in database
  const updatePlatformInDatabase = async (platformId: string) => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.error('User email not available');
      return;
    }

    try {
      const response = await axios.post('/api/update', {
        email: user.primaryEmailAddress.emailAddress,
        platform: platform,
        platformId: platformId
      });
      
      console.log(`${platform} platform ID updated in database:`, response.data);
    } catch (error) {
      console.error('Failed to update platform ID in database:', error);
      // Don't throw error here as we don't want to block the UI update
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = config.fields.filter(field => field.required);
    const missingFields = requiredFields.filter(field => !formData[field.key]?.trim());

    if (missingFields.length > 0) {
      alert(`Please fill in required fields: ${missingFields.map(f => f.label).join(', ')}`);
      return;
    }

    setIsConnecting(true);
    if (!formData.username && !formData.handle) {
      alert('Please provide a username or handle to connect.');
      setIsConnecting(false);
      return;
    }

    try {
      let apiResponse = {};
      if (platform === 'github') {
        try {
          const response = await axios.post('/api/getStats', {
            platform: 'github',
            platformId: formData.username,

          });
          apiResponse = response.data.data;
        } catch (error) {
          console.error('GitHub API failed:', error);
          alert('Failed to connect to GitHub. Please check your credentials and try again.');
          setIsConnecting(false);
          return;
        }
      }

      else if (platform === 'leetcode') {
        try {
          const response = await axios.post('/api/getStats', {
             platform: 'leetcode',
             platformId: formData.username,
           
          });
          apiResponse = response.data.data;
        } catch (error) {
          console.error('LeetCode API failed:', error);
          alert('Failed to connect to LeetCode. Please check your credentials and try again.');
          setIsConnecting(false);
          return;
        }
      }

      else if (platform === 'codeforces') {

        try {
          const response = await axios.post('/api/getStats', {
            platform: 'codeforces',
            platformId: formData.handle,

          });

          if (response.data.error) {
            throw new Error(response.data.error);
          }

          if (response.data.success) {
            apiResponse = response.data.data;
          } else {
            throw new Error('Failed to fetch Codeforces stats');
          }
        }

        catch (error) {
          console.error('Codeforces API failed:', error);
          alert('Failed to connect to Codeforces. Please check your credentials and try again.');
          setIsConnecting(false);
          return;
        }

      }

      // Update the database with the platform ID after successful API connection
      let platformId = '';
      if (platform === 'github') {
        platformId = formData.username || '';
      } else if (platform === 'leetcode') {
        platformId = formData.username || '';
      } else if (platform === 'codeforces') {
        platformId = formData.handle || '';
      }

      if (platformId) {
        await updatePlatformInDatabase(platformId);
      }

      onConnect(formData, apiResponse);
      setFormData({});
      onClose();
    }
     catch (error) {
    console.error('Failed to connect:', error);
    alert('Failed to connect. Please check your credentials and try again.');
  } finally {
    setIsConnecting(false);
  }
};

const handleClose = () => {
  setFormData({});
  onClose();
};

return (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className={`bg-gray-800 border ${config.borderColor}/30 rounded-2xl p-6 w-full max-w-md`}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 ${config.bgColor} rounded-lg flex items-center justify-center`}>
                <span className="text-2xl">{config.icon}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Connect {config.name}</h3>
                <p className="text-gray-400 text-sm">Link your account</p>
              </div>
            </div>
            <motion.button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>


          <p className="text-gray-300 mb-6 text-sm">{config.description}</p>


          <form onSubmit={handleSubmit} className="space-y-4">
            {config.fields.map((field) => (
              <div key={field.key}>
                <label className="block text-white font-medium mb-2 text-sm">
                  {field.label}
                  {field.required && <span className="text-red-400 ml-1">*</span>}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.key] || ''}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                  disabled={isConnecting}
                />
              </div>
            ))}


            <div className="bg-gray-700/50 rounded-lg p-4 mt-4">
              <h4 className="text-white font-medium mb-2 text-sm">Instructions:</h4>
              <ul className="text-gray-300 text-xs space-y-1">
                {config.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>


            <div className="flex space-x-3 pt-4">
              <motion.button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isConnecting}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                className={`flex-1 px-4 py-3 ${config.buttonColor} text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
                whileHover={{ scale: isConnecting ? 1 : 1.02 }}
                whileTap={{ scale: isConnecting ? 1 : 0.98 }}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Connecting...</span>
                  </div>
                ) : (
                  `Connect ${config.name}`
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

}