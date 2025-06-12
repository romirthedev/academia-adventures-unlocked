
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CollegeTagsProps {
  collegeData: any;
}

export const CollegeTags: React.FC<CollegeTagsProps> = ({ collegeData }) => {
  const generateTags = (college: any): string[] => {
    const tags: string[] = [];
    
    // Size-based tags
    const studentSize = college['latest.student.size'] || 0;
    if (studentSize > 30000) tags.push('Large University');
    else if (studentSize > 10000) tags.push('Medium University');
    else if (studentSize > 2000) tags.push('Small University');
    else tags.push('Very Small');

    // Selectivity tags
    const admissionRate = college['latest.admissions.admission_rate.overall'] || 1;
    if (admissionRate < 0.1) tags.push('Highly Selective');
    else if (admissionRate < 0.25) tags.push('Very Selective');
    else if (admissionRate < 0.5) tags.push('Selective');
    else tags.push('Open Admission');

    // Cost tags
    const tuition = college['latest.cost.tuition.out_of_state'] || 0;
    const avgNetPrice = college['latest.cost.avg_net_price.overall'] || tuition;
    if (avgNetPrice < 15000) tags.push('Affordable');
    else if (avgNetPrice < 30000) tags.push('Moderate Cost');
    else tags.push('High Cost');

    // Academic program tags
    if (college['latest.academics.program_available.doctoral']) {
      tags.push('Research University');
      tags.push('Graduate Programs');
    }
    if (college['latest.academics.program_available.masters']) {
      tags.push('Graduate Programs');
    }

    // Institution type tags
    const ownership = college['school.ownership'];
    if (ownership === 1) tags.push('Public Institution');
    else if (ownership === 2) tags.push('Private Non-Profit');
    else tags.push('Private For-Profit');

    // Graduation rate tags
    const gradRate = college['latest.completion.completion_rate_4yr_150nt'] || 0;
    if (gradRate > 0.8) tags.push('High Graduation Rate');
    else if (gradRate > 0.6) tags.push('Good Retention');

    // Earnings tags
    const earnings = college['latest.earnings.10_yrs_after_entry.median'] || 0;
    if (earnings > 60000) tags.push('High Earning Potential');
    else if (earnings > 45000) tags.push('Good Career Outcomes');

    // State-specific tags
    const state = college['school.state'];
    if (['CA', 'NY', 'MA', 'CT'].includes(state)) tags.push('Coastal Elite');
    if (['TX', 'FL', 'AZ', 'NV'].includes(state)) tags.push('Growing Region');

    // Academic focus estimation (simplified)
    const collegeName = college['school.name']?.toLowerCase() || '';
    if (collegeName.includes('tech') || collegeName.includes('institute')) {
      tags.push('STEM Focus');
    }
    if (collegeName.includes('arts') || collegeName.includes('liberal')) {
      tags.push('Liberal Arts');
    }
    if (collegeName.includes('business') || collegeName.includes('commerce')) {
      tags.push('Business Focus');
    }

    // Merit scholarships (estimation based on cost vs tuition difference)
    if (tuition - avgNetPrice > 15000) {
      tags.push('Merit Scholarships Available');
    }

    // General academic tags
    if (tags.includes('Research University') || tags.includes('Highly Selective')) {
      tags.push('Academic Excellence');
    }

    // Remove duplicates and limit to most relevant
    return [...new Set(tags)].slice(0, 6);
  };

  const tags = generateTags(collegeData);

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {tags.map((tag, index) => (
        <Badge 
          key={index}
          variant="secondary" 
          className="text-xs px-2 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-200 hover:from-indigo-100 hover:to-purple-100 transition-colors duration-200"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
};
