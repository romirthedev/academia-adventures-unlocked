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

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:8081/",
          "X-Title": "CollegeCompass",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "google/gemini-2.0-flash-exp:free",
          "messages": [
            {
              "role": "user",
              "content": prompt
            }
          ]
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
      // Ensure collegeData has the required fields
      const collegeName = collegeData?.['school.name'] || 'this college';
      const collegeLocation = collegeData?.['school.city'] && collegeData?.['school.state'] 
        ? `${collegeData['school.city']}, ${collegeData['school.state']}` 
        : 'Unknown location';
      const admissionRate = collegeData?.['latest.admissions.admission_rate.overall'] 
        ? (collegeData['latest.admissions.admission_rate.overall'] * 100).toFixed(1) + '%' 
        : 'N/A';
      const institutionType = collegeData?.['school.ownership'] === 1 ? 'Public' : 
        collegeData?.['school.ownership'] === 2 ? 'Private Non-Profit' : 'Private For-Profit';

      const systemPrompt = `
You are an expert college admissions counselor providing personalized advice about ${collegeName}.

College Context:
- Name: ${collegeName}
- Location: ${collegeLocation}
- Admission Rate: ${admissionRate}
- Institution Type: ${institutionType}

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

      console.log('Attempting API call with messages:', chatMessages.length);

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:8081/",
          "X-Title": "CollegeCompass",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "google/gemini-2.0-flash-exp:free",
          "messages": chatMessages
        })
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenRouter API error:', response.status, response.statusText, errorText);
        throw new Error(`OpenRouter API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error('Invalid response format:', data);
        throw new Error('Invalid response format from AI service');
      }
      
      return data.choices[0].message.content || 'Sorry, I encountered an error. Please try again.';

    } catch (error) {
      console.error('Error with AI chat:', error);
      
      // Provide helpful fallback responses based on the last user message
      const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
      const collegeName = collegeData?.['school.name'] || 'this college';
      const admissionRate = collegeData?.['latest.admissions.admission_rate.overall'] 
        ? (collegeData['latest.admissions.admission_rate.overall'] * 100).toFixed(1) + '%' 
        : 'N/A';
      
      if (lastUserMessage.includes('admission') || lastUserMessage.includes('acceptance')) {
        return `Based on ${collegeName}'s admission rate of ${admissionRate}, I'd recommend focusing on strong academic performance, meaningful extracurricular activities, and compelling essays that showcase your unique perspective and goals.`;
      } else if (lastUserMessage.includes('extracurricular') || lastUserMessage.includes('activity')) {
        return `For extracurricular activities, ${collegeName} values depth over breadth. Focus on 2-3 activities where you've shown leadership, growth, and genuine passion. Quality and impact matter more than quantity.`;
      } else if (lastUserMessage.includes('essay') || lastUserMessage.includes('personal statement')) {
        return `Your essay should tell a compelling story that reveals your character, values, and how you'd contribute to ${collegeName}'s community. Be authentic, specific, and show how your experiences have shaped your goals.`;
      } else if (lastUserMessage.includes('chance') || lastUserMessage.includes('likely')) {
        return `While I can't predict admission outcomes, I can help you strengthen your application. Focus on presenting your best self through academics, activities, essays, and recommendations that align with ${collegeName}'s values.`;
      } else {
        return `I'm here to help you with your application to ${collegeName}! I can provide advice on admissions requirements, extracurricular activities, essays, and more. What specific aspect would you like to discuss?`;
      }
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
