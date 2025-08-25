import React from 'react';
import DownloadSection from '../components/DownloadSection';
import Pricing from '../components/Pricing';
import FaqSection from '../components/FaqSection';

const Download = () => {
  return (
    <>
      <section className="min-h-[50vh] flex flex-col justify-center py-36 bg-gradient-to-br from-primary/10 to-secondary/10 text-center">
        <div className="container mx-auto px-5">
          <h1 className="text-4xl md:text-5xl font-bold text-light-text mb-5">Download Plotune</h1>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            Get started with Plotune today. Choose your operating system and version to download the software that fits your needs.
          </p>
        </div>
      </section>
      <DownloadSection />
      <Pricing />
      <FaqSection />
    </>
  );
};

export default Download;