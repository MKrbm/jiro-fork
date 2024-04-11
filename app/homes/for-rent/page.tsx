import { Metadata } from "next";
import React from "react";
import { PropertyCard } from "@/app/ui/homes/property-card";

export const metadata: Metadata = {
  title: 'Rent',
};

export default function Page() {
  return (
    <div className="bg-white h-screen flex">
      <section className="relative flex-1 flex justify-center items-center bg-gray-200 hidden md:block">
        <img src="/sample-image.jpg" className="h-full object-cover"></img>
        <div className="absolute inset-0 bg-pink-200 opacity-50 m-5"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="control-map-search">Control Map Search Layer</div>
        </div>
      </section>

      <section className="cards-container w-full md:w-80 bg-blue-200">
        <PropertyCard />
      </section>
    </div>
  );
}