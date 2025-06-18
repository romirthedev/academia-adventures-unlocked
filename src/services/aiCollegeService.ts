interface CollegeAnalysis {
  admissionCriteria: string[];
  studentProfile: string;
  competitiveFactors: string[];
  recommendations: string[];
  idealStudent: {
    academicProfile: string;
    extracurriculars: string[];
    personalityTraits: string[];
    background: string;
  };
  verifiedPrograms: {
    bachelors: boolean;
    masters: boolean;
    doctoral: boolean;
    confidence: string;
  };
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

class AICollegeService {
  private readonly OPENROUTER_API_KEY = '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';

  async analyzeCollegeForApplicants(collegeData: any): Promise<CollegeAnalysis> {
    try {
      const prompt = `
You are an expert college admissions counselor analyzing what this college looks for in applicants.

College Information:
- Name: ${collegeData['school.name']}
- Location: ${collegeData['school.city']}, ${collegeData['school.state']}
- Admission Rate: ${collegeData['latest.admissions.admission_rate.overall'] ? (collegeData['latest.admissions.admission_rate.overall'] * 100).toFixed(1) + '%' : 'N/A'}
- Student Size: ${collegeData['latest.student.size'] || 'N/A'}
- Tuition (Out-of-State): $${collegeData['latest.cost.tuition.out_of_state']?.toLocaleString() || 'N/A'}
- Average Net Price: $${collegeData['latest.cost.avg_net_price.overall']?.toLocaleString() || 'N/A'}
- Graduation Rate: ${collegeData['latest.completion.completion_rate_4yr_150nt'] ? (collegeData['latest.completion.completion_rate_4yr_150nt'] * 100).toFixed(1) + '%' : 'N/A'}
- Median Earnings (10 years): $${collegeData['latest.earnings.10_yrs_after_entry.median']?.toLocaleString() || 'N/A'}
- Institution Type: ${collegeData['school.ownership'] === 1 ? 'Public' : collegeData['school.ownership'] === 2 ? 'Private Non-Profit' : 'Private For-Profit'}

Based on this data, provide analysis in the following JSON format:
{
  "admissionCriteria": ["criterion1", "criterion2", "criterion3"],
  "studentProfile": "description of ideal student profile",
  "competitiveFactors": ["factor1", "factor2", "factor3"],
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"],
  "idealStudent": {
    "academicProfile": "detailed academic background expected",
    "extracurriculars": ["activity1", "activity2", "activity3", "activity4"],
    "personalityTraits": ["trait1", "trait2", "trait3"],
    "background": "socioeconomic and cultural background that would be valued"
  },
  "verifiedPrograms": {
    "bachelors": true/false,
    "masters": true/false,
    "doctoral": true/false,
    "confidence": "high/medium/low - explanation of verification confidence"
  }
}

Create a comprehensive ideal student profile that includes specific academic achievements, meaningful extracurricular activities, personality traits that would thrive at this institution, and background factors that align with the college's values and mission.
`;

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'College Research Tool'
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-exp:free',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API request failed: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content;

      if (!aiResponse) {
        throw new Error('No response from AI');
      }

      // Try to parse JSON from AI response
      try {
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const analysis = JSON.parse(jsonMatch[0]);
          return analysis;
        }
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
      }

      // Fallback analysis
      return this.generateFallbackAnalysis(collegeData);

    } catch (error) {
      console.error('Error with AI college analysis:', error);
      return this.generateFallbackAnalysis(collegeData);
    }
  }

  async chatWithAdmissionsAI(
    messages: ChatMessage[], 
    collegeData: any,
    userExtracurriculars?: string
  ): Promise<string> {
    try {
      const systemPrompt = `
You are an expert college admissions counselor providing personalized advice about ${collegeData['school.name']}.

College Context:
- Name: ${collegeData['school.name']}
- Location: ${collegeData['school.city']}, ${collegeData['school.state']}
- Admission Rate: ${collegeData['latest.admissions.admission_rate.overall'] ? (collegeData['latest.admissions.admission_rate.overall'] * 100).toFixed(1) + '%' : 'N/A'}
- Institution Type: ${collegeData['school.ownership'] === 1 ? 'Public' : collegeData['school.ownership'] === 2 ? 'Private Non-Profit' : 'Private For-Profit'}

Your role is to:
1. Provide specific, actionable advice about applying to this college
2. Help evaluate the user's extracurricular activities and how they align with this college
3. Suggest improvements to their application profile
4. Answer questions about what this college values in applicants
5. Provide honest assessment of their chances and areas for improvement

Be encouraging but realistic. Provide specific, actionable advice.
${userExtracurriculars ? `\n\nUser's Current Extracurriculars: ${userExtracurriculars}` : ''}
`;

      const chatMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map(msg => ({ role: msg.role, content: msg.content }))
      ];

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'College Research Tool'
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-exp:free',
          messages: chatMessages,
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I encountered an error. Please try again.';

    } catch (error) {
      console.error('Error with AI chat:', error);
      return 'I apologize, but I\'m having trouble connecting right now. Please try asking your question again in a moment.';
    }
  }

  private generateFallbackAnalysis(collegeData: any): CollegeAnalysis {
    const admissionRate = collegeData['latest.admissions.admission_rate.overall'] || 1;
    const studentSize = collegeData['latest.student.size'] || 0;
    const isPublic = collegeData['school.ownership'] === 1;

    let admissionCriteria = ['Strong academic performance', 'Well-rounded extracurricular activities'];
    let competitiveFactors = ['GPA above average', 'Standardized test scores'];
    let studentProfile = 'Students with solid academic backgrounds and diverse interests';

    if (admissionRate < 0.2) {
      admissionCriteria.push('Exceptional academic achievements', 'Leadership experience', 'Unique talents or perspectives');
      competitiveFactors.push('Top 10% class rank', 'Outstanding essays', 'Strong recommendation letters');
      studentProfile = 'Highly accomplished students with exceptional academic records and distinctive achievements';
    } else if (admissionRate < 0.5) {
      admissionCriteria.push('Above-average academic performance', 'Demonstrated interest in field of study');
      competitiveFactors.push('Strong course rigor', 'Community involvement');
      studentProfile = 'Well-prepared students with strong academic foundations and clear goals';
    }

    const recommendations = [
      'Research the specific programs and faculty in your area of interest',
      'Demonstrate genuine interest through campus visits or virtual events',
      'Highlight experiences that align with the college\'s values and mission'
    ];

    const idealStudent = {
      academicProfile: admissionRate < 0.2 ? 
        'Top 5% of class with 4.0+ GPA, multiple AP courses with 4-5 scores, strong SAT/ACT scores' :
        'Top 25% of class with strong GPA, challenging coursework, solid test scores',
      extracurriculars: admissionRate < 0.2 ? 
        ['Student government leadership', 'National competition winner', 'Research internship', 'Community service 200+ hours'] :
        ['Club leadership roles', 'Sports or arts participation', 'Volunteer work', 'Part-time job or internship'],
      personalityTraits: ['Intellectually curious', 'Collaborative', 'Resilient'],
      background: 'Diverse backgrounds welcomed, with emphasis on overcoming challenges and contributing to campus diversity'
    };

    // Estimate program availability based on size and type
    const verifiedPrograms = {
      bachelors: true,
      masters: studentSize > 5000 || !isPublic,
      doctoral: studentSize > 15000,
      confidence: studentSize > 10000 ? 'high' : studentSize > 3000 ? 'medium' : 'low - verification recommended'
    };

    return {
      admissionCriteria,
      studentProfile,
      competitiveFactors,
      recommendations,
      idealStudent,
      verifiedPrograms
    };
  }
}

export const aiCollegeService = new AICollegeService();
