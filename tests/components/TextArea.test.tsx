import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TextArea from '@/components/TextArea';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { addRegex, initialState, resetState, setContent } from '@/store/dashboardSlice';

const loremIpsumMockText = 'Lorem ipsum dolor sit amet.';
jest.mock('lorem-ipsum', () => {
    return {
        LoremIpsum: jest.fn().mockImplementation(() => ({
            generateParagraphs: () => loremIpsumMockText,
        }))
    };
});

const renderWithStore = () => {
    return render(
        <Provider store={store}>
            <TextArea />
        </Provider>
    );
};

let skipNextTestRender = false;
beforeEach(() => {
    store.dispatch(resetState(initialState));

    if (skipNextTestRender) {
        return;
    }
    renderWithStore();
});

describe('TextArea component', () => {
    it('renders title and textarea item', () => {
        expect(screen.getByText('Lorem ipsum text')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('dispatches setContent on user input', () => {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Lorem ipsum' } });

        const stateData = store.getState();
        expect(stateData?.dashboard?.content).toEqual('Lorem ipsum');
    });

    it('adds content to textarea if empty on reload', async () => {
        await waitFor(() => {
            expect(screen.getByRole('textbox')).toHaveTextContent(loremIpsumMockText);
            const stateData = store.getState();
            expect(stateData?.dashboard?.content).toEqual(loremIpsumMockText);
        });
    });

    it('skips genereting content if already text in place', async () => {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New value' } });
        await new Promise((resolve) => setTimeout(resolve, 20));

        expect(screen.getByRole('textbox')).toHaveTextContent('New value');
        const stateData = store.getState();
        expect(stateData?.dashboard?.content).toEqual('New value');

        skipNextTestRender = true;
    });

    it('shows regex list if a regex was added', async () => {
        store.dispatch(setContent('Some regex-word-1 will be regex-word-2 and regex-word-2.'));
        store.dispatch(addRegex('regex-word-1'));
        store.dispatch(addRegex('regex-word-2'));

        render(<Provider store={store}>
            <TextArea />
        </Provider>);

        expect(screen.getByText('Matching terms')).toBeInTheDocument();
        expect(screen.getAllByText('regex-word-1').length).toBeGreaterThan(0);
        expect(screen.getAllByText('regex-word-2').length).toBeGreaterThan(0);

        skipNextTestRender = false;
    });
});