import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Bookmark, MapPin, Users, DollarSign, TrendingUp, Star, ExternalLink, Heart, Share2, Eye, Award, GraduationCap, Globe, Clock, Target, BarChart3, Zap, Shield, Leaf, Building, Microscope, Palette, Calculator, BookOpen, Briefcase, Heart as HeartIcon, Brain, Rocket, Trophy, Lightbulb, Check, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { savedSchoolsUtils } from "@/utils/savedSchools";

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
}

export const CollegeCard: React.FC<CollegeCardProps> = ({ college, index, onClick, className, comparisonMode, isSelectedForComparison, onComparisonToggle }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  const formatNumber = (num: number) => {
    if (!num) return 'N/A';
    return num.toLocaleString();
  };

  const getAdmissionDifficulty = (rate: number) => {
    if (!rate) return { label: 'Unknown' };
    const percentage = rate * 100;
    if (percentage < 10) return { label: 'Very Selective' };
    if (percentage < 25) return { label: 'Highly Selective' };
    if (percentage < 50) return { label: 'Selective' };
    if (percentage < 75) return { label: 'Moderately Selective' };
    return { label: 'Less Selective' };
  };

  const getSchoolType = (size: number) => {
    if (!size) return 'Unknown';
    if (size < 5000) return 'Small';
    if (size < 15000) return 'Medium';
    return 'Large';
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

  return (
    <TooltipProvider>
      <div 
        className={cn(
          "card group cursor-pointer transition-all duration-400 relative",
          comparisonMode && isSelectedForComparison && "ring-2 ring-blue-500 ring-offset-2",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        style={{
          '--primary': '#ff3e00',
          '--primary-hover': '#ff6d43',
          '--secondary': '#4d61ff',
          '--secondary-hover': '#5e70ff',
          '--accent': '#00e0b0',
          '--text': '#050505',
          '--bg': '#ffffff',
          '--shadow-color': '#000000',
          '--pattern-color': '#cfcfcf',
        } as React.CSSProperties}
      >
        {/* Comparison Selection Overlay */}
        {comparisonMode && (
          <div className="absolute top-4 right-4 z-30">
            <Button
              variant={isSelectedForComparison ? "default" : "outline"}
              size="sm"
              onClick={handleComparisonToggle}
              className={cn(
                "h-8 w-8 p-0 rounded-full transition-all duration-200",
                isSelectedForComparison 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-white/90 hover:bg-blue-50 hover:border-blue-300"
              )}
            >
              {isSelectedForComparison ? (
                <Check className="h-4 w-4" />
              ) : (
                <Scale className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}

        {/* Pattern overlays */}
        <div className="card-pattern-grid"></div>
        <div className="card-overlay-dots"></div>

        {/* Bold pattern decoration */}
        <div className="bold-pattern">
          <svg viewBox="0 0 100 100">
            <path
              strokeDasharray="15 10"
              strokeWidth="10"
              stroke="#000"
              fill="none"
              d="M0,0 L100,0 L100,100 L0,100 Z"
            />
          </svg>
        </div>

        {/* Title area */}
        <div className="card-title-area">
          <span className="text-sm font-bold truncate pr-2">{schoolName}</span>
          <span className="card-tag text-xs">{admissionInfo.label}</span>
        </div>

        {/* Card body */}
        <div className="card-body">
          {/* Location */}
          <div className="card-description">
            <div className="flex items-center gap-1 text-sm">
              <MapPin className="h-3 w-3" />
              {city}, {state}
            </div>
          </div>

          {/* Feature grid */}
          <div className="feature-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="feature-text">{formatNumber(studentSize)}</span>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="feature-text">{formatPercentage(admissionRate)}</span>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <span className="feature-text">In-State</span>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <Award className="w-4 h-4 text-white" />
              </div>
              <span className="feature-text">{schoolType}</span>
            </div>
          </div>

          {/* Card actions */}
          <div className="card-actions">
            <div className="price">
              <span className="price-currency">$</span>
              {inStateTuition ? Math.round(inStateTuition / 1000) : 'N/A'}
              <span className="price-period">K/year</span>
            </div>

            <button 
              className="card-button"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Decorative elements */}
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
            <circle fill="#000" r="3" cy="30" cx="50"></circle>
            <circle fill="#000" r="3" cy="30" cx="70"></circle>
          </svg>
        </div>

        <div className="accent-shape"></div>
        <div className="corner-slice"></div>

        <div className="stamp">
          <span className="stamp-text">Verified</span>
        </div>

        {/* Action buttons overlay */}
        <div className="absolute bottom-3 left-3 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSaveClick}
                className={cn(
                  "h-7 w-7 p-0 rounded-full transition-all duration-200 bg-white/90 shadow-sm",
                  isSaved 
                    ? "text-blue-600 hover:text-blue-700" 
                    : "text-gray-600 hover:text-blue-600"
                )}
              >
                <Bookmark className={cn("h-3 w-3", isSaved && "fill-current")} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isSaved ? 'Remove from saved' : 'Save school'}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShareClick}
                className="h-7 w-7 p-0 rounded-full transition-all duration-200 bg-white/90 shadow-sm text-gray-600 hover:text-blue-600"
              >
                <Share2 className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share school</p>
            </TooltipContent>
          </Tooltip>

          {schoolUrl && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleExternalClick}
                  className="h-7 w-7 p-0 rounded-full transition-all duration-200 bg-white/90 shadow-sm text-gray-600 hover:text-green-600"
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Visit website</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};