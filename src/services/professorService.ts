
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
  private readonly OPENROUTER_API_KEY = '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';

  // Empty professor database - all professors removed
  private professorDatabase: Record<string, any[]> = {};

  private async generateProfessorsWithAI(criteria: SearchCriteria): Promise<ScrapedProfessor[]> {
    console.log("Professor database is empty - no professors available");
    return [];
  }

  private getFallbackProfessors(criteria: SearchCriteria): ScrapedProfessor[] {
    // Return empty array since all professors have been removed
    return [];
  }

  public async searchProfessors(criteria: SearchCriteria): Promise<ScrapedProfessor[]> {
    try {
      console.log(`Professor search attempted but database is empty:`, criteria);
      return [];
    } catch (error) {
      console.error('Error searching for professors:', error);
      return [];
    }
  }
}

export const professorService = new ProfessorService();
