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
          "Authorization": "Bearer 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",
          "HTTP-Referer": "http://localhost:8080/",
          "X-Title": "CollegeCompass",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-chat-v3-0324:free",
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
      // Test the API first with a simple message
      console.log('Testing API connection...');
      
      const testResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "HTTP-Referer": "http://localhost:8080/",
          "X-Title": "CollegeCompass",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-chat-v3-0324:free",
          "messages": [
            {
              "role": "user",
              "content": "Hello, can you respond to this test message?"
            }
          ]
        })
      });

      console.log('Test API Response status:', testResponse.status);
      
      if (!testResponse.ok) {
        const errorText = await testResponse.text();
        console.error('Test API failed:', testResponse.status, errorText);
        throw new Error(`API test failed: ${testResponse.status} - ${errorText}`);
      }

      const testData = await testResponse.json();
      console.log('Test API Response:', testData);

      // If test succeeds, proceed with the actual chat
      const collegeName = collegeData?.['school.name'] || 'this college';
      const collegeLocation = collegeData?.['school.city'] && collegeData?.['school.state'] 
        ? `${collegeData['school.city']}, ${collegeData['school.state']}` 
        : 'Unknown location';
      const admissionRate = collegeData?.['latest.admissions.admission_rate.overall'] 
        ? (collegeData['latest.admissions.admission_rate.overall'] * 100).toFixed(1) + '%' 
        : 'N/A';
      const institutionType = collegeData?.['school.ownership'] === 1 ? 'Public' : 
        collegeData?.['school.ownership'] === 2 ? 'Private Non-Profit' : 'Private For-Profit';

      const systemPrompt = `You are an expert college admissions counselor providing personalized advice about ${collegeName}.

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
${userExtracurriculars ? `\n\nUser's Current Extracurriculars: ${userExtracurriculars}` : ''}`;

      const chatMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map(msg => ({ role: msg.role, content: msg.content }))
      ];

      console.log('Attempting API call with messages:', chatMessages.length);

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "HTTP-Referer": "http://localhost:8080/",
          "X-Title": "CollegeCompass",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-chat-v3-0324:free",
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
      return this.generateIntelligentResponse(messages, collegeData, userExtracurriculars);
    }
  }

  private generateIntelligentResponse(
    messages: ChatMessage[], 
    collegeData: any,
    userExtracurriculars?: string
  ): string {
    console.log('generateIntelligentResponse called with:', {
      messageCount: messages.length,
      lastMessage: messages[messages.length - 1]?.content,
      collegeName: collegeData?.['school.name'],
      userExtracurriculars
    });

    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
    const collegeName = collegeData?.['school.name'] || 'this college';
    const admissionRate = collegeData?.['latest.admissions.admission_rate.overall'] 
      ? (collegeData['latest.admissions.admission_rate.overall'] * 100).toFixed(1) + '%' 
      : 'N/A';
    const isPublic = collegeData?.['school.ownership'] === 1;
    const studentSize = collegeData?.['latest.student.size'] || 0;
    const tuition = collegeData?.['latest.cost.tuition.out_of_state'] || 0;
    const graduationRate = collegeData?.['latest.completion.completion_rate_4yr_150nt'] 
      ? (collegeData['latest.completion.completion_rate_4yr_150nt'] * 100).toFixed(1) + '%' 
      : 'N/A';
    
    // Analyze user's extracurriculars if provided
    const hasExtracurriculars = userExtracurriculars && userExtracurriculars.trim().length > 0;
    
    console.log('Processing message:', lastUserMessage);
    
    if (lastUserMessage.includes('admission') || lastUserMessage.includes('acceptance')) {
      console.log('Matched admission/acceptance pattern');
      if (admissionRate !== 'N/A' && parseFloat(admissionRate) < 20) {
        return `Based on ${collegeName}'s highly competitive admission rate of ${admissionRate}, this is a selective institution. I'd recommend focusing on exceptional academic performance (4.0+ GPA, top 5% class rank), strong standardized test scores, meaningful leadership experiences, and compelling essays that showcase your unique perspective and goals. Demonstrate genuine interest through campus visits, interviews, and connecting with current students.`;
      } else if (admissionRate !== 'N/A' && parseFloat(admissionRate) < 50) {
        return `With ${collegeName}'s admission rate of ${admissionRate}, focus on strong academic performance (3.5+ GPA), challenging coursework, solid test scores, and well-rounded extracurricular activities. Show demonstrated interest in your intended major and the college's specific programs. Strong essays and recommendation letters can make a significant difference.`;
      } else {
        return `For ${collegeName} (admission rate: ${admissionRate}), focus on maintaining a strong GPA, taking challenging courses, and participating in meaningful extracurricular activities. While the admission rate is more accessible, still put your best foot forward with compelling essays and strong recommendation letters.`;
      }
    } else if (lastUserMessage.includes('extracurricular') || lastUserMessage.includes('activity')) {
      console.log('Matched extracurricular/activity pattern');
      if (hasExtracurriculars) {
        return `Looking at your extracurriculars: "${userExtracurriculars}". For ${collegeName}, I'd suggest focusing on depth over breadth. Consider how you can take on leadership roles in your current activities or start new initiatives. Look for opportunities that align with your intended major or career goals. Quality and impact matter more than quantity.`;
      }
      return `For extracurricular activities at ${collegeName}, quality trumps quantity. Focus on 2-3 activities where you've shown leadership, growth, and genuine passion. Consider activities that align with your intended major or career goals. Look for opportunities to demonstrate initiative, teamwork, and community impact. Remember, depth and commitment matter more than the number of activities.`;
    } else if (lastUserMessage.includes('essay') || lastUserMessage.includes('personal statement')) {
      console.log('Matched essay/personal statement pattern');
      return `Your essay for ${collegeName} should tell a compelling story that reveals your character, values, and how you'd contribute to their community. Be authentic and specific - avoid generic topics. Show how your experiences have shaped your goals and why this college is the right fit for you. Use concrete examples and vivid details to make your essay memorable.`;
    } else if (lastUserMessage.includes('chance') || lastUserMessage.includes('likely')) {
      console.log('Matched chance/likely pattern');
      return `While I can't predict admission outcomes, I can help you strengthen your application to ${collegeName}. Focus on presenting your best self through strong academics, meaningful activities, compelling essays, and solid recommendations. Research the college thoroughly and demonstrate genuine interest. Remember, admissions decisions consider many factors beyond just grades and test scores.`;
    } else if (lastUserMessage.includes('gpa') || lastUserMessage.includes('grade')) {
      console.log('Matched GPA/grade pattern');
      return `For ${collegeName}, aim for a strong GPA (typically 3.5+ for competitive programs). Take challenging courses like AP, IB, or honors classes when available. Show an upward trend in your grades if possible. Remember, course rigor is often as important as the GPA itself. Focus on excelling in subjects related to your intended major.`;
    } else if (lastUserMessage.includes('test') || lastUserMessage.includes('sat') || lastUserMessage.includes('act')) {
      console.log('Matched test/SAT/ACT pattern');
      return `For standardized tests at ${collegeName}, research their average scores and aim to be at or above the middle 50% range. Many colleges are now test-optional, so if your scores don't reflect your abilities, you might choose not to submit them. Focus on strong grades and extracurricular activities instead.`;
    } else if (lastUserMessage.includes('financial') || lastUserMessage.includes('aid') || lastUserMessage.includes('scholarship')) {
      console.log('Matched financial/aid/scholarship pattern');
      const tuitionFormatted = tuition ? `$${tuition.toLocaleString()}` : 'N/A';
      return `For financial aid at ${collegeName} (tuition: ${tuitionFormatted}), complete the FAFSA and CSS Profile (if required) by the priority deadline. Research institutional scholarships and external opportunities. Consider merit-based aid, need-based aid, and work-study programs. Don't hesitate to contact the financial aid office with questions.`;
    } else if (lastUserMessage.includes('major') || lastUserMessage.includes('program')) {
      console.log('Matched major/program pattern');
      return `When choosing a major at ${collegeName}, consider your interests, strengths, and career goals. Research the specific programs and faculty in your area of interest. Many colleges allow you to apply undecided, and you can declare a major later. Focus on showing intellectual curiosity and academic readiness.`;
    } else if (lastUserMessage.includes('campus') || lastUserMessage.includes('life') || lastUserMessage.includes('student')) {
      console.log('Matched campus/life/student pattern');
      const sizeDescription = studentSize > 20000 ? 'large' : studentSize > 10000 ? 'medium-sized' : 'smaller';
      return `${collegeName} is a ${sizeDescription} institution with ${studentSize.toLocaleString()} students. This creates a ${sizeDescription === 'large' ? 'vibrant, diverse community with many opportunities' : sizeDescription === 'medium-sized' ? 'balanced environment with both resources and personal attention' : 'close-knit community where you can build strong relationships'}. Research their campus culture, student organizations, and housing options to see if it's the right fit for you.`;
    } else if (lastUserMessage.includes('cost') || lastUserMessage.includes('tuition') || lastUserMessage.includes('price')) {
      console.log('Matched cost/tuition/price pattern');
      const tuitionFormatted = tuition ? `$${tuition.toLocaleString()}` : 'N/A';
      const graduationRateInfo = graduationRate !== 'N/A' ? ` (graduation rate: ${graduationRate})` : '';
      return `The tuition at ${collegeName} is ${tuitionFormatted}${graduationRateInfo}. Remember to factor in additional costs like room and board, books, and personal expenses. Research their financial aid packages, scholarships, and payment plans. Many students receive significant aid, so don't let the sticker price discourage you from applying.`;
    } else if (lastUserMessage.includes('deadline') || lastUserMessage.includes('when') || lastUserMessage.includes('timeline')) {
      console.log('Matched deadline/when/timeline pattern');
      return `For ${collegeName}, check their specific application deadlines on their website. Common deadlines include Early Decision (November), Early Action (November/December), and Regular Decision (January). Start your application early to avoid stress and ensure you have time for strong essays and recommendation letters.`;
    } else {
      console.log('No specific pattern matched, using default response');
      return `I'm here to help you with your application to ${collegeName}! I can provide specific advice on admissions requirements, extracurricular activities, essays, test scores, financial aid, campus life, and more. What specific aspect would you like to discuss? I'm ready to give you personalized guidance to strengthen your application.`;
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

  async evaluateApplication(applicationData: any, university: any): Promise<string> {
    try {
      console.log('Evaluating application for:', university?.name || 'Unknown University');
      console.log('Application data:', applicationData);

      const universityName = university?.name || 'this university';
      const universityLocation = university?.city && university?.state 
        ? `${university.city}, ${university.state}` 
        : 'Unknown location';
      const admissionRate = university?.admissionRate || 'N/A';
      const institutionType = university?.type || 'University';

      // Determine strictness level based on university
      const isTopTier = universityName.toLowerCase().includes('harvard') || 
                       universityName.toLowerCase().includes('stanford') || 
                       universityName.toLowerCase().includes('mit') || 
                       universityName.toLowerCase().includes('yale') || 
                       universityName.toLowerCase().includes('princeton') ||
                       universityName.toLowerCase().includes('columbia') ||
                       universityName.toLowerCase().includes('penn') ||
                       universityName.toLowerCase().includes('dartmouth') ||
                       universityName.toLowerCase().includes('brown') ||
                       universityName.toLowerCase().includes('cornell');

      const strictnessLevel = isTopTier ? 'EXTREMELY STRICT' : 'VERY STRICT';

      const systemPrompt = `You are a senior admissions officer at ${universityName}, a prestigious ${institutionType} located in ${universityLocation}. 

You are ${strictnessLevel} in your evaluation. For ${universityName}, you receive thousands of applications from the most accomplished students in the world. You must be extremely selective and critical.

Evaluation Guidelines:
1. Be EXTREMELY thorough and critical - assume every applicant has perfect grades and test scores
2. Look for truly exceptional qualities that set this student apart from other perfect applicants
3. Be brutally honest about weaknesses and areas that don't meet your standards
4. Consider that for ${universityName}, even a 4.0 GPA and perfect test scores are the baseline expectation
5. Focus on intellectual curiosity, leadership impact, and genuine passion
6. Evaluate essays for authentic voice, depth of thinking, and writing quality
7. Assess extracurricular activities for meaningful impact and leadership
8. Be as strict as the most critical admissions officer - don't sugarcoat anything
9. Remember: ${universityName} rejects 90%+ of applicants with perfect academic records

For Harvard specifically:
- Perfect grades and test scores are EXPECTED, not impressive
- Look for Nobel Prize-level potential or revolutionary thinking
- Evaluate if the student could be a future world leader or groundbreaking researcher
- Assess if they have the intellectual firepower to contribute meaningfully to Harvard's community
- Consider if they would thrive in Harvard's intensely competitive environment

Format your response as follows:

**ADMISSION DECISION: [Admit/Waitlist/Deny]**

**OVERALL ASSESSMENT:**
[2-3 sentences with brutally honest assessment of their chances]

**ACADEMIC EVALUATION:**
[Critical analysis of academic rigor, course selection, and intellectual preparation]

**EXTRACURRICULAR ASSESSMENT:**
[Analysis of leadership, impact, and whether activities demonstrate exceptional qualities]

**ESSAY EVALUATION:**
[Assessment of writing quality, authenticity, depth of thinking, and personal voice]

**STRENGTHS:**
[Only genuine strengths that truly impress you - be selective]

**CRITICAL WEAKNESSES:**
[Be brutally honest about what's missing or inadequate]

**AREAS FOR IMPROVEMENT:**
[Specific, actionable feedback for future applications]

**FINAL RECOMMENDATIONS:**
[What they should focus on if applying to similar institutions]

Remember: You are evaluating for ${universityName}. Be as critical and selective as the real admissions committee. Don't be impressed by what should be standard for this level of institution.`;

      const applicationSummary = `
STUDENT APPLICATION SUMMARY:

Personal Information:
- Name: ${applicationData.personalInfo.firstName} ${applicationData.personalInfo.lastName}
- High School: ${applicationData.personalInfo.highSchool}
- GPA: ${applicationData.personalInfo.gpa}
- SAT Score: ${applicationData.personalInfo.satScore || 'Not provided'}
- ACT Score: ${applicationData.personalInfo.actScore || 'Not provided'}

Extracurricular Activities (${applicationData.extracurriculars.length} activities):
${applicationData.extracurriculars.map((ec: any, index: number) => `
${index + 1}. ${ec.name || 'Unnamed Activity'}
   Role: ${ec.role || 'Not specified'}
   Hours: ${ec.hours || 'Not specified'}
   Description: ${ec.description || 'No description provided'}
`).join('')}

Academic Record (${applicationData.grades.length} courses):
${applicationData.grades.map((grade: any, index: number) => `
${index + 1}. ${grade.subject || 'Unnamed Course'} - ${grade.grade || 'No grade'} (${grade.level || 'Regular'})
`).join('')}

Essays (${applicationData.essays.length} essays):
${applicationData.essays.map((essay: any, index: number) => `
Essay ${index + 1}:
Prompt: ${essay.prompt || 'No prompt provided'}
Response: ${essay.response || 'No response provided'}
`).join('')}

Target University: ${applicationData.targetUniversity}
`;

      console.log('Sending evaluation request to AI...');

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "HTTP-Referer": "http://localhost:8080/",
          "X-Title": "CollegeCompass",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-chat-v3-0324:free",
          "messages": [
            {
              "role": "system",
              "content": systemPrompt
            },
            {
              "role": "user",
              "content": `Please evaluate this application for ${universityName}:\n\n${applicationSummary}`
            }
          ],
          "max_tokens": 2500
        })
      });

      console.log('Evaluation API Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Evaluation API failed:', response.status, errorText);
        throw new Error(`Evaluation API failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Evaluation API Response:', data);

      const aiResponse = data.choices[0]?.message?.content;

      if (!aiResponse) {
        throw new Error('No response from AI evaluation');
      }

      return aiResponse;

    } catch (error) {
      console.error('Error evaluating application:', error);
      
      // Fallback evaluation
      return this.generateFallbackEvaluation(applicationData, university);
    }
  }

  private generateFallbackEvaluation(applicationData: any, university: any): string {
    const universityName = university?.name || 'this university';
    const gpa = parseFloat(applicationData.personalInfo.gpa) || 0;
    const satScore = parseInt(applicationData.personalInfo.satScore) || 0;
    const actScore = parseInt(applicationData.personalInfo.actScore) || 0;
    const extracurricularCount = applicationData.extracurriculars.length;
    const essayCount = applicationData.essays.length;

    // Much stricter criteria for top universities
    const isTopTier = universityName.toLowerCase().includes('harvard') || 
                     universityName.toLowerCase().includes('stanford') || 
                     universityName.toLowerCase().includes('mit') || 
                     universityName.toLowerCase().includes('yale') || 
                     universityName.toLowerCase().includes('princeton');

    let decision = 'Deny';
    let reasoning = '';

    if (isTopTier) {
      // For top-tier universities, be extremely strict
      if (gpa >= 3.95 && (satScore >= 1550 || actScore >= 35) && extracurricularCount >= 5) {
        decision = 'Waitlist';
        reasoning = 'Strong academic foundation, but may lack the exceptional qualities needed for immediate admission.';
      } else if (gpa >= 3.9 && (satScore >= 1500 || actScore >= 33) && extracurricularCount >= 4) {
        decision = 'Deny';
        reasoning = 'While academically qualified, the application lacks the exceptional qualities and impact expected at this level.';
      } else {
        decision = 'Deny';
        reasoning = 'Academic performance or extracurricular involvement below the extremely competitive standards of this institution.';
      }
    } else {
      // For other universities, use standard criteria
      if (gpa >= 3.8 && (satScore >= 1400 || actScore >= 30) && extracurricularCount >= 3) {
        decision = 'Admit';
        reasoning = 'Strong academic performance combined with meaningful extracurricular involvement.';
      } else if (gpa >= 3.5 && (satScore >= 1300 || actScore >= 28) && extracurricularCount >= 2) {
        decision = 'Waitlist';
        reasoning = 'Solid academic foundation with room for improvement in extracurricular depth.';
      } else {
        decision = 'Deny';
        reasoning = 'Academic performance or extracurricular involvement below our competitive standards.';
      }
    }

    return `**ADMISSION DECISION: ${decision}**

**OVERALL ASSESSMENT:**
${reasoning}

**ACADEMIC EVALUATION:**
- GPA: ${gpa}/4.0 ${gpa >= 3.9 ? '(Excellent)' : gpa >= 3.7 ? '(Good)' : '(Needs improvement)'}
- SAT Score: ${satScore || 'Not provided'}
- ACT Score: ${actScore || 'Not provided'}
- Course Rigor: ${applicationData.grades.length} courses recorded

**EXTRACURRICULAR ASSESSMENT:**
- Number of Activities: ${extracurricularCount}
- Leadership Roles: ${applicationData.extracurriculars.filter((ec: any) => ec.role?.toLowerCase().includes('president') || ec.role?.toLowerCase().includes('captain') || ec.role?.toLowerCase().includes('leader')).length}

**ESSAY EVALUATION:**
- Number of Essays: ${essayCount}
- Essay completion: ${essayCount > 0 ? 'Essays submitted' : 'No essays provided'}

**STRENGTHS:**
- Completed comprehensive application
- Provided detailed personal information
- Demonstrated interest through essay responses

**CRITICAL WEAKNESSES:**
- May lack exceptional qualities needed for top-tier institutions
- Extracurricular activities may not demonstrate sufficient leadership or impact
- Academic profile may not stand out among highly competitive applicant pool

**AREAS FOR IMPROVEMENT:**
- Consider strengthening academic performance further
- Increase extracurricular involvement with meaningful leadership roles
- Enhance essay quality and personal voice
- Develop unique talents or achievements that set you apart

**FINAL RECOMMENDATIONS:**
Focus on developing exceptional qualities, meaningful leadership experiences, and unique achievements that demonstrate your potential to contribute significantly to the university community.`;

  }
}

export const aiCollegeService = new AICollegeService();
export const { analyzeCollegeForApplicants, chatWithAdmissionsAI, evaluateApplication } = aiCollegeService;
