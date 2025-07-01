import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Users, DollarSign, TrendingUp, Star, ChevronDown, Grid, List, Bookmark, Share2, Download, Sparkles, Target, Award, Globe, Clock, Heart, Eye, BarChart3, SortAsc, SortDesc, X, Tag, Shield, Microscope, Calculator, Briefcase, BookOpen, Palette, Rocket, Heart as HeartIcon, Brain, Trophy, Lightbulb, Building, Leaf, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CollegeCard } from '@/components/CollegeCard';
import { FilterPanel } from '@/components/FilterPanel';
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

interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: any;
  createdAt: Date;
}

interface TagFilter {
  type: string;
  label: string;
  category: string;
}

// Available tag filters
const availableTagFilters: TagFilter[] = [
  // Selectivity tags
  { type: 'selectivity', label: 'Very Selective', category: 'Admission Difficulty' },
  { type: 'selectivity', label: 'Highly Selective', category: 'Admission Difficulty' },
  { type: 'selectivity', label: 'Selective', category: 'Admission Difficulty' },
  { type: 'selectivity', label: 'Moderately Selective', category: 'Admission Difficulty' },
  { type: 'selectivity', label: 'Less Selective', category: 'Admission Difficulty' },
  
  // Size tags
  { type: 'size', label: 'Small', category: 'School Size' },
  { type: 'size', label: 'Medium', category: 'School Size' },
  { type: 'size', label: 'Large', category: 'School Size' },
  
  // Focus area tags
  { type: 'focus', label: 'STEM', category: 'Academic Focus' },
  { type: 'focus', label: 'Engineering', category: 'Academic Focus' },
  { type: 'focus', label: 'Business', category: 'Academic Focus' },
  { type: 'focus', label: 'Liberal Arts', category: 'Academic Focus' },
  { type: 'focus', label: 'Arts', category: 'Academic Focus' },
  { type: 'focus', label: 'Research', category: 'Academic Focus' },
  { type: 'focus', label: 'Technology', category: 'Academic Focus' },
  { type: 'focus', label: 'Medicine', category: 'Academic Focus' },
  { type: 'focus', label: 'Humanities', category: 'Academic Focus' },
  { type: 'focus', label: 'Innovation', category: 'Academic Focus' },
  
  // Special tags
  { type: 'special', label: 'Public', category: 'School Type' },
  { type: 'special', label: 'Private', category: 'School Type' },
  { type: 'special', label: 'Ivy League', category: 'School Type' },
  { type: 'special', label: 'Research Intensive', category: 'School Type' },
  { type: 'special', label: 'Liberal Arts Focus', category: 'School Type' },
  { type: 'special', label: 'Urban Campus', category: 'School Type' },
  { type: 'special', label: 'Suburban Campus', category: 'School Type' },
  { type: 'special', label: 'Rural Campus', category: 'School Type' }
];

const sortOptions = [
  { value: 'name', label: 'Name A-Z', icon: SortAsc },
  { value: 'name-desc', label: 'Name Z-A', icon: SortDesc },
  { value: 'admission-rate', label: 'Admission Rate (Low to High)', icon: TrendingUp },
  { value: 'admission-rate-desc', label: 'Admission Rate (High to Low)', icon: TrendingUp },
  { value: 'tuition', label: 'Tuition (Low to High)', icon: DollarSign },
  { value: 'tuition-desc', label: 'Tuition (High to Low)', icon: DollarSign },
  { value: 'size', label: 'Size (Small to Large)', icon: Users },
  { value: 'size-desc', label: 'Size (Large to Small)', icon: Users },
];

const popularSearches = [
  { query: 'engineering', label: 'Engineering Schools' },
  { query: 'business', label: 'Business Programs' },
  { query: 'liberal arts', label: 'Liberal Arts Colleges' },
  { query: 'research universities', label: 'Research Universities' },
  { query: 'small colleges', label: 'Small Colleges' },
  { query: 'public universities', label: 'Public Universities' },
];

