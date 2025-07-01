
import React, { useState, useEffect } from 'react';
import { Plus, X, Users, DollarSign, TrendingUp, MapPin, BarChart3, Search } from 'lucide-react';
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
    queryFn: () => collegeService.searchColleges({ query: searchTerm }),
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
    if (!rate) return 'bg-white/20';
    if (rate <= 0.2) return 'bg-red-500/20';
    if (rate <= 0.4) return 'bg-orange-500/20';
    if (rate <= 0.6) return 'bg-yellow-500/20';
    if (rate <= 0.8) return 'bg-green-500/20';
    return 'bg-blue-500/20';
  };

  return (
    <div className="min-h-screen bg-black text-white font-inherit">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-xl mb-6">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-thin mb-4 text-white">Compare Schools</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto font-light">
            Compare up to 4 colleges side by side to make informed decisions about your education
          </p>
        </div>

        {/* Search Section */}
        <Card className="modern-card max-w-2xl mx-auto mb-12 animate-slide-up delay-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white font-light">
              <Plus className="h-5 w-5 text-white" />
              Add Schools to Compare ({selectedColleges.length}/4)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-white/60" />
              </div>
              <Input
                placeholder="Search for a college to add..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={selectedColleges.length >= 4}
                className="pl-10 bg-black/50 border-white/20 text-white placeholder-white/40"
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-black/90 border border-white/20 rounded-lg shadow-xl z-10 mt-1">
                  {searchResults.map((college) => (
                    <div
                      key={college.id}
                      className="p-4 hover:bg-white/10 cursor-pointer border-b border-white/10 last:border-b-0 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                      onClick={() => addCollegeToComparison(college)}
                    >
                      <div className="font-medium text-white">{college['school.name']}</div>
                      <div className="text-sm text-white/60 flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {college['school.city']}, {college['school.state']}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {selectedColleges.length >= 4 && (
              <p className="text-sm text-white/60 mt-3 font-light">Maximum of 4 schools can be compared at once</p>
            )}
          </CardContent>
        </Card>

        {/* Comparison Table */}
        {selectedColleges.length > 0 && (
          <div className="max-w-7xl mx-auto animate-fade-in delay-300">
            <div className="grid grid-cols-1 gap-8">
              {/* School Headers */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {selectedColleges.map((college, index) => (
                  <Card key={college.id} className="modern-card hover-lift" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-2 text-white mb-2 font-light">
                            {college['school.name']}
                          </CardTitle>
                          <div className="text-sm text-white/60 flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-white" />
                            {college['school.city']}, {college['school.state']}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCollegeFromComparison(college.id)}
                          className="ml-2 hover:bg-white/10 text-white/60 hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {/* Comparison Metrics */}
              <div className="space-y-8">
                {/* Admission Rate */}
                <Card className="modern-card">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3 text-white font-light">
                      <TrendingUp className="h-6 w-6 text-white" />
                      Acceptance Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {selectedColleges.map((college) => (
                        <div key={college.id} className="text-center p-4 bg-white/5 rounded-xl">
                          <div className="flex items-center justify-center mb-3">
                            <div className={`w-4 h-4 rounded-full ${getAdmissionRateColor(college['latest.admissions.admission_rate.overall'])} mr-3`}></div>
                            <Badge variant="secondary" className="text-base px-4 py-2 bg-white/10 text-white border-white/20">
                              {formatPercentage(college['latest.admissions.admission_rate.overall'])}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Student Size */}
                <Card className="modern-card">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3 text-white font-light">
                      <Users className="h-6 w-6 text-white" />
                      Student Population
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {selectedColleges.map((college) => (
                        <div key={college.id} className="text-center p-4 bg-white/5 rounded-xl">
                          <div className="text-2xl font-light text-white mb-1">
                            {formatNumber(college['latest.student.size'])}
                          </div>
                          <div className="text-sm text-white/60 font-light">Students</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Tuition Costs */}
                <Card className="modern-card">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3 text-white font-light">
                      <DollarSign className="h-6 w-6 text-white" />
                      Annual Tuition
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-light mb-4 text-white text-lg">In-State Tuition</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          {selectedColleges.map((college) => (
                            <div key={college.id} className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                              <div className="text-xl font-light text-white">
                                {formatCurrency(college['latest.cost.tuition.in_state'])}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-light mb-4 text-white text-lg">Out-of-State Tuition</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          {selectedColleges.map((college) => (
                            <div key={college.id} className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                              <div className="text-xl font-light text-white">
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
          <div className="text-center py-20 animate-fade-in delay-400">
            <div className="text-white/60 mb-6">
              <Plus className="h-20 w-20 mx-auto opacity-50" />
            </div>
            <h3 className="text-2xl font-light text-white mb-3">No schools selected</h3>
            <p className="text-white/60 text-lg font-light">Search and add schools above to start comparing them</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareSchools;
