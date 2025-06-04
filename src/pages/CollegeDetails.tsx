
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, DollarSign, TrendingUp, ExternalLink, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { collegeService } from '@/services/collegeService';

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
  const [college, setCollege] = useState<CollegeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-college-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading college details...</p>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/explore')}
            className="text-college-primary hover:text-college-primary/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Explorer
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* College Header */}
        <div className="glass-card rounded-2xl p-8 mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold gradient-text mb-4">
                {college['school.name']}
              </h1>
              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                {college['school.city']}, {college['school.state']}
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/50 rounded-xl">
                  <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <p className="text-sm text-gray-600">Students</p>
                  <p className="font-semibold">{formatNumber(college['latest.student.size'])}</p>
                </div>
                
                <div className="text-center p-4 bg-white/50 rounded-xl">
                  <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <p className="text-sm text-gray-600">Acceptance Rate</p>
                  <p className="font-semibold">{formatPercentage(college['latest.admissions.admission_rate.overall'])}</p>
                </div>
                
                <div className="text-center p-4 bg-white/50 rounded-xl">
                  <DollarSign className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                  <p className="text-sm text-gray-600">Avg. Net Price</p>
                  <p className="font-semibold">{formatCurrency(college['latest.cost.avg_net_price.overall'])}</p>
                </div>
                
                <div className="text-center p-4 bg-white/50 rounded-xl">
                  <GraduationCap className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                  <p className="text-sm text-gray-600">Graduation Rate</p>
                  <p className="font-semibold">{formatPercentage(college['latest.completion.completion_rate_4yr_150nt'])}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              {college['school.school_url'] && (
                <Button
                  onClick={() => window.open(`https://${college['school.school_url']}`, '_blank')}
                  className="college-gradient text-white hover:scale-105 transition-transform"
                >
                  Visit Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* What This College Values */}
        <Card className="glass-card border-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="text-2xl gradient-text">What This College Values</CardTitle>
            <p className="text-gray-600">Based on institutional data and performance metrics</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {collegeValues.map((value, index) => (
              <div key={value.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">{value.name}</h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {value.value}%
                  </Badge>
                </div>
                
                <div className="relative">
                  <Progress
                    value={animationStarted ? value.value : 0}
                    className="h-4 bg-gray-200"
                  />
                  <div
                    className={`absolute top-0 left-0 h-4 rounded-full transition-all duration-1000 ease-out ${value.color}`}
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
          <Card className="glass-card border-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="gradient-text">Financial Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">In-State Tuition</span>
                <span className="font-semibold">{formatCurrency(college['latest.cost.tuition.in_state'])}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Out-of-State Tuition</span>
                <span className="font-semibold">{formatCurrency(college['latest.cost.tuition.out_of_state'])}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Net Price</span>
                <span className="font-semibold">{formatCurrency(college['latest.cost.avg_net_price.overall'])}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Median Earnings (10 years)</span>
                <span className="font-semibold">{formatCurrency(college['latest.earnings.10_yrs_after_entry.median'])}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <CardHeader>
              <CardTitle className="gradient-text">Academic Programs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Bachelor's Degrees</span>
                <Badge variant={college['latest.academics.program_available.bachelors'] ? 'default' : 'secondary'}>
                  {college['latest.academics.program_available.bachelors'] ? 'Available' : 'Not Available'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Master's Degrees</span>
                <Badge variant={college['latest.academics.program_available.masters'] ? 'default' : 'secondary'}>
                  {college['latest.academics.program_available.masters'] ? 'Available' : 'Not Available'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Doctoral Degrees</span>
                <Badge variant={college['latest.academics.program_available.doctoral'] ? 'default' : 'secondary'}>
                  {college['latest.academics.program_available.doctoral'] ? 'Available' : 'Not Available'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Institution Type</span>
                <span className="font-semibold">
                  {college['school.ownership'] === 1 ? 'Public' : 
                   college['school.ownership'] === 2 ? 'Private Non-Profit' : 'Private For-Profit'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;
