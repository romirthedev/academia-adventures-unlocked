import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { aiCollegeService } from '@/services/aiCollegeService';

interface HelpIconProps {
  category?: string;
  value?: number;
  collegeData?: any;
  description?: string;
  simple?: boolean;
  message?: string;
}

export const HelpIcon: React.FC<HelpIconProps> = ({ 
  category, 
  value, 
  collegeData, 
  description,
  simple = false,
  message = "N/A means we can't find the information now. Click on a college to fetch the latest data"
}) => {
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const getExplanation = async () => {
    if (explanation || loading) return;
    
    setLoading(true);
    try {
      const prompt = `Explain why ${collegeData['school.name']} has a ${value}% ${category?.toLowerCase()} score. 
      
      College context:
      - Name: ${collegeData['school.name']}
      - Location: ${collegeData['school.city']}, ${collegeData['school.state']}
      - Student Size: ${collegeData['latest.student.size']?.toLocaleString() || 'N/A'}
      - Admission Rate: ${collegeData['latest.admissions.admission_rate.overall'] ? (collegeData['latest.admissions.admission_rate.overall'] * 100).toFixed(1) + '%' : 'N/A'}
      - Tuition: $${collegeData['latest.cost.tuition.out_of_state']?.toLocaleString() || 'N/A'}
      - Graduation Rate: ${collegeData['latest.completion.completion_rate_4yr_150nt'] ? (collegeData['latest.completion.completion_rate_4yr_150nt'] * 100).toFixed(1) + '%' : 'N/A'}
      
      Category description: ${description}
      
      Provide a concise 2-3 sentence explanation of why this specific percentage makes sense for this college.`;

      const messages = [{ role: 'user' as const, content: prompt, timestamp: Date.now() }];
      const response = await aiCollegeService.chatWithAdmissionsAI(messages, collegeData);
      setExplanation(response);
    } catch (error) {
      setExplanation('Unable to generate explanation at this time. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen && !simple) {
      getExplanation();
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <HelpCircle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 bg-white border border-gray-200 shadow-lg rounded-lg">
        {simple ? (
          <div className="text-sm text-gray-700 leading-relaxed">{message}</div>
        ) : (
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">{category} - {value}%</h4>
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                <span className="text-sm text-gray-600">Getting explanation...</span>
              </div>
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed">{explanation}</p>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
