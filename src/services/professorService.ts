
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

class ProfessorService {
  private async searchGoogle(query: string): Promise<any[]> {
    // In a real implementation, this would use a web scraping service
    // For now, we'll simulate the scraping process
    console.log(`Searching Google for: ${query}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock scraped data that would come from Google search results
    return [
      {
        title: "Dr. Sarah Chen - Machine Learning Professor - Stanford University",
        url: "https://cs.stanford.edu/people/schen",
        snippet: "Professor Sarah Chen leads the AI Safety Lab at Stanford University. Her research focuses on machine learning, computer vision, and AI ethics. Contact: s.chen@stanford.edu"
      },
      {
        title: "Michael Rodriguez | MIT Computer Science",
        url: "https://csail.mit.edu/person/michael-rodriguez",
        snippet: "Associate Professor Michael Rodriguez directs the Computational Intelligence Lab at MIT. Research areas include natural language processing, deep learning, and robotics. Email: m.rodriguez@mit.edu"
      },
      {
        title: "Dr. Emily Johnson - Data Science Research Group - UC Berkeley",
        url: "https://statistics.berkeley.edu/people/emily-johnson",
        snippet: "Professor Emily Johnson leads data science research at UC Berkeley. Specializes in big data analytics, statistical learning, and bioinformatics. Contact: e.johnson@berkeley.edu"
      },
      {
        title: "Prof. David Kim - AI Lab Director - Carnegie Mellon",
        url: "https://cs.cmu.edu/~dkim",
        snippet: "David Kim is a Professor of Computer Science at Carnegie Mellon University. He directs the Advanced AI Research Lab. Research interests: machine learning, neural networks."
      },
      {
        title: "Dr. Lisa Wang - Cybersecurity Research Center - MIT",
        url: "https://csail.mit.edu/person/lisa-wang",
        snippet: "Professor Lisa Wang leads cybersecurity research at MIT. Her work focuses on network security, cryptography, and AI-powered threat detection. Email: l.wang@mit.edu"
      }
    ];
  }

  private async processWithAI(scrapedData: any[], criteria: SearchCriteria): Promise<ScrapedProfessor[]> {
    console.log("Processing scraped data with AI to find most relevant professors...");
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real implementation, this would use an AI service to:
    // 1. Extract structured data from scraped content
    // 2. Rank professors by relevance to the search criteria
    // 3. Extract email addresses and other contact information
    
    const processedProfessors: ScrapedProfessor[] = [];
    
    for (const item of scrapedData) {
      // Simulate AI extraction and processing
      const professor = this.extractProfessorInfo(item, criteria);
      if (professor && this.isRelevant(professor, criteria)) {
        processedProfessors.push(professor);
      }
    }
    
    // Sort by relevance (simulated AI ranking)
    return processedProfessors.sort((a, b) => {
      const scoreA = this.calculateRelevanceScore(a, criteria);
      const scoreB = this.calculateRelevanceScore(b, criteria);
      return scoreB - scoreA;
    });
  }

  private extractProfessorInfo(scrapedItem: any, criteria: SearchCriteria): ScrapedProfessor | null {
    // Simulate AI extraction of structured data from scraped content
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
      profileUrl: scrapedItem.url,
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
      
      // Step 1: Scrape Google search results
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
