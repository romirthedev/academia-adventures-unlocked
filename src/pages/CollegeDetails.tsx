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
  const { toast } = useToast();

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
    return <div className="text-center">Loading college details...</div>;
  }

  if (error) {
    return <div className="text-center">Error: {error}</div>;
  }

  if (!college) {
    return <div className="text-center">College not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/explore" className="flex items-center gap-2 mb-4">
        <ArrowLeft className="h-5 w-5" />
        Back to College Explorer
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>{college.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p><MapPin className="inline-block h-4 w-4 mr-1" /> Location: {college.location}</p>
            <p><Users className="inline-block h-4 w-4 mr-1" /> Student Body Size: {college.studentBodySize}</p>
            <p><DollarSign className="inline-block h-4 w-4 mr-1" /> Tuition Fees (Domestic): ${college.tuitionFees.domestic}</p>
            <p><DollarSign className="inline-block h-4 w-4 mr-1" /> Tuition Fees (International): ${college.tuitionFees.international}</p>
            <p><GraduationCap className="inline-block h-4 w-4 mr-1" /> Acceptance Rate: {college.acceptanceRate}%</p>
            <p><Star className="inline-block h-4 w-4 mr-1" /> Ranking: {college.ranking}</p>
          </div>
          <Separator className="my-4" />
          <div className="mb-4">
            <p>Description: {college.description}</p>
          </div>
          <Separator className="my-4" />
          <div className="mb-4">
            <p><Globe className="inline-block h-4 w-4 mr-1" /> URL: <a href={college.url} target="_blank" rel="noopener noreferrer">{college.url}</a></p>
            <p><Phone className="inline-block h-4 w-4 mr-1" /> Phone: {college.phone}</p>
            <p><Mail className="inline-block h-4 w-4 mr-1" /> Email: {college.email}</p>
            <p><Calendar className="inline-block h-4 w-4 mr-1" /> Calendar: {college.calendar}</p>
          </div>
          <Separator className="my-4" />
          <div className="mb-4">
            <p><Award className="inline-block h-4 w-4 mr-1" /> Awards: {college.awards.join(', ')}</p>
          </div>
          <Separator className="my-4" />
          <div className="mb-4">
            <p><TrendingUp className="inline-block h-4 w-4 mr-1" /> Trending Score: {college.trendingScore}</p>
            <Progress value={college.trendingScore} />
          </div>
          <Separator className="my-4" />
           <div className="mb-4">
            <p><Users className="inline-block h-4 w-4 mr-1" /> Professors Count: {college.professorsCount}</p>
          </div>
          <div className="flex gap-2">
            <Button><Heart className="inline-block h-4 w-4 mr-1" /> Save</Button>
            <Button variant="secondary"><Share2 className="inline-block h-4 w-4 mr-1" /> Share</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollegeDetails;
