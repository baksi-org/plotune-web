import React from 'react';

const CareersHero = () => {
  return (
    <section className="min-h-[50vh] flex flex-col justify-center py-36 bg-gradient-to-br from-primary/10 to-secondary/10 text-center">
      <div className="container mx-auto px-5">
        <h1 className="text-4xl md:text-5xl font-bold text-light-text mb-5">Join the Plotune Team</h1>
        <p className="text-lg text-gray-text max-w-2xl mx-auto">
          We’re not actively hiring at the moment, but we’re always on the lookout for passionate individuals to help shape the future of real-time data visualization. Check back soon for new opportunities!
        </p>
      </div>
    </section>
  );
};

export default CareersHero;