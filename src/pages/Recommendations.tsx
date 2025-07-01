import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import { getRecommendations, UniversityRecommendation, universityDatabase } from '@/data/collegeRecommendations';

const majors = ['Engineering', 'Business', 'Liberal Arts', 'Sciences', 'Arts', 'Computer Science', 'Medicine'];
const sizes = ['Small', 'Medium', 'Large'];
const selectivities = ['Very Selective', 'Highly Selective', 'Selective', 'Less Selective'];
const regions = ['Northeast', 'Midwest', 'South', 'West', 'Any'];

const Recommendations: React.FC = () => {
  const [form, setForm] = useState({
    major: '',
    size: '',
    selectivity: '',
    region: '',
    testScore: '',
    extracurriculars: '',
    tuition: '',
    setting: '',
  });
  const [showResults, setShowResults] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState<{goodFits: UniversityRecommendation[], badFits: UniversityRecommendation[]}>({goodFits: [], badFits: []});
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  // Filter results based on form (for demo)
  const filteredColleges = universityDatabase.filter(college => {
    const majorMatch = !form.major || college.focus.some(focus => 
      focus.toLowerCase().includes(form.major.toLowerCase())
    );
    const sizeMatch = !form.size || college.size === form.size.toLowerCase();
    const selectivityMatch = !form.selectivity || college.selectivity === form.selectivity.toLowerCase();
    
    return majorMatch && sizeMatch && selectivityMatch;
  });

  // AI Quiz Questions (adaptive based on previous answers)
  const getQuizQuestions = (answers: Record<number, string>) => {
    const baseQuestions = [
      {
        id: 0,
        question: "What's your primary academic interest?",
        options: ["STEM (Science, Technology, Engineering, Math)", "Humanities & Arts", "Business & Economics", "Social Sciences", "Health Sciences", "Other"]
      }
    ];

    // AI logic to generate next question based on previous answers
    const generateNextQuestion = (currentAnswers: Record<number, string>) => {
      const answeredCount = Object.keys(currentAnswers).length;
      
      if (answeredCount >= 30) return null; // Max 30 questions
      
      const lastAnswer = currentAnswers[answeredCount - 1];
      const academicInterest = currentAnswers[0];
      
      // Question 1: Academic Interest (already asked)
      if (answeredCount === 1) {
        return {
          id: 1,
          question: "How do you prefer to learn?",
          options: ["Hands-on projects and labs", "Classroom discussions and debates", "Independent research", "Group collaborations", "Mix of everything"]
        };
      }
      
      // Question 2: Learning Style (already asked)
      if (answeredCount === 2) {
        return {
          id: 2,
          question: "What's your ideal campus environment?",
          options: ["Urban city with lots of opportunities", "Quiet suburban setting", "Rural campus with nature", "Small college town", "Doesn't matter"]
        };
      }
      
      // Question 3: Campus Environment (already asked)
      if (answeredCount === 3) {
        return {
          id: 3,
          question: "How important is research to you?",
          options: ["Very important - I want to be involved", "Somewhat important", "Not very important", "I'm not sure yet"]
        };
      }
      
      // Question 4: Research Importance (already asked)
      if (answeredCount === 4) {
        return {
          id: 4,
          question: "What's your preferred class size?",
          options: ["Small classes (under 20 students)", "Medium classes (20-50 students)", "Large lectures (50+ students)", "Mix of different sizes"]
        };
      }
      
      // Dynamic questions based on previous answers
      if (answeredCount === 5) {
        if (academicInterest === "STEM (Science, Technology, Engineering, Math)") {
          return {
            id: 5,
            question: "Which STEM field interests you most?",
            options: ["Computer Science & AI", "Engineering", "Natural Sciences", "Mathematics", "Applied Sciences"]
          };
        } else if (academicInterest === "Business & Economics") {
          return {
            id: 5,
            question: "What type of business career interests you?",
            options: ["Entrepreneurship", "Finance & Banking", "Consulting", "Marketing", "Management"]
          };
        } else if (academicInterest === "Health Sciences") {
          return {
            id: 5,
            question: "What health career path interests you?",
            options: ["Medicine (MD)", "Nursing", "Public Health", "Pharmacy", "Physical Therapy"]
          };
        } else {
          return {
            id: 5,
            question: "What's your preferred level of academic rigor?",
            options: ["Very challenging and competitive", "Moderately challenging", "Balanced workload", "More relaxed pace"]
          };
        }
      }
      
      if (answeredCount === 6) {
        const learningStyle = currentAnswers[1];
        if (learningStyle === "Hands-on projects and labs") {
          return {
            id: 6,
            question: "Do you prefer theoretical or practical learning?",
            options: ["More practical, hands-on", "Mix of both", "More theoretical", "Depends on the subject"]
          };
        } else if (learningStyle === "Classroom discussions and debates") {
          return {
            id: 6,
            question: "How important is intellectual discourse to you?",
            options: ["Very important - I love deep discussions", "Somewhat important", "Not very important", "I prefer other learning styles"]
          };
        } else {
          return {
            id: 6,
            question: "What's your preferred assessment style?",
            options: ["Projects and presentations", "Exams and tests", "Papers and essays", "Mix of everything"]
          };
        }
      }
      
      if (answeredCount === 7) {
        const campusEnv = currentAnswers[2];
        if (campusEnv === "Urban city with lots of opportunities") {
          return {
            id: 7,
            question: "What urban opportunities are most important to you?",
            options: ["Internships and jobs", "Cultural activities", "Networking events", "Entertainment and nightlife"]
          };
        } else if (campusEnv === "Rural campus with nature") {
          return {
            id: 7,
            question: "What outdoor activities interest you?",
            options: ["Hiking and camping", "Sports and athletics", "Environmental research", "Peaceful study spaces"]
          };
        } else {
          return {
            id: 7,
            question: "How important is campus safety to you?",
            options: ["Very important", "Somewhat important", "Not a major concern", "I'll research each school"]
          };
        }
      }
      
      if (answeredCount === 8) {
        const researchImportance = currentAnswers[3];
        if (researchImportance === "Very important - I want to be involved") {
          return {
            id: 8,
            question: "What type of research interests you?",
            options: ["Laboratory research", "Field research", "Data analysis", "Literature review", "Interdisciplinary research"]
          };
        } else {
          return {
            id: 8,
            question: "How important are extracurricular activities?",
            options: ["Very important - I want to be involved", "Somewhat important", "Not very important", "I'll focus on academics"]
          };
        }
      }
      
      if (answeredCount === 9) {
        const classSize = currentAnswers[4];
        if (classSize === "Small classes (under 20 students)") {
          return {
            id: 9,
            question: "How important is personal attention from professors?",
            options: ["Very important - I want mentorship", "Somewhat important", "Not very important", "I'm independent"]
          };
        } else if (classSize === "Large lectures (50+ students)") {
          return {
            id: 9,
            question: "How do you prefer to get help in large classes?",
            options: ["Office hours with professors", "Teaching assistants", "Study groups", "Online resources"]
          };
        } else {
          return {
            id: 9,
            question: "What's your preferred study environment?",
            options: ["Quiet libraries", "Group study spaces", "Outdoor spaces", "My dorm room"]
          };
        }
      }
      
      // Continue with more adaptive questions...
      if (answeredCount === 10) {
        return {
          id: 10,
          question: "What's your budget for college?",
          options: ["Full pay - cost is not a major concern", "Need some financial aid", "Need significant financial aid", "Full scholarship or need-based aid"]
        };
      }
      
      if (answeredCount === 11) {
        return {
          id: 11,
          question: "How far from home are you willing to go?",
          options: ["Stay in my state/region", "Travel within the US", "Open to international options", "Distance doesn't matter"]
        };
      }
      
      if (answeredCount === 12) {
        return {
          id: 12,
          question: "What's your preferred weather/climate?",
          options: ["Warm and sunny", "Four seasons", "Cold and snowy", "Doesn't matter"]
        };
      }
      
      if (answeredCount === 13) {
        return {
          id: 13,
          question: "How important is diversity on campus?",
          options: ["Very important", "Somewhat important", "Not very important", "I'll research each school"]
        };
      }
      
      if (answeredCount === 14) {
        return {
          id: 14,
          question: "What's your preferred social scene?",
          options: ["Active Greek life and parties", "Quiet, academic-focused", "Mix of social and academic", "I'm not sure yet"]
        };
      }
      
      // Continue with more questions based on patterns...
      if (answeredCount >= 15) {
        // Generate questions based on emerging patterns
        const patterns = analyzePatterns(currentAnswers);
        return generatePatternBasedQuestion(patterns, answeredCount);
      }
      
      return null; // End quiz if no more questions needed
    };
    
    // Helper function to analyze answer patterns
    const analyzePatterns = (answers: Record<number, string>) => {
      const patterns = {
        academicRigor: 0,
        socialLife: 0,
        researchFocus: 0,
        urbanPreference: 0,
        costSensitivity: 0
      };
      
      // Analyze patterns based on answers
      if (answers[0]?.includes("STEM")) patterns.academicRigor += 2;
      if (answers[1]?.includes("Hands-on")) patterns.researchFocus += 2;
      if (answers[2]?.includes("Urban")) patterns.urbanPreference += 2;
      if (answers[3]?.includes("Very important")) patterns.researchFocus += 2;
      if (answers[4]?.includes("Small")) patterns.academicRigor += 1;
      
      return patterns;
    };
    
    // Generate questions based on patterns
    const generatePatternBasedQuestion = (patterns: any, questionNumber: number) => {
      if (patterns.academicRigor > 3) {
        return {
          id: questionNumber,
          question: "How do you handle academic pressure?",
          options: ["I thrive under pressure", "I prefer moderate challenge", "I get stressed easily", "I need support systems"]
        };
      }
      
      if (patterns.researchFocus > 3) {
        return {
          id: questionNumber,
          question: "What type of research facilities are most important?",
          options: ["Advanced laboratories", "Field research stations", "Computing resources", "Library archives", "Industry partnerships"]
        };
      }
      
      if (patterns.urbanPreference > 2) {
        return {
          id: questionNumber,
          question: "What urban amenities are most important?",
          options: ["Public transportation", "Cultural institutions", "Job opportunities", "Entertainment options"]
        };
      }
      
      // Default questions for remaining slots
      const defaultQuestions = [
        {
          id: questionNumber,
          question: "How important is study abroad to you?",
          options: ["Very important", "Somewhat important", "Not very important", "I'm not sure"]
        },
        {
          id: questionNumber,
          question: "What's your preferred housing style?",
          options: ["Traditional dorms", "Apartment-style", "Greek housing", "Off-campus", "I'm flexible"]
        },
        {
          id: questionNumber,
          question: "How important is athletics to you?",
          options: ["I want to play varsity sports", "I enjoy intramurals", "I like to watch games", "Not important"]
        }
      ];
      
      return defaultQuestions[questionNumber % defaultQuestions.length];
    };
    
    // Build the question list dynamically
    const questions = [...baseQuestions];
    let nextQuestion = generateNextQuestion(answers);
    
    while (nextQuestion && questions.length < 30) {
      questions.push(nextQuestion);
      const tempAnswers = { ...answers };
      tempAnswers[questions.length - 1] = "placeholder"; // Add placeholder to simulate next iteration
      nextQuestion = generateNextQuestion(tempAnswers);
    }
    
    return questions;
  };

  const handleQuizAnswer = (answer: string) => {
    const newAnswers = { ...quizAnswers, [currentQuestion]: answer };
    setQuizAnswers(newAnswers);
    
    const questions = getQuizQuestions(newAnswers);
    
    // Check if we have enough information for good recommendations
    const hasEnoughInfo = checkIfEnoughInfo(newAnswers);
    
    if (currentQuestion < questions.length - 1 && !hasEnoughInfo && Object.keys(newAnswers).length < 30) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed - generate results
      generateQuizResults(newAnswers);
      setQuizCompleted(true);
    }
  };

  const checkIfEnoughInfo = (answers: Record<number, string>) => {
    const answeredCount = Object.keys(answers).length;
    
    // Minimum 5 questions for basic recommendations
    if (answeredCount < 5) return false;
    
    // Check if we have key information
    const hasAcademicInterest = answers[0];
    const hasLearningStyle = answers[1];
    const hasCampusPreference = answers[2];
    const hasResearchPreference = answers[3];
    const hasClassSizePreference = answers[4];
    
    // If we have all basic info and at least 8 questions, we can make good recommendations
    if (answeredCount >= 8 && hasAcademicInterest && hasLearningStyle && 
        hasCampusPreference && hasResearchPreference && hasClassSizePreference) {
      return true;
    }
    
    // If we have 15+ questions, we have plenty of information
    if (answeredCount >= 15) return true;
    
    // If we have 10+ questions and key preferences, we can make recommendations
    if (answeredCount >= 10 && hasAcademicInterest && hasLearningStyle) {
      return true;
    }
    
    return false;
  };

  const generateQuizResults = (answers: Record<number, string>) => {
    // Use the comprehensive database and AI analysis
    const results = getRecommendations(answers);
    setQuizResults(results);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizAnswers({});
    setQuizCompleted(false);
    setQuizResults({goodFits: [], badFits: []});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10">
      <div className="container mx-auto max-w-3xl px-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-2">Personalized College Recommendations</CardTitle>
            <p className="text-gray-600 text-lg">Get matched to colleges based on your interests and preferences.</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
              <span className="font-medium text-gray-700">Want a smarter match?</span>
              <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50" onClick={() => setShowQuiz(true)}>
                <Sparkles className="mr-2 h-4 w-4" /> Take AI-Powered Quiz
              </Button>
            </div>
            {showQuiz ? (
              <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
                {!quizCompleted ? (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">AI College Fit Quiz</h3>
                      <div className="text-sm text-gray-600">
                        Question {currentQuestion + 1} of up to 30
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${((currentQuestion + 1) / 30) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        AI is analyzing your answers to generate the next question...
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-lg font-semibold mb-4">
                        {getQuizQuestions(quizAnswers)[currentQuestion]?.question}
                      </h4>
                      <div className="space-y-3">
                        {getQuizQuestions(quizAnswers)[currentQuestion]?.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuizAnswer(option)}
                            className="w-full p-4 text-left border border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all duration-200"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mb-4">
                      💡 Each answer helps the AI understand your preferences better and generate more targeted questions.
                    </div>

                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowQuiz(false);
                        resetQuiz();
                      }}
                      className="mt-4"
                    >
                      Back to Filters
                    </Button>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Your AI Analysis Results</h3>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-green-700 mb-3">🎯 Good Fits ({quizResults.goodFits.length} universities)</h4>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {quizResults.goodFits.slice(0, 10).map(college => (
                          <div key={college.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="font-semibold cursor-pointer text-green-800 hover:text-green-900 hover:underline" 
                                 onClick={() => navigate(`/college/${college.id}`)}>
                              {college.name}
                            </div>
                            <div className="text-sm text-gray-600">{college.location}</div>
                            <div className="text-sm text-green-700 mt-1">
                              {college.focus.join(', ')} • {college.size} • {college.selectivity}
                            </div>
                            <div className="text-xs text-green-600 mt-2">
                              <strong>Strengths:</strong> {college.strengths.slice(0, 2).join(', ')}
                            </div>
                          </div>
                        ))}
                        {quizResults.goodFits.length > 10 && (
                          <div className="text-center text-sm text-gray-500">
                            ... and {quizResults.goodFits.length - 10} more universities
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-red-700 mb-3">⚠️ May Not Be Ideal ({quizResults.badFits.length} universities)</h4>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {quizResults.badFits.slice(0, 10).map(college => (
                          <div key={college.id} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="font-semibold cursor-pointer text-red-800 hover:text-red-900 hover:underline" 
                                 onClick={() => navigate(`/college/${college.id}`)}>
                              {college.name}
                            </div>
                            <div className="text-sm text-gray-600">{college.location}</div>
                            <div className="text-sm text-red-700 mt-1">
                              {college.focus.join(', ')} • {college.size} • {college.selectivity}
                            </div>
                            <div className="text-xs text-red-600 mt-2">
                              <strong>Concerns:</strong> {college.weaknesses.slice(0, 2).join(', ')}
                            </div>
                          </div>
                        ))}
                        {quizResults.badFits.length > 10 && (
                          <div className="text-center text-sm text-gray-500">
                            ... and {quizResults.badFits.length - 10} more universities
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={() => {
                          setShowQuiz(false);
                          resetQuiz();
                        }}
                        className="flex-1"
                      >
                        Back to Filters
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={resetQuiz}
                        className="flex-1"
                      >
                        Retake Quiz
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 font-medium">Intended Major</label>
                <Select value={form.major} onValueChange={v => handleChange('major', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a major" />
                  </SelectTrigger>
                  <SelectContent>
                    {majors.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Preferred Size</label>
                <Select value={form.size} onValueChange={v => handleChange('size', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Selectivity</label>
                <Select value={form.selectivity} onValueChange={v => handleChange('selectivity', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select selectivity" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectivities.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Region</label>
                <Select value={form.region} onValueChange={v => handleChange('region', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block mb-1 font-medium">SAT/ACT Score</label>
                <Input type="number" placeholder="Enter score" value={form.testScore || ''} onChange={e => handleChange('testScore', e.target.value)} />
              </div>
              <div>
                <label className="block mb-1 font-medium">Extracurriculars</label>
                <Input type="text" placeholder="e.g. Debate, Robotics, Sports" value={form.extracurriculars || ''} onChange={e => handleChange('extracurriculars', e.target.value)} />
              </div>
              <div>
                <label className="block mb-1 font-medium">Tuition Range ($)</label>
                <Input type="text" placeholder="e.g. 20000-50000" value={form.tuition || ''} onChange={e => handleChange('tuition', e.target.value)} />
              </div>
              <div>
                <label className="block mb-1 font-medium">Campus Setting</label>
                <Select value={form.setting || ''} onValueChange={v => handleChange('setting', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select setting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Urban">Urban</SelectItem>
                    <SelectItem value="Suburban">Suburban</SelectItem>
                    <SelectItem value="Rural">Rural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" className="college-gradient text-white px-8 py-3 rounded-xl hover:scale-105 transition-transform duration-200">
                  Get Recommendations
                </Button>
              </div>
            </form>
            )}
          </CardContent>
        </Card>

        {showResults && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-2">Recommended Colleges</CardTitle>
              <p className="text-gray-600">Based on your preferences</p>
            </CardHeader>
            <CardContent>
              {filteredColleges.length === 0 ? (
                <div className="text-center text-gray-500 py-8">No matches found. Try adjusting your preferences.</div>
              ) : (
                <div className="space-y-4">
                  {filteredColleges.map(college => (
                    <Card key={college.id} className="flex flex-col md:flex-row items-center justify-between p-4 hover:shadow-lg transition-all">
                      <div>
                        <div className="text-xl font-semibold">{college.name}</div>
                        <div className="text-gray-600">{college.location}</div>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary">{college.selectivity}</Badge>
                          <Badge variant="secondary">{college.size}</Badge>
                          <Badge variant="secondary">{college.focus.join(', ')}</Badge>
                        </div>
                      </div>
                      <Button className="mt-4 md:mt-0" onClick={() => navigate(`/college/${college.id}`)}>
                        View Details
                      </Button>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Recommendations; 