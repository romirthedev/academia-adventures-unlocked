import React, { useState, useMemo } from 'react';
import { Search, MapPin, School, ExternalLink, Users, AlertCircle, BookOpen, Copy, Check, Sparkles, Filter, SortDesc } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { professorDatabase, professorService } from '@/services/professorService';
import { useToast } from '@/hooks/use-toast';

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
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [copiedEmails, setCopiedEmails] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'name' | 'university' | 'relevance'>('relevance');
  const { toast } = useToast();

  // Extract unique school names from professor database
  const allSchools = useMemo(() => {
    const db: Professor[] = professorDatabase;
    const schools: string[] = db.map((prof: Professor) => prof.university);
    return Array.from(new Set(schools)).sort();
  }, []);

  const filteredSchools = useMemo(() => {
    if (!schoolFilter) return allSchools;
    return allSchools.filter((school: string) =>
      school.toLowerCase().includes(schoolFilter.toLowerCase())
    );
  }, [schoolFilter, allSchools]);

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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const results = await professorService.searchProfessors({
        field: selectedField,
        school: schoolFilter,
        location: locationFilter
      });
      setProfessors(results);
    } catch (err) {
      setError('Failed to fetch professors.');
    } finally {
      setIsLoading(false);
    }
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
    <div className="prof-search-container min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden py-12">
      <div className="prof-search-form_area mb-12">
        <p className="prof-search-title">Find Professors</p>
        <form onSubmit={handleSearch} autoComplete="off">
          <div className="prof-search-form_group">
            <label className="prof-search-sub_title" htmlFor="field">Field</label>
            <select
              id="field"
              className="prof-search-form_style"
              value={selectedField}
              onChange={e => setSelectedField(e.target.value)}
            >
              <option value="">Select a field</option>
              {researchFields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>
          <div className="prof-search-form_group" style={{ position: 'relative' }}>
            <label className="prof-search-sub_title" htmlFor="school">School</label>
            <input
              id="school"
              className="prof-search-form_style"
              type="text"
              placeholder="Start typing school name"
              value={schoolFilter}
              onChange={e => {
                setSchoolFilter(e.target.value);
                setShowSchoolDropdown(true);
              }}
              onFocus={() => setShowSchoolDropdown(true)}
              onBlur={() => setTimeout(() => setShowSchoolDropdown(false), 150)}
              autoComplete="off"
            />
            {showSchoolDropdown && filteredSchools.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '0 0 8px 8px',
                zIndex: 10,
                maxHeight: 180,
                overflowY: 'auto',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                {filteredSchools.map((school: string) => (
                  <div
                    key={school}
                    style={{ padding: '8px 12px', cursor: 'pointer' }}
                    onMouseDown={() => {
                      setSchoolFilter(school);
                      setShowSchoolDropdown(false);
                    }}
                  >
                    {school}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="prof-search-form_group">
            <label className="prof-search-sub_title" htmlFor="location">Location</label>
            <input
              id="location"
              className="prof-search-form_style"
              type="text"
              placeholder="Enter location"
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
            />
          </div>
          <div>
            <button className="prof-search-btn" type="submit" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search Professors'}
            </button>
          </div>
        </form>
      </div>
      {/* Professor Results Grid */}
      <div className="max-w-7xl mx-auto w-full px-4">
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        {!isLoading && professors.length === 0 && (
          <div className="text-gray-500 text-center">No professors found. Try adjusting your search.</div>
        )}
        {isLoading && <div className="text-center text-orange-600">Loading...</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mt-8">
          {professors.map((professor, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2 border border-orange-100">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-bold text-lg text-orange-900">{professor.name}</div>
                  <div className="text-orange-600 text-sm font-semibold">{professor.title}</div>
                </div>
                <div className="text-xs text-orange-500 font-bold">{professor.university}</div>
              </div>
              <div className="text-gray-700 text-sm mb-1">{professor.department}</div>
              <div className="text-gray-500 text-xs mb-1">{professor.location}</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {professor.researchAreas.map((area, i) => (
                  <span key={i} className="bg-orange-50 text-orange-700 px-2 py-1 rounded-full text-xs font-medium border border-orange-200">{area}</span>
                ))}
              </div>
              {professor.email && (
                <a href={`mailto:${professor.email}`} className="text-blue-600 text-xs underline">{professor.email}</a>
              )}
              {professor.profileUrl && (
                <a href={professor.profileUrl} target="_blank" rel="noopener noreferrer" className="text-orange-500 text-xs underline">Profile</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindProfessors;