const CollegeExplorer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [showTagFilters, setShowTagFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const [selectedTags, setSelectedTags] = useState<TagFilter[]>([]);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    state: '',
    minSize: '',
    maxSize: '',
    minAdmissionRate: '',
    maxAdmissionRate: '',
    maxTuition: '',
    type: '',
    region: ''
  });
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Check if we're in comparison mode from URL
  useEffect(() => {
    const isComparisonMode = searchParams.get('comparison') === 'true';
    setComparisonMode(isComparisonMode);
  }, [searchParams]);

  useEffect(() => {
    searchColleges();
    loadSavedSearches();
    loadRecentSearches();
  }, [searchParams, filters, page, sortBy, selectedTags]);

  const searchColleges = async () => {
    setLoading(true);
    try {
      const params = {
        query: searchQuery,
        ...filters,
        sort: sortBy,
        page,
        per_page: 50
      };
      
      const response = await collegeService.searchColleges(params);
      let filteredColleges = response.results;
      
      // Apply tag-based filtering
      if (selectedTags.length > 0) {
        filteredColleges = filteredColleges.filter(college => {
          return selectedTags.every(tag => {
            const schoolName = college['school.name'].toLowerCase();
            const admissionRate = college['latest.admissions.admission_rate.overall'];
            const studentSize = college['latest.student.size'];
            
            switch (tag.type) {
              case 'selectivity':
                if (!admissionRate) return false;
                const percentage = admissionRate * 100;
                switch (tag.label) {
                  case 'Very Selective': return percentage < 10;
                  case 'Highly Selective': return percentage >= 10 && percentage < 25;
                  case 'Selective': return percentage >= 25 && percentage < 50;
                  case 'Moderately Selective': return percentage >= 50 && percentage < 75;
                  case 'Less Selective': return percentage >= 75;
                  default: return false;
                }
              
              case 'size':
                if (!studentSize) return false;
                switch (tag.label) {
                  case 'Small': return studentSize < 5000;
                  case 'Medium': return studentSize >= 5000 && studentSize < 15000;
                  case 'Large': return studentSize >= 15000;
                  default: return false;
                }
              
              case 'focus':
                switch (tag.label) {
                  case 'Technology': return schoolName.includes('tech') || schoolName.includes('institute of technology');
                  case 'Engineering': return schoolName.includes('tech') || schoolName.includes('institute of technology');
                  case 'Business': return schoolName.includes('business') || schoolName.includes('management');
                  case 'Arts': return schoolName.includes('arts') && !schoolName.includes('liberal');
                  case 'Liberal Arts': return schoolName.includes('liberal') || (schoolName.includes('college') && !schoolName.includes('university'));
                  case 'Medicine': return schoolName.includes('medical') || schoolName.includes('health');
                  case 'Research': return studentSize && studentSize > 20000;
                  default: return false;
                }
              
              case 'special':
                switch (tag.label) {
                  case 'Ivy League': 
                    return schoolName.includes('harvard') || schoolName.includes('yale') || schoolName.includes('princeton') || 
                           schoolName.includes('columbia') || schoolName.includes('penn') || schoolName.includes('brown') || 
                           schoolName.includes('dartmouth') || schoolName.includes('cornell');
                  case 'Public': return schoolName.includes('university of') && !schoolName.includes('private');
                  case 'Private': return !schoolName.includes('university of') || schoolName.includes('private');
                  case 'Research Intensive': return studentSize && studentSize > 20000;
                  default: return false;
                }
              
              default:
                return false;
            }
          });
        });
      }
      
      setColleges(filteredColleges);
      setTotalResults(filteredColleges.length);
      
      // Add to recent searches
      if (searchQuery) {
        addToRecentSearches(searchQuery);
      }
    } catch (error) {
      console.error('Error searching colleges:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(0);
    if (searchQuery) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(0);
  };

  const handleTagToggle = (tag: TagFilter) => {
    setSelectedTags(prev => {
      const isSelected = prev.some(t => t.type === tag.type && t.label === tag.label);
      if (isSelected) {
        return prev.filter(t => !(t.type === tag.type && t.label === tag.label));
      } else {
        return [...prev, tag];
      }
    });
    setPage(0);
  };

  const clearAllTags = () => {
    setSelectedTags([]);
    setPage(0);
  };

  const saveCurrentSearch = () => {
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      name: searchQuery || 'Untitled Search',
      query: searchQuery,
      filters: { ...filters, tags: selectedTags },
      createdAt: new Date()
    };
    
    setSavedSearches(prev => [newSearch, ...prev]);
    localStorage.setItem('savedSearches', JSON.stringify([newSearch, ...savedSearches]));
  };

  const loadSavedSearches = () => {
    const saved = localStorage.getItem('savedSearches');
    if (saved) {
      setSavedSearches(JSON.parse(saved));
    }
  };

  const loadRecentSearches = () => {
    const recent = localStorage.getItem('recentSearches');
    if (recent) {
      setRecentSearches(JSON.parse(recent));
    }
  };

  const addToRecentSearches = (query: string) => {
    const updated = [query, ...recentSearches.filter(q => q !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const exportResults = () => {
    const csvContent = [
      ['Name', 'City', 'State', 'Admission Rate', 'In-State Tuition', 'Out-of-State Tuition', 'Student Size'],
      ...colleges.map(college => [
        college['school.name'],
        college['school.city'],
        college['school.state'],
        college['latest.admissions.admission_rate.overall']?.toFixed(2) + '%' || 'N/A',
        '$' + (college['latest.cost.tuition.in_state']?.toLocaleString() || 'N/A'),
        '$' + (college['latest.cost.tuition.out_of_state']?.toLocaleString() || 'N/A'),
        college['latest.student.size']?.toLocaleString() || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `college-search-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Group tags by category for better organization
  const groupedTags = availableTagFilters.reduce((acc, tag) => {
    if (!acc[tag.category]) {
      acc[tag.category] = [];
    }
    acc[tag.category].push(tag);
    return acc;
  }, {} as Record<string, TagFilter[]>);

  const toggleComparisonMode = () => {
    const newMode = !comparisonMode;
    setComparisonMode(newMode);
    setSelectedForComparison([]);
    
    if (newMode) {
      setSearchParams(prev => {
        prev.set('comparison', 'true');
        return prev;
      });
    } else {
      setSearchParams(prev => {
        prev.delete('comparison');
        return prev;
      });
    }
  };

  const toggleCollegeForComparison = (collegeId: number) => {
    setSelectedForComparison(prev => {
      if (prev.includes(collegeId)) {
        return prev.filter(id => id !== collegeId);
      } else {
        if (prev.length >= 4) {
          toast({
            title: "Maximum reached",
            description: "You can compare up to 4 colleges at a time.",
            variant: "destructive",
          });
          return prev;
        }
        return [...prev, collegeId];
      }
    });
  };

  const startComparison = () => {
    if (selectedForComparison.length < 2) {
      toast({
        title: "Select more colleges",
        description: "Please select at least 2 colleges to compare.",
        variant: "destructive",
      });
      return;
    }
    
    const collegeIds = selectedForComparison.join(',');
    navigate(`/compare?colleges=${collegeIds}`);
  };

  const clearComparison = () => {
    setSelectedForComparison([]);
    setComparisonMode(false);
    setSearchParams(prev => {
      prev.delete('comparison');
      return prev;
    });
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-college-primary hover:text-college-primary/80"
              >
                ← Back to Home
              </Button>
              <h1 className="text-2xl font-bold gradient-text">College Explorer</h1>
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={comparisonMode ? "default" : "ghost"}
                      size="sm"
                      onClick={toggleComparisonMode}
                      className={comparisonMode ? "bg-college-primary text-white" : ""}
                    >
                      <Scale className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Comparison Mode</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSavedSearches(!showSavedSearches)}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Saved Searches</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={exportResults}
                      disabled={colleges.length === 0}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Export Results</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Comparison Mode Banner */}
          {comparisonMode && (
            <div className="glass-card rounded-2xl p-4 mb-6 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Scale className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-blue-800">Comparison Mode Active</h3>
                    <p className="text-sm text-blue-600">
                      Select up to 4 colleges to compare side by side
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {selectedForComparison.length > 0 && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {selectedForComparison.length}/4 selected
                    </Badge>
                  )}
                  <Button
                    onClick={startComparison}
                    disabled={selectedForComparison.length < 2}
                    className="college-gradient text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-200"
                  >
                    Compare Selected
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearComparison}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Search and Filter Bar */}
          <div className="glass-card rounded-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search colleges by name, location, or program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-12 pr-4 py-3 text-lg rounded-xl border-0 bg-white/50 backdrop-blur-sm focus:bg-white/70 transition-all duration-300"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleSearch}
                  className="college-gradient text-white px-8 py-3 rounded-xl hover:scale-105 transition-transform duration-200"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowTagFilters(!showTagFilters)}
                  className="px-6 py-3 rounded-xl border-college-primary/30 hover:bg-college-primary hover:text-white transition-all duration-300"
                >
                  <Tag className="mr-2 h-5 w-5" />
                  Tags
                  <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${showTagFilters ? 'rotate-180' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-6 py-3 rounded-xl border-college-primary/30 hover:bg-college-primary hover:text-white transition-all duration-300"
                >
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                  <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  onClick={saveCurrentSearch}
                  className="px-4 py-3 rounded-xl border-college-primary/30 hover:bg-college-primary hover:text-white transition-all duration-300"
                >
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Selected Tags Display */}
            {selectedTags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Active Filters:</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllTags}
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1 text-sm cursor-pointer hover:bg-red-100 hover:text-red-700 transition-colors"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag.label}
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Search Suggestions */}
            {!searchQuery && (
              <div className="mt-4">
                <div className="text-sm font-medium text-gray-600 mb-2">Popular Searches:</div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchQuery(search.query);
                        handleSearch();
                      }}
                      className="text-xs hover:bg-college-primary hover:text-white transition-all"
                    >
                      {search.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && !searchQuery && (
              <div className="mt-4">
                <div className="text-sm font-medium text-gray-600 mb-2">Recent Searches:</div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((query, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchQuery(query);
                        handleSearch();
                      }}
                      className="text-xs hover:bg-college-primary hover:text-white transition-all"
                    >
                      {query}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Tag Filter Panel */}
            {showTagFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(groupedTags).map(([category, tags]) => (
                    <div key={category}>
                      <h3 className="font-semibold text-gray-800 mb-3">{category}</h3>
                      <div className="space-y-2">
                        {tags.map((tag) => {
                          const isSelected = selectedTags.some(t => t.type === tag.type && t.label === tag.label);
                          return (
                            <Button
                              key={`${tag.type}-${tag.label}`}
                              variant={isSelected ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleTagToggle(tag)}
                              className={`w-full justify-start text-xs ${
                                isSelected 
                                  ? 'bg-college-primary text-white' 
                                  : 'hover:bg-college-primary hover:text-white'
                              }`}
                            >
                              {tag.label}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Filter Panel */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <FilterPanel filters={filters} onChange={handleFilterChange} />
              </div>
            )}
          </div>

          {/* Saved Searches Panel */}
          {showSavedSearches && savedSearches.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5" />
                  Saved Searches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedSearches.map((search) => (
                    <div
                      key={search.id}
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                      onClick={() => {
                        setSearchQuery(search.query);
                        setFilters(search.filters);
                        if (search.filters.tags) {
                          setSelectedTags(search.filters.tags);
                        }
                        handleSearch();
                        setShowSavedSearches(false);
                      }}
                    >
                      <div className="font-medium text-sm">{search.name}</div>
                      <div className="text-xs text-gray-500">{search.query}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(search.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Summary and Controls */}
          {totalResults > 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div>
                <p className="text-gray-600">
                  Found <span className="font-semibold text-college-primary">{totalResults.toLocaleString()}</span> colleges
                  {searchQuery && (
                    <span> matching "<span className="font-semibold">{searchQuery}</span>"</span>
                  )}
                  {selectedTags.length > 0 && (
                    <span> with <span className="font-semibold">{selectedTags.length}</span> tag filter{selectedTags.length > 1 ? 's' : ''}</span>
                  )}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Sort Options */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className="h-4 w-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* College Results Grid */}
          {!loading && colleges.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {colleges.map((college, index) => (
                <CollegeCard
                  key={college.id}
                  college={college}
                  index={index}
                  onClick={() => navigate(`/college/${college.id}`)}
                  comparisonMode={comparisonMode}
                  isSelectedForComparison={selectedForComparison.includes(college.id)}
                  onComparisonToggle={toggleCollegeForComparison}
                />
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && colleges.length === 0 && (searchQuery || selectedTags.length > 0) && (
            <div className="text-center py-16">
              <div className="mb-6">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No colleges found</h3>
                <p className="text-gray-500">
                  Try adjusting your search terms, tags, or filters to find more results.
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTags([]);
                    setFilters({
                      state: '',
                      minSize: '',
                      maxSize: '',
                      minAdmissionRate: '',
                      maxAdmissionRate: '',
                      maxTuition: '',
                      type: '',
                      region: ''
                    });
                    setSearchParams({});
                  }}
                  className="border-college-primary/30 hover:bg-college-primary hover:text-white transition-all duration-300"
                >
                  Clear all filters
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowTagFilters(true)}
                  className="border-college-primary/30 hover:bg-college-primary hover:text-white transition-all duration-300"
                >
                  <Tag className="mr-2 h-4 w-4" />
                  Browse by tags
                </Button>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalResults > 20 && (
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="border-college-primary/30 hover:bg-college-primary hover:text-white transition-all duration-300"
                >
                  Previous
                </Button>
                <div className="flex items-center px-4 py-2 text-sm text-gray-600">
                  Page {page + 1} of {Math.ceil(totalResults / 20)}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setPage(page + 1)}
                  disabled={(page + 1) * 20 >= totalResults}
                  className="border-college-primary/30 hover:bg-college-primary hover:text-white transition-all duration-300"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CollegeExplorer;
