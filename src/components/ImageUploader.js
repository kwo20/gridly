import React from 'react';
//FOR EVEN IMGS MUST BE 480x360
//CURRENT MAX OF 12 IMGS
const ImageUploader = ({ setImages }) => {

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const filesCount = files.length <= 12 ? files.length : 12;

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
        </div>
    );
};

export default ImageUploader;

