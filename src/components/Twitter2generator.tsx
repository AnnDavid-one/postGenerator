"use client";
import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas-pro";
import Image from "next/image";
import { Repeat2, MessageSquarePlus, Share, Heart, Plus, X } from "lucide-react";
import twitterLogo from "../assets/twitterLogo.png";

const Twitter2Generator: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | typeof twitterLogo>(twitterLogo);
  const [postImages, setPostImages] = useState<string[]>([]);
  const [postText, setPostText] = useState("Just deployed Twitter 2.0! Now with multi-image support. 🚀 #webdev #nextjs");
  
  const postRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea logic
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [postText]);

  const capturePost = () => {
    if (postRef.current) {
      html2canvas(postRef.current, { scale: 4, useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "Twitter2_Post.png";
        link.click();
      });
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (postImages.length + files.length > 4) {
      alert("You can only add up to 4 images.");
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setPostImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Helper to determine Grid layout
  const getGridLayout = () => {
    const count = postImages.length;
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    return "grid-cols-2 grid-rows-2";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-12 flex flex-col items-center">
      
      {/* 1. THE CANVAS */}
      <div
        ref={postRef}
        className="aspect-square w-full max-w-[600px] bg-slate-900 flex items-center justify-center p-8 shadow-2xl overflow-hidden"
      >
        
        {/* 2. THE CARD */}
        <div className="bg-[#000000] rounded-2xl p-6 border border-gray-800 w-full flex flex-col">
          
          {/* Profile Header */}
          <div className="flex items-center mb-3 text-white">
            <div className="relative w-12 h-12 flex-shrink-0">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <Image
                src={profileImage}
                alt="Avatar"
                fill
                className="rounded-full object-cover border border-gray-700"
              />
            </div>
            <div className="ml-3">
              <p className="font-bold text-base leading-tight text-white">Hard Code</p>
              <p className="text-gray-500 text-sm">Daviduc05981454</p>
            </div>
          </div>

          {/* Text Content */}
          <div className="mb-3">
            <p className="text-white text-[19px] leading-normal break-words whitespace-pre-wrap">
              {postText}
            </p>
          </div>

          {/* DYNAMIC IMAGE GRID */}
          {postImages.length > 0 && (
            <div className={`grid ${getGridLayout()} gap-1 mb-4 rounded-2xl overflow-hidden border border-gray-800 h-[300px]`}>
              {postImages.map((src, index) => (
                <div 
                  key={index} 
                  className={`relative w-full h-full ${
                    postImages.length === 3 && index === 0 ? "row-span-2" : ""
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Engagement Icons */}
          <div className="flex justify-between items-center text-gray-500 pt-3 border-t border-gray-800">
            <button className="flex items-center text-blue-400 transition-colors">
              <MessageSquarePlus size={19} />
              <span className="text-xs ml-2">12</span>
            </button>
            <button className="flex items-center text-green-400 transition-colors">
              <Repeat2 size={19} />
              <span className="text-xs ml-2">45</span>
            </button>
            <button className="flex items-center text-red-500 transition-colors">
              <Heart size={19} />
              <span className="text-xs ml-2">128</span>
            </button>
            <button className="flex items-center text-blue-400 transition-colors">
              <Share size={19} />
            </button>
          </div>
        </div>
      </div>

      {/* CONTROLS (Off-Canvas) */}
      <div className="mt-8 w-full max-w-[600px] flex flex-col gap-4">
        
        {/* Image Upload Button */}
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center justify-center px-6 py-2 bg-white border border-gray-300 rounded-full cursor-pointer hover:bg-gray-50 transition font-medium text-black">
            <Plus size={18} className="mr-2" />
            Add Images ({postImages.length}/4)
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleMultipleImages} 
              className="hidden" 
            />
          </label>
          
          <button
            onClick={() => setPostImages([])}
            className="px-6 py-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition text-sm font-bold"
          >
            Clear All
          </button>
        </div>

        {/* Preview Thumbnails with Remove button */}
        <div className="flex gap-2">
          {postImages.map((img, i) => (
            <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-300">
              <img src={img} className="w-full h-full object-cover" />
              <button 
                onClick={() => removeImage(i)}
                className="absolute top-0 right-0 bg-black/50 text-white p-0.5"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's happening in Twitter 2?"
          className="text-black p-4 w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        />

        <button
          onClick={capturePost}
          className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold shadow-xl transition-all active:scale-95"
        >
          📸 Download High-Res Post
        </button>
      </div>
    </div>
  );
};

export default Twitter2Generator;