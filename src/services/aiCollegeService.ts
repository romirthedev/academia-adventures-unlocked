
interface CollegeAnalysis {
  admissionCriteria: string[];
  studentProfile: string;
  competitiveFactors: string[];
  recommendations: string[];
  verifiedPrograms: {
    bachelors: boolean;
    masters: boolean;
    doctoral: boolean;
    confidence: string;
  };
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

Current Program Data:
- Bachelor's Available: ${collegeData['latest.academics.program_available.bachelors'] ? 'Yes' : 'No'}
- Master's Available: ${collegeData['latest.academics.program_available.masters'] ? 'Yes' : 'No'}
- Doctoral Available: ${collegeData['latest.academics.program_available.doctoral'] ? 'Yes' : 'No'}

Based on this data, provide analysis in the following JSON format:
{
  "admissionCriteria": ["criterion1", "criterion2", "criterion3"],
  "studentProfile": "description of ideal student profile",
  "competitiveFactors": ["factor1", "factor2", "factor3"],
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"],
  "verifiedPrograms": {
    "bachelors": true/false,
    "masters": true/false,
    "doctoral": true/false,
    "confidence": "high/medium/low - explanation of verification confidence"
  }
}

For verifiedPrograms, cross-reference the college's characteristics:
- Large universities (>15,000 students) typically offer all degree levels
- Research universities often have doctoral programs
- Community colleges typically only offer associate degrees
- Liberal arts colleges may only offer bachelor's degrees
- Professional schools may focus on specific graduate programs

Provide specific, actionable insights based on the college's admission rate, size, type, and academic profile.
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
          model: 'nvidia/llama-3.3-nemotron-super-49b-v1:free',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 1500
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

    // Estimate program availability based on size and type
    const verifiedPrograms = {
      bachelors: true, // Most colleges offer bachelor's degrees
      masters: studentSize > 5000 || !isPublic, // Larger schools and private schools more likely
      doctoral: studentSize > 15000, // Large research universities
      confidence: studentSize > 10000 ? 'high' : studentSize > 3000 ? 'medium' : 'low - verification recommended'
    };

    return {
      admissionCriteria,
      studentProfile,
      competitiveFactors,
      recommendations,
      verifiedPrograms
    };
  }
}

export const aiCollegeService = new AICollegeService();
