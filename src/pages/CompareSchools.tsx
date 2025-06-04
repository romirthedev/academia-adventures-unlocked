import React, { useState, useEffect } from 'react';
import { Plus, X, Users, DollarSign, TrendingUp, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { collegeService } from '@/services/collegeService';

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

const CompareSchools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [searchResults, setSearchResults] = useState<College[]>([]);

  const { data: colleges } = useQuery({
    queryKey: ['colleges', searchTerm],
    queryFn: () => collegeService.searchColleges({ 'school.name': searchTerm }),
    enabled: searchTerm.length >= 2,
  });

  useEffect(() => {
    if (colleges?.results) {
      setSearchResults(colleges.results.slice(0, 5));
    }
  }, [colleges]);

  const addCollegeToComparison = (college: College) => {
    if (selectedColleges.length < 4 && !selectedColleges.find(c => c.id === college.id)) {
      setSelectedColleges([...selectedColleges, college]);
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  const removeCollegeFromComparison = (collegeId: number) => {
    setSelectedColleges(selectedColleges.filter(c => c.id !== collegeId));
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">Compare Schools</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Compare up to 4 colleges side by side to make informed decisions about your education
          </p>
        </div>

        {/* Search Section */}
        <Card className="glass-card max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Schools to Compare ({selectedColleges.length}/4)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Input
                placeholder="Search for a college to add..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={selectedColleges.length >= 4}
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-10 mt-1">
                  {searchResults.map((college) => (
                    <div
                      key={college.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      onClick={() => addCollegeToComparison(college)}
                    >
                      <div className="font-medium">{college['school.name']}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {college['school.city']}, {college['school.state']}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {selectedColleges.length >= 4 && (
              <p className="text-sm text-gray-500 mt-2">Maximum of 4 schools can be compared at once</p>
            )}
          </CardContent>
        </Card>

        {/* Comparison Table */}
        {selectedColleges.length > 0 && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-6">
              {/* School Headers */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {selectedColleges.map((college) => (
                  <Card key={college.id} className="glass-card">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg line-clamp-2">
                            {college['school.name']}
                          </CardTitle>
                          <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {college['school.city']}, {college['school.state']}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCollegeFromComparison(college.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {/* Comparison Metrics */}
              <div className="space-y-6">
                {/* Admission Rate */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Acceptance Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {selectedColleges.map((college) => (
                        <div key={college.id} className="text-center">
                          <div className="flex items-center justify-center mb-2">
                            <div className={`w-4 h-4 rounded-full ${getAdmissionRateColor(college['latest.admissions.admission_rate.overall'])} mr-2`}></div>
                            <Badge variant="secondary">
                              {formatPercentage(college['latest.admissions.admission_rate.overall'])}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Student Size */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Student Population
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {selectedColleges.map((college) => (
                        <div key={college.id} className="text-center">
                          <div className="text-lg font-medium">
                            {formatNumber(college['latest.student.size'])}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Tuition Costs */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Annual Tuition
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">In-State Tuition</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {selectedColleges.map((college) => (
                            <div key={college.id} className="text-center">
                              <div className="text-lg font-medium text-green-600">
                                {formatCurrency(college['latest.cost.tuition.in_state'])}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Out-of-State Tuition</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {selectedColleges.map((college) => (
                            <div key={college.id} className="text-center">
                              <div className="text-lg font-medium text-blue-600">
                                {formatCurrency(college['latest.cost.tuition.out_of_state'])}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {selectedColleges.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">No schools selected</h3>
            <p className="text-gray-500">Search and add schools above to start comparing them</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareSchools;
