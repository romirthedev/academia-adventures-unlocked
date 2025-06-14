
import React, { useState } from 'react';
import { Search, MapPin, School, ExternalLink, Users, AlertCircle, BookOpen, Copy, Check, Sparkles, Filter, SortDesc, Globe, Mail } from 'lucide-react';
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
  const [sortBy, setSortBy] = useState<'name' | 'university' | 'relevance'>('relevance');
  const { toast } = useToast();

  const researchFields = [
    'Computer Science', 'Artificial Intelligence', 'Machine Learning', 'Data Science',
    'Cybersecurity', 'Software Engineering', 'Biomedical Engineering', 'Mechanical Engineering',
    'Electrical Engineering', 'Chemistry', 'Physics', 'Biology', 'Mathematics', 'Psychology',
    'Economics', 'Business Administration', 'Environmental Science', 'Materials Science',
    'History', 'Literature', 'Philosophy', 'Political Science', 'Sociology', 'Anthropology',
    'Art History', 'Music', 'Theater Arts', 'Linguistics', 'Education', 'Law', 'Medicine',
    'Public Health', 'Social Work', 'International Relations', 'Journalism'
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
      console.log('Starting optimized professor search...');
      const searchCriteria = {
        field: selectedField,
        school: schoolFilter || undefined,
        location: locationFilter || undefined,
      };
      
      // Use Promise.race to timeout after 10 seconds for better UX
      const searchPromise = professorService.searchProfessors(searchCriteria);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Search timeout - please try again')), 10000)
      );
      
      const results = await Promise.race([searchPromise, timeoutPromise]) as Professor[];
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

  const handleProfileClick = (professor: Professor) => {
    // Instead of trying to navigate to a potentially broken URL, 
    // we'll search for the professor on Google Scholar or their university
    const searchQuery = `${professor.name} ${professor.university} professor`;
    const googleScholarUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(searchQuery)}`;
    window.open(googleScholarUrl, '_blank');
  };

  const sortedProfessors = [...professors].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'university':
        return a.university.localeCompare(b.university);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-mclaren-papaya/5 relative overflow-hidden">
      {/* Enhanced Background Elements with McLaren styling */}
      <div className="absolute inset-0 animated-grid opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-mclaren-papaya/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-mclaren-papaya/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-10">
        {/* Enhanced Header with McLaren branding */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center p-4 gradient-bg rounded-2xl mb-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <BookOpen className="h-8 w-8 text-white mr-2" />
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gradient leading-tight">
            Discover World-Class Professors
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connect with leading researchers and academics who are shaping the future of their fields
          </p>
        </div>

        {/* Enhanced Search Form */}
        <Card className="glass-card max-w-5xl mx-auto mb-12 sm:mb-16 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-foreground text-xl sm:text-2xl">
              <div className="p-2 bg-mclaren-papaya/10 rounded-lg">
                <Search className="h-6 w-6 text-mclaren-papaya" />
              </div>
              Advanced Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-3 lg:col-span-1">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Filter className="h-4 w-4 text-mclaren-papaya" />
                  Research Field *
                </label>
                <Select value={selectedField} onValueChange={setSelectedField}>
                  <SelectTrigger className="h-12 border-2 border-border hover:border-mclaren-papaya focus:border-mclaren-papaya focus:ring-mclaren-papaya/20 bg-background text-foreground">
                    <SelectValue placeholder="Select your field of interest" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 bg-background border-border">
                    {researchFields.map((field) => (
                      <SelectItem key={field} value={field} className="hover:bg-mclaren-papaya/5 text-foreground">
                        {field}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <School className="h-4 w-4 text-mclaren-papaya" />
                  School (Optional)
                </label>
                <Input
                  placeholder="e.g., Stanford, MIT, Harvard"
                  value={schoolFilter}
                  onChange={(e) => setSchoolFilter(e.target.value)}
                  className="h-12 border-2 border-border hover:border-mclaren-papaya focus:border-mclaren-papaya focus:ring-mclaren-papaya/20 bg-background text-foreground"
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-mclaren-papaya" />
                  Location (Optional)
                </label>
                <Input
                  placeholder="e.g., California, Boston, New York"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="h-12 border-2 border-border hover:border-mclaren-papaya focus:border-mclaren-papaya focus:ring-mclaren-papaya/20 bg-background text-foreground"
                />
              </div>
            </div>
            
            <Button 
              onClick={handleSearch}
              disabled={!selectedField || isLoading}
              className="btn-quantum-ripple w-full h-14 text-lg font-semibold gradient-bg text-white shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-3" />
                  Find Professors
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16 sm:py-20 animate-fade-in">
            <div className="relative inline-block">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-mclaren-papaya/20 border-t-mclaren-papaya mx-auto mb-8"></div>
              <div className="absolute inset-0 rounded-full gradient-bg opacity-20 blur-xl animate-pulse"></div>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">Searching for professors...</h3>
            <p className="text-base sm:text-lg text-muted-foreground">Finding the best matches for your criteria</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 text-destructive">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Search Unavailable</h3>
                    <p className="text-sm mt-1 text-destructive/80">{error}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results */}
        {professors.length > 0 && !isLoading && (
          <div className="max-w-7xl mx-auto">
            {/* Results Header with Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Found {professors.length} Professor{professors.length !== 1 ? 's' : ''}
                </h2>
                <p className="text-base text-muted-foreground mt-1">AI-generated profiles based on your search criteria</p>
              </div>
              <div className="flex items-center gap-3">
                <SortDesc className="h-5 w-5 text-muted-foreground" />
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-40 border-border focus:border-mclaren-papaya text-foreground bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="relevance" className="text-foreground">Relevance</SelectItem>
                    <SelectItem value="name" className="text-foreground">Name</SelectItem>
                    <SelectItem value="university" className="text-foreground">University</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Enhanced Professor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {sortedProfessors.map((professor, index) => (
                <Card 
                  key={`${professor.name}-${index}`} 
                  className="glass-card border-0 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 group animate-fade-in overflow-hidden" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-mclaren-papaya/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-foreground group-hover:text-mclaren-papaya transition-colors duration-300">
                          {professor.name}
                        </CardTitle>
                        <p className="text-sm font-medium text-mclaren-papaya mt-1">{professor.title}</p>
                      </div>
                      <div className="p-2 bg-mclaren-papaya/10 rounded-lg group-hover:bg-mclaren-papaya/20 transition-colors duration-300">
                        <Users className="h-4 w-4 text-mclaren-papaya" />
                      </div>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <School className="h-4 w-4 text-mclaren-papaya flex-shrink-0" />
                        <span className="text-muted-foreground font-medium">{professor.department}</span>
                      </div>
                      <div className="text-sm font-semibold text-foreground">{professor.university}</div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-mclaren-papaya flex-shrink-0" />
                        <span className="text-muted-foreground">{professor.location}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-5 relative z-10">
                    {professor.labName && (
                      <div className="p-4 bg-mclaren-papaya/5 rounded-xl border border-mclaren-papaya/20 group-hover:bg-mclaren-papaya/10 transition-all duration-300">
                        <p className="text-sm font-semibold text-mclaren-papaya flex items-center gap-2">
                          <div className="p-1 bg-mclaren-papaya/20 rounded">
                            <Users className="h-3 w-3 text-mclaren-papaya" />
                          </div>
                          <span className="truncate">{professor.labName}</span>
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm font-semibold mb-3 text-foreground flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-mclaren-papaya" />
                        Research Areas
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {professor.researchAreas.slice(0, 3).map((area, areaIndex) => (
                          <Badge 
                            key={areaIndex} 
                            variant="secondary" 
                            className="text-xs bg-mclaren-papaya/10 text-mclaren-papaya border-mclaren-papaya/20 hover:bg-mclaren-papaya/20 transition-all duration-300"
                          >
                            {area}
                          </Badge>
                        ))}
                        {professor.researchAreas.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground hover:bg-muted/80 transition-colors duration-300">
                            +{professor.researchAreas.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      {professor.email && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEmailCopy(professor.email!)}
                          className="flex-1 h-10 border-2 border-mclaren-papaya/20 hover:bg-mclaren-papaya/5 hover:border-mclaren-papaya/30 text-foreground font-medium transition-all duration-300 group/btn"
                        >
                          {copiedEmails.has(professor.email) ? (
                            <>
                              <Check className="h-4 w-4 mr-2 text-green-600" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Mail className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                              Email
                            </>
                          )}
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleProfileClick(professor)}
                        className="flex-1 h-10 border-2 border-mclaren-papaya/20 hover:bg-mclaren-papaya/5 hover:border-mclaren-papaya/30 text-foreground font-medium transition-all duration-300 group/btn"
                      >
                        <Globe className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                        Search
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Empty State */}
        {professors.length === 0 && !isLoading && !error && selectedField && (
          <div className="text-center py-16 sm:py-20 animate-fade-in">
            <div className="p-6 bg-mclaren-papaya/5 rounded-2xl inline-block mb-6">
              <Search className="h-12 w-12 text-mclaren-papaya" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">No professors found</h3>
            <p className="text-base text-muted-foreground max-w-md mx-auto">
              Try adjusting your search parameters or removing some filters to see more results.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindProfessors;
