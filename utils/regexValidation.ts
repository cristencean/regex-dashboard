export const getMatches = (text: string, regexValue: string): string[] => {
    try {
      const regex = new RegExp(regexValue, 'g');
      const matches = text.match(regex);
        if (matches) {
            return matches;
        } else {
            return [];
        }
    } catch (e) {
      console.error('Invalid regex:', e);
      return [];
    }
  };