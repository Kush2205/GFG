import { NextRequest, NextResponse } from 'next/server';

import axios from 'axios';

const token = process.env.GITHUB_TOKEN 
console.log('GitHub Token:', token);
export  async function POST(req: NextRequest, res: NextResponse) {
    const { platform, platformId } = await req.json();
    if (!platform || !platformId) {
        return NextResponse.json({ error: 'Platform is required' }, { status: 400 });
    }
    
    console.log('Connecting to platform:', platform, 'with ID:', platformId);
    let apiResponse = {}
    try {

        if (platform === 'github') {
           
            const authHeaders = token
                ? { Authorization: `${token}` }
                : {};

            const response = await axios.get(`https://api.github.com/users/${platformId}`, {
                headers: authHeaders
            });

            console.log('GitHub user verified:', response.data);
            apiResponse = {
                username: response.data.login,
                repos: response.data.public_repos,
                stars: response.data.public_gists,
                contributions: response.data.contributions
            };
        }

        if (platform === 'leetcode') {
            try {

                let fallbackResponse;
                try {
                    fallbackResponse = await axios.get(`https://leetcode-stats-api.herokuapp.com/${platformId}`, {
                        timeout: 10000
                    });

                    if (fallbackResponse.data) {
                        apiResponse = {
                            username: platformId,
                            solved: fallbackResponse.data.totalSolved || 0,
                            ranking: fallbackResponse.data.ranking || 'N/A',
                            easy: fallbackResponse.data.easySolved || 0,
                            medium: fallbackResponse.data.mediumSolved || 0,
                            hard: fallbackResponse.data.hardSolved || 0
                        };
                    } else {
                        throw new Error('Invalid response from API');
                    }
                } catch (firstApiError) {

                    console.warn('First LeetCode API failed, trying fallback:', firstApiError);
                        
                    };

                    if (fallbackResponse?.data && fallbackResponse.data.status === 'success') {
                        apiResponse = {
                            username: platformId,
                            solved: fallbackResponse.data.totalSolved || 0,
                            ranking: fallbackResponse.data.ranking || 'N/A'
                        };
                    } else {
                        throw new Error('User not found or invalid username');
                    }
                }catch (error) {
                    console.error('LeetCode API failed:', error);
                    return NextResponse.json({ error: 'Failed to fetch LeetCode stats. Please check your username and try again.' }, { status: 500 });
                }
            } 
        

        if (platform === 'codeforces') {
            try {

                const response = await axios.get(`https://codeforces.com/api/user.info?handles=${platformId}`, {
                    timeout: 10000
                });

                if (response.data.status === 'OK' && response.data.result.length > 0) {
                    const userData = response.data.result[0];


                    let ratingData;
                    try {
                        const ratingResponse = await axios.get(`https://codeforces.com/api/user.rating?handle=${platformId}`, {
                            timeout: 5000
                        });
                        ratingData = ratingResponse.data.status === 'OK' ? ratingResponse.data.result : [];
                    } catch (ratingError) {
                        console.warn('Failed to fetch rating history:', ratingError);
                        ratingData = [];
                    }


                    let submissionStats;
                    try {
                        const submissionResponse = await axios.get(`https://codeforces.com/api/user.status?handle=${platformId}&from=1&count=1`, {
                            timeout: 5000
                        });
                        const totalSubmissions = submissionResponse.data.status === 'OK' ? submissionResponse.data.result.length : 0;
                        submissionStats = { totalSubmissions };
                    } catch (submissionError) {
                        console.warn('Failed to fetch submission stats:', submissionError);
                        submissionStats = { totalSubmissions: 0 };
                    }

                    apiResponse = {
                        handle: userData.handle,
                        rating: userData.rating || 0,
                        maxRating: userData.maxRating || userData.rating || 0,
                        rank: userData.rank || 'Unrated',
                        maxRank: userData.maxRank || userData.rank || 'Unrated',
                        contribution: userData.contribution || 0,
                        lastOnline: userData.lastOnlineTimeSeconds ? new Date(userData.lastOnlineTimeSeconds * 1000).toLocaleDateString() : 'Unknown',
                        contests: ratingData.length,
                        ...submissionStats
                    };
                } else {
                    throw new Error('User not found or handle does not exist');
                }
            } catch (error) {
                console.error('Codeforces API failed:', error);

                apiResponse = {
                    handle: platformId,
                    rating: 0,
                    maxRating: 0,
                    rank: 'Unrated',
                    maxRank: 'Unrated',
                    contribution: 0,
                    contests: 0,
                    note: 'Stats unavailable - API failed. Connection saved for manual update.'
                };
            }
        }
    } catch (error) {
        console.error('Error connecting to platform:', error);
        return NextResponse.json({ error: 'Failed to connect to platform. Please check your credentials and try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: apiResponse }, { status: 200 });
}

