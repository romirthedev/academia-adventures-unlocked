import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, DollarSign, TrendingUp, ExternalLink, GraduationCap, Bookmark, BookmarkCheck, Sparkles, AlertTriangle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { collegeService } from '@/services/collegeService';
import { aiCollegeService } from '@/services/aiCollegeService';
import { savedSchoolsUtils } from '@/utils/savedSchools';
import { useToast } from '@/components/ui/use-toast';
import { AppSidebar } from '@/components/AppSidebar';
import { HelpIcon } from '@/components/HelpIcon';
import { CollegeTags } from '@/components/CollegeTags';
import AIChat from '@/components/AIChat';

interface CollegeData {
  id: number;
  'school.name': string;
  'school.city': string;
  'school.state': string;
  'school.school_url': string;
  'latest.admissions.admission_rate.overall': number;
  'latest.cost.tuition.in_state': number;
  'latest.cost.tuition.out_of_state': number;
  'latest.student.size': number;
  'latest.cost.avg_net_price.overall': number;
  'latest.completion.completion_rate_4yr_150nt': number;
  'latest.earnings.10_yrs_after_entry.median': number;
  'school.ownership': number;
  'latest.academics.program_available.bachelors': boolean;
  'latest.academics.program_available.masters': boolean;
  'latest.academics.program_available.doctoral': boolean;
}

const CollegeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [college, setCollege] = useState<CollegeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [tabTransition, setTabTransition] = useState(false);

  useEffect(() => {
    fetchCollegeDetails();
  }, [id]);

  useEffect(() => {
    if (college && !animationStarted) {
      const timer = setTimeout(() => {
        setAnimationStarted(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [college, animationStarted]);

  useEffect(() => {
    if (college) {
      setIsSaved(savedSchoolsUtils.isSchoolSaved(college.id));
    }
  }, [college]);

  const fetchCollegeDetails = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const data = await collegeService.getCollegeById(id);
      setCollege(data);
    } catch (error) {
      console.error('Error fetching college details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAIAnalysis = async () => {
    if (!college) return;
    
    setLoadingAnalysis(true);
    try {
      const analysis = await aiCollegeService.analyzeCollegeForApplicants(college);
      setAiAnalysis(analysis);
      
      toast({
        title: "AI Analysis Complete",
        description: "Generated insights about what this college looks for in applicants.",
      });
    } catch (error) {
      console.error('Error fetching AI analysis:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to generate AI insights. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const handleSaveCollege = () => {
    if (!college) return;

    const schoolData = {
      id: college.id,
      name: college['school.name'],
      city: college['school.city'],
      state: college['school.state']
    };

    if (isSaved) {
      savedSchoolsUtils.removeSavedSchool(college.id);
      setIsSaved(false);
      toast({
        title: "Removed from saved",
        description: "College removed from your saved list.",
      });
    } else {
      const success = savedSchoolsUtils.saveSchool(schoolData);
      if (success) {
        setIsSaved(true);
        toast({
          title: "Saved successfully",
          description: "College added to your saved list.",
        });
      } else {
        toast({
          title: "Already saved",
          description: "This college is already in your saved list.",
          variant: "destructive",
        });
      }
    }
  };

  const handleTabChange = (newTab: string) => {
    if (newTab === activeTab) return;
    
    setTabTransition(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setTimeout(() => setTabTransition(false), 100);
    }, 150);
  };

  const formatCurrency = (amount: number) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    if (!rate) return 'N/A';
    return `${Math.round(rate * 100)}%`;
  };

  const formatNumber = (num: number) => {
    if (!num) return 'N/A';
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getCollegeValues = () => {
    if (!college) return [];

    const values = [];

    // Academic Excellence (based on graduation rate and earnings)
    const graduationRate = college['latest.completion.completion_rate_4yr_150nt'] || 0;
    const earnings = college['latest.earnings.10_yrs_after_entry.median'] || 0;
    const academicScore = Math.min(100, (graduationRate * 50) + (earnings / 2000));
    values.push({
      name: 'Academic Excellence',
      value: Math.round(academicScore),
      color: 'bg-blue-500',
      description: 'Based on graduation rates and alumni earnings'
    });

    // Affordability (inverse of cost)
    const avgCost = college['latest.cost.avg_net_price.overall'] || college['latest.cost.tuition.out_of_state'] || 50000;
    const affordabilityScore = Math.max(0, Math.min(100, 100 - (avgCost / 800)));
    values.push({
      name: 'Affordability',
      value: Math.round(affordabilityScore),
      color: 'bg-green-500',
      description: 'Based on average net price and tuition costs'
    });

    // Selectivity (inverse of admission rate)
    const admissionRate = college['latest.admissions.admission_rate.overall'] || 1;
    const selectivityScore = Math.max(0, Math.min(100, (1 - admissionRate) * 100));
    values.push({
      name: 'Selectivity',
      value: Math.round(selectivityScore),
      color: 'bg-purple-500',
      description: 'Based on admission rate and competitiveness'
    });

    // Research Opportunities (based on degree offerings)
    let researchScore = 30; // Base score
    if (college['latest.academics.program_available.masters']) researchScore += 25;
    if (college['latest.academics.program_available.doctoral']) researchScore += 45;
    values.push({
      name: 'Research Opportunities',
      value: Math.min(100, researchScore),
      color: 'bg-orange-500',
      description: 'Based on graduate program availability'
    });

    // Campus Life (based on student size - medium sizes often have better campus life)
    const studentSize = college['latest.student.size'] || 0;
    let campusScore = 40;
    if (studentSize > 2000 && studentSize < 15000) campusScore = 85;
    else if (studentSize > 15000 && studentSize < 30000) campusScore = 75;
    else if (studentSize > 30000) campusScore = 65;
    values.push({
      name: 'Campus Life',
      value: campusScore,
      color: 'bg-pink-500',
      description: 'Based on student body size and community feel'
    });

    return values;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-college-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading college details...</p>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">College Not Found</h2>
          <Button onClick={() => navigate('/explore')} className="college-gradient text-white">
            Back to Explorer
          </Button>
        </div>
      </div>
    );
  }

  const collegeValues = getCollegeValues();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/explore')}
                className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Explorer
              </Button>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* College Header */}
            <div className="modern-card rounded-2xl p-8 mb-8 animate-fade-in-up">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold gradient-text mb-4">
                    {college?.['school.name']}
                  </h1>
                  <div className="flex items-center text-slate-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    {college?.['school.city']}, {college?.['school.state']}
                  </div>
                  
                  {/* College Tags */}
                  {college && <CollegeTags collegeData={college} />}
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                      <Users className="h-6 w-6 mx-auto mb-2 text-indigo-600" />
                      <p className="text-sm text-slate-600">Students</p>
                      <p className="font-semibold text-slate-800">{formatNumber(college['latest.student.size'])}</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                      <TrendingUp className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
                      <p className="text-sm text-slate-600">Acceptance Rate</p>
                      <p className="font-semibold text-slate-800">{formatPercentage(college['latest.admissions.admission_rate.overall'])}</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-100">
                      <DollarSign className="h-6 w-6 mx-auto mb-2 text-violet-600" />
                      <p className="text-sm text-slate-600">Avg. Net Price</p>
                      <p className="font-semibold text-slate-800">{formatCurrency(college['latest.cost.avg_net_price.overall'])}</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                      <GraduationCap className="h-6 w-6 mx-auto mb-2 text-amber-600" />
                      <p className="text-sm text-slate-600">Graduation Rate</p>
                      <p className="font-semibold text-slate-800">{formatPercentage(college['latest.completion.completion_rate_4yr_150nt'])}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={handleSaveCollege}
                    variant={isSaved ? "default" : "outline"}
                    className={isSaved ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0" : "border-amber-500 text-amber-600 hover:bg-amber-50"}
                  >
                    {isSaved ? <BookmarkCheck className="mr-2 h-4 w-4" /> : <Bookmark className="mr-2 h-4 w-4" />}
                    {isSaved ? 'Saved' : 'Save College'}
                  </Button>
                  
                  {college['school.school_url'] && (
                    <Button
                      onClick={() => window.open(`https://${college['school.school_url']}`, '_blank')}
                      className="modern-gradient text-white hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Tabbed Content with Transition */}
            <div className={`transition-opacity duration-300 ${tabTransition ? 'opacity-0' : 'opacity-100'}`}>
              <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm border border-slate-200">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">College Overview</TabsTrigger>
                  <TabsTrigger value="admissions" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">AI Insights</TabsTrigger>
                  <TabsTrigger value="chat" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    AI Chat
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* What This College Values with Help Icons */}
                  <Card className="modern-card border-0 animate-fade-in-up stagger-1 hover-lift">
                    <CardHeader>
                      <CardTitle className="text-2xl gradient-text">What This College Values</CardTitle>
                      <p className="text-slate-600">Based on institutional data and performance metrics</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {collegeValues.map((value, index) => (
                        <div key={value.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div>
                                <h3 className="font-semibold text-slate-800">{value.name}</h3>
                                <p className="text-sm text-slate-600">{value.description}</p>
                              </div>
                              {college && (
                                <HelpIcon
                                  category={value.name}
                                  value={value.value}
                                  collegeData={college}
                                  description={value.description}
                                />
                              )}
                            </div>
                            <Badge variant="secondary" className="text-lg px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-200">
                              {value.value}%
                            </Badge>
                          </div>
                          
                          <div className="relative">
                            <Progress
                              value={animationStarted ? value.value : 0}
                              className="h-3 bg-slate-200"
                            />
                            <div
                              className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-1000 ease-out ${value.color}`}
                              style={{
                                width: animationStarted ? `${value.value}%` : '0%',
                                transitionDelay: `${index * 200}ms`
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Additional Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    <Card className="modern-card border-0 animate-slide-in-right stagger-2 hover-lift">
                      <CardHeader>
                        <CardTitle className="gradient-text">Financial Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-slate-600">In-State Tuition</span>
                          <span className="font-semibold">{formatCurrency(college['latest.cost.tuition.in_state'])}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Out-of-State Tuition</span>
                          <span className="font-semibold">{formatCurrency(college['latest.cost.tuition.out_of_state'])}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Average Net Price</span>
                          <span className="font-semibold">{formatCurrency(college['latest.cost.avg_net_price.overall'])}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Median Earnings (10 years)</span>
                          <span className="font-semibold">{formatCurrency(college['latest.earnings.10_yrs_after_entry.median'])}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="modern-card border-0 animate-slide-in-right stagger-3 hover-lift">
                      <CardHeader>
                        <CardTitle className="gradient-text">Academic Programs</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Bachelor's Degrees</span>
                          <Badge variant={college['latest.academics.program_available.bachelors'] ? 'default' : 'secondary'}>
                            {college['latest.academics.program_available.bachelors'] ? 'Available' : 'Not Available'}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Master's Degrees</span>
                          <Badge variant={college['latest.academics.program_available.masters'] ? 'default' : 'secondary'}>
                            {college['latest.academics.program_available.masters'] ? 'Available' : 'Not Available'}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Doctoral Degrees</span>
                          <Badge variant={college['latest.academics.program_available.doctoral'] ? 'default' : 'secondary'}>
                            {college['latest.academics.program_available.doctoral'] ? 'Available' : 'Not Available'}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Institution Type</span>
                          <span className="font-semibold">
                            {college['school.ownership'] === 1 ? 'Public' : 
                             college['school.ownership'] === 2 ? 'Private Non-Profit' : 'Private For-Profit'}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="admissions" className="space-y-6">
                  <Card className="modern-card border-0">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl gradient-text flex items-center gap-2">
                            <Sparkles className="h-6 w-6" />
                            AI Admissions Insights
                          </CardTitle>
                          <p className="text-slate-600 mt-2">AI-powered analysis of what this college looks for in applicants</p>
                        </div>
                        
                        <Button
                          onClick={fetchAIAnalysis}
                          disabled={loadingAnalysis}
                          className="modern-gradient text-white hover:scale-105 transition-all duration-200"
                        >
                          {loadingAnalysis ? 'Analyzing...' : 'Generate Insights'}
                        </Button>
                      </div>
                    </CardHeader>

                    {!aiAnalysis && !loadingAnalysis && (
                      <CardContent>
                        <div className="text-center py-12">
                          <Sparkles className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                          <p className="text-slate-600 mb-4">Click "Generate Insights" to get AI-powered analysis</p>
                          <p className="text-sm text-slate-500">Our AI will analyze this college's characteristics to provide personalized admissions advice</p>
                        </div>
                      </CardContent>
                    )}

                    {loadingAnalysis && (
                      <CardContent>
                        <div className="text-center py-12">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                          <p className="text-slate-600 mb-2">AI is analyzing college data...</p>
                          <p className="text-sm text-slate-500">Generating personalized admissions insights</p>
                        </div>
                      </CardContent>
                    )}

                    {aiAnalysis && (
                      <CardContent className="space-y-6">
                        {/* Program Verification Alert */}
                        {aiAnalysis.verifiedPrograms?.confidence?.includes('low') && (
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-amber-800">Program Information Verification</h4>
                                <p className="text-sm text-amber-700 mt-1">
                                  AI verification: {aiAnalysis.verifiedPrograms.confidence}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Ideal Student Profile */}
                        {aiAnalysis.idealStudent && (
                          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                            <h3 className="text-lg font-semibold mb-4 text-indigo-900">Ideal Student Profile</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium text-indigo-800 mb-2">Academic Profile</h4>
                                <p className="text-sm text-indigo-700 mb-4">{aiAnalysis.idealStudent.academicProfile}</p>
                                
                                <h4 className="font-medium text-indigo-800 mb-2">Background</h4>
                                <p className="text-sm text-indigo-700">{aiAnalysis.idealStudent.background}</p>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-indigo-800 mb-2">Key Extracurriculars</h4>
                                <div className="space-y-2 mb-4">
                                  {aiAnalysis.idealStudent.extracurriculars?.map((activity: string, index: number) => (
                                    <div key={index} className="flex items-center gap-2 text-sm text-indigo-700">
                                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                                      {activity}
                                    </div>
                                  ))}
                                </div>
                                
                                <h4 className="font-medium text-indigo-800 mb-2">Personality Traits</h4>
                                <div className="flex flex-wrap gap-2">
                                  {aiAnalysis.idealStudent.personalityTraits?.map((trait: string, index: number) => (
                                    <Badge key={index} variant="secondary" className="bg-indigo-100 text-indigo-700 border-indigo-200">
                                      {trait}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Admission Criteria */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3">What This College Values</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {aiAnalysis.admissionCriteria?.map((criterion: string, index: number) => (
                              <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-sm">{criterion}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Student Profile */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Ideal Student Profile</h3>
                          <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-gray-700">{aiAnalysis.studentProfile}</p>
                          </div>
                        </div>

                        {/* Competitive Factors */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Competitive Factors</h3>
                          <div className="space-y-2">
                            {aiAnalysis.competitiveFactors?.map((factor: string, index: number) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                                <Badge variant="secondary" className="text-xs">#{index + 1}</Badge>
                                <span className="text-sm">{factor}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Recommendations */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Application Recommendations</h3>
                          <div className="space-y-3">
                            {aiAnalysis.recommendations?.map((rec: string, index: number) => (
                              <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                                  {index + 1}
                                </div>
                                <span className="text-sm text-gray-700">{rec}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Verified Programs */}
                        {aiAnalysis.verifiedPrograms && (
                          <div>
                            <h3 className="text-lg font-semibold mb-3">AI-Verified Programs</h3>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Bachelor's</p>
                                <Badge variant={aiAnalysis.verifiedPrograms.bachelors ? 'default' : 'secondary'}>
                                  {aiAnalysis.verifiedPrograms.bachelors ? 'Verified' : 'Not Available'}
                                </Badge>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Master's</p>
                                <Badge variant={aiAnalysis.verifiedPrograms.masters ? 'default' : 'secondary'}>
                                  {aiAnalysis.verifiedPrograms.masters ? 'Verified' : 'Not Available'}
                                </Badge>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Doctoral</p>
                                <Badge variant={aiAnalysis.verifiedPrograms.doctoral ? 'default' : 'secondary'}>
                                  {aiAnalysis.verifiedPrograms.doctoral ? 'Verified' : 'Not Available'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                </TabsContent>

                <TabsContent value="chat" className="space-y-6">
                  <div className="animate-fade-in-up">
                    {college && <AIChat collegeData={college} />}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CollegeDetails;
