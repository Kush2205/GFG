export interface UserStats {
  github: {
    connected: boolean;
    username: string | undefined;
    repos: number;
    stars: number;
    contributions: number;
  };
  leetcode: {
    connected: boolean;
    username: string | undefined;
    solved: number;
    ranking: number;
  };
  codeforces: {
    connected: boolean;
    username: string | undefined;
    handle?: string;
    rating: number;
    maxRating: number;
    contests: number;
    rank?: string;
    maxRank?: string;
    contribution?: number;
    lastOnline?: string;
    totalSubmissions?: number;
  };
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

export interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  resume: string;
  coverLetter: string;
  teamPreference1: string;
  teamPreference2: string;
  teamPreference3: string;
  experience: string;
  skills: string;
  portfolio: string;
}
