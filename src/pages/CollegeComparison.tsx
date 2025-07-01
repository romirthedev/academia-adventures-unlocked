import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Download, Share2, Star, Users, DollarSign, MapPin, GraduationCap, TrendingUp, Award, Globe, Building, Leaf, Microscope, Calculator, Briefcase, BookOpen, Palette, Rocket, Heart as HeartIcon, Brain, Trophy, Lightbulb, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { collegeService } from '@/services/collegeService';
import { useToast } from '@/components/ui/use-toast';

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

interface ComparisonCriteria {
  id: string;
  label: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  getValue: (college: College) => string | number;
  format?: (value: string | number) => string;
  sortable?: boolean;
}

const comparisonCriteria: ComparisonCriteria[] = [
  // Basic Info
  { id: 'name', label: 'College Name', category: 'Basic Info', icon: Building, getValue: (c) => c['school.name'] },
  { id: 'location', label: 'Location', category: 'Basic Info', icon: MapPin, getValue: (c) => `${c['school.city']}, ${c['school.state']}` },
  { id: 'size', label: 'Student Body Size', category: 'Basic Info', icon: Users, getValue: (c) => c['latest.student.size'] || 0, format: (v) => v.toLocaleString(), sortable: true },
  
  // Admissions
  { id: 'admission_rate', label: 'Admission Rate', category: 'Admissions', icon: TrendingUp, getValue: (c) => c['latest.admissions.admission_rate.overall'] || 0, format: (v) => `${(Number(v) * 100).toFixed(1)}%`, sortable: true },
  { id: 'selectivity', label: 'Selectivity', category: 'Admissions', icon: Shield, getValue: (c) => {
    const rate = c['latest.admissions.admission_rate.overall'];
    if (!rate) return 'Unknown';
    const percentage = rate * 100;
    if (percentage < 10) return 'Very Selective';
    if (percentage < 25) return 'Highly Selective';
    if (percentage < 50) return 'Selective';
    if (percentage < 75) return 'Moderately Selective';
    return 'Less Selective';
  }},
  
  // Cost
  { id: 'in_state_tuition', label: 'In-State Tuition', category: 'Cost', icon: DollarSign, getValue: (c) => c['latest.cost.tuition.in_state'] || 0, format: (v) => `$${Number(v).toLocaleString()}`, sortable: true },
  { id: 'out_state_tuition', label: 'Out-of-State Tuition', category: 'Cost', icon: DollarSign, getValue: (c) => c['latest.cost.tuition.out_of_state'] || 0, format: (v) => `$${Number(v).toLocaleString()}`, sortable: true },
  
  // Academic Focus (derived from name)
  { id: 'focus', label: 'Academic Focus', category: 'Academics', icon: GraduationCap, getValue: (c) => {
    const name = c['school.name'].toLowerCase();
    const size = c['latest.student.size'];
    
    if (name.includes('tech') || name.includes('institute of technology')) return 'Technology/Engineering';
    if (name.includes('business') || name.includes('management')) return 'Business';
    if (name.includes('arts') && !name.includes('liberal')) return 'Arts';
    if (name.includes('liberal') || (name.includes('college') && !name.includes('university'))) return 'Liberal Arts';
    if (name.includes('medical') || name.includes('health')) return 'Medicine/Health';
    if (size && size > 20000) return 'Research University';
    return 'Comprehensive';
  }},
  
  // Special Characteristics
  { id: 'type', label: 'School Type', category: 'Characteristics', icon: Building, getValue: (c) => {
    const name = c['school.name'].toLowerCase();
    if (name.includes('university of') && !name.includes('private')) return 'Public';
    return 'Private';
  }},
  { id: 'prestige', label: 'Prestige Level', category: 'Characteristics', icon: Trophy, getValue: (c) => {
    const name = c['school.name'].toLowerCase();
    if (name.includes('harvard') || name.includes('yale') || name.includes('princeton') || 
        name.includes('columbia') || name.includes('penn') || name.includes('brown') || 
        name.includes('dartmouth') || name.includes('cornell')) return 'Ivy League';
    if (name.includes('stanford') || name.includes('mit') || name.includes('caltech')) return 'Elite';
    return 'Standard';
  }},
];

