// src/Callback.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Callback() {
    const location = useLocation();

    useEffect(() => {
        handleCallback();
    }, [location]);

    const handleCallback = async () => {
        try {
            const response = await fetch(`/callback${location.search}`);
            const authResponse = await response.json();
            console.log('Auth Response:', authResponse);
        } catch (error) {
            console.error('Error handling callback:', error);
        }
    };

    return <div>Handling callback...</div>;
}

export default Callback;
