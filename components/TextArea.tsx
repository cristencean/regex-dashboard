'use client';

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoremIpsum } from 'lorem-ipsum';

import { setContent } from '@/store/dashboardSlice';
import { AppState } from '@/store';

const TextArea: React.FC = () => {
    const dispatch = useDispatch();
    const { content, regexList } = useSelector((state: AppState) => state.dashboard);
    const contentRef = useRef(content);

    useEffect(() => {
        contentRef.current = content;
    }, [content]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const loremIpsum = new LoremIpsum();
            const randomText = loremIpsum.generateParagraphs(6);

            if (!contentRef.current) {
                dispatch(setContent(randomText));
            }
        }, 0);

        return () => clearTimeout(timeout);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setContent(e.target.value));
    }

    return (
        <>
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">Lorem ipsum text</h2>
            <textarea
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={content}
                onChange={handleChange}
                rows={15}
            />
            {regexList && regexList.length ? (
                <>
                    <h3 className="text-xl font-semibold text-gray-700 mt-4">Matching terms</h3>
                    {regexList.map((regex, index) => {
                        return (
                            <div key={index} className='mt-2'>
                                <strong>{regex.value}</strong> ({regex.matches.length} matches):
                                {regex.matches.length > 0 ? regex.matches.map((match, matchIndex) => (
                                    <span key={matchIndex} className="text-blue-500">
                                        {(matchIndex === 0 ? ' ' : ', ') + match}
                                    </span>
                                )) : null}
                            </div>
                        );
                    })}
                </>
            ) : null}
        </>
    );
};

export default TextArea;