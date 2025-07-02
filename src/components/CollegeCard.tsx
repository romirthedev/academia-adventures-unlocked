import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ValorantButton } from "@/components/ui/valorant-button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Bookmark, MapPin, Users, DollarSign, TrendingUp, Star, ExternalLink, Heart, Share2, Eye, Award, GraduationCap, Globe, Clock, Target, BarChart3, Zap, Shield, Leaf, Building, Microscope, Palette, Calculator, BookOpen, Briefcase, Heart as HeartIcon, Brain, Rocket, Trophy, Lightbulb, Check, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { savedSchoolsUtils } from "@/utils/savedSchools";
import { CardDescription } from "@/components/ui/card";
import './CollegeCard.css';

interface College {
  id: number;
  'school.name': string;
  'school.city': string;
  'school.state': string;
  'latest.admissions.admission_rate.overall': number;
  'latest.cost.tuition.in_state': number;
  'latest.cost.tuition.out_of_state': number;
  'latest.student.size': number;
  'school.school_url': string;
}

interface CollegeCardProps {
  college: College;
  index: number;
  onClick: () => void;
  className?: string;
  comparisonMode?: boolean;
  isSelectedForComparison?: boolean;
  onComparisonToggle?: (collegeId: number) => void;
  onDetailsClick?: () => void;
  isLoading?: boolean;
}

// Tag configuration with icons and colors
interface TagConfig {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  iconColor: string;
}

interface TagConfigs {
  selectivity: Record<string, TagConfig>;
  size: Record<string, TagConfig>;
  focus: Record<string, TagConfig>;
  special: Record<string, TagConfig>;
}

const tagConfig: TagConfigs = {
  selectivity: {
    'Very Selective': { icon: Shield, color: 'bg-red-100 text-red-800 border-red-200', iconColor: 'text-red-600' },
    'Highly Selective': { icon: Shield, color: 'bg-orange-100 text-orange-800 border-orange-200', iconColor: 'text-orange-600' },
    'Selective': { icon: Shield, color: 'bg-yellow-100 text-yellow-800 border-yellow-200', iconColor: 'text-yellow-600' },
    'Moderately Selective': { icon: Shield, color: 'bg-green-100 text-green-800 border-green-200', iconColor: 'text-green-600' },
    'Less Selective': { icon: Shield, color: 'bg-blue-100 text-blue-800 border-blue-200', iconColor: 'text-blue-600' }
  },
  size: {
    'Small': { icon: Users, color: 'bg-purple-100 text-purple-800 border-purple-200', iconColor: 'text-purple-600' },
    'Medium': { icon: Users, color: 'bg-indigo-100 text-indigo-800 border-indigo-200', iconColor: 'text-indigo-600' },
    'Large': { icon: Users, color: 'bg-cyan-100 text-cyan-800 border-cyan-200', iconColor: 'text-cyan-600' }
  },
  focus: {
    'STEM': { icon: Microscope, color: 'bg-blue-100 text-blue-800 border-blue-200', iconColor: 'text-blue-600' },
    'Engineering': { icon: Calculator, color: 'bg-indigo-100 text-indigo-800 border-indigo-200', iconColor: 'text-indigo-600' },
    'Business': { icon: Briefcase, color: 'bg-green-100 text-green-800 border-green-200', iconColor: 'text-green-600' },
    'Liberal Arts': { icon: BookOpen, color: 'bg-purple-100 text-purple-800 border-purple-200', iconColor: 'text-purple-600' },
    'Arts': { icon: Palette, color: 'bg-pink-100 text-pink-800 border-pink-200', iconColor: 'text-pink-600' },
    'Research': { icon: Microscope, color: 'bg-orange-100 text-orange-800 border-orange-200', iconColor: 'text-orange-600' },
    'Technology': { icon: Rocket, color: 'bg-cyan-100 text-cyan-800 border-cyan-200', iconColor: 'text-cyan-600' },
    'Medicine': { icon: HeartIcon, color: 'bg-red-100 text-red-800 border-red-200', iconColor: 'text-red-600' },
    'Humanities': { icon: Brain, color: 'bg-amber-100 text-amber-800 border-amber-200', iconColor: 'text-amber-600' },
    'Innovation': { icon: Lightbulb, color: 'bg-yellow-100 text-yellow-800 border-yellow-200', iconColor: 'text-yellow-600' }
  },
  special: {
    'Public': { icon: Building, color: 'bg-blue-100 text-blue-800 border-blue-200', iconColor: 'text-blue-600' },
    'Private': { icon: Building, color: 'bg-gray-100 text-gray-800 border-gray-200', iconColor: 'text-gray-600' },
    'Ivy League': { icon: Trophy, color: 'bg-yellow-100 text-yellow-800 border-yellow-200', iconColor: 'text-yellow-600' },
    'Research Intensive': { icon: Microscope, color: 'bg-purple-100 text-purple-800 border-purple-200', iconColor: 'text-purple-600' },
    'Liberal Arts Focus': { icon: BookOpen, color: 'bg-green-100 text-green-800 border-green-200', iconColor: 'text-green-600' },
    'Urban Campus': { icon: Building, color: 'bg-orange-100 text-orange-800 border-orange-200', iconColor: 'text-orange-600' },
    'Suburban Campus': { icon: Leaf, color: 'bg-green-100 text-green-800 border-green-200', iconColor: 'text-green-600' },
    'Rural Campus': { icon: Leaf, color: 'bg-emerald-100 text-emerald-800 border-emerald-200', iconColor: 'text-emerald-600' }
  }
};

