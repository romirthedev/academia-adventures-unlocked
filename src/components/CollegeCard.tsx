import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ValorantButton } from "@/components/ui/valorant-button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Bookmark, MapPin, Users, DollarSign, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
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
}

export const CollegeCard: React.FC<CollegeCardProps> = ({ college, index, onClick, className }) => {
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-xl",
        className
      )}
    >
      <CardHeader className="relative">
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-900">{formatPercentage(admissionRate)}</span>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">{schoolName}</CardTitle>
        <CardDescription className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          {city}, {state}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Students</p>
              <p className="font-semibold text-gray-900">{formatNumber(studentSize)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Tuition</p>
              <p className="font-semibold text-gray-900">${formatCurrency(inStateTuition)}</p>
            </div>
          </div>
        </div>
        <div className="space-y-2 py-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>Ranking</span>
          </div>
          <p className="text-lg font-semibold">#{formatNumber(index + 1)}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSaveClick}
            className={cn(
              "hover:bg-orange-100",
              isSaved && "text-orange-600"
            )}
          >
            <Bookmark className={`h-5 w-5 text-primary ${isSaved ? 'fill-current' : ''}`} />
          </Button>
          <ValorantButton 
            onClick={() => navigate(`/college/${college.id}`)}
            className="w-full"
          >
            View Details
          </ValorantButton>
        </div>
      </CardFooter>
    </Card>
  );
};
