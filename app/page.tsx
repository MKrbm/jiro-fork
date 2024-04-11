"use client";

import Image from "next/image";
import React, { useState } from "react";
import Header from "@/app/ui/header";

export default function MainComponent() {
  const [inputValue, setInputValue] = useState("");
  const [showCurrentLocationOption, setShowCurrentLocationOption] = useState(
    false,
  );

  const handleSearchClick = () => {
    console.log("Current input value:", inputValue);
    // Here you can perform further actions with the input value if needed
  };
  const handleLocationClick = () => {
    setInputValue("Current Location");
    console.log("Current location selected");
  };

  return (
    <div className="relative bg-white">
      <Header />
      <div className="relative">
        <Image
          src="/ai-img.jpg"
          width={1024}
          height={1024}
          className="block w-full h-[500px] object-cover"
          alt="Screenshots of the dashboard project showing desktop version"
        />
        <div className="absolute w-full text-center top-[50%] translate-y-[-50%]">
          <h1 className="font-roboto text-5xl text-white">
            Agents. Tours. Loans. Homes.
          </h1>
          <div className="mt-4 mx-auto">
            <div className="input-area flex items-center justify-center text-black">
              <input
                type="text"
                name="search"
                placeholder="Enter an address, neighborhood, city, or ZIP code"
                className="pl-4 pr-16 py-2 w-[400px] md:w-[600px] lg:w-[800px] rounded-full shadow-lg focus:outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setShowCurrentLocationOption(true)}
                onBlur={() => setShowCurrentLocationOption(false)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="h-5 w-5 transform translate-x-[-200%] cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={handleSearchClick}
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </div>
            {showCurrentLocationOption && (
              <div className="fixed top-50 z-50 w-[400px] md:w-[600px] lg:w-[800px] bg-white text-left px-4 py-2 mx-auto shadow-lg text-black">
                <button onClick={handleLocationClick}>
                  Use current location
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
