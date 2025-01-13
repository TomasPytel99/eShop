import { useEffect, useRef, useState } from 'react';
import { json, Link } from 'react-router-dom'
import api from '../api'


const CustomerInfoView = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Fetch the image URL from the Laravel backend
        const fetchImage = async () => {
            try {
                // Make a request to the Laravel API endpoint that returns the image
                const response = await api.get('/image', {
                    responseType: 'blob', // Ensure we're getting the file as a blob
                });
                
                // Create an object URL from the image blob
                const url = URL.createObjectURL(response.data);
                setImageUrl(url);
            } catch (err) {
                setError('Error fetching image');
                console.error('Error fetching image:', err);
            }
        };

        fetchImage();
    }, []);
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {imageUrl ? (
                <img src={imageUrl} alt="Fetched Image" style={{ maxWidth: '300px' }} />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

 
export default CustomerInfoView;