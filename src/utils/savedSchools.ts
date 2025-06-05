
interface SavedSchool {
  id: number;
  name: string;
  city: string;
  state: string;
  savedAt: string;
}

const SAVED_SCHOOLS_COOKIE = 'saved_schools';

export const savedSchoolsUtils = {
  getSavedSchools: (): SavedSchool[] => {
    try {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(SAVED_SCHOOLS_COOKIE))
        ?.split('=')[1];
      
      if (!cookieValue) return [];
      
      const decoded = decodeURIComponent(cookieValue);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Error parsing saved schools cookie:', error);
      return [];
    }
  },

  saveSchool: (school: { id: number; name: string; city: string; state: string }): boolean => {
    try {
      const currentSaved = savedSchoolsUtils.getSavedSchools();
      
      // Check if already saved
      if (currentSaved.some(saved => saved.id === school.id)) {
        return false;
      }

      const newSavedSchool: SavedSchool = {
        ...school,
        savedAt: new Date().toISOString()
      };

      const updatedSaved = [...currentSaved, newSavedSchool];
      
      // Limit to 50 saved schools
      if (updatedSaved.length > 50) {
        updatedSaved.shift();
      }

      const encoded = encodeURIComponent(JSON.stringify(updatedSaved));
      
      // Set cookie for 1 year
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      
      document.cookie = `${SAVED_SCHOOLS_COOKIE}=${encoded}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
      
      return true;
    } catch (error) {
      console.error('Error saving school:', error);
      return false;
    }
  },

  removeSavedSchool: (schoolId: number): void => {
    try {
      const currentSaved = savedSchoolsUtils.getSavedSchools();
      const updatedSaved = currentSaved.filter(school => school.id !== schoolId);
      
      const encoded = encodeURIComponent(JSON.stringify(updatedSaved));
      
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      
      document.cookie = `${SAVED_SCHOOLS_COOKIE}=${encoded}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
    } catch (error) {
      console.error('Error removing saved school:', error);
    }
  },

  isSchoolSaved: (schoolId: number): boolean => {
    const saved = savedSchoolsUtils.getSavedSchools();
    return saved.some(school => school.id === schoolId);
  }
};
