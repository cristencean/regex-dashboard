import { getMatches } from '@/utils/regexValidation';
import { describe, it, expect } from '@jest/globals';

describe('getMatches', () => {
    it('returns matches by string', () => {
        const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        const regex = 'ipsum';
        const result = getMatches(content, regex);
        expect(result).toEqual(['ipsum', 'ipsum']);
    });

      it('returns empty array if no matches', () => {
        const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        const regex = 'random';
        const result = getMatches(content, regex);
        expect(result).toEqual([]);
      });

      it('returns empty array and logs error for wrong regex', () => {
        const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        const invalidRegex = '[a-z';
        console.error = jest.fn();

        const result = getMatches(content, invalidRegex);
        expect(result).toEqual([]);
        expect(console.error).toHaveBeenCalled();
      });
});