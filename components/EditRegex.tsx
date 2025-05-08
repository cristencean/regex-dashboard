'use client';

import { AppState } from '@/store';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { removeRegex, addRegex, updateRegex } from '@/store/dashboardSlice';

const EditRegex: React.FC = () => {
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
            <h3>Add new regex</h3>
            <input
                className="flex-1 p-2 border rounded"
                placeholder="Enter regex"
                value={newRegex}
                onChange={handleNewRegexChange}
            />
            <button
                onClick={handleAddRegex}
                className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
            >Add</button>
            {newRegexError && <p className="text-red-500">{newRegexError}</p>}
            <br/>
            <h3>Regex List</h3>
            {regexList.map((item, index) => (
                <div key={index}>
                    <input
                        className="flex-1 p-2 border rounded"
                        value={item.regex}
                        onChange={(event) => handleChange(index, event)}
                    />
                    <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-600 text-white px-3 py-1 rounded mt-2"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </>
    );
};

export default EditRegex;