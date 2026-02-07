

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InsertPage() {
    const navigate = useNavigate();
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [stream, setStream] = useState(null);
    const [fileName, setFileName] = useState(''); 
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState("");
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null); 

    const sendImage = async () => {
        if (!capturedImage) return;
        setIsSaving(true);
        setSaveSuccess(false);
        setSaveError("");
        try {
            const imgData = capturedImage.split(',')[1];
            const imageTypeMatch = capturedImage.match(/data:([^;]+)/);
            const imageType = imageTypeMatch ? imageTypeMatch[1] : 'image/png';
            const clauderesult = await fetch('http://localhost:3000/scan_receipt',{
                method : 'POST',
                headers : {'Content-Type':'application/json'},
                body : JSON.stringify({image : imgData, imageType: imageType})
            });
            const result = await clauderesult.json();
            if (clauderesult.ok){
                setSaveSuccess(true);
                setSaveError("");
                console.log('analysis:',result);
            } else {
                setSaveSuccess(false);
                setSaveError("Failed to save. Please try again.");
            }
        }catch(error){
            setSaveSuccess(false);
            setSaveError("Failed to save. Please try again.");
            console.error(error);
        }
        setIsSaving(false);
    }

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });
            setStream(mediaStream);
            setIsCameraActive(true);
            setCapturedImage(null);
            setFileName('');
        } catch (error) {
            alert("Camera error. Use HTTPS or localhost.");
        }
    };

    useEffect(() => {
        if (isCameraActive && stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [isCameraActive, stream]);



    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsCameraActive(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            setCapturedImage(canvas.toDataURL('image/png'));
            stopCamera();
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCapturedImage(e.target.result);
                setFileName(file.name);
                stopCamera(); 
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-[#E8E2D8] flex flex-col items-center p-6">
            
            {/* Header Card */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-4 mb-6 flex justify-between items-center border-2 border-[#BFC6C4]">
                
                {/* 1. BACK BUTTON */}
                <button 
                    onClick={() => navigate('/')} 
                    className="text-[#6F8F72] font-bold hover:underline"
                >
                    ← Back
                </button>

                {/* 2. TITLE */}
                <h1 className="text-xl font-bold text-[#6F8F72]">Scanner</h1>

            </div>

            {/* === MAIN WHITE CONTENT CARD === */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border-2 border-[#BFC6C4] flex flex-col items-center">

                {/* Camera Viewfinder */}
                <div className="w-full bg-black h-80 rounded-2xl overflow-hidden relative shadow-sm border-4 border-[#BFC6C4] flex items-center justify-center mb-6">
                    
                    {/* IDLE STATE */}
                    {!isCameraActive && !capturedImage && (
                        <div className="text-center p-6">
                            <span className="text-6xl block mb-4">📷</span>
                            <p className="text-[#E8E2D8] text-lg">Ready to Scan</p>
                        </div>
                    )}

                    {/* LIVE CAMERA (Clean - No Radar) */}
                    {isCameraActive && (
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    )}

                    {/* CAPTURED IMAGE */}
                    {capturedImage && (
                        <img src={capturedImage} className="w-full h-full object-contain" alt="Receipt" />
                    )}
                </div>

                {/* Hidden Elements */}
                <canvas ref={canvasRef} className="hidden" />
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    accept="image/*" 
                    className="hidden" 
                />

                {/* TOP BUTTONS */}
                <div className="w-full space-y-3">
                    {!isCameraActive && !capturedImage && (
                        <button 
                            onClick={startCamera} 
                            className="w-full py-3 bg-[#6F8F72] text-white text-lg font-bold rounded-xl shadow-md hover:opacity-90 transition-all"
                        >
                            Start Camera
                        </button>
                    )}

                    {isCameraActive && (
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={capturePhoto} className="py-3 bg-[#6F8F72] text-white font-bold rounded-xl shadow-md">
                                Snap Photo
                            </button>
                            <button onClick={stopCamera} className="py-3 bg-[#F2A65A] text-white font-bold rounded-xl shadow-md">
                                Cancel
                            </button>
                        </div>
                    )}

                    {capturedImage && (
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => setCapturedImage(null)} className="py-3 bg-[#F2A65A] text-white font-bold rounded-xl shadow-md">
                                Retake
                            </button>
                            <button onClick={sendImage} className="py-3 bg-[#6F8F72] text-white font-bold rounded-xl shadow-md" disabled={isSaving}>
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    )}
                    {saveSuccess && (
                        <p className="mt-4 text-green-700 font-bold text-center">
                            Saved! <a href="/dashboard" className="underline text-blue-600">Go to Dashboard</a>
                        </p>
                    )}
                    {saveError && (
                        <p className="mt-4 text-red-700 font-bold text-center">{saveError}</p>
                    )}
                </div>


                {/* UPLOAD FROM DEVICE */}
                {!isCameraActive && !capturedImage && (
                    <div className="w-full mt-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-px bg-[#BFC6C4] flex-1"></div>
                            <span className="px-3 text-[#BFC6C4] font-bold text-sm">OR</span>
                            <div className="h-px bg-[#BFC6C4] flex-1"></div>
                        </div>

                        <button 
                            onClick={() => fileInputRef.current.click()}
                            className="w-full py-4 border-2 border-dashed border-[#6F8F72] rounded-xl flex flex-col items-center justify-center bg-[#E8E2D8]/30 hover:bg-[#E8E2D8]/50 transition-colors group"
                        >
                            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">📁</span>
                            <span className="text-[#6F8F72] font-bold">Upload from Device</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
