import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import ImageUploader from './components/ImageUploader';

const ParentComponent = () => {
    const [images, setImages] = useState(JSON.parse(sessionStorage.getItem('images')) || []);
    const canvasRef = useRef(null);
    const fabricRef = useRef(null);

    useEffect(() => {
        sessionStorage.setItem('images', JSON.stringify(images));
    }, [images]);

    useEffect(() => {
        if (!fabricRef.current) {
            fabricRef.current = new fabric.Canvas(canvasRef.current, {
                width: 1920,
                height: 1080,
            });
            fabricRef.current.setDimensions({width: 960, height: 540});
            fabricRef.current.setZoom(0.5);
        }

        if (images[0]) {
            const imgSrc = 'data:image/png;base64,' + images[0];
            fabric.Image.fromURL(imgSrc, function(img) {
                img.set({
                    left: 50,
                    top: 50,
                    scaleX: 2,
                    scaleY: 2,
                }).setCoords();

                fabricRef.current.clear();
                fabricRef.current.add(img);
                fabricRef.current.renderAll();
            });
        }

        for (let i = 1; i < images.length; i++) {
            const base64Image = images[i];
            const imgSrc = 'data:image/png;base64,' + base64Image;
            fabric.Image.fromURL(imgSrc, function(img) {
                img.set({
                    left: 100 * i,
                    top: 100 * i,
                    scaleX: 2,
                    scaleY: 2,
                }).setCoords();

                fabricRef.current.add(img);
                fabricRef.current.renderAll();
            });
        }

    }, [images]);

    const downloadCanvas = () => {
        fabricRef.current.setDimensions({width: 1920, height: 1080});
        fabricRef.current.setZoom(1);
        
        const dataUrl = fabricRef.current.toDataURL({ format: 'png' });

        const link = document.createElement('a');
        link.download = 'canvas.png';
        link.href = dataUrl;
        link.click();
        
        fabricRef.current.setDimensions({width: 960, height: 540});
        fabricRef.current.setZoom(0.5);
    }

    return (
        <div>
            <h1 style={{marginLeft: '2%'}}>GRID-LY</h1>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', // fills the height of the viewport
                marginTop: '-90px'
            }}> 
                <ImageUploader setImages={setImages} />
                <div style={{width: '960px', height: '540px'}}>
                    <canvas ref={canvasRef} style={{border: "5px solid black", width: '960px', height: '540px'}} />
                </div>
                <button style={{marginTop: '50px'}}onClick={downloadCanvas}>Download Canvas as PNG</button>
            </div>
        </div>
        
    );
};

export default ParentComponent;



















