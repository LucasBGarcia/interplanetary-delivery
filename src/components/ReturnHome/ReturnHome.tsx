import React from 'react';
import { useNavigate } from 'react-router-dom';

export function BackButton() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    return (
        <button
            onClick={handleBack}
            className="flex items-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-300"
        >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="ml-2">Voltar</span>
        </button>
    );
};

