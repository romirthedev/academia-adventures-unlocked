export interface UniversityRecommendation {
  id: string;
  name: string;
  location: string;
  type: 'public' | 'private' | 'for-profit';
  size: 'small' | 'medium' | 'large';
  selectivity: 'open admission' | 'less selective' | 'selective' | 'highly selective' | 'very selective';
  setting: 'urban' | 'suburban' | 'rural';
  focus: string[];
  strengths: string[];
  weaknesses: string[];
  tuition: number;
  enrollment: number;
  researchIntensive: boolean;
  forProfit?: boolean;
  religiousAffiliation?: string;
}

export const universityDatabase: UniversityRecommendation[] = [
  // Top Tier Universities (Good Fits for High Achievers)
  {
    id: "166027",
    name: 'Harvard University',
    location: 'Cambridge, MA',
    type: 'private',
    size: 'large',
    selectivity: 'very selective',
    setting: 'urban',
    focus: ['liberal arts', 'research', 'graduate programs'],
    strengths: ['World-class faculty', 'Extensive research opportunities', 'Strong alumni network', 'Comprehensive financial aid'],
    weaknesses: ['Extremely competitive', 'High cost', 'Intense pressure'],
    tuition: 55000,
    enrollment: 31000,
    researchIntensive: true
  },
  {
    id: "166683",
    name: 'MIT',
    location: 'Cambridge, MA',
    type: 'private',
    size: 'medium',
    selectivity: 'very selective',
    setting: 'urban',
    focus: ['STEM', 'engineering', 'technology'],
    strengths: ['Leading STEM programs', 'Hands-on research', 'Innovation culture', 'Industry connections'],
    weaknesses: ['Intense workload', 'Limited humanities focus', 'High stress environment'],
    tuition: 55000,
    enrollment: 11500,
    researchIntensive: true
  },
  {
    id: "243744",
    name: 'Stanford University',
    location: 'Stanford, CA',
    type: 'private',
    size: 'large',
    selectivity: 'very selective',
    setting: 'suburban',
    focus: ['technology', 'entrepreneurship', 'research'],
    strengths: ['Silicon Valley connections', 'Interdisciplinary approach', 'Beautiful campus', 'Strong athletics'],
    weaknesses: ['High cost of living', 'Competitive atmosphere', 'Weather concerns'],
    tuition: 56000,
    enrollment: 17000,
    researchIntensive: true
  },
  {
    id: "130794",
    name: 'Yale University',
    location: 'New Haven, CT',
    type: 'private',
    size: 'medium',
    selectivity: 'very selective',
    setting: 'urban',
    focus: ['liberal arts', 'humanities', 'research'],
    strengths: ['Strong humanities programs', 'Residential college system', 'Historic campus', 'Global reputation'],
    weaknesses: ['Urban safety concerns', 'Cold weather', 'Limited STEM focus'],
    tuition: 55000,
    enrollment: 12000,
    researchIntensive: true
  },
  {
    id: "186131",
    name: 'Princeton University',
    location: 'Princeton, NJ',
    type: 'private',
    size: 'medium',
    selectivity: 'very selective',
    setting: 'suburban',
    focus: ['liberal arts', 'research', 'undergraduate focus'],
    strengths: ['Undergraduate-focused', 'Beautiful campus', 'Strong financial aid', 'Intimate class sizes'],
    weaknesses: ['Limited graduate programs', 'Small town setting', 'High cost'],
    tuition: 54000,
    enrollment: 8000,
    researchIntensive: true
  },
  {
    id: "190150",
    name: 'Columbia University',
    location: 'New York, NY',
    type: 'private',
    size: 'large',
    selectivity: 'very selective',
    setting: 'urban',
    focus: ['liberal arts', 'journalism', 'international affairs'],
    strengths: ['NYC location', 'Strong journalism program', 'Global perspective', 'Cultural opportunities'],
    weaknesses: ['High cost of living', 'Urban noise', 'Large class sizes'],
    tuition: 62000,
    enrollment: 31000,
    researchIntensive: true
  },
  {
    id: "144050",
    name: 'University of Chicago',
    location: 'Chicago, IL',
    type: 'private',
    size: 'medium',
    selectivity: 'very selective',
    setting: 'urban',
    focus: ['economics', 'research', 'intellectual rigor'],
    strengths: ['Intellectual rigor', 'Strong economics program', 'Research opportunities', 'Urban setting'],
    weaknesses: ['Intense academic pressure', 'Cold weather', 'Urban safety concerns'],
    tuition: 60000,
    enrollment: 16000,
    researchIntensive: true
  },
  {
    id: "198419",
    name: 'Duke University',
    location: 'Durham, NC',
    type: 'private',
    size: 'large',
    selectivity: 'very selective',
    setting: 'suburban',
    focus: ['research', 'medicine', 'basketball'],
    strengths: ['Strong research programs', 'Beautiful campus', 'Basketball culture', 'Medical school'],
    weaknesses: ['High cost', 'Southern location', 'Large size'],
    tuition: 58000,
    enrollment: 16000,
    researchIntensive: true
  },
  {
    id: "215062",
    name: 'University of Pennsylvania',
    location: 'Philadelphia, PA',
    type: 'private',
    size: 'large',
    selectivity: 'very selective',
    setting: 'urban',
    focus: ['business', 'medicine', 'research'],
    strengths: ['Wharton business school', 'Strong pre-professional programs', 'Urban setting', 'Research opportunities'],
    weaknesses: ['High cost', 'Urban environment', 'Competitive atmosphere'],
    tuition: 61000,
    enrollment: 22000,
    researchIntensive: true
  },
  {
    id: "147767",
    name: 'Northwestern University',
    location: 'Evanston, IL',
    type: 'private',
    size: 'large',
    selectivity: 'very selective',
    setting: 'suburban',
    focus: ['journalism', 'performing arts', 'research'],
    strengths: ['Strong journalism program', 'Beautiful campus', 'Chicago proximity', 'Research opportunities'],
    weaknesses: ['Cold weather', 'High cost', 'Large size'],
    tuition: 58000,
    enrollment: 21000,
    researchIntensive: true
  },
  // For-Profit Institutions (Generally Bad Fits)
  {
    id: "484613",
    name: 'University of Phoenix',
    location: 'Phoenix, AZ',
    type: 'for-profit',
    size: 'large',
    selectivity: 'open admission',
    setting: 'urban',
    focus: ['online education', 'business', 'nursing'],
    strengths: ['Flexible scheduling', 'Online options', 'Career-focused programs'],
    weaknesses: ['For-profit model', 'Limited research opportunities', 'Poor reputation', 'High costs'],
    tuition: 45000,
    enrollment: 85000,
    researchIntensive: false,
    forProfit: true
  },
  {
    id: "145637",
    name: 'DeVry University',
    location: 'Downers Grove, IL',
    type: 'for-profit',
    size: 'large',
    selectivity: 'open admission',
    setting: 'suburban',
    focus: ['technology', 'business', 'healthcare'],
    strengths: ['Career-focused programs', 'Flexible scheduling', 'Industry connections'],
    weaknesses: ['For-profit model', 'Limited academic rigor', 'Poor reputation', 'High costs'],
    tuition: 42000,
    enrollment: 15000,
    researchIntensive: false,
    forProfit: true
  },
  {
    id: "151324",
    name: 'ITT Technical Institute',
    location: 'Carmel, IN',
    type: 'for-profit',
    size: 'medium',
    selectivity: 'open admission',
    setting: 'suburban',
    focus: ['technology', 'engineering technology'],
    strengths: ['Career-focused programs', 'Hands-on training'],
    weaknesses: ['For-profit model', 'Accreditation issues', 'Limited programs', 'Poor reputation'],
    tuition: 38000,
    enrollment: 8000,
    researchIntensive: false,
    forProfit: true
  },
  // Religious Institutions (May be Bad Fits for Some)
  {
    id: "232186",
    name: 'Liberty University',
    location: 'Lynchburg, VA',
    type: 'private',
    size: 'large',
    selectivity: 'less selective',
    setting: 'suburban',
    focus: ['religious studies', 'online education', 'conservative values'],
    strengths: ['Large online program', 'Conservative environment', 'Religious community'],
    weaknesses: ['Mandatory religious requirements', 'Limited academic freedom', 'Conservative policies'],
    tuition: 22000,
    enrollment: 150000,
    researchIntensive: false,
    religiousAffiliation: 'Christian'
  },
  {
    id: "230038",
    name: 'Brigham Young University',
    location: 'Provo, UT',
    type: 'private',
    size: 'large',
    selectivity: 'selective',
    setting: 'suburban',
    focus: ['religious studies', 'business', 'education'],
    strengths: ['Low tuition for members', 'Strong community', 'Beautiful campus'],
    weaknesses: ['Religious requirements', 'Limited academic freedom', 'Conservative environment'],
    tuition: 12000,
    enrollment: 33000,
    researchIntensive: false,
    religiousAffiliation: 'Mormon'
  },
  // Public Universities (Good Fits for Many)
  {
    id: "110635",
    name: 'University of California, Berkeley',
    location: 'Berkeley, CA',
    type: 'public',
    size: 'large',
    selectivity: 'highly selective',
    setting: 'urban',
    focus: ['research', 'liberal arts', 'STEM'],
    strengths: ['World-class research', 'Diverse student body', 'Beautiful campus', 'Strong academics'],
    weaknesses: ['Large class sizes', 'High cost for out-of-state', 'Urban environment'],
    tuition: 44000,
    enrollment: 42000,
    researchIntensive: true
  },
  {
    id: "170976",
    name: 'University of Michigan',
    location: 'Ann Arbor, MI',
    type: 'public',
    size: 'large',
    selectivity: 'highly selective',
    setting: 'suburban',
    focus: ['research', 'engineering', 'business'],
    strengths: ['Strong research programs', 'Beautiful campus', 'Strong athletics', 'Comprehensive programs'],
    weaknesses: ['Large class sizes', 'Cold weather', 'High cost for out-of-state'],
    tuition: 52000,
    enrollment: 45000,
    researchIntensive: true
  },
  {
    id: "234076",
    name: 'University of Virginia',
    location: 'Charlottesville, VA',
    type: 'public',
    size: 'large',
    selectivity: 'highly selective',
    setting: 'suburban',
    focus: ['liberal arts', 'business', 'law'],
    strengths: ['Beautiful historic campus', 'Strong academics', 'Good value for in-state', 'Strong community'],
    weaknesses: ['Large class sizes', 'Limited diversity', 'High cost for out-of-state'],
    tuition: 54000,
    enrollment: 25000,
    researchIntensive: true
  },
  {
    id: "199120",
    name: 'University of North Carolina at Chapel Hill',
    location: 'Chapel Hill, NC',
    type: 'public',
    size: 'large',
    selectivity: 'highly selective',
    setting: 'suburban',
    focus: ['research', 'medicine', 'journalism'],
    strengths: ['Strong research programs', 'Beautiful campus', 'Good value', 'Strong athletics'],
    weaknesses: ['Large class sizes', 'High cost for out-of-state', 'Limited parking'],
    tuition: 36000,
    enrollment: 30000,
    researchIntensive: true
  },
  {
    id: "110662",
    name: 'University of California, Los Angeles',
    location: 'Los Angeles, CA',
    type: 'public',
    size: 'large',
    selectivity: 'highly selective',
    setting: 'urban',
    focus: ['research', 'arts', 'medicine'],
    strengths: ['Strong research programs', 'Diverse student body', 'LA location', 'Strong athletics'],
    weaknesses: ['Large class sizes', 'High cost for out-of-state', 'Urban environment'],
    tuition: 44000,
    enrollment: 45000,
    researchIntensive: true
  }
];

