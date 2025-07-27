import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import "./facialExpression.css"
import axios from 'axios';

export default function FacialExpression({ setSongs }) {
    const videoRef = useRef();
    const [isDetecting, setIsDetecting] = useState(false);
    const [currentMood, setCurrentMood] = useState('');

    const loadModels = async () => {
        const MODEL_URL = '/models';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((err) => console.error("Error accessing webcam: ", err));
    };

    async function detectMood() {
        setIsDetecting(true);
        
        const detections = await faceapi
            .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();
        let mostProableExpression = 0
        let _expression = '';

        if (!detections || detections.length === 0) {
            console.log("No face detected");
            setIsDetecting(false);
            return;
        }

        for (const expression of Object.keys(detections[0].expressions)) {
            if (detections[0].expressions[expression] > mostProableExpression) {
                mostProableExpression = detections[0].expressions[expression]
                _expression = expression;
            }
        }

        setCurrentMood(_expression);

        /* get http://localhost:3000/songs?mood=happy */
        //axios is used to make HTTP requests to the backend server.
        axios.get(`http://localhost:3000/songs?mood=${_expression}`)
            .then(response => {
                console.log(response.data);
                setSongs(response.data.songs);
                setIsDetecting(false);
            })
            .catch(error => {
                console.error("Error fetching songs:", error);
                setIsDetecting(false);
            });
    }

    useEffect(() => {
        loadModels().then(startVideo);
    }, []);

    return (
        <div className='mood-element'>
            <div className="video-container">
                <div style={{ position: 'relative' }}>
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className='user-video-feed'
                    />
                    <div className="camera-indicator"></div>
                    {currentMood && (
                        <div className="mood-status">
                            😊 {currentMood}
                        </div>
                    )}
                </div>
                <button 
                    className="detect-button" 
                    onClick={detectMood}
                    disabled={isDetecting}
                >
                    {isDetecting ? '🔍 Analyzing...' : '🎭 Detect My Mood'}
                </button>
            </div>
        </div>
    );
}