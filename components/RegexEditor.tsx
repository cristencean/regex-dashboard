'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppState } from '@/store';
import { removeRegex, addRegex, updateRegex } from '@/store/dashboardSlice';

const RegexEditor: React.FC = () => {
    const regexList = useSelector((state: AppState) => state.dashboard.regexList);
    const dispatch = useDispatch();
    const [newRegex, setNewRegex] = React.useState<string>('');
    const [newRegexError, setNewRegexError] = React.useState<string>('');

    const handleNewRegexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRegex(e.target.value);
        setNewRegexError('');
    };

    const handleAddRegex = () => {
        if (newRegex.trim() === '') {
            setNewRegexError('Please enter a regex value.');
            return;
        }

        dispatch(addRegex(newRegex));
        setNewRegex('');
    };

    const handleDelete = (index: number) => {
        dispatch(removeRegex(index));
    };

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateRegex({ index, value: event.target.value }));
    };

    return (
        <>
            <h3 className="text-xl font-semibold text-gray-700 mt-6">Add new regex</h3>
            <input
                className="flex-1 p-2 border rounded"
                placeholder="Enter regex"
                value={newRegex}
                onChange={handleNewRegexChange}
            />
            <button
                onClick={handleAddRegex}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 ml-4 cursor-pointer text-lg font-semibold"
            >Add</button>
            {newRegexError && <p className="text-red-500 mt-1">{newRegexError}</p>}
            {regexList && regexList.length ? (
                <>
                    <h3 className="text-xl font-semibold text-gray-700 mt-8">Regex List</h3>
                    {regexList.map((regex, index) => (
                        <div key={index} className='mt-2'>
                            <input
                                className={`flex-1 p-2 border rounded ${regex.isApproved ? 'text-blue-500' : ''}`}
                                value={regex.value}
                                onChange={(event) => handleChange(index, event)}
                            />
                            <button
                                onClick={() => handleDelete(index)}
                                className="bg-red-600 text-white px-4 py-2 rounded mt-2 ml-4 cursor-pointer text-lg font-semibold"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </>
            ) : null}
        </>
    );
};

export default RegexEditor;