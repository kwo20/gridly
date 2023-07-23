import React from 'react';

const ImageDisplay = ({ images }) => {
    return (
        <div>
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

export default ImageDisplay;
