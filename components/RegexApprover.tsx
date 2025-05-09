'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { AppState } from '@/store';
import { approveRegex } from '@/store/dashboardSlice';

const RegexApprover: React.FC = () => {
    const [selectedRegexId, setSelectedRegexId] = useState<number>(-1);

    const { regexList } = useSelector((state: AppState) => state.dashboard);
    const dispatch = useDispatch();

    const selectedRegex = selectedRegexId > -1 ? regexList[selectedRegexId] : undefined;

    const handleRegexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setSelectedRegexId(Number(selectedId));
    };

    const handleApprove = () => {
        if (selectedRegexId < 0) {
            return;
        }
        dispatch(approveRegex(selectedRegexId));
        setSelectedRegexId(-1);
    };

    return (
        <div>
            <h3 className="text-xl font-semibold text-gray-700 mt-6">Select regex</h3>
            <select value={selectedRegexId} onChange={handleRegexChange} 
                className='w-full p-2 border border-gray-300 rounded-md mt-2'>
                <option value={-1}>Select Regex</option>
                {regexList.map((regex, index) =>
                    <option key={`${index}-approver`}
                        value={index}
                        className={regex.isApproved ? 'text-blue-500' : undefined}>
                        {regex.value}
                    </option>)}
            </select>
            <button onClick={handleApprove} 
                className='bg-blue-500 text-white px-4 py-2 rounded mt-4 cursor-pointer text-lg font-semibold'>Approve</button>
            {selectedRegex &&
                (<>
                    <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">Matches</h3>
                    <div>
                        <strong>{selectedRegex.value}</strong> ({selectedRegex.matches.length} matches):
                        {selectedRegex.matches.length > 0 ? selectedRegex.matches.map((match, matchIndex) => (
                            <span key={matchIndex} className="text-blue-500">
                                {(matchIndex === 0 ? ' ' : ', ') + match}
                            </span>
                        )) : null}
                    </div>
                </>)}
        </div>
    );
};

export default RegexApprover;