export const CollegeCard: React.FC<CollegeCardProps> = ({ college, index, onClick, className, comparisonMode, isSelectedForComparison, onComparisonToggle, onDetailsClick, isLoading }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if school is already saved
    const savedSchools = savedSchoolsUtils.getSavedSchools();
    setIsSaved(savedSchools.some(school => school.id === college.id));
  }, [college.id]);

  const formatPercentage = (rate: number) => {
    if (!rate) return 'N/A';
    return `${Math.round(rate * 100)}%`;
  };

  const formatCurrency = (amount: number) => {
    if (!amount) return 'N/A';
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const formatNumber = (num: number) => {
    if (!num) return 'N/A';
    return num.toLocaleString();
  };

  const getAdmissionDifficulty = (rate: number) => {
    if (!rate) return { label: 'Unknown', color: 'bg-gray-500', textColor: 'text-gray-700' };
    const percentage = rate * 100;
    if (percentage < 10) return { label: 'Very Selective', color: 'bg-red-500', textColor: 'text-red-700' };
    if (percentage < 25) return { label: 'Highly Selective', color: 'bg-orange-500', textColor: 'text-orange-700' };
    if (percentage < 50) return { label: 'Selective', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
    if (percentage < 75) return { label: 'Moderately Selective', color: 'bg-green-500', textColor: 'text-green-700' };
    return { label: 'Less Selective', color: 'bg-blue-500', textColor: 'text-blue-700' };
  };

  const getSchoolType = (size: number) => {
    if (!size) return 'Unknown';
    if (size < 5000) return 'Small';
    if (size < 15000) return 'Medium';
    return 'Large';
  };

  // Generate tags based on college data
  const generateTags = () => {
    const tags = [];
    const admissionRate = college['latest.admissions.admission_rate.overall'];
    const studentSize = college['latest.student.size'];
    const schoolName = college['school.name'].toLowerCase();

    // Selectivity tag
    if (admissionRate) {
      const percentage = admissionRate * 100;
      if (percentage < 10) tags.push({ type: 'selectivity', label: 'Very Selective' });
      else if (percentage < 25) tags.push({ type: 'selectivity', label: 'Highly Selective' });
      else if (percentage < 50) tags.push({ type: 'selectivity', label: 'Selective' });
      else if (percentage < 75) tags.push({ type: 'selectivity', label: 'Moderately Selective' });
      else tags.push({ type: 'selectivity', label: 'Less Selective' });
    }

    // Size tag
    if (studentSize) {
      if (studentSize < 5000) tags.push({ type: 'size', label: 'Small' });
      else if (studentSize < 15000) tags.push({ type: 'size', label: 'Medium' });
      else tags.push({ type: 'size', label: 'Large' });
    }

    // Focus area tags based on school name
    if (schoolName.includes('tech') || schoolName.includes('institute of technology')) {
      tags.push({ type: 'focus', label: 'Technology' });
      tags.push({ type: 'focus', label: 'Engineering' });
    }
    if (schoolName.includes('business') || schoolName.includes('management')) {
      tags.push({ type: 'focus', label: 'Business' });
    }
    if (schoolName.includes('arts') && !schoolName.includes('liberal')) {
      tags.push({ type: 'focus', label: 'Arts' });
    }
    if (schoolName.includes('liberal') || schoolName.includes('college') && !schoolName.includes('university')) {
      tags.push({ type: 'focus', label: 'Liberal Arts' });
    }
    if (schoolName.includes('medical') || schoolName.includes('health')) {
      tags.push({ type: 'focus', label: 'Medicine' });
    }

    // Special tags
    if (schoolName.includes('harvard') || schoolName.includes('yale') || schoolName.includes('princeton') || 
        schoolName.includes('columbia') || schoolName.includes('penn') || schoolName.includes('brown') || 
        schoolName.includes('dartmouth') || schoolName.includes('cornell')) {
      tags.push({ type: 'special', label: 'Ivy League' });
    }
    if (schoolName.includes('university of') && !schoolName.includes('private')) {
      tags.push({ type: 'special', label: 'Public' });
    } else {
      tags.push({ type: 'special', label: 'Private' });
    }

    // Research intensive (large universities with research focus)
    if (studentSize && studentSize > 20000) {
      tags.push({ type: 'special', label: 'Research Intensive' });
    }

    return tags.slice(0, 6); // Limit to 6 tags to avoid clutter
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isSaved) {
      savedSchoolsUtils.removeSavedSchool(college.id);
      setIsSaved(false);
      toast({
        title: "School removed",
        description: `${college['school.name']} has been removed from your saved schools.`,
      });
    } else {
      const success = savedSchoolsUtils.saveSchool({
        id: college.id,
        name: college['school.name'],
        city: college['school.city'],
        state: college['school.state']
      });
      
      if (success) {
        setIsSaved(true);
        toast({
          title: "School saved!",
          description: `${college['school.name']} has been added to your saved schools.`,
        });
      } else {
        toast({
          title: "Already saved",
          description: `${college['school.name']} is already in your saved schools.`,
          variant: "destructive",
        });
      }
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: `${college['school.name']} has been ${isLiked ? 'removed from' : 'added to'} your favorites.`,
    });
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: college['school.name'],
        text: `Check out ${college['school.name']} on CollegeAI!`,
        url: window.location.origin + `/college/${college.id}`,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/college/${college.id}`);
      toast({
        title: "Link copied!",
        description: "School link has been copied to clipboard.",
      });
    }
  };

  const handleExternalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (college['school.school_url']) {
      window.open(college['school.school_url'], '_blank');
    }
  };

  const handleComparisonToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onComparisonToggle) {
      onComparisonToggle(college.id);
    }
  };

  const schoolName = college['school.name'];
  const city = college['school.city'];
  const state = college['school.state'];
  const admissionRate = college['latest.admissions.admission_rate.overall'];
  const inStateTuition = college['latest.cost.tuition.in_state'];
  const outOfStateTuition = college['latest.cost.tuition.out_of_state'];
  const studentSize = college['latest.student.size'];
  const schoolUrl = college['school.school_url'];

  const admissionInfo = getAdmissionDifficulty(admissionRate);
  const schoolType = getSchoolType(studentSize);
  const tags = generateTags();

  return (
    <div className="card" onClick={onClick}>
      <div className="card-pattern-grid"></div>
      <div className="card-overlay-dots"></div>
      <div className="bold-pattern">
        <svg viewBox="0 0 100 100">
          <path strokeDasharray="15 10" strokeWidth="10" stroke="#000" fill="none" d="M0,0 L100,0 L100,100 L0,100 Z" />
        </svg>
      </div>
      <div className="card-title-area">
        <span>{college['school.name']}</span>
        <span className="card-tag">{college['school.state']}</span>
      </div>
      <div className="card-body">
        <div className="card-description">
          {college['school.city']}, {college['school.state']}<br />
          Admission Rate: {formatPercentage(college['latest.admissions.admission_rate.overall'])}<br />
          In-State Tuition: {formatCurrency(college['latest.cost.tuition.in_state'])}<br />
          Out-of-State Tuition: {formatCurrency(college['latest.cost.tuition.out_of_state'])}
        </div>
        <div className="feature-grid">
          <div className="feature-item">
            <div className="feature-icon"><MapPin size={16} /></div>
            <span className="feature-text">{city}, {state}</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Users size={16} /></div>
            <span className="feature-text">{formatNumber(studentSize)} students</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Building size={16} /></div>
            <span className="feature-text">{schoolType} / {college['school.ownership'] === 1 ? 'Public' : 'Private'}</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Shield size={16} /></div>
            <span className="feature-text">Admission: {formatPercentage(admissionRate)}</span>
          </div>
        </div>
        <div className="card-actions">
          <div style={{flex: 1}}></div>
          <button className="card-button" onClick={e => { e.stopPropagation(); onDetailsClick && onDetailsClick(); }} disabled={isLoading}>
            {isLoading ? <span className="spinner" style={{marginRight: 8}}></span> : null}
            Details
          </button>
        </div>
        <div className="save-icon-bottom-left" style={{position: 'absolute', left: 16, bottom: 16, zIndex: 3}} onClick={handleSaveClick}>
          <Bookmark size={24} color={isSaved ? 'var(--primary)' : 'var(--text)'} fill={isSaved ? 'var(--primary)' : 'none'} style={{cursor: 'pointer'}} />
        </div>
      </div>
      <div className="dots-pattern">
        <svg viewBox="0 0 80 40">
          <circle fill="#000" r="3" cy="10" cx="10"></circle>
          <circle fill="#000" r="3" cy="10" cx="30"></circle>
          <circle fill="#000" r="3" cy="10" cx="50"></circle>
          <circle fill="#000" r="3" cy="10" cx="70"></circle>
          <circle fill="#000" r="3" cy="20" cx="20"></circle>
          <circle fill="#000" r="3" cy="20" cx="40"></circle>
          <circle fill="#000" r="3" cy="20" cx="60"></circle>
          <circle fill="#000" r="3" cy="30" cx="10"></circle>
          <circle fill="#000" r="3" cy="30" cx="30"></circle>
          <circle fill="#000" r="3" cy="30" cx="50"></circle>
          <circle fill="#000" r="3" cy="30" cx="70"></circle>
        </svg>
      </div>
      <div className="accent-shape"></div>
      <div className="corner-slice"></div>
      <div className="stamp">
        <span className="stamp-text">Approved</span>
      </div>
    </div>
  );
};
