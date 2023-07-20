import React, { useState, useEffect } from 'react';

//CURRENTLY ONLY ALLOWS 4 IMAGES TO BE UPLOADED AND WILL DISPLAY AT 400x400 EACH
//NEED TO REMOVE DISPLAY IN THIS COMPONENT AND HAVE IT JUST BE UPLOADING IMAGES
const ImageUploader = () => {
    const [images, setImages] = useState(JSON.parse(sessionStorage.getItem('images')) || []);

    useEffect(() => {
        sessionStorage.setItem('images', JSON.stringify(images));
    }, [images]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const filesCount = files.length + images.length <= 4 ? files.length : 4 - images.length;

        files.slice(0, filesCount).forEach(file => {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
                setImages(prevImages => [...prevImages, base64String]);
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        });
    };

    return (
        <div>
            <input type='file' accept='image/*' onChange={handleImageChange} multiple />
            {images.map((image, index) => (
                <img 
                    key={index}
                    src={`data:image/png;base64,${image}`} 
                    alt={`User uploaded ${index}`} 
                    style={{width: "400px", height: "400px"}}
                />
            ))}
        </div>
    );
};

export default ImageUploader;
