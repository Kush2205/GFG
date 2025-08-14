"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserStats } from '../types/dashboard';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';

type PlatformContextType = {
    userStats: UserStats;
    updateUserStats: (stats: UserStats) => void;
    loading: boolean;
    refreshStats: () => Promise<void>;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

const defaultUserStats: UserStats = {
    github: {
        connected: false,
        username: "",
        repos: 0,
        stars: 0,
        contributions: 0
    },
    leetcode: {
        connected: false,
        username: "",
        solved: 0,
        ranking: 0
    },
    codeforces: {
        connected: false,
        username: "",
        handle: "",
        rating: 0,
        maxRating: 0,
        contests: 0,
        rank: "Unrated",
        maxRank: "Unrated",
        contribution: 0,
        lastOnline: "",
        totalSubmissions: 0
    }
};

export function PlatformProvider({ children }: { children: React.ReactNode }) {
    const { isSignedIn, isLoaded, user } = useUser();
    const [userStats, setUserStats] = useState<UserStats>(defaultUserStats);
    const [loading, setLoading] = useState(false);

    const fetchPlatformStats = async (platform: string, platformId: string) => {
        if (!platformId) return null;
        
        try {
            const response = await axios.post("/api/getStats", {
                platform,
                platformId
            });
            return response.data.data;
        } catch (error) {
            console.error(`Failed to fetch ${platform} stats:`, error);
            return null;
        }
    };

    const refreshStats = async () => {
        if (!isSignedIn || !isLoaded || !user?.primaryEmailAddress?.emailAddress) {
            return;
        }

        setLoading(true);
        try {
            const email = user.primaryEmailAddress.emailAddress;
            
            // First, get user data from register endpoint to check connected platforms
            const userResponse = await axios.post("/api/register", {
                email,
                name: user?.fullName,
            });

            if (userResponse.status === 201 || userResponse.status === 200) {
                const { leetcode, codeforces, github } = userResponse.data;
                
                // Fetch stats for each connected platform
                const [githubStats, leetcodeStats, codeforcesStats] = await Promise.allSettled([
                    github ? fetchPlatformStats('github', github) : Promise.resolve(null),
                    leetcode ? fetchPlatformStats('leetcode', leetcode) : Promise.resolve(null),
                    codeforces ? fetchPlatformStats('codeforces', codeforces) : Promise.resolve(null)
                ]);

                // Update user stats based on fetched data
                const newUserStats: UserStats = {
                    github: {
                        connected: !!github,
                        username: github || "",
                        repos: githubStats.status === 'fulfilled' && githubStats.value ? githubStats.value.repos || 0 : 0,
                        stars: githubStats.status === 'fulfilled' && githubStats.value ? githubStats.value.stars || 0 : 0,
                        contributions: githubStats.status === 'fulfilled' && githubStats.value ? githubStats.value.contributions || 0 : 0
                    },
                    leetcode: {
                        connected: !!leetcode,
                        username: leetcode || "",
                        solved: leetcodeStats.status === 'fulfilled' && leetcodeStats.value ? leetcodeStats.value.solved || 0 : 0,
                        ranking: leetcodeStats.status === 'fulfilled' && leetcodeStats.value ? leetcodeStats.value.ranking || 0 : 0
                    },
                    codeforces: {
                        connected: !!codeforces,
                        username: codeforces || "",
                        handle: codeforcesStats.status === 'fulfilled' && codeforcesStats.value ? codeforcesStats.value.handle || codeforces || "" : "",
                        rating: codeforcesStats.status === 'fulfilled' && codeforcesStats.value ? codeforcesStats.value.rating || 0 : 0,
                        maxRating: codeforcesStats.status === 'fulfilled' && codeforcesStats.value ? codeforcesStats.value.maxRating || 0 : 0,
                        contests: codeforcesStats.status === 'fulfilled' && codeforcesStats.value ? codeforcesStats.value.contests || 0 : 0,
                        rank: codeforcesStats.status === 'fulfilled' && codeforcesStats.value ? codeforcesStats.value.rank || "Unrated" : "Unrated",
                        maxRank: codeforcesStats.status === 'fulfilled' && codeforcesStats.value ? codeforcesStats.value.maxRank || "Unrated" : "Unrated",
                        contribution: codeforcesStats.status === 'fulfilled' && codeforcesStats.value ? codeforcesStats.value.contribution || 0 : 0,
                        lastOnline: codeforcesStats.status === 'fulfilled' && codeforcesStats.value ? codeforcesStats.value.lastOnline || "" : "",
                        totalSubmissions: codeforcesStats.status === 'fulfilled' && codeforcesStats.value ? codeforcesStats.value.totalSubmissions || 0 : 0
                    }
                };

                setUserStats(newUserStats);
            }
        } catch (error) {
            console.error("Failed to refresh stats:", error);
        } finally {
            setLoading(false);
        }
    };

    // Auto-fetch stats when user loads
    useEffect(() => {
        if (isSignedIn && isLoaded) {
            refreshStats();
        }
    }, [isSignedIn, isLoaded]);

    const updateUserStats = (stats: UserStats) => {
        setUserStats(stats);
    };

    const value: PlatformContextType = {
        userStats,
        updateUserStats,
        loading,
        refreshStats
    };

    return (
        <PlatformContext.Provider value={value}>
            {children}
        </PlatformContext.Provider>
    );
}

export function usePlatformContext() {
    const context = useContext(PlatformContext);
    if (!context) {
        throw new Error('usePlatformContext must be used within a PlatformProvider');
    }
    return context;
}