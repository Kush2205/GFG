"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import axios from 'axios';
import ConnectModal from '../ui/ConnectModal';
import { usePlatformContext } from '../../contexts/PlatformContext';
import { useUser } from '@clerk/nextjs';

export default function DashboardContent() {
  const { userStats, updateUserStats, loading, refreshStats } = usePlatformContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'github' | 'leetcode' | 'codeforces'>('github');
  const { user } = useUser();

  const handleConnectClick = (platform: 'github' | 'leetcode' | 'codeforces') => {
    setSelectedPlatform(platform);
    setModalOpen(true);
  };

  const handleConnect = async (data: Record<string, string>, apiResponse?: any) => {
    console.log(apiResponse);

    // Update the context immediately with the new data
    if (selectedPlatform === 'github') {
      updateUserStats({
        github: {
          connected: true,
          username: data.username,
          repos: apiResponse?.repos || 0,
          stars: apiResponse?.stars || 0,
          contributions: apiResponse?.contributions || 0
        },
        leetcode: userStats.leetcode,
        codeforces: userStats.codeforces
      });
    }

    if (selectedPlatform === 'leetcode') {
      updateUserStats({
        github: userStats.github,
        leetcode: {
          connected: true,
          username: data.username,
          solved: apiResponse?.solved || 0,
          ranking: apiResponse?.ranking || 0
        },
        codeforces: userStats.codeforces
      });
    }

    if (selectedPlatform === 'codeforces') {
      updateUserStats({
        github: userStats.github,
        leetcode: userStats.leetcode,
        codeforces: {
          connected: true,
          username: data.handle,
          handle: apiResponse?.handle || data.handle,
          rating: apiResponse?.rating || 0,
          maxRating: apiResponse?.maxRating || 0,
          contests: apiResponse?.contests || 0,
          rank: apiResponse?.rank || 'Unrated',
          maxRank: apiResponse?.maxRank || 'Unrated',
          contribution: apiResponse?.contribution || 0,
          lastOnline: apiResponse?.lastOnline || '',
          totalSubmissions: apiResponse?.totalSubmissions || 0
        }
      });
    }

    // Refresh stats from database to ensure consistency
    await refreshStats();
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back!</h2>
            <p className="text-gray-400">Here's an overview of your coding journey</p>
          </div>
          <motion.button
            onClick={refreshStats}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            <svg 
              className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{loading ? 'Refreshing...' : 'Refresh Stats'}</span>
          </motion.button>
        </div>
      </motion.div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 hover:border-green-500/40 transition-all duration-300 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          {loading && (
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
              <div className="w-8 h-8 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-xl">🐙</span>
              </div>
              <h3 className="text-xl font-semibold text-white">GitHub</h3>
            </div>
            {userStats?.github.connected ? (
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">Connected</span>
            ) : (
              <motion.button
                onClick={() => handleConnectClick('github')}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect
              </motion.button>
            )}
          </div>

          {userStats?.github.connected ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Username:</span>
                <span className="text-green-400">@{userStats?.github.username}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Repositories:</span>
                <span className="text-white font-semibold">{userStats?.github.repos}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Stars:</span>
                <span className="text-white font-semibold">{userStats?.github.stars}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Contributions:</span>
                <span className="text-white font-semibold">{userStats?.github.contributions}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-400 mb-4">Connect your GitHub to see stats</p>
              <motion.button
                onClick={() => handleConnectClick('github')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect GitHub
              </motion.button>
            </div>
          )}
        </motion.div>


        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 hover:border-green-500/40 transition-all duration-300 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          {loading && (
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
              <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-xl">🧩</span>
              </div>
              <h3 className="text-xl font-semibold text-white">LeetCode</h3>
            </div>
            {userStats?.leetcode.connected ? (
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">Connected</span>
            ) : (
              <motion.button
                onClick={() => handleConnectClick('leetcode')}
                className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-xs rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect
              </motion.button>
            )}
          </div>

          {userStats?.leetcode.connected ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Username:</span>
                <span className="text-orange-400">@{userStats?.leetcode.username}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Problems Solved:</span>
                <span className="text-white font-semibold">{userStats?.leetcode.solved}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Ranking:</span>
                <span className="text-white font-semibold">#{userStats?.leetcode.ranking}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-400 mb-4">Connect your LeetCode to see stats</p>
              <motion.button
                onClick={() => handleConnectClick('leetcode')}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect LeetCode
              </motion.button>
            </div>
          )}
        </motion.div>


        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 hover:border-green-500/40 transition-all duration-300 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          {loading && (
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
              <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Codeforces</h3>
            </div>
            {userStats?.codeforces.connected ? (
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">Connected</span>
            ) : (
              <motion.button
                onClick={() => handleConnectClick('codeforces')}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect
              </motion.button>
            )}
          </div>

          {userStats?.codeforces.connected ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Handle:</span>
                <span className="text-blue-400">@{userStats?.codeforces.handle || userStats?.codeforces.username}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Current Rating:</span>
                <span className="text-white font-semibold">{userStats?.codeforces.rating}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Max Rating:</span>
                <span className="text-white font-semibold">{userStats?.codeforces.maxRating}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Current Rank:</span>
                <span className="text-blue-300 font-medium">{userStats?.codeforces.rank || 'Unrated'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Contests:</span>
                <span className="text-white font-semibold">{userStats?.codeforces.contests}</span>
              </div>
              {userStats?.codeforces.contribution !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Contribution:</span>
                  <span className="text-green-400 font-semibold">{userStats?.codeforces.contribution}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-400 mb-4">Connect your Codeforces to see stats</p>
              <motion.button
                onClick={() => handleConnectClick('codeforces')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect Codeforces
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '🚀', title: 'Start Contest', desc: 'Join live contests' },
            { icon: '📝', title: 'Practice', desc: 'Solve problems' },
            { icon: '👥', title: 'Find Team', desc: 'Connect with others' },
            { icon: '💼', title: 'Apply Jobs', desc: 'Browse opportunities' }
          ].map((action, index) => (
            <motion.button
              key={action.title}
              className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all duration-300 text-left"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <h4 className="text-white font-semibold">{action.title}</h4>
              <p className="text-gray-400 text-sm">{action.desc}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>


      <ConnectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        platform={selectedPlatform}
        onConnect={handleConnect}
      />
    </div>
  );
}
