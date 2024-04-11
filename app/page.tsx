"use client";

import Image from "next/image";
import React from "react";

export default function MainComponent() {
  const [showCurrentLocationOption, setShowCurrentLocationOption] = React
    .useState(false);

  return (
    <div className="relative bg-white">
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
          <div className="mt-4 relative">
            <input
              type="text"
              name="search"
              placeholder="Enter an address, neighborhood, city, or ZIP code"
              className="pl-4 pr-10 py-2 w-[400px] md:w-[600px] lg:w-[800px] rounded-full shadow-lg focus:outline-none"
              onFocus={() => setShowCurrentLocationOption(true)}
              onBlur={() => setShowCurrentLocationOption(false)}
            />
            <i className="fa fa-search text-blue-500 absolute top-2 right-2">
            </i>
            {showCurrentLocationOption && (
              <div className="absolute w-full bg-white text-left px-4 py-2 mt-1 shadow-lg text-black">
                Use current location
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
