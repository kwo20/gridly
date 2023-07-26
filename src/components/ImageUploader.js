import React from 'react';

const ImageUploader = ({ setImages }) => {
    const inputRef = React.createRef();

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

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
        <div style={{marginBottom: '50px'}}>
            <button onClick={handleClick}>Upload Image(s)</button>
            <input 
                ref={inputRef}
                type='file' 
                accept='image/*' 
                onChange={handleImageChange} 
                multiple 
                style={{display: 'none'}}
            />
        </div>
    );
};

export default ImageUploader;


