
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
    'Materials Science',
    'History',
    'Literature',
    'Philosophy',
    'Political Science',
    'Sociology',
    'Anthropology',
    'Art History',
    'Music',
    'Theater Arts',
    'Linguistics',
    'Education',
    'Law',
    'Medicine',
    'Public Health',
    'Social Work',
    'International Relations',
    'Journalism'
  ];

  const handleEmailCopy = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmails(prev => new Set(prev).add(email));
      
      toast({
        title: "Email copied!",
        description: `${email} has been copied to your clipboard.`,
      });

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
      
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12 relative">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-xl mb-6">
            <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">Find Leading Professors</h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto px-4">
            Connect with world-class researchers and academics in your field of interest
          </p>
        </div>

        {/* Search Form */}
        <Card className="glass-card max-w-4xl mx-auto mb-8 sm:mb-12 border-0 animate-slide-up delay-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-gray-900 text-lg sm:text-xl">
              <Search className="h-5 w-5 text-orange-600" />
              Search Criteria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                <label className="text-sm font-medium text-gray-900">Research Field *</label>
                <Select value={selectedField} onValueChange={setSelectedField}>
                  <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-200">
                    <SelectValue placeholder="Select field of interest" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
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
              className="btn-primary w-full py-4 sm:py-6 text-base sm:text-lg"
            >
              {isLoading ? 'Searching...' : 'Find Professors'}
            </Button>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12 sm:py-16 animate-fade-in">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-2 border-orange-600 border-t-transparent mx-auto mb-6"></div>
            <p className="text-base sm:text-lg text-gray-900 mb-2">Searching for professors...</p>
            <p className="text-sm sm:text-base text-gray-600">Finding the best matches for your criteria</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="max-w-2xl mx-auto animate-fade-in px-4">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-red-700">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
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
            <div className="mb-6 sm:mb-8 animate-fade-in px-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Found {professors.length} Professor{professors.length !== 1 ? 's' : ''}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">AI-generated profiles based on your search criteria</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
              {professors.map((professor, index) => (
                <Card 
                  key={`${professor.name}-${index}`} 
                  className="glass-card border-0 hover-lift animate-fade-in shadow-lg" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base sm:text-lg text-gray-900">{professor.name}</CardTitle>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="font-medium text-gray-900">{professor.title}</p>
                      <p className="flex items-center gap-2">
                        <School className="h-4 w-4 text-orange-600 flex-shrink-0" />
                        <span className="text-gray-900 text-xs sm:text-sm">{professor.department}</span>
                      </p>
                      <p className="font-medium text-gray-900 text-xs sm:text-sm">{professor.university}</p>
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-orange-600 flex-shrink-0" />
                        <span className="text-gray-900 text-xs sm:text-sm">{professor.location}</span>
                      </p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {professor.labName && (
                      <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <p className="text-sm font-medium text-orange-700 flex items-center gap-2">
                          <Users className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{professor.labName}</span>
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm font-medium mb-3 text-gray-900">Research Areas:</p>
                      <div className="flex flex-wrap gap-2">
                        {professor.researchAreas.slice(0, 3).map((area, areaIndex) => (
                          <Badge 
                            key={areaIndex} 
                            variant="secondary" 
                            className="text-xs bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200"
                          >
                            {area}
                          </Badge>
                        ))}
                        {professor.researchAreas.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                            +{professor.researchAreas.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 pt-2">
                      {professor.email && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEmailCopy(professor.email!)}
                          className="w-full border-orange-200 hover:bg-orange-50 text-gray-900 text-xs sm:text-sm"
                        >
                          {copiedEmails.has(professor.email) ? (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              Email Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-1" />
                              Copy Email
                            </>
                          )}
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
          <div className="text-center py-12 sm:py-16 animate-fade-in px-4">
            <p className="text-base sm:text-lg text-gray-900 mb-2">No professors found matching your criteria.</p>
            <p className="text-sm sm:text-base text-gray-600">Try adjusting your search parameters or removing some filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindProfessors;