// Add more universities to reach 300...
// This is a sample - you would continue with more universities following the same pattern

export const getRecommendations = (answers: Record<number, string>) => {
  const goodFits: UniversityRecommendation[] = [];
  const badFits: UniversityRecommendation[] = [];

  // Analyze answers and match to universities
  universityDatabase.forEach(university => {
    let score = 0;
    
    // Academic interest matching
    if (answers[0] === "STEM (Science, Technology, Engineering, Math)" && 
        university.focus.some(f => ['STEM', 'engineering', 'technology'].includes(f))) {
      score += 3;
    }
    
    if (answers[0] === "Humanities & Arts" && 
        university.focus.some(f => ['liberal arts', 'humanities', 'arts'].includes(f))) {
      score += 3;
    }
    
    // Learning style matching
    if (answers[1] === "Hands-on projects and labs" && university.researchIntensive) {
      score += 2;
    }
    
    if (answers[1] === "Classroom discussions and debates" && university.size === 'small') {
      score += 2;
    }
    
    // Campus environment matching
    if (answers[2] === "Urban city with lots of opportunities" && university.setting === 'urban') {
      score += 2;
    }
    
    if (answers[2] === "Quiet suburban setting" && university.setting === 'suburban') {
      score += 2;
    }
    
    // Research importance
    if (answers[3] === "Very important - I want to be involved" && university.researchIntensive) {
      score += 3;
    }
    
    // Class size preference
    if (answers[4] === "Small classes (under 20 students)" && university.size === 'small') {
      score += 2;
    }
    
    // Penalize for-profit institutions
    if (university.forProfit) {
      score -= 5;
    }
    
    // Penalize religious institutions if not religious
    if (university.religiousAffiliation && answers[0] !== "Religious Studies") {
      score -= 3;
    }
    
    // Categorize based on score
    if (score >= 5) {
      goodFits.push(university);
    } else if (score <= -2) {
      badFits.push(university);
    }
  });
  
  return { goodFits, badFits };
}; 