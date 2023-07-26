import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import ImageUploader from './components/ImageUploader';
import db from './db';

const ParentComponent = () => {
    const [images, setImages] = useState([]);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [lastRenderedImageIndex, setLastRenderedImageIndex] = useState(-1);
    const canvasRef = useRef(null);
    const fabricRef = useRef(null);

    const clearCanvasAndDB = async () => {
        // Clear the fabric canvas
        if (fabricRef.current) {
            fabricRef.current.clear();
            fabricRef.current.renderAll();
        }
    
        // Clear the images from the state
        setImages([]);
    
        // Clear the database
        await db.images.clear();
    };

    useEffect(() => {
        // Load images from IndexedDB when the component first mounts
        const loadImagesFromDB = async () => {
            const imagesFromDB = await db.images.toArray();
            setImages(imagesFromDB);
        }

        loadImagesFromDB();
    }, []);

    useEffect(() => {
        if (!fabricRef.current) {
            fabricRef.current = new fabric.Canvas(canvasRef.current, {
                width: 1920,
                height: 1080,
            });
            fabricRef.current.setDimensions({width: 960, height: 540});
            fabricRef.current.setZoom(0.5);
        }
    
        if (isInitialRender && images.length) {
            // Render all images from DB
            images.forEach((image, index) => {
                const base64Image = image.base64;
                const imgSrc = 'data:image/png;base64,' + base64Image;
                fabric.Image.fromURL(imgSrc, function(img) {
                    img.set({
                        left: 100 * index,
                        top: 100 * index,
                        scaleX: 2,
                        scaleY: 2,
                    }).setCoords();
    
                    fabricRef.current.add(img);
                    fabricRef.current.renderAll();
                });
            });
            setLastRenderedImageIndex(images.length - 1);
            setIsInitialRender(false);
        } else if (images.length && !isInitialRender && images.length - 1 !== lastRenderedImageIndex) {
            // Only render the last image
            const latestImage = images[images.length - 1];
            const base64Image = latestImage.base64;
            const imgSrc = 'data:image/png;base64,' + base64Image;
            fabric.Image.fromURL(imgSrc, function(img) {
                img.set({
                    left: 100 * (images.length - 1),
                    top: 100 * (images.length - 1),
                    scaleX: 2,
                    scaleY: 2,
                }).setCoords();
    
                fabricRef.current.add(img);
                fabricRef.current.renderAll();
            });
            setLastRenderedImageIndex(images.length - 1);
        }
    
    }, [images, isInitialRender, lastRenderedImageIndex]);
    
    
    

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
        clearCanvasAndDB();
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
                <button style={{marginTop: '20px'}} onClick={clearCanvasAndDB}>Clear Canvas and DB</button>
            </div>
        </div>
        
    );
};

export default ParentComponent;



















