import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Plus, X, GraduationCap, BookOpen, Award, FileText, Send, Eye, User, TrendingDown, TrendingUp, Star, Trophy, Target, Zap, AlertTriangle, CheckCircle, Save, Copy, BarChart3 } from 'lucide-react';
import { universities } from '../data/universities';
import { evaluateApplication } from '@/services/aiCollegeService';

interface Extracurricular {
  id: string;
  name: string;
  description: string;
  hours: string;
  role: string;
}

interface Essay {
  id: string;
  prompt: string;
  response: string;
}

interface Grade {
  id: string;
  subject: string;
  grade: string;
  level: string;
}

interface Honor {
  id: string;
  name: string;
  description: string;
  year: string;
  level: string;
}

interface ApplicationScore {
  overall: number;
  academics: number;
  extracurriculars: number;
  essays: number;
  honors: number;
  testScores: number;
}

interface GapAnalysis {
  section: string;
  current: string;
  recommended: string;
  priority: 'high' | 'medium' | 'low';
}

interface ApplicationForm {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    dateOfBirth: string;
    highSchool: string;
    gpa: string;
    satScore: string;
    actScore: string;
  };
  extracurriculars: Extracurricular[];
  grades: Grade[];
  honors: Honor[];
  essays: Essay[];
  targetUniversity: string;
}

interface SavedApplication {
  id: string;
  name: string;
  formData: ApplicationForm;
  score: ApplicationScore;
  createdAt: Date;
  targetUniversity: string;
}

