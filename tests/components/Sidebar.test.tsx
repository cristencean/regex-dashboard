import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { initialState, resetState } from '@/store/dashboardSlice';
import Sidebar from '@/components/Sidebar';

const renderWithStore = () => {
    return render(
        <Provider store={store}>
            <Sidebar />
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

describe('Sidebar component', () => {
    it('renders both toggle buttons and set active first', () => {
        const buttons = screen.getAllByRole('button');
        const editorButton = screen.getByRole('button', { name: /Regex editor/i });
        const approverButton = screen.getByRole('button', { name: /Regex approver/i });


        expect(buttons.length).toBeGreaterThan(1);
        expect(editorButton).toBeInTheDocument();
        expect(editorButton).toHaveClass('bg-blue-500 text-white');
        expect(approverButton).toBeInTheDocument();
        expect(approverButton).toHaveClass('bg-gray-200 cursor-pointer');
    });

    it('renders RegexEditor component by default', () => {
        const stateData = store.getState();
        expect(stateData?.dashboard?.mode).toEqual('edit');
        expect(screen.getByText('Add new regex')).toBeInTheDocument();
    });

    it('changes mode to approver when clicking Regex approver and renders correct content', () => {
        const editorButton = screen.getByRole('button', { name: /Regex editor/i });
        const approverButton = screen.getByRole('button', { name: /Regex approver/i });
        fireEvent.click(approverButton);

        const stateData = store.getState();
        expect(stateData?.dashboard?.mode).toEqual('approval');
        expect(approverButton).toHaveClass('bg-blue-500 text-white');
        expect(editorButton).toHaveClass('bg-gray-200 cursor-pointer');
        expect(screen.getByText('Select regex')).toBeInTheDocument();
    });
});