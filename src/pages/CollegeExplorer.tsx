
import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Users, DollarSign, TrendingUp, Star, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CollegeCard } from '@/components/CollegeCard';
import { FilterPanel } from '@/components/FilterPanel';
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

const CollegeExplorer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    state: '',
    minSize: '',
    maxSize: '',
    minAdmissionRate: '',
    maxAdmissionRate: '',
    maxTuition: ''
  });
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    searchColleges();
  }, [searchParams, filters, page]);

  const searchColleges = async () => {
    setLoading(true);
    try {
      const params = {
        query: searchQuery,
        ...filters,
        page,
        per_page: 20
      };
      
      const response = await collegeService.searchColleges(params);
      setColleges(response.results);
      setTotalResults(response.metadata.total);
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

  return (
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
            <div className="w-24" /> {/* Spacer */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
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
                Search
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
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <FilterPanel filters={filters} onChange={handleFilterChange} />
            </div>
          )}
        </div>

        {/* Results Summary */}
        {totalResults > 0 && (
          <div className="mb-6">
            <p className="text-gray-600">
              Found <span className="font-semibold text-college-primary">{totalResults.toLocaleString()}</span> colleges
              {searchQuery && (
                <span> matching "<span className="font-semibold">{searchQuery}</span>"</span>
              )}
            </p>
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
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && colleges.length === 0 && searchQuery && (
          <div className="text-center py-16">
            <div className="mb-6">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No colleges found</h3>
              <p className="text-gray-500">
                Try adjusting your search terms or filters to find more results.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setFilters({
                  state: '',
                  minSize: '',
                  maxSize: '',
                  minAdmissionRate: '',
                  maxAdmissionRate: '',
                  maxTuition: ''
                });
                setSearchParams({});
              }}
              className="border-college-primary/30 hover:bg-college-primary hover:text-white transition-all duration-300"
            >
              Clear all filters
            </Button>
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
  );
};

export default CollegeExplorer;
