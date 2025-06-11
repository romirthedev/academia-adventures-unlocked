
import React, { useState } from 'react';
import { Search, MapPin, School, ExternalLink, Users, AlertCircle, BookOpen, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { professorService } from '@/services/professorService';
import { useToast } from '@/components/ui/use-toast';

interface Professor {
  name: string;
  title: string;
  department: string;
  university: string;
  location: string;
  researchAreas: string[];
  email?: string;
  profileUrl?: string;
  labName?: string;
}

const FindProfessors = () => {
  const [selectedField, setSelectedField] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedEmails, setCopiedEmails] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const researchFields = [
    'Computer Science',
    'Artificial Intelligence',
    'Machine Learning',
    'Data Science',
    'Cybersecurity',
    'Software Engineering',
    'Biomedical Engineering',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Chemistry',
    'Physics',
    'Biology',
    'Mathematics',
    'Psychology',
    'Economics',
    'Business Administration',
    'Environmental Science',
    'Materials Science'
  ];

  const handleEmailCopy = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmails(prev => new Set(prev).add(email));
      
      toast({
        title: "Email copied!",
        description: `${email} has been copied to your clipboard.`,
      });

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedEmails(prev => {
          const newSet = new Set(prev);
          newSet.delete(email);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      toast({
        title: "Failed to copy email",
        description: "Please copy the email manually.",
        variant: "destructive",
      });
    }
  };

  const handleSearch = async () => {
    if (!selectedField) {
      toast({
        title: "Please select a research field",
        description: "A research field is required to search for professors.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setProfessors([]);
    setError(null);
    
    try {
      console.log('Starting professor search...');
      const searchCriteria = {
        field: selectedField,
        school: schoolFilter || undefined,
        location: locationFilter || undefined,
      };
      
      const results = await professorService.searchProfessors(searchCriteria);
      setProfessors(results);
      
      if (results.length > 0) {
        toast({
          title: "Search completed",
          description: `Found ${results.length} professors matching your criteria.`,
        });
      } else {
        setError('No professors found with the current search criteria. Please try different parameters.');
      }
      
    } catch (error) {
      console.error('Search failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unable to search for professors. Please try again.';
      setError(errorMessage);
      
      toast({
        title: "Search failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="container mx-auto px-6 py-12 relative">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-xl mb-6">
            <BookOpen className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="heading-lg mb-4 text-gray-900">Find Leading Professors</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Connect with world-class researchers and academics in your field of interest
          </p>
        </div>

        {/* Search Form */}
        <Card className="glass-card max-w-4xl mx-auto mb-12 border-0 animate-slide-up delay-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-gray-900">
              <Search className="h-5 w-5 text-orange-600" />
              Search Criteria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Research Field *</label>
                <Select value={selectedField} onValueChange={setSelectedField}>
                  <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-200">
                    <SelectValue placeholder="Select field of interest" />
                  </SelectTrigger>
                  <SelectContent>
                    {researchFields.map((field) => (
                      <SelectItem key={field} value={field}>
                        {field}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">School (Optional)</label>
                <Input
                  placeholder="e.g., Stanford, MIT"
                  value={schoolFilter}
                  onChange={(e) => setSchoolFilter(e.target.value)}
                  className="border-orange-200 focus:border-orange-500 focus:ring-orange-200"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Location (Optional)</label>
                <Input
                  placeholder="e.g., California, Boston"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="border-orange-200 focus:border-orange-500 focus:ring-orange-200"
                />
              </div>
            </div>
            
            <Button 
              onClick={handleSearch}
              disabled={!selectedField || isLoading}
              className="btn-primary w-full py-6 text-lg"
            >
              {isLoading ? 'Searching...' : 'Find Professors'}
            </Button>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16 animate-fade-in">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-orange-600 border-t-transparent mx-auto mb-6"></div>
            <p className="text-lg text-gray-900 mb-2">Searching for professors...</p>
            <p className="text-gray-600">Finding the best matches for your criteria</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-red-700">
                  <AlertCircle className="h-5 w-5" />
                  <div>
                    <h3 className="font-medium">Search Unavailable</h3>
                    <p className="text-sm mt-1">{error}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results */}
        {professors.length > 0 && !isLoading && (
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900">
                Found {professors.length} Professor{professors.length !== 1 ? 's' : ''}
              </h2>
              <p className="text-gray-600 mt-1">AI-generated profiles based on your search criteria</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {professors.map((professor, index) => (
                <Card 
                  key={`${professor.name}-${index}`} 
                  className="glass-card border-0 hover-lift animate-fade-in shadow-lg" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-gray-900">{professor.name}</CardTitle>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="font-medium text-gray-900">{professor.title}</p>
                      <p className="flex items-center gap-2">
                        <School className="h-4 w-4 text-orange-600" />
                        <span className="text-gray-900">{professor.department}</span>
                      </p>
                      <p className="font-medium text-gray-900">{professor.university}</p>
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-orange-600" />
                        <span className="text-gray-900">{professor.location}</span>
                      </p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {professor.labName && (
                      <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <p className="text-sm font-medium text-orange-700 flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {professor.labName}
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm font-medium mb-3 text-gray-900">Research Areas:</p>
                      <div className="flex flex-wrap gap-2">
                        {professor.researchAreas.map((area, areaIndex) => (
                          <Badge 
                            key={areaIndex} 
                            variant="secondary" 
                            className="text-xs bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200"
                          >
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-2">
                      {professor.email && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEmailCopy(professor.email!)}
                          className="flex-1 border-orange-200 hover:bg-orange-50 text-gray-900"
                        >
                          {copiedEmails.has(professor.email) ? (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-1" />
                              Copy Email
                            </>
                          )}
                        </Button>
                      )}
                      {professor.profileUrl && (
                        <Button
                          size="sm"
                          onClick={() => window.open(professor.profileUrl, '_blank')}
                          className="flex-1 btn-primary text-sm px-4 py-2"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Profile
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {professors.length === 0 && !isLoading && !error && selectedField && (
          <div className="text-center py-16 animate-fade-in">
            <p className="text-lg text-gray-900 mb-2">No professors found matching your criteria.</p>
            <p className="text-gray-600">Try adjusting your search parameters or removing some filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindProfessors;
