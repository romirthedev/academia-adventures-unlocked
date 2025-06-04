
import React, { useState, useEffect } from 'react';
import { MapPin, Users, DollarSign, TrendingUp, ExternalLink, Star, Bookmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { savedSchoolsUtils } from '@/utils/savedSchools';
import { useToast } from '@/hooks/use-toast';

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
}

export const CollegeCard: React.FC<CollegeCardProps> = ({ college, index, onClick }) => {
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsSaved(savedSchoolsUtils.isSchoolSaved(college.id));
  }, [college.id]);

  const formatCurrency = (amount: number) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    if (!rate) return 'N/A';
    return `${Math.round(rate * 100)}%`;
  };

  const formatNumber = (num: number) => {
    if (!num) return 'N/A';
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getAdmissionRateColor = (rate: number) => {
    if (!rate) return 'bg-gray-500';
    if (rate <= 0.2) return 'bg-red-500';
    if (rate <= 0.4) return 'bg-orange-500';
    if (rate <= 0.6) return 'bg-yellow-500';
    if (rate <= 0.8) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isSaved) {
      savedSchoolsUtils.removeSavedSchool(college.id);
      setIsSaved(false);
      toast({
        title: "School removed",
        description: `${schoolName} has been removed from your saved schools.`,
      });
    } else {
      const success = savedSchoolsUtils.saveSchool({
        id: college.id,
        name: schoolName,
        city: city,
        state: state
      });
      
      if (success) {
        setIsSaved(true);
        toast({
          title: "School saved!",
          description: `${schoolName} has been added to your saved schools.`,
        });
      } else {
        toast({
          title: "Already saved",
          description: `${schoolName} is already in your saved schools.`,
          variant: "destructive",
        });
      }
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

  return (
    <Card
      className="glass-card border-0 hover:scale-105 transition-all duration-300 cursor-pointer group overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-college-primary transition-colors flex-1 mr-2">
            {schoolName}
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                isSaved ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-400 hover:text-yellow-500'
              }`}
              onClick={handleSaveToggle}
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                // Add to favorites functionality
              }}
            >
              <Star className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          {city}, {state}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Admission Rate */}
        {admissionRate && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Acceptance Rate</span>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${getAdmissionRateColor(admissionRate)} mr-2`}></div>
              <Badge variant="secondary" className="text-xs">
                {formatPercentage(admissionRate)}
              </Badge>
            </div>
          </div>
        )}

        {/* Student Size */}
        {studentSize && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Students
            </span>
            <span className="text-sm font-medium">{formatNumber(studentSize)}</span>
          </div>
        )}

        {/* Tuition */}
        <div className="space-y-2">
          {inStateTuition && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">In-State Tuition</span>
              <span className="text-sm font-medium text-green-600">
                {formatCurrency(inStateTuition)}
              </span>
            </div>
          )}
          {outOfStateTuition && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Out-of-State Tuition</span>
              <span className="text-sm font-medium text-blue-600">
                {formatCurrency(outOfStateTuition)}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            className="flex-1 college-gradient text-white hover:scale-105 transition-transform"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            View Details
          </Button>
          {schoolUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(schoolUrl, '_blank');
              }}
              className="border-college-primary/30 hover:bg-college-primary hover:text-white transition-all"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
