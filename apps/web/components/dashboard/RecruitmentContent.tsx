"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { JobPosting, ApplicationData } from '../../types/dashboard';

interface RecruitmentContentProps {
  jobPostings: JobPosting[];
}

export default function RecruitmentContent({ jobPostings }: RecruitmentContentProps) {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    fullName: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
    teamPreference1: '',
    teamPreference2: '',
    teamPreference3: '',
    experience: '',
    skills: '',
    portfolio: ''
  });

  const handleApply = (job: JobPosting) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here - send to your backend
    console.log('Application submitted:', { job: selectedJob, application: applicationData });
    setShowApplicationForm(false);
    setSelectedJob(null);
    setApplicationData({
      fullName: '',
      email: '',
      phone: '',
      resume: '',
      coverLetter: '',
      teamPreference1: '',
      teamPreference2: '',
      teamPreference3: '',
      experience: '',
      skills: '',
      portfolio: ''
    });
  };

  const teamOptions = [
    { value: 'frontend', label: 'Frontend Development' },
    { value: 'backend', label: 'Backend Development' },
    { value: 'fullstack', label: 'Full Stack Development' },
    { value: 'devops', label: 'DevOps & Infrastructure' },
    { value: 'mobile', label: 'Mobile Development' },
    { value: 'ai-ml', label: 'AI/ML Engineering' },
    { value: 'data', label: 'Data Science' },
    { value: 'security', label: 'Cybersecurity' },
    { value: 'ui-ux', label: 'UI/UX Design' },
    { value: 'product', label: 'Product Management' }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-white mb-2">Recruitment</h2>
        <p className="text-gray-400">Discover job opportunities and apply to join amazing teams</p>
      </motion.div>

      {!showApplicationForm ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobPostings.map((job, index) => (
            <motion.div
              key={job.id}
              className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-500/40 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{job.title}</h3>
                  <p className="text-green-400 font-medium">{job.company}</p>
                </div>
                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                  {job.type}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-400 text-sm">
                  <span className="mr-2">📍</span>
                  {job.location}
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <span className="mr-2">💰</span>
                  {job.salary}
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <span className="mr-2">📅</span>
                  Posted {new Date(job.postedDate).toLocaleDateString()}
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-3">{job.description}</p>

              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">Requirements:</h4>
                <div className="flex flex-wrap gap-1">
                  {job.requirements.map((req, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={() => handleApply(job)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Apply Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white">Apply for {selectedJob?.title}</h3>
                <p className="text-green-400">{selectedJob?.company}</p>
              </div>
              <motion.button
                onClick={() => setShowApplicationForm(false)}
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                ✕
              </motion.button>
            </div>

            <form onSubmit={handleSubmitApplication} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={applicationData.fullName}
                    onChange={(e) => setApplicationData({...applicationData, fullName: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={applicationData.email}
                    onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={applicationData.phone}
                    onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Years of Experience *</label>
                  <input
                    type="text"
                    required
                    value={applicationData.experience}
                    onChange={(e) => setApplicationData({...applicationData, experience: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Team Preferences (Choose 3) *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">First Preference</label>
                    <select
                      required
                      value={applicationData.teamPreference1}
                      onChange={(e) => setApplicationData({...applicationData, teamPreference1: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
                    >
                      <option value="">Select Team</option>
                      {teamOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Second Preference</label>
                    <select
                      required
                      value={applicationData.teamPreference2}
                      onChange={(e) => setApplicationData({...applicationData, teamPreference2: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
                    >
                      <option value="">Select Team</option>
                      {teamOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Third Preference</label>
                    <select
                      required
                      value={applicationData.teamPreference3}
                      onChange={(e) => setApplicationData({...applicationData, teamPreference3: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
                    >
                      <option value="">Select Team</option>
                      {teamOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Technical Skills *</label>
                <textarea
                  required
                  value={applicationData.skills}
                  onChange={(e) => setApplicationData({...applicationData, skills: e.target.value})}
                  placeholder="List your technical skills, programming languages, frameworks, etc."
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none h-24 resize-none"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Portfolio/GitHub URL</label>
                <input
                  type="url"
                  value={applicationData.portfolio}
                  onChange={(e) => setApplicationData({...applicationData, portfolio: e.target.value})}
                  placeholder="https://github.com/yourusername or your portfolio URL"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Resume/CV URL *</label>
                <input
                  type="url"
                  required
                  value={applicationData.resume}
                  onChange={(e) => setApplicationData({...applicationData, resume: e.target.value})}
                  placeholder="Google Drive, Dropbox, or other cloud storage link to your resume"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Cover Letter</label>
                <textarea
                  value={applicationData.coverLetter}
                  onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none h-32 resize-none"
                />
              </div>

              <div className="flex space-x-4">
                <motion.button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Application
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="px-6 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
}
