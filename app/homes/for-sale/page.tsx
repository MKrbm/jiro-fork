import { Metadata } from "next";
import React from "react";
import { PropertyCard } from "@/app/ui/homes/property-card";

export const metadata: Metadata = {
  title: 'Buy',
};

export default function Page() {
  return (
    <div className="bg-white h-screen flex">
      <section className="relative flex-1 flex justify-center items-center bg-gray-200 hidden md:block">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.3321824596837!2d-122.01384291346217!3d37.334643700160434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb596e9e188fd%3A0x3b0d8391510688f0!2z44Ki44OD44OX44Or44O744OR44O844Kv!5e0!3m2!1sja!2sus!4v1712887239111!5m2!1sja!2sus" className="w-full h-full" loading="lazy"></iframe>
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
