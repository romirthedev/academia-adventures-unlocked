import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Calendar, Clock, CheckCircle, XCircle, AlertCircle, FileText, Mail, DollarSign, Target, TrendingUp, BarChart3, Filter, Search, Edit, Trash2, Eye, Download, Share2, Bell, Star, Bookmark, GraduationCap, MapPin, Users, Building, Award, Globe, Clock as ClockIcon, Calendar as CalendarIcon, CheckSquare, Square, AlertTriangle, Info, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { collegeService } from '@/services/collegeService';

interface Application {
  id: string;
  collegeId: number;
  collegeName: string;
  collegeLocation: string;
  status: 'not-started' | 'in-progress' | 'submitted' | 'accepted' | 'rejected' | 'waitlisted' | 'deferred';
  applicationType: 'early-decision' | 'early-action' | 'regular-decision' | 'rolling';
  deadline: Date;
  submittedDate?: Date;
  decisionDate?: Date;
  notes: string;
  priority: 'safety' | 'target' | 'reach' | 'dream';
  cost: number;
  financialAid: boolean;
  scholarships: string[];
  requirements: {
    essay: boolean;
    recommendations: boolean;
    testScores: boolean;
    portfolio: boolean;
    interview: boolean;
  };
  progress: {
    essay: boolean;
    recommendations: boolean;
    testScores: boolean;
    portfolio: boolean;
    interview: boolean;
    application: boolean;
    financialAid: boolean;
  };
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface ApplicationStats {
  total: number;
  notStarted: number;
  inProgress: number;
  submitted: number;
  accepted: number;
  rejected: number;
  waitlisted: number;
  deferred: number;
  upcomingDeadlines: number;
  overdue: number;
}

const ApplicationTracker = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('deadline');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [stats, setStats] = useState<ApplicationStats>({
    total: 0,
    notStarted: 0,
    inProgress: 0,
    submitted: 0,
    accepted: 0,
    rejected: 0,
    waitlisted: 0,
    deferred: 0,
    upcomingDeadlines: 0,
    overdue: 0
  });

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    filterAndSortApplications();
    calculateStats();
  }, [applications, searchQuery, statusFilter, priorityFilter, sortBy]);

  const loadApplications = () => {
    setLoading(true);
    // Load from localStorage for now
    const saved = localStorage.getItem('collegeApplications');
    if (saved) {
      const parsed = JSON.parse(saved);
      setApplications(parsed.map((app: any) => ({
        ...app,
        deadline: new Date(app.deadline),
        submittedDate: app.submittedDate ? new Date(app.submittedDate) : undefined,
        decisionDate: app.decisionDate ? new Date(app.decisionDate) : undefined,
        createdAt: new Date(app.createdAt),
        updatedAt: new Date(app.updatedAt)
      })));
    }
    setLoading(false);
  };

  const saveApplications = (newApplications: Application[]) => {
    localStorage.setItem('collegeApplications', JSON.stringify(newApplications));
    setApplications(newApplications);
  };

  const filterAndSortApplications = () => {
    let filtered = applications.filter(app => {
      const matchesSearch = app.collegeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           app.collegeLocation.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || app.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });

    // Sort applications
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return a.deadline.getTime() - b.deadline.getTime();
        case 'college':
          return a.collegeName.localeCompare(b.collegeName);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'priority':
          return a.priority.localeCompare(b.priority);
        case 'submitted':
          if (!a.submittedDate && !b.submittedDate) return 0;
          if (!a.submittedDate) return 1;
          if (!b.submittedDate) return -1;
          return b.submittedDate.getTime() - a.submittedDate.getTime();
        default:
          return 0;
      }
    });

    setFilteredApplications(filtered);
  };

  const calculateStats = () => {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const newStats: ApplicationStats = {
      total: applications.length,
      notStarted: applications.filter(app => app.status === 'not-started').length,
      inProgress: applications.filter(app => app.status === 'in-progress').length,
      submitted: applications.filter(app => app.status === 'submitted').length,
      accepted: applications.filter(app => app.status === 'accepted').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
      waitlisted: applications.filter(app => app.status === 'waitlisted').length,
      deferred: applications.filter(app => app.status === 'deferred').length,
      upcomingDeadlines: applications.filter(app => 
        app.deadline > now && app.deadline <= thirtyDaysFromNow && app.status !== 'submitted'
      ).length,
      overdue: applications.filter(app => 
        app.deadline < now && app.status !== 'submitted'
      ).length
    };

    setStats(newStats);
  };

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'not-started': return <Square className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'submitted': return <FileText className="h-4 w-4" />;
      case 'accepted': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'waitlisted': return <AlertCircle className="h-4 w-4" />;
      case 'deferred': return <Clock className="h-4 w-4" />;
      default: return <Square className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'not-started': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'submitted': return 'bg-purple-100 text-purple-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'waitlisted': return 'bg-yellow-100 text-yellow-800';
      case 'deferred': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Application['priority']) => {
    switch (priority) {
      case 'safety': return 'bg-green-100 text-green-800';
      case 'target': return 'bg-blue-100 text-blue-800';
      case 'reach': return 'bg-orange-100 text-orange-800';
      case 'dream': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilDeadline = (deadline: Date) => {
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressPercentage = (progress: Application['progress']) => {
    const total = Object.keys(progress).length;
    const completed = Object.values(progress).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  };

  const updateApplicationStatus = (applicationId: string, newStatus: Application['status']) => {
    const updated = applications.map(app => 
      app.id === applicationId 
        ? { ...app, status: newStatus, updatedAt: new Date() }
        : app
    );
    saveApplications(updated);
    
    toast({
      title: "Status updated",
      description: `Application status changed to ${newStatus.replace('-', ' ')}.`,
    });
  };

  const deleteApplication = (applicationId: string) => {
    const updated = applications.filter(app => app.id !== applicationId);
    saveApplications(updated);
    
    toast({
      title: "Application deleted",
      description: "The application has been removed from your tracker.",
    });
  };

  const exportApplications = () => {
    const csvData = [
      ['College', 'Location', 'Status', 'Priority', 'Deadline', 'Submitted Date', 'Decision Date', 'Cost', 'Progress'],
      ...filteredApplications.map(app => [
        app.collegeName,
        app.collegeLocation,
        app.status,
        app.priority,
        app.deadline.toLocaleDateString(),
        app.submittedDate?.toLocaleDateString() || 'N/A',
        app.decisionDate?.toLocaleDateString() || 'N/A',
        `$${app.cost.toLocaleString()}`,
        `${getProgressPercentage(app.progress)}%`
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `college-applications-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Exported!",
      description: "Your applications have been exported as CSV.",
    });
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-college-primary hover:text-college-primary/80"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              <h1 className="text-2xl font-bold gradient-text">Application Tracker</h1>
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={exportApplications}
                      disabled={applications.length === 0}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Export Applications</TooltipContent>
                </Tooltip>
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="college-gradient text-white px-4 py-2 rounded-xl hover:scale-105 transition-transform duration-200"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Application
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Submitted</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.submitted}</p>
                  </div>
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Accepted</p>
                    <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Upcoming</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.upcomingDeadlines}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="glass-card rounded-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search applications by college name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg rounded-xl border-0 bg-white/50 backdrop-blur-sm focus:bg-white/70 transition-all duration-300"
                />
              </div>
              <div className="flex gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="waitlisted">Waitlisted</SelectItem>
                    <SelectItem value="deferred">Deferred</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="target">Target</SelectItem>
                    <SelectItem value="reach">Reach</SelectItem>
                    <SelectItem value="dream">Dream</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="college">College Name</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="submitted">Submitted Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Applications List */}
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading applications...</p>
            </div>
          ) : filteredApplications.length > 0 ? (
            <div className="space-y-4">
              {filteredApplications.map((application) => {
                const daysUntilDeadline = getDaysUntilDeadline(application.deadline);
                const progressPercentage = getProgressPercentage(application.progress);
                const isOverdue = daysUntilDeadline < 0 && application.status !== 'submitted';
                const isUpcoming = daysUntilDeadline <= 30 && daysUntilDeadline >= 0 && application.status !== 'submitted';
                
                return (
                  <Card 
                    key={application.id} 
                    className={`glass-card hover:shadow-lg transition-all duration-300 ${
                      isOverdue ? 'border-red-200 bg-red-50/50' : 
                      isUpcoming ? 'border-orange-200 bg-orange-50/50' : ''
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {application.collegeName}
                            </h3>
                            <Badge className={getStatusColor(application.status)}>
                              {getStatusIcon(application.status)}
                              <span className="ml-1 capitalize">
                                {application.status.replace('-', ' ')}
                              </span>
                            </Badge>
                            <Badge className={getPriorityColor(application.priority)}>
                              {application.priority}
                            </Badge>
                            {isOverdue && (
                              <Badge className="bg-red-100 text-red-800">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Overdue
                              </Badge>
                            )}
                            {isUpcoming && (
                              <Badge className="bg-orange-100 text-orange-800">
                                <Clock className="h-3 w-3 mr-1" />
                                Due Soon
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {application.collegeLocation}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Deadline: {application.deadline.toLocaleDateString()}
                              {!isOverdue && application.status !== 'submitted' && (
                                <span className="ml-1 text-gray-500">
                                  ({daysUntilDeadline} days)
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              ${application.cost.toLocaleString()}
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Application Progress</span>
                              <span className="text-sm text-gray-600">{progressPercentage}%</span>
                            </div>
                            <Progress value={progressPercentage} className="h-2" />
                          </div>
                          
                          {/* Requirements Checklist */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                            {Object.entries(application.requirements).map(([req, required]) => {
                              const completed = application.progress[req as keyof typeof application.progress];
                              return (
                                <div key={req} className="flex items-center gap-2">
                                  {completed ? (
                                    <CheckSquare className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Square className="h-4 w-4 text-gray-400" />
                                  )}
                                  <span className={completed ? 'text-green-700' : 'text-gray-600'}>
                                    {req.charAt(0).toUpperCase() + req.slice(1)}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedApplication(application)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {/* Edit functionality */}}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteApplication(application.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mb-6">
                <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No applications found</h3>
                <p className="text-gray-500">
                  {applications.length === 0 
                    ? "Start tracking your college applications to stay organized."
                    : "Try adjusting your search or filters to find more applications."
                  }
                </p>
              </div>
              {applications.length === 0 && (
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="college-gradient text-white px-8 py-3 rounded-xl hover:scale-105 transition-transform duration-200"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Application
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ApplicationTracker; 