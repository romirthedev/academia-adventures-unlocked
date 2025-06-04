
const API_KEY = 'VarJgCskx12MgYVvu1IE9RcHwvtWJDGSrLq4ifLs';
const BASE_URL = 'https://api.data.gov/ed/collegescorecard/v1/schools';

interface SearchParams {
  query?: string;
  state?: string;
  minSize?: string;
  maxSize?: string;
  minAdmissionRate?: string;
  maxAdmissionRate?: string;
  maxTuition?: string;
  page?: number;
  per_page?: number;
}

interface CollegeResponse {
  metadata: {
    total: number;
    page: number;
    per_page: number;
  };
  results: any[];
}

class CollegeService {
  private buildQueryParams(params: SearchParams): string {
    const queryParams = new URLSearchParams();
    
    // Add API key
    queryParams.append('api_key', API_KEY);
    
    // Add fields we want to retrieve
    const fields = [
      'id',
      'school.name',
      'school.city',
      'school.state',
      'school.school_url',
      'latest.admissions.admission_rate.overall',
      'latest.cost.tuition.in_state',
      'latest.cost.tuition.out_of_state',
      'latest.student.size',
      'latest.academics.program_available.assoc',
      'latest.academics.program_available.bachelors',
      'latest.academics.program_available.masters',
      'latest.academics.program_available.doctoral',
      'latest.cost.avg_net_price.overall',
      'latest.completion.completion_rate_4yr_150nt',
      'latest.earnings.10_yrs_after_entry.median',
      'school.degrees_awarded.predominant',
      'school.ownership'
    ].join(',');
    queryParams.append('fields', fields);
    
    // Add search query
    if (params.query) {
      queryParams.append('school.name', params.query);
    }
    
    // Add filters
    if (params.state) {
      queryParams.append('school.state', params.state);
    }
    
    if (params.minSize) {
      queryParams.append('latest.student.size__gte', params.minSize);
    }
    
    if (params.maxSize) {
      queryParams.append('latest.student.size__lte', params.maxSize);
    }
    
    if (params.minAdmissionRate) {
      const rate = parseFloat(params.minAdmissionRate) / 100;
      queryParams.append('latest.admissions.admission_rate.overall__gte', rate.toString());
    }
    
    if (params.maxAdmissionRate) {
      const rate = parseFloat(params.maxAdmissionRate) / 100;
      queryParams.append('latest.admissions.admission_rate.overall__lte', rate.toString());
    }
    
    if (params.maxTuition) {
      queryParams.append('latest.cost.tuition.out_of_state__lte', params.maxTuition);
    }
    
    // Add pagination
    queryParams.append('page', (params.page || 0).toString());
    queryParams.append('per_page', (params.per_page || 20).toString());
    
    // Sort by relevance/name
    queryParams.append('sort', 'school.name');
    
    return queryParams.toString();
  }

  async searchColleges(params: SearchParams): Promise<CollegeResponse> {
    try {
      const queryString = this.buildQueryParams(params);
      const url = `${BASE_URL}?${queryString}`;
      
      console.log('Fetching colleges from:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('College API response:', data);
      
      return data;
    } catch (error) {
      console.error('Error fetching colleges:', error);
      throw error;
    }
  }

  async getCollegeById(id: string): Promise<any> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('api_key', API_KEY);
      queryParams.append('id', id);
      
      // Get all available fields for detailed view
      const fields = [
        'id',
        'school.name',
        'school.city',
        'school.state',
        'school.zip',
        'school.school_url',
        'school.price_calculator_url',
        'school.ownership',
        'school.locale',
        'school.carnegie_basic',
        'school.carnegie_undergrad',
        'school.degrees_awarded.predominant',
        'school.degrees_awarded.highest',
        'latest.admissions.admission_rate.overall',
        'latest.admissions.sat_scores.average.overall',
        'latest.admissions.act_scores.midpoint.cumulative',
        'latest.cost.tuition.in_state',
        'latest.cost.tuition.out_of_state',
        'latest.cost.avg_net_price.overall',
        'latest.cost.avg_net_price.public',
        'latest.cost.avg_net_price.private',
        'latest.student.size',
        'latest.student.demographics.race_ethnicity.white',
        'latest.student.demographics.race_ethnicity.black',
        'latest.student.demographics.race_ethnicity.hispanic',
        'latest.student.demographics.race_ethnicity.asian',
        'latest.student.demographics.men',
        'latest.student.demographics.women',
        'latest.completion.completion_rate_4yr_150nt',
        'latest.completion.completion_rate_less_than_4yr_150nt',
        'latest.earnings.10_yrs_after_entry.median',
        'latest.aid.median_debt.graduates.overall',
        'latest.academics.program_available.assoc',
        'latest.academics.program_available.bachelors',
        'latest.academics.program_available.masters',
        'latest.academics.program_available.doctoral'
      ].join(',');
      queryParams.append('fields', fields);
      
      const url = `${BASE_URL}?${queryParams.toString()}`;
      console.log('Fetching college details from:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('College details API response:', data);
      
      return data.results[0];
    } catch (error) {
      console.error('Error fetching college details:', error);
      throw error;
    }
  }

  async getPopularColleges(): Promise<any[]> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('api_key', API_KEY);
      queryParams.append('per_page', '50');
      queryParams.append('sort', 'latest.student.size:desc');
      
      // Filter for 4-year institutions with good data
      queryParams.append('school.degrees_awarded.predominant__gte', '3');
      queryParams.append('latest.student.size__gte', '5000');
      
      const fields = [
        'id',
        'school.name',
        'school.city',
        'school.state',
        'latest.admissions.admission_rate.overall',
        'latest.cost.tuition.out_of_state',
        'latest.student.size'
      ].join(',');
      queryParams.append('fields', fields);
      
      const url = `${BASE_URL}?${queryParams.toString()}`;
      console.log('Fetching popular colleges from:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching popular colleges:', error);
      throw error;
    }
  }
}

export const collegeService = new CollegeService();
