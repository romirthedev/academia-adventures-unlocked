import React, { useState } from 'react';
import { Search, MapPin, School, ExternalLink, Users, AlertCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">Find Professors</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover leading researchers and professors in your field of interest using AI-powered web scraping
          </p>
        </div>

        {/* Search Form */}
        <Card className="glass-card max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Criteria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Research Field *</label>
                <Select value={selectedField} onValueChange={setSelectedField}>
                  <SelectTrigger>
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
              
              <div>
                <label className="block text-sm font-medium mb-2">School (Optional)</label>
                <Input
                  placeholder="e.g., Stanford, MIT"
                  value={schoolFilter}
                  onChange={(e) => setSchoolFilter(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Location (Optional)</label>
                <Input
                  placeholder="e.g., California, Boston"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>
            </div>
            
            <Button 
              onClick={handleSearch}
              disabled={!selectedField || isLoading}
              className="w-full college-gradient text-white"
            >
              {isLoading ? 'Searching with AI...' : 'Find Professors'}
            </Button>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 mb-2">Searching the web for professors...</p>
            <p className="text-sm text-gray-500">Using AI to find the most relevant matches</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="max-w-2xl mx-auto">
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
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
              Found {professors.length} Professor{professors.length !== 1 ? 's' : ''} 
              <span className="text-sm font-normal text-gray-600 ml-2">
                (Ranked by AI relevance)
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professors.map((professor, index) => (
                <Card key={`${professor.name}-${index}`} className="glass-card hover:scale-105 transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <CardTitle className="text-lg">{professor.name}</CardTitle>
                    <div className="text-sm text-gray-600">
                      <p>{professor.title}</p>
                      <p className="flex items-center gap-1">
                        <School className="h-4 w-4" />
                        {professor.department}
                      </p>
                      <p className="font-medium">{professor.university}</p>
                      <p className="flex items-center gap-1 text-gray-500">
                        <MapPin className="h-4 w-4" />
                        {professor.location}
                      </p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {professor.labName && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {professor.labName}
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Research Areas:</p>
                      <div className="flex flex-wrap gap-1">
                        {professor.researchAreas.map((area, areaIndex) => (
                          <Badge key={areaIndex} variant="secondary" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {professor.email && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`mailto:${professor.email}`, '_blank')}
                          className="flex-1"
                        >
                          Email
                        </Button>
                      )}
                      {professor.profileUrl && (
                        <Button
                          size="sm"
                          onClick={() => window.open(professor.profileUrl, '_blank')}
                          className="flex-1 college-gradient text-white"
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

        {/* No Results (different from error) */}
        {professors.length === 0 && !isLoading && !error && selectedField && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No professors found matching your criteria.</p>
            <p className="text-sm text-gray-500">Try adjusting your search parameters or removing some filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindProfessors;
