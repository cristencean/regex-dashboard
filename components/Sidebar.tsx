'use client';

import { AppState } from '@/store';
import { useSelector, useDispatch } from 'react-redux';

import { setMode } from '@/store/dashboardSlice';
import EditRegex from './EditRegex';
import ApprovalRegex from './ApprovalRegex';

const Sidebar: React.FC = () => {
    const mode = useSelector((state: AppState) => state.dashboard.mode);
    const dispatch = useDispatch();

    const isEditMode = mode === 'edit';

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Regex Sidebar</h2>
            <div className="flex space-x-2 mb-4">
                <button
                    onClick={() => dispatch(setMode('edit'))}
                    className={`px-4 py-2 rounded ${isEditMode ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Edit mode
                </button>
                <button
                    onClick={() => dispatch(setMode('approval'))}
                    className={`px-4 py-2 rounded ${!isEditMode ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Approval mode
                </button>
            </div>

            {isEditMode ? <EditRegex /> : <ApprovalRegex />}
        </div>
    );
};

export default Sidebar;