const CollegeComparison = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>(['name', 'location', 'admission_rate', 'in_state_tuition']);
  const [sortBy, setSortBy] = useState<string>('');

  useEffect(() => {
    const collegeIds = searchParams.get('colleges')?.split(',').filter(Boolean) || [];
    if (collegeIds.length > 0) {
      loadColleges(collegeIds);
    }
  }, [searchParams]);

  const loadColleges = async (ids: string[]) => {
    setLoading(true);
    try {
      const collegePromises = ids.map(id => collegeService.getCollegeById(id));
      const collegeData = await Promise.all(collegePromises);
      setColleges(collegeData.filter(Boolean));
    } catch (error) {
      console.error('Error loading colleges:', error);
      toast({
        title: "Error",
        description: "Failed to load college data for comparison.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addCollege = () => {
    if (colleges.length >= 4) {
      toast({
        title: "Maximum reached",
        description: "You can compare up to 4 colleges at a time.",
        variant: "destructive",
      });
      return;
    }
    navigate('/explore?comparison=true');
  };

  const removeCollege = (index: number) => {
    const newColleges = colleges.filter((_, i) => i !== index);
    setColleges(newColleges);
    
    // Update URL
    const newIds = newColleges.map(c => c.id).join(',');
    if (newIds) {
      navigate(`/compare?colleges=${newIds}`);
    } else {
      navigate('/compare');
    }
  };

  const toggleCriteria = (criteriaId: string) => {
    setSelectedCriteria(prev => 
      prev.includes(criteriaId) 
        ? prev.filter(id => id !== criteriaId)
        : [...prev, criteriaId]
    );
  };

  const exportComparison = () => {
    const csvData = [
      ['Criteria', ...colleges.map(c => c['school.name'])],
      ...selectedCriteria.map(criteriaId => {
        const criteria = comparisonCriteria.find(c => c.id === criteriaId);
        if (!criteria) return [];
        
        return [
          criteria.label,
          ...colleges.map(college => {
            const value = criteria.getValue(college);
            return criteria.format ? criteria.format(value) : String(value);
          })
        ];
      })
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `college-comparison-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Exported!",
      description: "College comparison has been exported as CSV.",
    });
  };

  const shareComparison = () => {
    const collegeIds = colleges.map(c => c.id).join(',');
    const url = `${window.location.origin}/compare?colleges=${collegeIds}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'College Comparison',
        text: `Check out this college comparison on CollegeAI!`,
        url
      });
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Comparison link has been copied to clipboard.",
      });
    }
  };

  const getSortedColleges = () => {
    if (!sortBy) return colleges;
    
    const criteria = comparisonCriteria.find(c => c.id === sortBy);
    if (!criteria?.sortable) return colleges;
    
    return [...colleges].sort((a, b) => {
      const aVal = criteria.getValue(a);
      const bVal = criteria.getValue(b);
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return aVal - bVal;
      }
      
      return String(aVal).localeCompare(String(bVal));
    });
  };

  const groupedCriteria = comparisonCriteria.reduce((acc, criteria) => {
    if (!acc[criteria.category]) {
      acc[criteria.category] = [];
    }
    acc[criteria.category].push(criteria);
    return acc;
  }, {} as Record<string, ComparisonCriteria[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading college comparison...</p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => navigate('/explore')}
                className="text-college-primary hover:text-college-primary/80"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Explorer
              </Button>
              <h1 className="text-2xl font-bold gradient-text">College Comparison</h1>
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={exportComparison}
                      disabled={colleges.length === 0}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Export as CSV</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={shareComparison}
                      disabled={colleges.length === 0}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share comparison</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Controls */}
          <div className="glass-card rounded-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  onClick={addCollege}
                  disabled={colleges.length >= 4}
                  className="college-gradient text-white px-6 py-2 rounded-xl hover:scale-105 transition-transform duration-200"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add College
                </Button>
                <span className="text-sm text-gray-600">
                  {colleges.length}/4 colleges selected
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No sorting</SelectItem>
                    {comparisonCriteria.filter(c => c.sortable).map(criteria => (
                      <SelectItem key={criteria.id} value={criteria.id}>
                        {criteria.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Criteria Selection */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Comparison Criteria</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(groupedCriteria).map(([category, criteriaList]) => (
                  <div key={category}>
                    <h4 className="font-medium text-gray-700 mb-2">{category}</h4>
                    <div className="space-y-2">
                      {criteriaList.map(criteria => {
                        const isSelected = selectedCriteria.includes(criteria.id);
                        const IconComponent = criteria.icon;
                        
                        return (
                          <Button
                            key={criteria.id}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleCriteria(criteria.id)}
                            className={`w-full justify-start text-xs ${
                              isSelected 
                                ? 'bg-college-primary text-white' 
                                : 'hover:bg-college-primary hover:text-white'
                            }`}
                          >
                            <IconComponent className="mr-2 h-3 w-3" />
                            {criteria.label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          {colleges.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Criteria</th>
                    {getSortedColleges().map((college, index) => (
                      <th key={college.id} className="px-6 py-4 text-left font-semibold relative">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold truncate">{college['school.name']}</div>
                            <div className="text-blue-100 text-sm truncate">
                              {college['school.city']}, {college['school.state']}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCollege(index)}
                            className="ml-2 h-6 w-6 p-0 text-white hover:bg-white/20"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedCriteria.map(criteriaId => {
                    const criteria = comparisonCriteria.find(c => c.id === criteriaId);
                    if (!criteria) return null;
                    
                    const IconComponent = criteria.icon;
                    
                    return (
                      <tr key={criteriaId} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-700">
                          <div className="flex items-center">
                            <IconComponent className="mr-2 h-4 w-4 text-gray-500" />
                            {criteria.label}
                          </div>
                        </td>
                        {getSortedColleges().map(college => {
                          const value = criteria.getValue(college);
                          const displayValue = criteria.format ? criteria.format(value) : String(value);
                          
                          return (
                            <td key={college.id} className="px-6 py-4 text-gray-900">
                              {displayValue}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mb-6">
                <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No colleges to compare</h3>
                <p className="text-gray-500">
                  Add colleges to start comparing them side by side.
                </p>
              </div>
              <Button
                onClick={addCollege}
                className="college-gradient text-white px-8 py-3 rounded-xl hover:scale-105 transition-transform duration-200"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First College
              </Button>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CollegeComparison; 