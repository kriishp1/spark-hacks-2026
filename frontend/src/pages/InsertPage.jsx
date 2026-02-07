import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode } from 'lucide-react';

export default function InsertPage() {
    const navigate = useNavigate();
    
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [stream, setStream] = useState(null);
    const [fileName, setFileName] = useState('');
    const [showQR, setShowQR] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null); 

    const sendImage = async () => {
        if (!capturedImage) return;

        try {
        const imgData = capturedImage.split(',')[1]; //isolate image data (this cuts out the image prefix from it being a png)
        
        // Extract image type from the data URL
        const imageTypeMatch = capturedImage.match(/data:([^;]+)/);
        const imageType = imageTypeMatch ? imageTypeMatch[1] : 'image/png';

        const clauderesult = await fetch('http://localhost:3000/scan_receipt',{
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify({image : imgData, imageType: imageType})
        });

        const result = await clauderesult.json();

        if (clauderesult.ok){
            console.log('analysis:',result);
        }
    }catch(error){
        console.error(error);
    }


    }

  // --- CAMERA FUNCTIONS ---
  const startCamera = async () => {
    try {
      setShowQR(false);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setStream(mediaStream);
      setIsCameraActive(true);
      setCapturedImage(null);
      setFileName("");
      setIsScanning(false);
    } catch (error) {
      console.error("Error accessing camera:", error);
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
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
    setIsScanning(false);
  };

  // --- CAPTURE LOGIC ---
  const capturePhoto = () => {
    setIsScanning(true);
    setTimeout(() => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas
          .getContext("2d")
          .drawImage(video, 0, 0, canvas.width, canvas.height);
        setCapturedImage(canvas.toDataURL("image/png"));
        stopCamera();
      }
    }, 1500);
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

  const handleShowQR = () => {
    stopCamera();
    setCapturedImage(null);
    setShowQR(true);
  };

  return (
    <div className="bg-linear-to-br from-[#F9F5F0] to-[#E8E2D8] text-[#6F8F72] min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm py-3 w-full sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn.discordapp.com/attachments/1465402222278869096/1467728379162787850/3a30211634add9ca0ee192b38fad5790-color-stroke-bundle-of-parsley.png?ex=69880792&is=6986b612&hm=a83433f8d81e8fe0498673a9c8362dc0240b487d85a1ce697aeb74005f37cbb4&"
              alt="Logo"
              className="h-8"
            />
            <span className="font-bold text-xl tracking-tight text-[#6F8F72]">
              Parsley
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="#about"
              className="text-sm font-medium hover:text-[#4a634c] transition"
            >
              About Us
            </a>
            <a
              href="#what-we-do"
              className="text-sm font-medium hover:text-[#4a634c] transition"
            >
              What We Do
            </a>
            <div className="h-6 w-px bg-gray-300"></div>
            <button
              onClick={() => alert("Sign In")}
              className="text-sm font-bold hover:opacity-70 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => alert("Sign Up")}
              className="px-4 py-2 bg-[#6F8F72] text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* === CENTERED CONTENT === */}
      <div className="flex-1 flex items-center justify-center p-6 w-full">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-white/50 flex flex-col items-center relative overflow-hidden">
          {/* Header Text */}
          {!isCameraActive && !capturedImage && !showQR && (
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-[#6F8F72]">
                Scan Receipt
              </h2>
              <p className="text-gray-400 text-sm">
                Snap a photo or upload to track returns
              </p>
            </div>
          )}

          {/* --- VIEWFINDER --- */}
          <div className="w-full bg-black h-80 overflow-hidden relative flex items-center justify-center mb-6 group">
            {/* 1. IDLE STATE */}
            {!isCameraActive && !capturedImage && !showQR && (
              <div className="text-center p-6 opacity-50 group-hover:opacity-80 transition-opacity">
                <span className="text-6xl block mb-4 grayscale">📷</span>
                <p className="text-white text-lg font-medium">Camera is Off</p>
              </div>
            )}

            {/* 2. CAMERA ACTIVE */}
            {isCameraActive && (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* SCANNING LASER */}
                {isScanning && (
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-[#6F8F72] shadow-[0_0_15px_rgba(111,255,114,0.9)] animate-[scan_1.5s_ease-in-out_infinite] z-10"></div>
                )}

                {/* Corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-white/50 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-white/50 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-white/50 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-white/50 rounded-br-lg"></div>
              </div>
            )}

            {/* 3. SHOWING PHOTO */}
            {capturedImage && (
              <img
                src={capturedImage}
                className="w-full h-full object-contain"
                alt="Receipt"
              />
            )}

            {/* 4. SHOWING QR CODE */}
            {showQR && (
              <div className="w-full h-full bg-white flex flex-col items-center justify-center p-4 relative">
                <button
                  onClick={() => setShowQR(false)}
                  className="absolute top-3 right-3 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SparkHacks2026"
                  alt="QR Code"
                  className="w-48 h-48 mb-4"
                />
                <p className="text-[#6F8F72] font-bold text-sm uppercase tracking-widest">
                  Scan to update the receipt
                </p>
              </div>
            )}
          </div>

          {/* Hidden Inputs */}
          <canvas ref={canvasRef} className="hidden" />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          {/* --- CONTROL BUTTONS --- */}
          <div className="w-full space-y-3">
            {!isCameraActive && !capturedImage && !showQR && (
              <button
                onClick={startCamera}
                className="w-full py-4 bg-[#6F8F72] text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl hover:bg-[#5e7a60] transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Start Camera
              </button>
            )}

            {isCameraActive && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={capturePhoto}
                  disabled={isScanning}
                  className={`py-3 text-white font-bold rounded-xl shadow-md transition-all duration-300 ${
                    isScanning
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#6F8F72] hover:scale-105 hover:shadow-lg"
                  }`}
                >
                  {isScanning ? "Scanning..." : "Snap Photo"}
                </button>
                <button
                  onClick={stopCamera}
                  className="py-3 bg-red-400 text-white font-bold rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                >
                  Cancel
                </button>
              </div>
            )}

                    {capturedImage && (
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => setCapturedImage(null)} className="py-3 bg-[#F2A65A] text-white font-bold rounded-xl shadow-md">
                                Retake
                            </button>
                            <button onClick={sendImage} className="py-3 bg-[#6F8F72] text-white font-bold rounded-xl shadow-md">
                                Save
                            </button>
                        </div>
                    )}
                </div>

          {/* --- BOTTOM ACTIONS (Slicker Animations) --- */}
          {!isCameraActive && !capturedImage && !showQR && (
            <div className="w-full mt-8">
              <div className="flex items-center justify-between mb-6">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="px-3 text-gray-400 font-bold text-xs uppercase tracking-wider">
                  Or choose option
                </span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* QR Button */}
                <button
                  onClick={handleShowQR}
                  className="relative group overflow-hidden p-4 rounded-2xl border border-gray-100 bg-gray-50 shadow-lg hover:shadow-xl hover:bg-white hover:-translate-y-0.5 transition-all duration-500 flex flex-col items-center justify-center gap-3"
                >
                  <div className="p-3 bg-purple-100 rounded-full text-[#8C7CA1]">
                    <QrCode className="h-6 w-6" />
                  </div>
                  <span className="text-gray-600 font-bold text-sm">
                    My QR Code
                  </span>
                </button>

                {/* Upload Button */}
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="relative group overflow-hidden p-4 rounded-2xl border border-gray-100 bg-gray-50 shadow-lg hover:shadow-xl hover:bg-white hover:-translate-y-0.5 transition-all duration-500 flex flex-col items-center justify-center gap-3"
                >
                  <div className="p-3 bg-green-100 rounded-full text-[#6F8F72]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-600 font-bold text-sm">
                    Upload File
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
    </div>
  );
}
