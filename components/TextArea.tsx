'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoremIpsum } from 'lorem-ipsum';

import { setContent } from '@/store/dashboardSlice';
import { AppState } from '@/store';

const TextArea: React.FC = () => {
    const dispatch = useDispatch();
    const text = useSelector((state: AppState) => state.dashboard.content);

    useEffect(() => {
        const loremIpsum = new LoremIpsum();
        const randomText = loremIpsum.generateParagraphs(5);

        dispatch(setContent(randomText));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setContent(e.target.value));
    }

    return (
        <textarea
            className="w-full p-4 border rounded shadow-sm"
            value={text}
            onChange={handleChange}
            rows={12}
        />
    );
};

export default TextArea;