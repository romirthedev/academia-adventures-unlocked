
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, DollarSign, GraduationCap, Star, Globe, Phone, Mail, Calendar, BookOpen, Award, TrendingUp, Heart, Share2, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { collegeService } from '@/services/collegeService';
import { useToast } from '@/components/ui/use-toast';
import AIChat from '@/components/AIChat';

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
  const [collegeData, setCollegeData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCollegeDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (id) {
          const rawCollegeData = await collegeService.getCollegeById(id);
          setCollegeData(rawCollegeData);
          
          // Transform the raw API data into our interface format
          const transformedCollege: College = {
            id: rawCollegeData.id?.toString() || id,
            name: rawCollegeData['school.name'] || 'Unknown College',
            location: `${rawCollegeData['school.city'] || 'Unknown'}, ${rawCollegeData['school.state'] || 'Unknown'}`,
            studentBodySize: rawCollegeData['latest.student.size'] || 0,
            tuitionFees: {
              domestic: rawCollegeData['latest.cost.tuition.in_state'] || 0,
              international: rawCollegeData['latest.cost.tuition.out_of_state'] || 0,
            },
            acceptanceRate: rawCollegeData['latest.admissions.admission_rate.overall'] ? 
              rawCollegeData['latest.admissions.admission_rate.overall'] * 100 : 0,
            ranking: Math.floor(Math.random() * 100) + 1, // Mock ranking
            url: rawCollegeData['school.school_url'] || '',
            phone: rawCollegeData.phone || 'Contact information not available',
            email: rawCollegeData.email || 'Email not available',
            calendar: rawCollegeData['school.academic_year'] || 'Academic calendar not available',
            description: `${rawCollegeData['school.name']} is a ${rawCollegeData['school.ownership'] === 1 ? 'public' : 'private'} institution located in ${rawCollegeData['school.city']}, ${rawCollegeData['school.state']}.`,
            awards: ['Accredited Institution'], // Mock awards
            trendingScore: Math.floor(Math.random() * 100),
            professorsCount: Math.floor((rawCollegeData['latest.student.size'] || 1000) / 15), // Mock ratio
          };
          
          setCollege(transformedCollege);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading college details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!college || !collegeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">College not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-4">
        <Link to="/explore" className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="h-5 w-5" />
          Back to College Explorer
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main College Information */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-0 mb-6">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-3xl font-bold">{college.name}</CardTitle>
                <p className="flex items-center text-blue-100">
                  <MapPin className="h-5 w-5 mr-2" />
                  {college.location}
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="academics">Academics</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                    <TabsTrigger value="chat">AI Chat</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Users className="h-6 w-6 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-600">Student Body Size</p>
                            <p className="text-xl font-semibold">{college.studentBodySize.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <GraduationCap className="h-6 w-6 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-600">Acceptance Rate</p>
                            <p className="text-xl font-semibold">{college.acceptanceRate.toFixed(1)}%</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Star className="h-6 w-6 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-600">Ranking</p>
                            <p className="text-xl font-semibold">#{college.ranking}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <DollarSign className="h-6 w-6 text-green-600" />
                          <div>
                            <p className="text-sm text-gray-600">Tuition (In-State)</p>
                            <p className="text-xl font-semibold">${college.tuitionFees.domestic.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <DollarSign className="h-6 w-6 text-green-600" />
                          <div>
                            <p className="text-sm text-gray-600">Tuition (Out-of-State)</p>
                            <p className="text-xl font-semibold">${college.tuitionFees.international.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <TrendingUp className="h-6 w-6 text-purple-600" />
                          <div>
                            <p className="text-sm text-gray-600">Trending Score</p>
                            <div className="flex items-center gap-2">
                              <Progress value={college.trendingScore} className="flex-1" />
                              <span className="text-sm font-medium">{college.trendingScore}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        About {college.name}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{college.description}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="academics" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Users className="h-6 w-6 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-600">Faculty Count</p>
                            <p className="text-xl font-semibold">{college.professorsCount}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Award className="h-6 w-6 text-yellow-600" />
                          <div>
                            <p className="text-sm text-gray-600">Awards & Recognition</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {college.awards.map((award, index) => (
                                <Badge key={index} variant="secondary">{award}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-6 w-6 text-purple-600" />
                          <div>
                            <p className="text-sm text-gray-600">Academic Calendar</p>
                            <p className="text-lg">{college.calendar}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="contact" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Globe className="h-6 w-6 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-600">Website</p>
                            {college.url ? (
                              <a href={college.url} target="_blank" rel="noopener noreferrer" 
                                 className="text-blue-600 hover:text-blue-800 underline">
                                Visit Website
                              </a>
                            ) : (
                              <p className="text-gray-500">Website not available</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Phone className="h-6 w-6 text-green-600" />
                          <div>
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="text-lg">{college.phone}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Mail className="h-6 w-6 text-purple-600" />
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="text-lg">{college.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="chat" className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Chat with AI about {college.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Ask questions about admissions, programs, campus life, and more!
                      </p>
                    </div>
                    <AIChat collegeData={collegeData} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full college-gradient text-white">
                  <Heart className="h-4 w-4 mr-2" />
                  Save to Favorites
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share College
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Compare Schools
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Student-Faculty Ratio</span>
                  <span className="font-semibold">
                    {Math.round(college.studentBodySize / college.professorsCount)}:1
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Campus Setting</span>
                  <span className="font-semibold">Urban</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Type</span>
                  <span className="font-semibold">
                    {collegeData['school.ownership'] === 1 ? 'Public' : 'Private'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;
