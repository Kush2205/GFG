"use client";
import React from 'react';
import { motion } from 'motion/react';

export default function ContestsContent() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-white mb-2">Contests</h2>
        <p className="text-gray-400">Participate in coding contests and challenges</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">Upcoming Contests</h3>
          <div className="space-y-4">
            {[
              { name: 'Weekly Challenge #47', time: '2 hours', participants: 1204, difficulty: 'Medium' },
              { name: 'Algorithm Championship', time: '1 day', participants: 856, difficulty: 'Hard' },
              { name: 'Data Structures Sprint', time: '3 days', participants: 432, difficulty: 'Easy' }
            ].map((contest, index) => (
              <motion.div
                key={contest.name}
                className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-4 hover:border-green-500/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-white font-semibold">{contest.name}</h4>
                    <p className="text-gray-400">Starts in {contest.time} • {contest.participants} participants</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${
                      contest.difficulty === 'Easy' ? 'bg-green-600 text-white' :
                      contest.difficulty === 'Medium' ? 'bg-yellow-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {contest.difficulty}
                    </span>
                  </div>
                  <motion.button
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Your Performance</h3>
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">1247</div>
                <div className="text-gray-400">Current Rating</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Contests:</span>
                  <span className="text-white">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Best Rank:</span>
                  <span className="text-white">#47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Problems Solved:</span>
                  <span className="text-white">156</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
