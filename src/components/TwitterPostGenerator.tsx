"use client";
import { useState, useRef } from "react";
import html2canvas from "html2canvas-pro";
import Image from "next/image";
import { Repeat2, MessageSquarePlus, Share, Heart } from "lucide-react";
import twitterLogo from "../assets/twitterLogo.png";
import React, {  useEffect } from 'react';


const TwitterPostGenerator: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | typeof twitterLogo>(twitterLogo);
  const [postImage, setPostImage] = useState<string | null>(null);
  const postRef = useRef<HTMLDivElement | null>(null);
  const [postText, setPostText] = useState("Just deployed my new project! Check it out! #webdev #javascript");

// ... inside your component
const textareaRef = useRef<HTMLTextAreaElement>(null);

useEffect(() => {
  if (textareaRef.current) {
    // Reset height to shrink if text is deleted
    textareaRef.current.style.height = "auto";
    // Set height based on content
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }
}, [postText]); // Runs whenever postText changes

  const capturePost = () => {
    if (postRef.current) {
      // Scale up for high-quality export
      html2canvas(postRef.current, { scale: 4 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "Hardcode_Post.png";
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

  const handlePostImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPostImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-12 flex flex-col items-center">
      
      {/* 1. THE CANVAS: This determines the social media aspect ratio (1:1 Square) */}
      <div
        ref={postRef}
        className="aspect-square w-full max-w-[600px] bg-slate-800 flex items-center justify-center p-8 shadow-2xl overflow-hidden"
      >
        
        {/* 2. THE CARD: Shrink-wrap background that fits the content */}
        <div className="bg-[#15202b] rounded-2xl p-6 border border-gray-900 w-full flex flex-col">
          
          {/* Profile Header */}
          <div className="flex items-center mb-4 text-white">
            <div className="relative w-12 h-12 flex-shrink-0">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Avatar"
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="rounded-full w-full h-full bg-gray-600 flex items-center justify-center text-xl border-2 border-dashed border-gray-400">
                  +
                </div>
              )}
            </div>
            <div className="ml-3">
              <p className="font-bold text-base leading-tight text-green-100">Hard Code</p>
              <p className="text-gray-500 text-sm">@Daviduc05981454</p>
            </div>
          </div>

          {/* Text Content */}
          <div className="mb-4">
            {/* Add 'break-words' to force wrapping on long strings like your hashtags */}
  <p className="text-white text-lg font-medium leading-relaxed break-words">
      {postText}
  </p>
          </div>

          {/* Uploaded Content (The Image/Screenshot) */}
          <div className="relative mb-4 rounded-xl overflow-hidden border border-gray-800 bg-gray-800/50 flex items-center justify-center min-h-[150px]">
            <input
              type="file"
              accept="image/*"
              onChange={handlePostImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {postImage ? (
              <img src={postImage} alt="Post" className="w-full h-auto object-contain max-h-[300px]" />
            ) : (
              <div className="text-gray-500 flex flex-col items-center">
                <span className="text-2xl mb-1">+</span>
                <span className="text-xs">Add Screenshot</span>
              </div>
            )}
          </div>

          {/* Lucide Engagement Icons */}
          <div className="flex justify-between items-center text-gray-500 pt-3 border-t border-gray-800">
            <button className="flex items-center text-green-500 transition-colors">
              <Repeat2 size={18} className="mr-2" />
              <span className="text-sm">67</span>
            </button>
            <button className="flex items-center text-blue-500 transition-colors">
              <MessageSquarePlus size={18} className="mr-2" />
              <span className="text-sm">55</span>
            </button>
            <button className="flex items-center text-purple-500 transition-colors">
              <Share size={18} className="mr-2" />
              <span className="text-sm">67</span>
            </button>
            <button className="flex items-center text-red-500 transition-colors">
              <Heart size={18} className="mr-2" />
              <span className="text-sm">80</span>
            </button>
          </div>
        </div>
      </div>

      {/* Export Controls */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <button
          onClick={capturePost}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg transition-all active:scale-95"
        >
          📸 Download for LinkedIn & Twitter
        </button>
        <p className="text-gray-500 text-xs">Aspect Ratio: 1:1 (Square)</p>
      </div>
      <textarea
      ref={textareaRef}
        value={postText}
        onChange={(e) => { setPostText(e.target.value); }}
        placeholder="enter your input"
        className="text-black px-12 w-100 height-20 mt-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
};

export default TwitterPostGenerator;