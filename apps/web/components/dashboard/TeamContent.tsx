"use client";
import React from 'react';
import { motion } from 'motion/react';

export default function TeamContent() {
  return (
    <div className="space-y-8">
      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Create New Team</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Team Name"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
            />
            <textarea
              placeholder="Team Description"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none h-24 resize-none"
            />
            <motion.button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Team
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Your Teams</h3>
          <div className="space-y-3">
            {[
              { name: 'CodeWarriors', members: 5, role: 'Leader' },
              { name: 'AlgoMasters', members: 3, role: 'Member' },
            ].map((team, index) => (
              <motion.div
                key={team.name}
                className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-white font-semibold">{team.name}</h4>
                    <p className="text-gray-400 text-sm">{team.members} members • {team.role}</p>
                  </div>
                  <button className="text-green-400 hover:text-green-300 transition-colors">
                    View
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
