'use client';

import { useSelector, useDispatch } from 'react-redux';

import { AppState } from '@/store';
import { setMode } from '@/store/dashboardSlice';
import RegexEditor from './RegexEditor';
import RegexApprover from './RegexApprover';

const Sidebar: React.FC = () => {
    const mode = useSelector((state: AppState) => state.dashboard.mode);
    const dispatch = useDispatch();

    const isEditMode = mode === 'edit';

    return (
        <div>
            <div className="flex space-x-2 mb-4 mt-4">
                <button
                    onClick={() => dispatch(setMode('edit'))}
                    className={`px-4 py-2 rounded text-lg font-semibold ${isEditMode ? 
                        'bg-blue-500 text-white' : 'bg-gray-200 cursor-pointer'}`}
                >
                    Regex editor
                </button>
                <button
                    onClick={() => dispatch(setMode('approval'))}
                    className={`px-4 py-2 rounded text-lg font-semibold ${!isEditMode ? 
                        'bg-blue-500 text-white' : 'bg-gray-200 cursor-pointer'}`}
                >
                    Regex approver
                </button>
            </div>

            {isEditMode ? <RegexEditor /> : <RegexApprover />}
        </div>
    );
};

export default Sidebar;