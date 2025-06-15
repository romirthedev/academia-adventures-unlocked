
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
    if (!rate) return 'bg-muted';
    if (rate <= 0.2) return 'bg-destructive';
    if (rate <= 0.4) return 'bg-orange-500';
    if (rate <= 0.6) return 'bg-yellow-500';
    if (rate <= 0.8) return 'bg-primary';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-inherit">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="container mx-auto px-6 py-12 relative">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-6">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="heading-lg mb-4 font-inherit">Compare Schools</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto font-inherit">
            Compare up to 4 colleges side by side to make informed decisions about your education
          </p>
        </div>

        {/* Search Section */}
        <Card className="glass-card max-w-2xl mx-auto mb-12 border-0 animate-slide-up delay-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-foreground font-inherit">
              <Plus className="h-5 w-5 text-primary" />
              Add Schools to Compare ({selectedColleges.length}/4)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                placeholder="Search for a college to add..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={selectedColleges.length >= 4}
                className="pl-10 border-border focus:border-primary focus:ring-primary/20 font-inherit"
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-xl z-10 mt-1 border-border">
                  {searchResults.map((college) => (
                    <div
                      key={college.id}
                      className="p-4 hover:bg-muted cursor-pointer border-b border-border last:border-b-0 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200 font-inherit"
                      onClick={() => addCollegeToComparison(college)}
                    >
                      <div className="font-medium text-foreground">{college['school.name']}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {college['school.city']}, {college['school.state']}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {selectedColleges.length >= 4 && (
              <p className="text-sm text-muted-foreground mt-3 font-inherit">Maximum of 4 schools can be compared at once</p>
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
                  <Card key={college.id} className="glass-card border-0 hover-lift font-inherit" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-2 text-foreground mb-2 font-inherit">
                            {college['school.name']}
                          </CardTitle>
                          <div className="text-sm text-muted-foreground flex items-center gap-2 font-inherit">
                            <MapPin className="h-4 w-4 text-primary" />
                            {college['school.city']}, {college['school.state']}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCollegeFromComparison(college.id)}
                          className="ml-2 hover:bg-destructive/10 hover:text-destructive font-inherit"
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
                <Card className="glass-card border-0 font-inherit">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3 text-foreground font-inherit">
                      <TrendingUp className="h-6 w-6 text-primary" />
                      Acceptance Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {selectedColleges.map((college) => (
                        <div key={college.id} className="text-center p-4 bg-muted/30 rounded-xl font-inherit">
                          <div className="flex items-center justify-center mb-3">
                            <div className={`w-4 h-4 rounded-full ${getAdmissionRateColor(college['latest.admissions.admission_rate.overall'])} mr-3`}></div>
                            <Badge variant="secondary" className="text-base px-4 py-2 font-inherit">
                              {formatPercentage(college['latest.admissions.admission_rate.overall'])}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Student Size */}
                <Card className="glass-card border-0 font-inherit">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3 text-foreground font-inherit">
                      <Users className="h-6 w-6 text-primary" />
                      Student Population
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {selectedColleges.map((college) => (
                        <div key={college.id} className="text-center p-4 bg-muted/30 rounded-xl font-inherit">
                          <div className="text-2xl font-bold text-primary mb-1 font-inherit">
                            {formatNumber(college['latest.student.size'])}
                          </div>
                          <div className="text-sm text-muted-foreground font-inherit">Students</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Tuition Costs */}
                <Card className="glass-card border-0 font-inherit">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3 text-foreground font-inherit">
                      <DollarSign className="h-6 w-6 text-primary" />
                      Annual Tuition
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-4 text-foreground text-lg font-inherit">In-State Tuition</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          {selectedColleges.map((college) => (
                            <div key={college.id} className="text-center p-4 bg-green-50 rounded-xl border border-green-200 font-inherit">
                              <div className="text-xl font-bold text-green-700 font-inherit">
                                {formatCurrency(college['latest.cost.tuition.in_state'])}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4 text-foreground text-lg font-inherit">Out-of-State Tuition</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          {selectedColleges.map((college) => (
                            <div key={college.id} className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200 font-inherit">
                              <div className="text-xl font-bold text-blue-700 font-inherit">
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
            <div className="text-muted-foreground mb-6">
              <Plus className="h-20 w-20 mx-auto opacity-50" />
            </div>
            <h3 className="text-2xl font-medium text-foreground mb-3 font-inherit">No schools selected</h3>
            <p className="text-muted-foreground text-lg font-inherit">Search and add schools above to start comparing them</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareSchools;