const MockApplication: React.FC = () => {
  const [activeTab, setActiveTab] = useState('form');
  const [formData, setFormData] = useState<ApplicationForm>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      dateOfBirth: '',
      highSchool: '',
      gpa: '',
      satScore: '',
      actScore: '',
    },
    extracurriculars: [],
    grades: [],
    honors: [],
    essays: [],
    targetUniversity: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<string>('');
  const [showEvaluation, setShowEvaluation] = useState(false);
  
  // Enhanced features state
  const [applicationScore, setApplicationScore] = useState<ApplicationScore>({
    overall: 0,
    academics: 0,
    extracurriculars: 0,
    essays: 0,
    honors: 0,
    testScores: 0,
  });
  
  const [gapAnalysis, setGapAnalysis] = useState<GapAnalysis[]>([]);
  const [savedApplications, setSavedApplications] = useState<SavedApplication[]>([]);
  const [showGapAnalysis, setShowGapAnalysis] = useState(false);
  const [showSavedApplications, setShowSavedApplications] = useState(false);

  // Sub-Tier example application (weak)
  const subTierApplication: ApplicationForm = {
    personalInfo: {
      firstName: 'Alex',
      lastName: 'Johnson',
      email: 'alex.johnson@email.com',
      phone: '(555) 987-6543',
      address: '456 Main Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      dateOfBirth: '2006-07-22',
      highSchool: 'Springfield High School',
      gpa: '3.02',
      satScore: '1120',
      actScore: '22',
    },
    extracurriculars: [
      {
        id: '1',
        name: 'Video Game Club',
        description: 'Member of school video game club. Play games with friends after school.',
        hours: '2 hours/week',
        role: 'Member',
      },
      {
        id: '2',
        name: 'Part-time Job at McDonald\'s',
        description: 'Work as cashier at local McDonald\'s to earn money for college.',
        hours: '15 hours/week',
        role: 'Cashier',
      },
      {
        id: '3',
        name: 'School Band',
        description: 'Play trumpet in school band. Practice during class time.',
        hours: '3 hours/week',
        role: 'Member',
      },
    ],
    grades: [
      { id: '1', subject: 'Algebra II', grade: 'C+', level: 'Regular' },
      { id: '2', subject: 'Biology', grade: 'B-', level: 'Regular' },
      { id: '3', subject: 'English 11', grade: 'B', level: 'Regular' },
      { id: '4', subject: 'US History', grade: 'C+', level: 'Regular' },
      { id: '5', subject: 'Spanish II', grade: 'B-', level: 'Regular' },
      { id: '6', subject: 'Physical Education', grade: 'A-', level: 'Regular' },
    ],
    honors: [
      {
        id: '1',
        name: 'Perfect Attendance Award',
        description: 'Received perfect attendance certificate for sophomore year.',
        year: '2023',
        level: 'Local',
      },
    ],
    essays: [
      {
        id: '1',
        prompt: 'Briefly describe an intellectual experience that was important to you.',
        response: `I think learning about history in school was pretty interesting. I liked learning about World War II because there were a lot of battles and stuff. My teacher showed us some videos and it was cool to see the old footage. I also liked learning about the different countries that were involved. It made me realize that history is important to understand what happened in the past.`,
      },
      {
        id: '2',
        prompt: 'Briefly describe an extracurricular activity or work experience.',
        response: `I work at McDonald's as a cashier. It's my first job and I've been working there for about 6 months. I take orders from customers and give them their food. Sometimes it gets busy and stressful but I'm learning how to handle it. My manager says I'm doing a good job. I'm saving money for college which is important to me.`,
      },
    ],
    targetUniversity: 'Harvard University',
  };

  // Mid-Tier example application (current example)
  const midTierApplication: ApplicationForm = {
    personalInfo: {
      firstName: 'Sarah',
      lastName: 'Chen',
      email: 'sarah.chen@email.com',
      phone: '(555) 123-4567',
      address: '123 Academic Drive',
      city: 'Cambridge',
      state: 'MA',
      zipCode: '02138',
      dateOfBirth: '2006-03-15',
      highSchool: 'Cambridge Rindge and Latin School',
      gpa: '3.98',
      satScore: '1560',
      actScore: '35',
    },
    extracurriculars: [
      {
        id: '1',
        name: 'Science Olympiad Team Captain',
        description: 'Led school team to 3rd place at state championships. Organized weekly study sessions, mentored younger students, and developed innovative study materials used by 50+ team members.',
        hours: '8 hours/week',
        role: 'Team Captain',
      },
      {
        id: '2',
        name: 'Math Club President',
        description: 'Founded and led school math club with 45 members. Organized monthly competitions, invited guest speakers from Harvard and MIT, and established tutoring program for underclassmen.',
        hours: '6 hours/week',
        role: 'President',
      },
      {
        id: '3',
        name: 'Volunteer at Cambridge Science Center',
        description: 'Led interactive science demonstrations for elementary school students. Developed curriculum for 10+ workshops reaching 200+ children annually.',
        hours: '4 hours/week',
        role: 'Science Educator',
      },
      {
        id: '4',
        name: 'Varsity Tennis Team',
        description: 'Starting singles player for 3 years. Team captain senior year. Led team to regional semifinals and maintained 3.8 GPA while balancing athletics and academics.',
        hours: '12 hours/week',
        role: 'Team Captain',
      },
      {
        id: '5',
        name: 'School Newspaper Editor-in-Chief',
        description: 'Managed team of 15 student journalists. Increased readership by 40% through digital initiatives. Won state journalism award for investigative reporting on school policies.',
        hours: '5 hours/week',
        role: 'Editor-in-Chief',
      },
      {
        id: '6',
        name: 'National Honor Society',
        description: 'Member of NHS, maintaining 3.98 GPA while participating in community service projects and academic tutoring.',
        hours: '3 hours/week',
        role: 'Member',
      },
    ],
    grades: [
      { id: '1', subject: 'AP Calculus BC', grade: 'A+', level: 'AP' },
      { id: '2', subject: 'AP Physics C: Mechanics', grade: 'A+', level: 'AP' },
      { id: '3', subject: 'AP Physics C: Electricity & Magnetism', grade: 'A+', level: 'AP' },
      { id: '4', subject: 'AP Chemistry', grade: 'A', level: 'AP' },
      { id: '5', subject: 'AP Biology', grade: 'A', level: 'AP' },
      { id: '6', subject: 'AP English Literature', grade: 'A', level: 'AP' },
      { id: '7', subject: 'AP US History', grade: 'A', level: 'AP' },
      { id: '8', subject: 'AP Computer Science A', grade: 'A+', level: 'AP' },
      { id: '9', subject: 'Multivariable Calculus', grade: 'A+', level: 'Dual Enrollment' },
      { id: '10', subject: 'Linear Algebra', grade: 'A', level: 'Dual Enrollment' },
    ],
    honors: [
      {
        id: '1',
        name: 'National Merit Semifinalist',
        description: 'Achieved semifinalist status in the National Merit Scholarship Program based on PSAT scores.',
        year: '2024',
        level: 'National',
      },
      {
        id: '2',
        name: 'AP Scholar with Distinction',
        description: 'Earned AP Scholar with Distinction for scoring 3+ on 5+ AP exams with average score of 3.5+.',
        year: '2024',
        level: 'National',
      },
      {
        id: '3',
        name: 'State Science Olympiad Medalist',
        description: 'Won 3rd place in Chemistry Lab event at Massachusetts State Science Olympiad.',
        year: '2024',
        level: 'State',
      },
    ],
    essays: [
      {
        id: '1',
        prompt: 'Briefly describe an intellectual experience that was important to you.',
        response: `My research at MIT fundamentally changed how I view the intersection of theoretical physics and computer science. When I first approached Dr. Kim about quantum error correction, I was fascinated by the mathematical elegance but overwhelmed by the complexity. Over months of late nights debugging quantum circuits and countless failed experiments, I learned that breakthrough discoveries often emerge from persistent iteration rather than sudden epiphanies.

The moment our algorithm finally achieved 23% better efficiency wasn't dramatic—it was the culmination of hundreds of small optimizations, each building on previous failures. This experience taught me that true innovation requires both intellectual rigor and the patience to pursue incremental improvements. At Harvard, I hope to continue exploring these boundaries between disciplines while developing the resilience necessary for meaningful scientific contribution.`,
      },
      {
        id: '2',
        prompt: 'Briefly describe an extracurricular activity or work experience.',
        response: `As Science Olympiad team captain, I transformed our approach from individual competition to collaborative learning. When I took over, our team was struggling with inconsistent performance and low morale. I implemented a mentorship system where seniors coached underclassmen, created comprehensive study guides, and organized weekly practice sessions.

The results were immediate: our team improved from 8th to 3rd place at states, and more importantly, we built a sustainable culture of mutual support. Watching younger students develop confidence and skills reminded me that leadership isn't about individual achievement—it's about creating systems that enable others to succeed. This experience shaped my understanding of how to build effective teams and inspired my interest in educational innovation.`,
      },
    ],
    targetUniversity: 'Harvard University',
  };

  // High-Tier example application (exceptional)
  const highTierApplication: ApplicationForm = {
    personalInfo: {
      firstName: 'Priya',
      lastName: 'Patel',
      email: 'priya.patel@email.com',
      phone: '(555) 456-7890',
      address: '789 Innovation Way',
      city: 'Palo Alto',
      state: 'CA',
      zipCode: '94301',
      dateOfBirth: '2006-01-10',
      highSchool: 'Palo Alto High School',
      gpa: '4.0',
      satScore: '1530',
      actScore: '35',
    },
    extracurriculars: [
      {
        id: '1',
        name: 'MIT Research Assistant',
        description: 'Conducted groundbreaking research on quantum computing algorithms under Dr. Robert Kim at MIT CSAIL. Developed novel approaches to quantum error correction that improved efficiency by 23%. Co-authored 2 papers published on arXiv with over 150 citations. Led team of 3 undergraduate researchers.',
        hours: '20 hours/week',
        role: 'Lead Research Assistant',
      },
      {
        id: '2',
        name: 'Founder - Research Software Company',
        description: 'Founded "QuantumFlow", a research software company developing tools for quantum computing researchers. Single-person startup with beta version in development. Hired and managed 10 high school interns to help with development and testing. Collaborating with Stanford and Berkeley researchers on pilot program.',
        hours: '15 hours/week',
        role: 'Founder & CEO',
      },
      {
        id: '3',
        name: 'CEO - Education Nonprofit',
        description: 'CEO of "CodeForAll", a nonprofit serving 2,000+ underprivileged students with coding education. Led fundraising efforts raising $500K annually. Oversaw program expansion to 15 cities nationwide. Manage team of 25 staff members.',
        hours: '20 hours/week',
        role: 'CEO',
      },
      {
        id: '4',
        name: 'Research Project with University Collaborators',
        description: 'Led collaborative research project with Stanford, MIT, and UC Berkeley on sustainable energy solutions. Project received $250K in funding and attracted 30,000+ visitors to online platform. Results presented at International Energy Conference.',
        hours: '12 hours/week',
        role: 'Project Lead',
      },
      {
        id: '5',
        name: 'Debate Team Captain & Founder',
        description: 'Founded school debate club for the first time in 8 years. Led team to district championships and successfully petitioned district to add middle school debate class - first time ever done in district history. Mentored 15+ younger debaters and organized monthly tournaments.',
        hours: '10 hours/week',
        role: 'Founder & Captain',
      },
      {
        id: '6',
        name: 'Science Olympiad Team Captain',
        description: 'Led school Science Olympiad team to 1st place at state championships and 3rd place at nationals. Organized weekly study sessions, mentored 30+ younger students, and developed comprehensive study materials. Team won 8 medals at nationals.',
        hours: '10 hours/week',
        role: 'Team Captain',
      },
    ],
    grades: [
      { id: '1', subject: 'AP Calculus BC', grade: 'A+', level: 'AP' },
      { id: '2', subject: 'AP Physics C: Mechanics', grade: 'A+', level: 'AP' },
      { id: '3', subject: 'AP Physics C: Electricity & Magnetism', grade: 'A+', level: 'AP' },
      { id: '4', subject: 'AP Chemistry', grade: 'A+', level: 'AP' },
      { id: '5', subject: 'AP Biology', grade: 'A+', level: 'AP' },
      { id: '6', subject: 'AP English Literature', grade: 'A+', level: 'AP' },
      { id: '7', subject: 'AP US History', grade: 'A+', level: 'AP' },
      { id: '8', subject: 'AP Computer Science A', grade: 'A+', level: 'AP' },
      { id: '9', subject: 'Multivariable Calculus', grade: 'A+', level: 'Dual Enrollment' },
      { id: '10', subject: 'Linear Algebra', grade: 'A+', level: 'Dual Enrollment' },
      { id: '11', subject: 'Differential Equations', grade: 'A+', level: 'Dual Enrollment' },
      { id: '12', subject: 'Quantum Mechanics', grade: 'A+', level: 'Dual Enrollment' },
    ],
    honors: [
      {
        id: '1',
        name: 'Regeneron Science Talent Search Finalist',
        description: 'One of 40 national finalists in the most prestigious high school science competition. Presented quantum computing research to Nobel laureates and leading scientists.',
        year: '2024',
        level: 'National',
      },
      {
        id: '2',
        name: 'Intel ISEF Grand Award Winner',
        description: 'Won 1st place in Physics and Astronomy category at Intel International Science and Engineering Fair. Project on quantum error correction algorithms.',
        year: '2024',
        level: 'International',
      },
      {
        id: '3',
        name: 'National Merit Finalist',
        description: 'Achieved finalist status in National Merit Scholarship Program. One of 15,000 students nationwide selected from 1.5 million applicants.',
        year: '2024',
        level: 'National',
      },
      {
        id: '4',
        name: 'AP Scholar with Distinction',
        description: 'Earned AP Scholar with Distinction for scoring 5 on 8 AP exams with perfect scores on 6 exams.',
        year: '2024',
        level: 'National',
      },
      {
        id: '5',
        name: 'Presidential Scholar Candidate',
        description: 'Nominated as candidate for U.S. Presidential Scholars Program, recognizing exceptional academic achievement and leadership.',
        year: '2024',
        level: 'National',
      },
    ],
    essays: [
      {
        id: '1',
        prompt: 'Briefly describe an intellectual experience that was important to you.',
        response: `My journey into quantum computing began with a simple question: what if we could solve problems that classical computers never could? At MIT, I discovered that the answer lay not in incremental improvements, but in fundamentally reimagining computational paradigms.

Working with Dr. Kim, I developed algorithms that achieved 23% better efficiency in quantum error correction—a breakthrough that could accelerate quantum computing by years. But the real revelation came when I realized that the same principles could revolutionize research software. I founded QuantumFlow, applying quantum-inspired algorithms to create tools that help researchers worldwide.

This intersection of theoretical physics and practical software development taught me that the most profound innovations emerge when we bridge seemingly disparate fields. At Harvard, I want to explore how quantum computing can transform not just computation, but entire research methodologies and scientific discovery.`,
      },
      {
        id: '2',
        prompt: 'Briefly describe an extracurricular activity or work experience.',
        response: `As CEO of CodeForAll, I've learned that true leadership isn't about individual achievement—it's about creating systems that enable others to succeed. When I took over, the nonprofit was serving 200 students in 3 cities. Today, we reach 2,000+ students across 15 cities, with $500K in annual funding.

The transformation required more than just scaling; it demanded reimagining how we deliver education. I led the development of a hybrid learning platform that combines in-person mentorship with AI-powered personalized learning. The results were immediate: 85% of our students now complete advanced coding courses, and 60% secure tech internships or jobs.

This experience taught me that the most impactful innovations aren't always the most technically complex—they're the ones that solve real human problems at scale. Whether it's quantum computing research or educational technology, I've learned that success comes from asking not just "can we do this?" but "should we do this, and for whom?"`,
      },
    ],
    targetUniversity: 'Harvard University',
  };

  const [activeExampleTab, setActiveExampleTab] = useState('sub');

  const addExtracurricular = () => {
    const newExtracurricular: Extracurricular = {
      id: Date.now().toString(),
      name: '',
      description: '',
      hours: '',
      role: '',
    };
    setFormData(prev => ({
      ...prev,
      extracurriculars: [...prev.extracurriculars, newExtracurricular],
    }));
  };

  const removeExtracurricular = (id: string) => {
    setFormData(prev => ({
      ...prev,
      extracurriculars: prev.extracurriculars.filter(ec => ec.id !== id),
    }));
  };

  const updateExtracurricular = (id: string, field: keyof Extracurricular, value: string) => {
    setFormData(prev => ({
      ...prev,
      extracurriculars: prev.extracurriculars.map(ec =>
        ec.id === id ? { ...ec, [field]: value } : ec
      ),
    }));
  };

  const addGrade = () => {
    const newGrade: Grade = {
      id: Date.now().toString(),
      subject: '',
      grade: '',
      level: 'Regular',
    };
    setFormData(prev => ({
      ...prev,
      grades: [...prev.grades, newGrade],
    }));
  };

  const removeGrade = (id: string) => {
    setFormData(prev => ({
      ...prev,
      grades: prev.grades.filter(grade => grade.id !== id),
    }));
  };

  const updateGrade = (id: string, field: keyof Grade, value: string) => {
    setFormData(prev => ({
      ...prev,
      grades: prev.grades.map(grade =>
        grade.id === id ? { ...grade, [field]: value } : grade
      ),
    }));
  };

  const addEssay = () => {
    const newEssay: Essay = {
      id: Date.now().toString(),
      prompt: '',
      response: '',
    };
    setFormData(prev => ({
      ...prev,
      essays: [...prev.essays, newEssay],
    }));
  };

  const removeEssay = (id: string) => {
    setFormData(prev => ({
      ...prev,
      essays: prev.essays.filter(essay => essay.id !== id),
    }));
  };

  const updateEssay = (id: string, field: keyof Essay, value: string) => {
    setFormData(prev => ({
      ...prev,
      essays: prev.essays.map(essay =>
        essay.id === id ? { ...essay, [field]: value } : essay
      ),
    }));
  };

  const addHonor = () => {
    const newHonor: Honor = {
      id: Date.now().toString(),
      name: '',
      description: '',
      year: '',
      level: 'Local',
    };
    setFormData(prev => ({
      ...prev,
      honors: [...prev.honors, newHonor],
    }));
  };

  const removeHonor = (id: string) => {
    setFormData(prev => ({
      ...prev,
      honors: prev.honors.filter(honor => honor.id !== id),
    }));
  };

  const updateHonor = (id: string, field: keyof Honor, value: string) => {
    setFormData(prev => ({
      ...prev,
      honors: prev.honors.map(honor =>
        honor.id === id ? { ...honor, [field]: value } : honor
      ),
    }));
  };

  // Enhanced scoring and analysis functions
  const calculateApplicationScore = (data: ApplicationForm): ApplicationScore => {
    let academics = 0;
    let extracurriculars = 0;
    let essays = 0;
    let honors = 0;
    let testScores = 0;

    // Academics scoring (GPA and course rigor)
    const gpa = parseFloat(data.personalInfo.gpa) || 0;
    if (gpa >= 3.9) academics += 25;
    else if (gpa >= 3.7) academics += 20;
    else if (gpa >= 3.5) academics += 15;
    else if (gpa >= 3.0) academics += 10;
    else academics += 5;

    // Course rigor bonus
    const apCount = data.grades.filter(g => g.level === 'AP').length;
    const honorsCount = data.grades.filter(g => g.level === 'Honors').length;
    const dualEnrollmentCount = data.grades.filter(g => g.level === 'Dual Enrollment').length;
    academics += Math.min(15, apCount * 2 + honorsCount + dualEnrollmentCount * 1.5);

    // Test scores
    const sat = parseInt(data.personalInfo.satScore) || 0;
    const act = parseInt(data.personalInfo.actScore) || 0;
    if (sat >= 1500 || act >= 34) testScores = 25;
    else if (sat >= 1400 || act >= 31) testScores = 20;
    else if (sat >= 1300 || act >= 28) testScores = 15;
    else if (sat >= 1200 || act >= 25) testScores = 10;
    else testScores = 5;

    // Extracurriculars
    const leadershipRoles = data.extracurriculars.filter(ec => 
      ec.role.toLowerCase().includes('president') || 
      ec.role.toLowerCase().includes('captain') || 
      ec.role.toLowerCase().includes('founder') ||
      ec.role.toLowerCase().includes('ceo')
    ).length;
    
    extracurriculars += Math.min(25, data.extracurriculars.length * 3 + leadershipRoles * 2);
    
    // Hours per week bonus
    const totalHours = data.extracurriculars.reduce((sum, ec) => {
      const hours = parseInt(ec.hours) || 0;
      return sum + hours;
    }, 0);
    extracurriculars += Math.min(10, totalHours / 10);

    // Essays
    essays += Math.min(20, data.essays.length * 5);
    data.essays.forEach(essay => {
      if (essay.response.length > 500) essays += 2;
      if (essay.response.length > 1000) essays += 3;
    });

    // Honors
    const nationalHonors = data.honors.filter(h => h.level === 'National' || h.level === 'International').length;
    const stateHonors = data.honors.filter(h => h.level === 'State').length;
    honors += Math.min(20, data.honors.length * 3 + nationalHonors * 5 + stateHonors * 2);

    const overall = Math.round((academics + extracurriculars + essays + honors + testScores) / 5);
    
    return {
      overall: Math.min(100, overall),
      academics: Math.min(100, Math.round(academics)),
      extracurriculars: Math.min(100, Math.round(extracurriculars)),
      essays: Math.min(100, Math.round(essays)),
      honors: Math.min(100, Math.round(honors)),
      testScores: Math.min(100, Math.round(testScores)),
    };
  };

  const generateGapAnalysis = (data: ApplicationForm, targetUniversity: string): GapAnalysis[] => {
    const gaps: GapAnalysis[] = [];
    const university = universities.find(u => u.name === targetUniversity);
    
    if (!university) return gaps;

    // GPA analysis
    const gpa = parseFloat(data.personalInfo.gpa) || 0;
    const avgGpa = 3.8; // Example average for top universities
    if (gpa < avgGpa - 0.3) {
      gaps.push({
        section: 'GPA',
        current: `${gpa.toFixed(2)}`,
        recommended: `${(avgGpa - 0.1).toFixed(2)}+`,
        priority: 'high'
      });
    }

    // Test scores analysis
    const sat = parseInt(data.personalInfo.satScore) || 0;
    const act = parseInt(data.personalInfo.actScore) || 0;
    if (sat < 1400 && act < 31) {
      gaps.push({
        section: 'Test Scores',
        current: sat > 0 ? `SAT: ${sat}` : act > 0 ? `ACT: ${act}` : 'Not provided',
        recommended: 'SAT 1400+ or ACT 31+',
        priority: 'high'
      });
    }

    // Extracurriculars analysis
    if (data.extracurriculars.length < 3) {
      gaps.push({
        section: 'Extracurriculars',
        current: `${data.extracurriculars.length} activities`,
        recommended: '3-6 meaningful activities',
        priority: 'medium'
      });
    }

    // Leadership analysis
    const leadershipRoles = data.extracurriculars.filter(ec => 
      ec.role.toLowerCase().includes('president') || 
      ec.role.toLowerCase().includes('captain') || 
      ec.role.toLowerCase().includes('founder')
    ).length;
    
    if (leadershipRoles === 0) {
      gaps.push({
        section: 'Leadership',
        current: 'No leadership roles',
        recommended: '1-2 leadership positions',
        priority: 'medium'
      });
    }

    // Honors analysis
    const nationalHonors = data.honors.filter(h => h.level === 'National' || h.level === 'International').length;
    if (nationalHonors === 0) {
      gaps.push({
        section: 'Honors',
        current: `${data.honors.length} honors (${nationalHonors} national)`,
        recommended: '1+ national/international honors',
        priority: 'medium'
      });
    }

    // Essays analysis
    if (data.essays.length < 2) {
      gaps.push({
        section: 'Essays',
        current: `${data.essays.length} essays`,
        recommended: '2-3 well-developed essays',
        priority: 'low'
      });
    }

    return gaps;
  };

  // Update score whenever form data changes
  useEffect(() => {
    const score = calculateApplicationScore(formData);
    setApplicationScore(score);
    
    if (formData.targetUniversity) {
      const gaps = generateGapAnalysis(formData, formData.targetUniversity);
      setGapAnalysis(gaps);
    }
  }, [formData]);

  const saveApplication = () => {
    const newSavedApp: SavedApplication = {
      id: Date.now().toString(),
      name: `${formData.personalInfo.firstName} ${formData.personalInfo.lastName} - ${formData.targetUniversity || 'Untitled'}`,
      formData: { ...formData },
      score: { ...applicationScore },
      createdAt: new Date(),
      targetUniversity: formData.targetUniversity,
    };
    
    setSavedApplications(prev => [newSavedApp, ...prev]);
  };

  const loadSavedApplication = (savedApp: SavedApplication) => {
    setFormData(savedApp.formData);
    setApplicationScore(savedApp.score);
    setActiveTab('form');
  };

  const deleteSavedApplication = (id: string) => {
    setSavedApplications(prev => prev.filter(app => app.id !== id));
  };

  const loadExampleApplication = (tier: 'sub' | 'mid' | 'high') => {
    switch (tier) {
      case 'sub':
        setFormData(subTierApplication);
        break;
      case 'mid':
        setFormData(midTierApplication);
        break;
      case 'high':
        setFormData(highTierApplication);
        break;
    }
    setActiveTab('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowEvaluation(false);

    try {
      const university = universities.find(u => u.name === formData.targetUniversity);
      const result = await evaluateApplication(formData, university);
      setEvaluation(result);
      setShowEvaluation(true);
    } catch (error) {
      console.error('Error evaluating application:', error);
      setEvaluation('Sorry, there was an error evaluating your application. Please try again.');
      setShowEvaluation(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mock College Application
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete this comprehensive application form to receive AI-powered feedback 
            from a simulated admissions officer at your target university.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="form" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Your Application
            </TabsTrigger>
            <TabsTrigger value="example" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Example Applications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.personalInfo.firstName}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                      }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.personalInfo.lastName}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                      }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.personalInfo.email}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, email: e.target.value }
                      }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.personalInfo.phone}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phone: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.personalInfo.address}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, address: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.personalInfo.city}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, city: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.personalInfo.state}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, state: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.personalInfo.zipCode}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, zipCode: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.personalInfo.dateOfBirth}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="highSchool">High School *</Label>
                    <Input
                      id="highSchool"
                      value={formData.personalInfo.highSchool}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, highSchool: e.target.value }
                      }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="gpa">GPA *</Label>
                    <Input
                      id="gpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4.0"
                      value={formData.personalInfo.gpa}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, gpa: e.target.value }
                      }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="satScore">SAT Score</Label>
                    <Input
                      id="satScore"
                      type="number"
                      min="400"
                      max="1600"
                      value={formData.personalInfo.satScore}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, satScore: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="actScore">ACT Score</Label>
                    <Input
                      id="actScore"
                      type="number"
                      min="1"
                      max="36"
                      value={formData.personalInfo.actScore}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, actScore: e.target.value }
                      }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Target University */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Target University
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="university">University You're Applying To *</Label>
                    <Select
                      value={formData.targetUniversity}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, targetUniversity: value }))}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a university" />
                      </SelectTrigger>
                      <SelectContent>
                        {universities.map((university) => (
                          <SelectItem key={university.name} value={university.name}>
                            {university.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Application Strength Meter & Real-time Scoring */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Application Strength Meter
                    <Badge variant={applicationScore.overall >= 80 ? "default" : applicationScore.overall >= 60 ? "secondary" : "destructive"}>
                      {applicationScore.overall}/100
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Overall Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-sm font-medium">Overall Strength</Label>
                      <span className="text-sm text-gray-600">{applicationScore.overall}/100</span>
                    </div>
                    <Progress value={applicationScore.overall} className="h-3" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Weak</span>
                      <span>Average</span>
                      <span>Strong</span>
                      <span>Exceptional</span>
                    </div>
                  </div>

                  {/* Detailed Scores */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label className="text-sm font-medium">Academics</Label>
                        <span className="text-sm text-gray-600">{applicationScore.academics}/100</span>
                      </div>
                      <Progress value={applicationScore.academics} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label className="text-sm font-medium">Test Scores</Label>
                        <span className="text-sm text-gray-600">{applicationScore.testScores}/100</span>
                      </div>
                      <Progress value={applicationScore.testScores} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label className="text-sm font-medium">Extracurriculars</Label>
                        <span className="text-sm text-gray-600">{applicationScore.extracurriculars}/100</span>
                      </div>
                      <Progress value={applicationScore.extracurriculars} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label className="text-sm font-medium">Honors</Label>
                        <span className="text-sm text-gray-600">{applicationScore.honors}/100</span>
                      </div>
                      <Progress value={applicationScore.honors} className="h-2" />
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex justify-between items-center mb-2">
                        <Label className="text-sm font-medium">Essays</Label>
                        <span className="text-sm text-gray-600">{applicationScore.essays}/100</span>
                      </div>
                      <Progress value={applicationScore.essays} className="h-2" />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowGapAnalysis(!showGapAnalysis)}
                      className="flex items-center gap-2"
                    >
                      <Target className="h-4 w-4" />
                      {showGapAnalysis ? 'Hide' : 'Show'} Gap Analysis
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSavedApplications(!showSavedApplications)}
                      className="flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Saved Versions ({savedApplications.length})
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={saveApplication}
                      className="flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Save Current Version
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Gap Analysis */}
              {showGapAnalysis && gapAnalysis.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Gap Analysis
                      <Badge variant="outline">{gapAnalysis.length} areas to improve</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {gapAnalysis.map((gap, index) => (
                        <Alert key={index} className={`border-l-4 ${
                          gap.priority === 'high' ? 'border-red-500 bg-red-50' :
                          gap.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                          'border-blue-500 bg-blue-50'
                        }`}>
                          <AlertTriangle className={`h-4 w-4 ${
                            gap.priority === 'high' ? 'text-red-500' :
                            gap.priority === 'medium' ? 'text-yellow-500' :
                            'text-blue-500'
                          }`} />
                          <AlertDescription>
                            <div className="flex justify-between items-start">
                              <div>
                                <strong className="capitalize">{gap.section}:</strong>
                                <span className="text-gray-600 ml-2">Current: {gap.current}</span>
                              </div>
                              <Badge variant={
                                gap.priority === 'high' ? 'destructive' :
                                gap.priority === 'medium' ? 'secondary' :
                                'outline'
                              } className="ml-2">
                                {gap.priority} priority
                              </Badge>
                            </div>
                            <div className="mt-1 text-sm text-gray-600">
                              <strong>Recommended:</strong> {gap.recommended}
                            </div>
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Saved Applications */}
              {showSavedApplications && savedApplications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Save className="h-5 w-5" />
                      Saved Application Versions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {savedApplications.map((savedApp) => (
                        <div key={savedApp.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium">{savedApp.name}</div>
                            <div className="text-sm text-gray-600">
                              Score: {savedApp.score.overall}/100 • 
                              Saved: {savedApp.createdAt.toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => loadSavedApplication(savedApp)}
                            >
                              Load
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => deleteSavedApplication(savedApp.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Comparative Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Comparative Analysis
                    <Badge variant="outline">vs. Example Applications</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Sub-Tier Comparison */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-sm">Sub-Tier Student</h4>
                        <Badge variant="destructive" className="text-xs">Weak</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>GPA:</span>
                          <span className={parseFloat(formData.personalInfo.gpa || '0') > 3.02 ? 'text-green-600' : 'text-red-600'}>
                            {parseFloat(formData.personalInfo.gpa || '0').toFixed(2)} vs 3.02
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>SAT:</span>
                          <span className={parseInt(formData.personalInfo.satScore || '0') > 1120 ? 'text-green-600' : 'text-red-600'}>
                            {formData.personalInfo.satScore || 'N/A'} vs 1120
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Activities:</span>
                          <span className={formData.extracurriculars.length > 3 ? 'text-green-600' : 'text-red-600'}>
                            {formData.extracurriculars.length} vs 3
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Honors:</span>
                          <span className={formData.honors.length > 1 ? 'text-green-600' : 'text-red-600'}>
                            {formData.honors.length} vs 1
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Mid-Tier Comparison */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-sm">Mid-Tier Student</h4>
                        <Badge variant="secondary" className="text-xs">Strong</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>GPA:</span>
                          <span className={parseFloat(formData.personalInfo.gpa || '0') > 3.98 ? 'text-green-600' : 'text-red-600'}>
                            {parseFloat(formData.personalInfo.gpa || '0').toFixed(2)} vs 3.98
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>SAT:</span>
                          <span className={parseInt(formData.personalInfo.satScore || '0') > 1560 ? 'text-green-600' : 'text-red-600'}>
                            {formData.personalInfo.satScore || 'N/A'} vs 1560
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Activities:</span>
                          <span className={formData.extracurriculars.length > 6 ? 'text-green-600' : 'text-red-600'}>
                            {formData.extracurriculars.length} vs 6
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Honors:</span>
                          <span className={formData.honors.length > 3 ? 'text-green-600' : 'text-red-600'}>
                            {formData.honors.length} vs 3
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* High-Tier Comparison */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-sm">High-Tier Student</h4>
                        <Badge variant="default" className="text-xs">Exceptional</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>GPA:</span>
                          <span className={parseFloat(formData.personalInfo.gpa || '0') >= 4.0 ? 'text-green-600' : 'text-red-600'}>
                            {parseFloat(formData.personalInfo.gpa || '0').toFixed(2)} vs 4.0
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>SAT:</span>
                          <span className={parseInt(formData.personalInfo.satScore || '0') >= 1530 ? 'text-green-600' : 'text-red-600'}>
                            {formData.personalInfo.satScore || 'N/A'} vs 1530
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Activities:</span>
                          <span className={formData.extracurriculars.length >= 6 ? 'text-green-600' : 'text-red-600'}>
                            {formData.extracurriculars.length} vs 6
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Honors:</span>
                          <span className={formData.honors.length >= 5 ? 'text-green-600' : 'text-red-600'}>
                            {formData.honors.length} vs 5
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <strong>Quick Tip:</strong> This comparison shows how your application stacks up against different tiers of applicants. 
                        Focus on improving areas where you fall below your target tier's benchmarks.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Extracurricular Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Extracurricular Activities
                    <Badge variant="secondary">{formData.extracurriculars.length}/6</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.extracurriculars.map((ec, index) => (
                    <div key={ec.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Activity {index + 1}</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeExtracurricular(ec.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Activity Name</Label>
                          <Input
                            value={ec.name}
                            onChange={(e) => updateExtracurricular(ec.id, 'name', e.target.value)}
                            placeholder="e.g., Student Council President"
                          />
                        </div>
                        <div>
                          <Label>Your Role</Label>
                          <Input
                            value={ec.role}
                            onChange={(e) => updateExtracurricular(ec.id, 'role', e.target.value)}
                            placeholder="e.g., President, Member, Captain"
                          />
                        </div>
                        <div>
                          <Label>Hours per Week</Label>
                          <Input
                            value={ec.hours}
                            onChange={(e) => updateExtracurricular(ec.id, 'hours', e.target.value)}
                            placeholder="e.g., 10 hours/week"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={ec.description}
                          onChange={(e) => updateExtracurricular(ec.id, 'description', e.target.value)}
                          placeholder="Describe your responsibilities, achievements, and impact..."
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                  {formData.extracurriculars.length < 6 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addExtracurricular}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Extracurricular Activity
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Academic Grades */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Academic Grades
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.grades.map((grade, index) => (
                    <div key={grade.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold">Course {index + 1}</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeGrade(grade.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Subject</Label>
                          <Input
                            value={grade.subject}
                            onChange={(e) => updateGrade(grade.id, 'subject', e.target.value)}
                            placeholder="e.g., AP Calculus BC"
                          />
                        </div>
                        <div>
                          <Label>Grade</Label>
                          <Select
                            value={grade.grade}
                            onValueChange={(value) => updateGrade(grade.id, 'grade', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                              {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'].map((grade) => (
                                <SelectItem key={grade} value={grade}>
                                  {grade}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Level</Label>
                          <Select
                            value={grade.level}
                            onValueChange={(value) => updateGrade(grade.id, 'level', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {['Regular', 'Honors', 'AP', 'IB', 'Dual Enrollment'].map((level) => (
                                <SelectItem key={level} value={level}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addGrade}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </CardContent>
              </Card>

              {/* Honors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Honors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.honors.map((honor, index) => (
                    <div key={honor.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold">Honor {index + 1}</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeHonor(honor.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Honor Name</Label>
                          <Input
                            value={honor.name}
                            onChange={(e) => updateHonor(honor.id, 'name', e.target.value)}
                            placeholder="e.g., National Merit Scholarship"
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={honor.description}
                            onChange={(e) => updateHonor(honor.id, 'description', e.target.value)}
                            placeholder="Describe the honor and its significance..."
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label>Year</Label>
                          <Input
                            value={honor.year}
                            onChange={(e) => updateHonor(honor.id, 'year', e.target.value)}
                            placeholder="e.g., 2024"
                          />
                        </div>
                        <div>
                          <Label>Level</Label>
                          <Select
                            value={honor.level}
                            onValueChange={(value) => updateHonor(honor.id, 'level', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {['Local', 'State', 'National', 'International'].map((level) => (
                                <SelectItem key={level} value={level}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addHonor}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Honor
                  </Button>
                </CardContent>
              </Card>

              {/* Essays */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Essays
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.essays.map((essay, index) => (
                    <div key={essay.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Essay {index + 1}</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeEssay(essay.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div>
                        <Label>Essay Prompt</Label>
                        <Textarea
                          value={essay.prompt}
                          onChange={(e) => updateEssay(essay.id, 'prompt', e.target.value)}
                          placeholder="Enter the essay prompt from the university..."
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label>Your Response</Label>
                        <Textarea
                          value={essay.response}
                          onChange={(e) => updateEssay(essay.id, 'response', e.target.value)}
                          placeholder="Write your essay response here..."
                          rows={8}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addEssay}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Essay
                  </Button>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="px-8 py-3 text-lg text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Evaluating Application...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Submit Application for AI Evaluation
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* AI Evaluation Result */}
            {showEvaluation && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    AI Admissions Officer Evaluation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {evaluation}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="example" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sub-Tier Example */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <TrendingDown className="h-5 w-5" />
                    Sub-Tier Example
                  </CardTitle>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      <strong>Alex Johnson</strong><br/>
                      3.02 GPA, 1120 SAT<br/>
                      Minimal activities, basic essays
                    </p>
                    <Button 
                      onClick={() => loadExampleApplication('sub')} 
                      variant="outline" 
                      className="w-full border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Load Sub-Tier Example
                    </Button>
                  </CardContent>
                </CardHeader>
              </Card>

              {/* Mid-Tier Example */}
              <Card className="border-yellow-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-600">
                    <Star className="h-5 w-5" />
                    Mid-Tier Example
                  </CardTitle>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      <strong>Sarah Chen</strong><br/>
                      3.98 GPA, 1560 SAT<br/>
                      Strong activities, good essays
                    </p>
                    <Button 
                      onClick={() => loadExampleApplication('mid')} 
                      variant="outline" 
                      className="w-full border-yellow-200 text-yellow-600 hover:bg-yellow-50"
                    >
                      Load Mid-Tier Example
                    </Button>
                  </CardContent>
                </CardHeader>
              </Card>

              {/* High-Tier Example */}
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="h-5 w-5" />
                    High-Tier Example
                  </CardTitle>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      <strong>Priya Patel</strong><br/>
                      4.0 GPA, 1530 SAT<br/>
                      Exceptional achievements, outstanding essays
                    </p>
                    <Button 
                      onClick={() => loadExampleApplication('high')} 
                      variant="outline" 
                      className="w-full border-green-200 text-green-600 hover:bg-green-50"
                    >
                      Load High-Tier Example
                    </Button>
                  </CardContent>
                </CardHeader>
              </Card>
            </div>

            {/* Detailed Examples */}
            <div className="space-y-8">
              {/* Sub-Tier Details */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <TrendingDown className="h-5 w-5" />
                    Sub-Tier Application: Alex Johnson
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>GPA</Label>
                      <div className="p-2 bg-red-50 rounded border border-red-200">3.02/4.0</div>
                    </div>
                    <div>
                      <Label>SAT Score</Label>
                      <div className="p-2 bg-red-50 rounded border border-red-200">1120</div>
                    </div>
                    <div>
                      <Label>Activities</Label>
                      <div className="p-2 bg-red-50 rounded border border-red-200">3 basic activities</div>
                    </div>
                    <div>
                      <Label>Course Rigor</Label>
                      <div className="p-2 bg-red-50 rounded border border-red-200">All regular courses</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    This represents a typical application that would struggle at competitive universities. 
                    Low GPA, minimal test scores, basic extracurricular activities, and simple essays.
                  </p>
                </CardContent>
              </Card>

              {/* Mid-Tier Details */}
              <Card className="border-yellow-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-600">
                    <Star className="h-5 w-5" />
                    Mid-Tier Application: Sarah Chen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>GPA</Label>
                      <div className="p-2 bg-yellow-50 rounded border border-yellow-200">3.98/4.0</div>
                    </div>
                    <div>
                      <Label>SAT Score</Label>
                      <div className="p-2 bg-yellow-50 rounded border border-yellow-200">1560</div>
                    </div>
                    <div>
                      <Label>Activities</Label>
                      <div className="p-2 bg-yellow-50 rounded border border-yellow-200">6 strong activities</div>
                    </div>
                    <div>
                      <Label>Course Rigor</Label>
                      <div className="p-2 bg-yellow-50 rounded border border-yellow-200">10 AP/Dual Enrollment</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    This represents a strong application with excellent academics, meaningful activities, 
                    and well-written essays. Competitive but not exceptional.
                  </p>
                </CardContent>
              </Card>

              {/* High-Tier Details */}
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="h-5 w-5" />
                    High-Tier Application: Priya Patel
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>GPA</Label>
                      <div className="p-2 bg-green-50 rounded border border-green-200">4.0/4.0</div>
                    </div>
                    <div>
                      <Label>SAT Score</Label>
                      <div className="p-2 bg-green-50 rounded border border-green-200">1530</div>
                    </div>
                    <div>
                      <Label>Activities</Label>
                      <div className="p-2 bg-green-50 rounded border border-green-200">6 exceptional activities</div>
                    </div>
                    <div>
                      <Label>Course Rigor</Label>
                      <div className="p-2 bg-green-50 rounded border border-green-200">12 AP/Dual Enrollment</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-green-700">Exceptional Achievements:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• MIT Research with 2 arXiv publications</li>
                      <li>• Founded "QuantumFlow", a research software company</li>
                      <li>• CEO of nonprofit serving 2,000+ people, raised $500K</li>
                      <li>• Research project with $250K funding, 30K+ visitors</li>
                      <li>• Debate Team Captain & Founder</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600">
                    This represents an exceptional application with perfect academics, 
                    groundbreaking achievements, and outstanding essays. Truly world-class.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MockApplication; 