
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, DollarSign, GraduationCap, Star, Globe, Phone, Mail, Calendar, BookOpen, Award, TrendingUp, Heart, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { collegeService } from '@/services/collegeService';
import { useToast } from '@/components/ui/use-toast';

interface College {
  id: string;
  name: string;
  location: string;
  studentBodySize: number;
  tuitionFees: {
    domestic: number;
    international: number;
  };
  acceptanceRate: number;
  ranking: number;
  url: string;
  phone: string;
  email: string;
  calendar: string;
  description: string;
  awards: string[];
  trendingScore: number;
  professorsCount: number;
}

const CollegeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [college, setCollege] = useState<College | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchCollegeDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (id) {
          const collegeDetails = await collegeService.getCollegeById(id);
          setCollege(collegeDetails);
        } else {
          setError('College ID is missing.');
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch college details.';
        setError(message);
        toast({
          title: "Failed to load college details",
          description: message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollegeDetails();
  }, [id, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-amber-400/20 dark:from-orange-600/10 dark:to-amber-600/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-400/20 dark:from-orange-700/10 dark:to-red-600/10 rounded-full blur-3xl animate-wave"></div>
        </div>
        <div className="text-center relative z-10 animate-pulse-scale">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 dark:border-orange-800 border-t-orange-600 dark:border-t-orange-400 mx-auto mb-8"></div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Loading college details...</h3>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">Please wait while we fetch the information</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="glass-card max-w-md w-full border-red-200 dark:border-red-800 animate-scale-bounce">
          <CardContent className="pt-6 text-center">
            <div className="text-red-600 dark:text-red-400 mb-4">
              <BookOpen className="h-12 w-12 mx-auto animate-wave" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Error Loading College</h3>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="glass-card max-w-md w-full animate-fade-blur">
          <CardContent className="pt-6 text-center">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <GraduationCap className="h-12 w-12 mx-auto animate-pulse-scale" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">College Not Found</h3>
            <p className="text-gray-600 dark:text-gray-400">The requested college could not be found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Enhanced Background with Dark Mode */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-amber-200/30 dark:from-orange-600/20 dark:to-amber-600/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-300/20 to-red-200/20 dark:from-orange-700/15 dark:to-red-700/15 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 animate-wave" />
        <div className="absolute inset-0 grid-pattern animate-gradient-x" />
      </div>

      <div className="container mx-auto p-4 relative z-10">
        {/* Enhanced Back Button */}
        <Link 
          to="/explore" 
          className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-orange-200 dark:border-gray-600 hover:bg-orange-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${isVisible ? 'animate-slide-up-bounce' : 'opacity-0'} delay-100`}
        >
          <ArrowLeft className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          <span className="font-medium text-gray-700 dark:text-gray-300">Back to College Explorer</span>
        </Link>

        {/* Enhanced Main Card */}
        <Card className={`glass-card border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 ${isVisible ? 'animate-float-in' : 'opacity-0'} delay-300`}>
          <CardHeader className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-amber-600/10 dark:from-orange-600/20 dark:to-amber-600/20 animate-gradient-x"></div>
            <CardTitle className="relative text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent animate-text-shimmer">
              {college.name}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: MapPin, label: "Location", value: college.location },
                { icon: Users, label: "Student Body Size", value: college.studentBodySize.toLocaleString() },
                { icon: DollarSign, label: "Tuition (Domestic)", value: `$${college.tuitionFees.domestic.toLocaleString()}` },
                { icon: DollarSign, label: "Tuition (International)", value: `$${college.tuitionFees.international.toLocaleString()}` },
                { icon: GraduationCap, label: "Acceptance Rate", value: `${college.acceptanceRate}%` },
                { icon: Star, label: "Ranking", value: `#${college.ranking}` },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-xl bg-gradient-to-br from-white/80 to-orange-50/80 dark:from-gray-800/80 dark:to-gray-700/80 border border-orange-200/50 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300 hover:scale-105 group animate-scale-bounce delay-${400 + index * 100}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{item.label}</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-orange-200 dark:via-orange-800 to-transparent" />

            {/* Description */}
            <div className="animate-fade-blur delay-1000">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                About {college.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{college.description}</p>
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-orange-200 dark:via-orange-800 to-transparent" />

            {/* Contact Information */}
            <div className="animate-spiral-in delay-1200">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: Globe, label: "Website", value: college.url, isLink: true },
                  { icon: Phone, label: "Phone", value: college.phone },
                  { icon: Mail, label: "Email", value: college.email, isLink: true },
                  { icon: Calendar, label: "Calendar", value: college.calendar },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50/50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                    <item.icon className="h-4 w-4 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}: </span>
                      {item.isLink ? (
                        <a 
                          href={item.value.startsWith('http') ? item.value : `mailto:${item.value}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-orange-600 dark:text-orange-400 hover:underline font-medium"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="font-medium text-gray-900 dark:text-gray-100">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-orange-200 dark:via-orange-800 to-transparent" />

            {/* Awards */}
            <div className="animate-elastic delay-1400">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Award className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                Awards & Recognition
              </h3>
              <div className="flex flex-wrap gap-2">
                {college.awards.map((award, index) => (
                  <Badge 
                    key={index} 
                    className={`bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-700 hover:scale-105 transition-transform duration-300 animate-scale-bounce delay-${1500 + index * 100}`}
                  >
                    {award}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-orange-200 dark:via-orange-800 to-transparent" />

            {/* Trending Score */}
            <div className="animate-slide-up-bounce delay-1600">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  Trending Score
                </h3>
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">{college.trendingScore}%</span>
              </div>
              <Progress value={college.trendingScore} className="h-3 bg-gray-200 dark:bg-gray-700" />
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-orange-200 dark:via-orange-800 to-transparent" />

            {/* Professors Count */}
            <div className="animate-fade-blur delay-1800">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200 dark:border-orange-800">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
                  <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Faculty Members</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{college.professorsCount.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 animate-elastic delay-2000">
              <Button className="btn-quantum-ripple flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white">
                <Heart className="h-4 w-4 mr-2" />
                Save College
              </Button>
              <Button variant="secondary" className="flex-1 hover:scale-105 transition-all duration-300">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollegeDetails;
