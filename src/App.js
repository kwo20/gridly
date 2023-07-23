import React, { useState, useEffect } from 'react';
import ImageUploader from './components/ImageUploader';
import ImageDisplay from './components/ImageDisplay';

const ParentComponent = () => {
    const [images, setImages] = useState(JSON.parse(sessionStorage.getItem('images')) || []);

    useEffect(() => {
        sessionStorage.setItem('images', JSON.stringify(images));
    }, [images]);

    return (
        <div>
            <ImageUploader setImages={setImages} />
            <ImageDisplay images={images} />
        </div>
    );
};

export default ParentComponent;

