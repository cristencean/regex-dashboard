import '@testing-library/jest-dom';

global.localStorage = {
    setItem: jest.fn(),
    getItem: jest.fn(),
    clear: jest.fn(),
};