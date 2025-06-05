
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
      // Try using a CORS proxy or direct fetch
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const targetUrl = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&api_key=${this.SERP_API_KEY}`;
      
      const response = await fetch(`${proxyUrl}${encodeURIComponent(targetUrl)}`);
      
      if (!response.ok) {
        throw new Error(`Proxy request failed: ${response.status}`);
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
      })).slice(0, 10);
      
    } catch (error) {
      console.error('Error with SerpAPI:', error);
      // Don't use mock data, just return empty results
      throw new Error('Web scraping is currently unavailable. Please try again later.');
    }
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

      return [];

    } catch (error) {
      console.error('Error with AI processing:', error);
      throw new Error('AI processing is currently unavailable. Please try again later.');
    }
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
      throw error; // Re-throw the error to be handled by the UI
    }
  }
}

export const professorService = new ProfessorService();
