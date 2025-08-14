"use client";
import React, { useEffect,useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navigation from '../../components/ui/Navigation';
import DashboardContent from '../../components/dashboard/DashboardContent';
import TeamContent from '../../components/dashboard/TeamContent';
import ContestsContent from '../../components/dashboard/ContestsContent';
import RecruitmentContent from '../../components/dashboard/RecruitmentContent';
import LeaderboardContent from '../../components/dashboard/LeaderboardContent';
import {PlatformProvider} from "../../contexts/PlatformContext"
import { JobPosting, NavItem } from '../../types/dashboard';
import { useUser } from "@clerk/nextjs"
import axios from 'axios';




function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const {user , isLoaded , isSignedIn} = useUser();

  async function fetchUserData() {
      
     if(isSignedIn && isLoaded){
        const {primaryEmailAddress , fullName , createdAt , updatedAt} = user;
        const res = await axios.post("/api/register", {
          email: primaryEmailAddress?.emailAddress,
          name: fullName,
          createdAt: createdAt?.toISOString(),
          updatedAt: updatedAt?.toISOString()
        })
     }
    
   }
  
  useEffect(() => {
    fetchUserData();
  } , [isLoaded, isSignedIn]);


  

  

  const jobPostings: JobPosting[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120k - $180k',
      description: 'We are looking for a senior software engineer to join our growing team...',
      requirements: ['5+ years experience', 'React/Node.js', 'System Design'],
      postedDate: '2025-01-05'
    },
    {
      id: '2',
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$90k - $130k',
      description: 'Join our innovative startup as a frontend developer...',
      requirements: ['3+ years experience', 'React/Vue.js', 'TypeScript'],
      postedDate: '2025-01-03'
    },
    {
      id: '3',
      title: 'Full Stack Developer',
      company: 'Innovation Labs',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$100k - $150k',
      description: 'Looking for a full stack developer to work on cutting-edge projects...',
      requirements: ['4+ years experience', 'Full Stack', 'Cloud Technologies'],
      postedDate: '2025-01-01'
    }
  ];

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'team', label: 'Team', icon: '👥' },
    { id: 'contests', label: 'Contests', icon: '🏆' },
    { id: 'recruitment', label: 'Recruitment', icon: '💼' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '📊' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'team':
        return <TeamContent />;
      case 'contests':
        return <ContestsContent />;
      case 'recruitment':
        return <RecruitmentContent jobPostings={jobPostings} />;
      case 'leaderboard':
        return <LeaderboardContent />;
      default:
        return <DashboardContent  />;
    }
  };

  return (
    <PlatformProvider>
    <div className='w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900'>
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        navItems={navItems} 
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
    </PlatformProvider>
  );
}

export default Dashboard;
