"use client";
import React from 'react';
import { motion } from 'motion/react';

export default function LeaderboardContent() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-white mb-2">Leaderboard</h2>
        <p className="text-gray-400">See how you rank among other developers</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">Global Rankings</h3>
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-300">Rank</th>
                    <th className="px-4 py-3 text-left text-gray-300">User</th>
                    <th className="px-4 py-3 text-left text-gray-300">Rating</th>
                    <th className="px-4 py-3 text-left text-gray-300">Problems</th>
                    <th className="px-4 py-3 text-left text-gray-300">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { rank: 1, name: 'AlgoMaster', rating: 2847, problems: 456, change: '+5' },
                    { rank: 2, name: 'CodeNinja', rating: 2783, problems: 423, change: '-1' },
                    { rank: 3, name: 'ByteWizard', rating: 2654, problems: 398, change: '+2' },
                    { rank: 4, name: 'StackOverflow', rating: 2543, problems: 367, change: '0' },
                    { rank: 5, name: 'DevMaster', rating: 2456, problems: 345, change: '+3' },
                    { rank: 47, name: 'You (JohnDoe)', rating: 1247, problems: 156, change: '+3', isUser: true }
                  ].map((user, index) => (
                    <motion.tr
                      key={user.rank}
                      className={`border-b border-gray-700 hover:bg-gray-700/30 transition-colors ${user.isUser ? 'bg-green-600/20 border-green-500/50' : ''}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          {user.rank <= 3 && (
                            <span className="mr-2">
                              {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                            </span>
                          )}
                          <span className={`font-semibold ${user.isUser ? 'text-green-400' : 'text-white'}`}>
                            #{user.rank}
                          </span>
                        </div>
                      </td>
                      <td className={`px-4 py-3 font-semibold ${user.isUser ? 'text-green-400' : 'text-white'}`}>
                        {user.name}
                      </td>
                      <td className="px-4 py-3 text-green-400 font-semibold">{user.rating}</td>
                      <td className="px-4 py-3 text-gray-300">{user.problems}</td>
                      <td className="px-4 py-3">
                        <span className={`font-semibold ${
                          user.change.startsWith('+') ? 'text-green-400' :
                          user.change.startsWith('-') ? 'text-red-400' :
                          'text-gray-400'
                        }`}>
                          {user.change}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Your Progress</h3>
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-4 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">#47</div>
                <div className="text-gray-400">Global Rank</div>
                <div className="text-green-400 text-sm">+3 this week ↗</div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Next Rank</span>
                    <span className="text-white">#46</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">68% to next rank</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Weekly Change:</span>
                    <span className="text-green-400">+3 ↗</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Best Rank:</span>
                    <span className="text-white">#23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Points:</span>
                    <span className="text-white">1,247</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-white font-semibold mb-3">Achievement Badges</h4>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: '🔥', name: 'Streak Master', desc: '30 day streak' },
                { icon: '⚡', name: 'Speed Coder', desc: 'Fast solutions' },
                { icon: '🎯', name: 'Problem Solver', desc: '100+ problems' },
                { icon: '🏆', name: 'Contest Winner', desc: 'Top 10 finish' },
                { icon: '💎', name: 'Elite Coder', desc: 'High rating' },
                { icon: '🌟', name: 'Helpful', desc: 'Community help' }
              ].map((badge, index) => (
                <motion.div
                  key={badge.name}
                  className="text-center p-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  title={badge.desc}
                >
                  <div className="text-lg mb-1">{badge.icon}</div>
                  <div className="text-xs text-gray-400">{badge.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
