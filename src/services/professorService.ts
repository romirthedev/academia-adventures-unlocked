interface SearchCriteria {
  field: string;
  school?: string;
  location?: string;
}

interface ScrapedProfessor {
  name: string;
  title: string;
  department: string;
  university: string;
  location: string;
  researchAreas: string[];
  email?: string;
  profileUrl?: string;
  labName?: string;
}

interface SerpSearchResult {
  title: string;
  link: string;
  snippet: string;
}

class ProfessorService {
  private readonly SERP_API_KEY = '4a824a5717469fa359e261c09ea2c74505b1aba930b88b574d69bd938bdba5f9';
  private readonly OPENROUTER_API_KEY = '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';

  private async searchGoogle(query: string): Promise<SerpSearchResult[]> {
    console.log(`Searching Google for: ${query}`);
    
    try {
      const response = await fetch(`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&api_key=${this.SERP_API_KEY}`);
      
      if (!response.ok) {
        throw new Error(`SerpAPI request failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(`SerpAPI error: ${data.error}`);
      }
      
      // Extract organic search results
      const organicResults = data.organic_results || [];
      
      return organicResults.map((result: any) => ({
        title: result.title || '',
        link: result.link || '',
        snippet: result.snippet || ''
      })).slice(0, 10); // Limit to first 10 results
      
    } catch (error) {
      console.error('Error with SerpAPI:', error);
      // Fallback to mock data if API fails
      return this.getMockResults();
    }
  }

  private getMockResults(): SerpSearchResult[] {
    return [
      {
        title: "Dr. Sarah Chen - Machine Learning Professor - Stanford University",
        link: "https://cs.stanford.edu/people/schen",
        snippet: "Professor Sarah Chen leads the AI Safety Lab at Stanford University. Her research focuses on machine learning, computer vision, and AI ethics. Contact: s.chen@stanford.edu"
      },
      {
        title: "Michael Rodriguez | MIT Computer Science",
        link: "https://csail.mit.edu/person/michael-rodriguez",
        snippet: "Associate Professor Michael Rodriguez directs the Computational Intelligence Lab at MIT. Research areas include natural language processing, deep learning, and robotics. Email: m.rodriguez@mit.edu"
      },
      {
        title: "Dr. Emily Johnson - Data Science Research Group - UC Berkeley",
        link: "https://statistics.berkeley.edu/people/emily-johnson",
        snippet: "Professor Emily Johnson leads data science research at UC Berkeley. Specializes in big data analytics, statistical learning, and bioinformatics. Contact: e.johnson@berkeley.edu"
      }
    ];
  }

  private async processWithAI(scrapedData: SerpSearchResult[], criteria: SearchCriteria): Promise<ScrapedProfessor[]> {
    console.log("Processing scraped data with AI to find most relevant professors...");
    
    try {
      const prompt = `
You are an AI assistant that extracts structured information about professors from web search results.

Given the following search results for professors in "${criteria.field}", extract and return a JSON array of professor objects.

Search Criteria:
- Field: ${criteria.field}
- School: ${criteria.school || 'Any'}
- Location: ${criteria.location || 'Any'}

Search Results:
${scrapedData.map((item, index) => `
${index + 1}. Title: ${item.title}
   URL: ${item.link}
   Snippet: ${item.snippet}
`).join('\n')}

For each professor found, extract:
- name: Professor's full name
- title: Academic title (Professor, Associate Professor, etc.)
- department: Academic department
- university: University name
- location: University location (city, state)
- researchAreas: Array of research areas/specializations
- email: Email address if found
- profileUrl: University profile URL
- labName: Research lab name if mentioned

Only include professors that are clearly relevant to "${criteria.field}". Return valid JSON array format.

Example format:
[
  {
    "name": "John Doe",
    "title": "Professor",
    "department": "Computer Science",
    "university": "Stanford University",
    "location": "Stanford, CA",
    "researchAreas": ["machine learning", "computer vision"],
    "email": "j.doe@stanford.edu",
    "profileUrl": "https://cs.stanford.edu/people/jdoe",
    "labName": "AI Research Lab"
  }
]
`;

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.2-3b-instruct:free',
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
        const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const professors = JSON.parse(jsonMatch[0]);
          return Array.isArray(professors) ? professors : [];
        }
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
      }

      // Fallback to manual processing if AI parsing fails
      return this.fallbackProcessing(scrapedData, criteria);

    } catch (error) {
      console.error('Error with AI processing:', error);
      // Fallback to manual processing
      return this.fallbackProcessing(scrapedData, criteria);
    }
  }

  private fallbackProcessing(scrapedData: SerpSearchResult[], criteria: SearchCriteria): ScrapedProfessor[] {
    const processedProfessors: ScrapedProfessor[] = [];
    
    for (const item of scrapedData) {
      const professor = this.extractProfessorInfo(item, criteria);
      if (professor && this.isRelevant(professor, criteria)) {
        processedProfessors.push(professor);
      }
    }
    
    return processedProfessors.sort((a, b) => {
      const scoreA = this.calculateRelevanceScore(a, criteria);
      const scoreB = this.calculateRelevanceScore(b, criteria);
      return scoreB - scoreA;
    });
  }

  private extractProfessorInfo(scrapedItem: SerpSearchResult, criteria: SearchCriteria): ScrapedProfessor | null {
    const snippet = scrapedItem.snippet.toLowerCase();
    const title = scrapedItem.title;
    
    // Extract name (simplified extraction)
    const nameMatch = title.match(/(?:Dr\.|Prof\.|Professor)?\s*([A-Z][a-z]+\s+[A-Z][a-z]+)/);
    if (!nameMatch) return null;
    
    const name = nameMatch[1];
    
    // Extract university
    const universities = ['Stanford', 'MIT', 'UC Berkeley', 'Carnegie Mellon', 'Harvard', 'Caltech'];
    const university = universities.find(uni => 
      title.toLowerCase().includes(uni.toLowerCase()) || 
      snippet.includes(uni.toLowerCase())
    ) || 'Unknown University';
    
    // Extract email using regex
    const emailMatch = scrapedItem.snippet.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    const email = emailMatch ? emailMatch[1] : undefined;
    
    // Extract research areas based on common keywords
    const researchKeywords = ['machine learning', 'artificial intelligence', 'computer vision', 'natural language processing', 
                             'cybersecurity', 'data science', 'robotics', 'deep learning', 'neural networks', 'big data'];
    const researchAreas = researchKeywords.filter(keyword => 
      snippet.includes(keyword) || title.toLowerCase().includes(keyword)
    );
    
    // Extract lab name
    const labMatch = snippet.match(/([A-Z][a-zA-Z\s]*(?:Lab|Laboratory|Research Group|Center))/);
    const labName = labMatch ? labMatch[1] : undefined;
    
    return {
      name,
      title: this.extractTitle(title, snippet),
      department: this.extractDepartment(criteria.field),
      university: university + ' University',
      location: this.getUniversityLocation(university),
      researchAreas: researchAreas.length > 0 ? researchAreas : [criteria.field],
      email,
      profileUrl: scrapedItem.link,
      labName
    };
  }

  private extractTitle(title: string, snippet: string): string {
    if (title.toLowerCase().includes('professor') || snippet.toLowerCase().includes('professor')) {
      return 'Professor';
    } else if (title.toLowerCase().includes('associate') || snippet.toLowerCase().includes('associate')) {
      return 'Associate Professor';
    } else if (title.toLowerCase().includes('assistant') || snippet.toLowerCase().includes('assistant')) {
      return 'Assistant Professor';
    }
    return 'Professor';
  }

  private extractDepartment(field: string): string {
    const departmentMap: { [key: string]: string } = {
      'Computer Science': 'Computer Science',
      'Artificial Intelligence': 'Computer Science',
      'Machine Learning': 'Computer Science',
      'Data Science': 'Statistics & Data Science',
      'Cybersecurity': 'Computer Science',
      'Software Engineering': 'Computer Science'
    };
    return departmentMap[field] || field;
  }

  private getUniversityLocation(university: string): string {
    const locationMap: { [key: string]: string } = {
      'Stanford': 'Stanford, CA',
      'MIT': 'Cambridge, MA',
      'UC Berkeley': 'Berkeley, CA',
      'Carnegie Mellon': 'Pittsburgh, PA',
      'Harvard': 'Cambridge, MA',
      'Caltech': 'Pasadena, CA'
    };
    return locationMap[university] || 'Unknown Location';
  }

  private isRelevant(professor: ScrapedProfessor, criteria: SearchCriteria): boolean {
    const fieldMatch = professor.researchAreas.some(area => 
      area.toLowerCase().includes(criteria.field.toLowerCase()) ||
      criteria.field.toLowerCase().includes(area.toLowerCase())
    );
    
    const schoolMatch = !criteria.school || 
      professor.university.toLowerCase().includes(criteria.school.toLowerCase());
    
    const locationMatch = !criteria.location || 
      professor.location.toLowerCase().includes(criteria.location.toLowerCase());
    
    return fieldMatch && schoolMatch && locationMatch;
  }

  private calculateRelevanceScore(professor: ScrapedProfessor, criteria: SearchCriteria): number {
    let score = 0;
    
    // Field relevance (highest weight)
    const fieldRelevance = professor.researchAreas.filter(area => 
      area.toLowerCase().includes(criteria.field.toLowerCase()) ||
      criteria.field.toLowerCase().includes(area.toLowerCase())
    ).length;
    score += fieldRelevance * 10;
    
    // School preference
    if (criteria.school && professor.university.toLowerCase().includes(criteria.school.toLowerCase())) {
      score += 5;
    }
    
    // Location preference
    if (criteria.location && professor.location.toLowerCase().includes(criteria.location.toLowerCase())) {
      score += 3;
    }
    
    // Email availability bonus
    if (professor.email) {
      score += 2;
    }
    
    // Lab leadership bonus
    if (professor.labName) {
      score += 1;
    }
    
    return score;
  }

  public async searchProfessors(criteria: SearchCriteria): Promise<ScrapedProfessor[]> {
    try {
      // Build search query
      let query = `${criteria.field} professor research lab`;
      
      if (criteria.school) {
        query += ` ${criteria.school}`;
      }
      
      if (criteria.location) {
        query += ` ${criteria.location}`;
      }
      
      console.log(`Starting professor search with criteria:`, criteria);
      
      // Step 1: Scrape Google search results using SerpAPI
      const scrapedData = await this.searchGoogle(query);
      
      // Step 2: Process with AI to extract relevant information
      const professors = await this.processWithAI(scrapedData, criteria);
      
      console.log(`Found ${professors.length} relevant professors`);
      return professors;
      
    } catch (error) {
      console.error('Error searching for professors:', error);
      throw new Error('Failed to search for professors. Please try again.');
    }
  }
}

export const professorService = new ProfessorService();
