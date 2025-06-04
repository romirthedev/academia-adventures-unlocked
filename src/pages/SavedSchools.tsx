
import React, { useState, useEffect } from 'react';
import { Bookmark, MapPin, X, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { savedSchoolsUtils } from '@/utils/savedSchools';
import { useNavigate } from 'react-router-dom';

interface SavedSchool {
  id: number;
  name: string;
  city: string;
  state: string;
  savedAt: string;
}

const SavedSchools = () => {
  const [savedSchools, setSavedSchools] = useState<SavedSchool[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const schools = savedSchoolsUtils.getSavedSchools();
    setSavedSchools(schools);
  }, []);

  const handleRemoveSchool = (schoolId: number) => {
    savedSchoolsUtils.removeSavedSchool(schoolId);
    setSavedSchools(savedSchools.filter(school => school.id !== schoolId));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4 flex items-center justify-center gap-2">
            <Bookmark className="h-8 w-8" />
            Saved Schools
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your bookmarked colleges for easy access and comparison
          </p>
        </div>

        {savedSchools.length > 0 ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedSchools.map((school, index) => (
                <Card 
                  key={school.id} 
                  className="glass-card hover:scale-105 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2 mb-2">
                          {school.name}
                        </CardTitle>
                        <div className="flex items-center text-gray-600 text-sm mb-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {school.city}, {school.state}
                        </div>
                        <div className="text-xs text-gray-500">
                          Saved on {formatDate(school.savedAt)}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveSchool(school.id);
                        }}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 college-gradient text-white"
                        onClick={() => navigate(`/college/${school.id}`)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/explore')}
                        className="border-college-primary/30 hover:bg-college-primary hover:text-white"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Bookmark className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">No saved schools yet</h3>
            <p className="text-gray-500 mb-6">
              Start exploring colleges and save your favorites for easy access
            </p>
            <Button
              onClick={() => navigate('/explore')}
              className="college-gradient text-white"
            >
              Explore Colleges
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedSchools;
