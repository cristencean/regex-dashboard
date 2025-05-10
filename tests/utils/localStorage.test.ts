import { saveToLocalStorage, getFromLocalStorage, REGEX_DASHBOARD_KEY } from '@/utils/localStorage';

describe('Local Storage', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    it('save data into local storage', () => {
        const data = 'Lorem ipsum dolor sit amet';

        saveToLocalStorage(data);

        expect(localStorage.getItem(REGEX_DASHBOARD_KEY)).toBe(data);
    });

    it('get data from local storage', () => {
        const jsonData = { dashboard: 'Lorem ipsum dolor sit amet' };
        const stringData = JSON.stringify(jsonData);

        localStorage.setItem(REGEX_DASHBOARD_KEY, stringData);
        const result = getFromLocalStorage();

        expect(result).toEqual(jsonData);
    });

    it('returns null if no data found in local storage', () => {
        const result = getFromLocalStorage();

        expect(result).toBeNull();
    });
});