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

export const CollegeCard: React.FC<CollegeCardProps> = ({ college, index, onClick, className, comparisonMode, isSelectedForComparison, onComparisonToggle }) => {
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
    <TooltipProvider>
      <Card 
        className={cn(
          "group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer relative",
          "bg-gradient-to-br from-white to-orange-50/30 hover:from-orange-50/50 hover:to-orange-100/50",
          comparisonMode && isSelectedForComparison && "ring-2 ring-blue-500 ring-offset-2",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {/* Comparison Selection Overlay */}
        {comparisonMode && (
          <div className="absolute top-3 right-3 z-10">
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

        {/* Hover overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 transition-opacity duration-300",
          isHovered && "opacity-100"
        )} />

        <CardHeader className="relative pb-4">
          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-orange-700 transition-colors">
            {schoolName}
          </CardTitle>
          
          <CardDescription className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors">
            <MapPin className="h-4 w-4 mr-1" />
            {city}, {state}
          </CardDescription>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-1 mt-3">
            {tags.map((tag, index) => {
              const tagType = tag.type as keyof TagConfigs;
              const config = tagConfig[tagType][tag.label];
              if (!config) return null;
              
              const IconComponent = config.icon;
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs px-2 py-1 cursor-pointer hover:scale-105 transition-all duration-200",
                        config.color
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        // This could trigger a search by tag
                        console.log(`Search by tag: ${tag.label}`);
                      }}
                    >
                      <IconComponent className={cn("h-3 w-3 mr-1", config.iconColor)} />
                      {tag.label}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to search for more {tag.label} colleges</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </CardHeader>

        <CardContent className="pb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white/80 transition-colors">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Students</p>
                <p className="font-bold text-gray-900">{formatNumber(studentSize)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white/80 transition-colors">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">In-State</p>
                <p className="font-bold text-gray-900">{formatCurrency(inStateTuition)}</p>
              </div>
            </div>
          </div>

          {/* Additional stats */}
          <div className="space-y-3">
            {outOfStateTuition && outOfStateTuition !== inStateTuition && (
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-xs text-gray-600">Out-of-State</span>
                <span className="text-sm font-semibold text-gray-700">{formatCurrency(outOfStateTuition)}</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <div className="flex items-center justify-between w-full gap-2">
            {schoolUrl && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleExternalClick}
                    className="h-10 w-10 p-0 bg-gray-100 hover:bg-gray-200"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Visit official website</TooltipContent>
              </Tooltip>
            )}
            
            <ValorantButton 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/college/${college.id}`);
              }}
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </ValorantButton>
          </div>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
};
