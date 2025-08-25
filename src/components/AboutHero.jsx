import React from 'react';

const AboutHero = () => {
  return (
    <section className="py-36 bg-dark-bg">
      <div className="container mx-auto px-5 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-light-text mb-5">Our Story: Visualizing the Future</h1>
          <p className="text-gray-text mb-4">
            Plotune was founded in 2022 by a team of engineers and data scientists who were frustrated with the limitations of existing data visualization tools. Our mission is to empower professionals to transform complex data into actionable insights through an intuitive, extensible platform.
          </p>
          <p className="text-gray-text">
            Today, Plotune is used by thousands of engineers, researchers, and analysts worldwide to visualize, inspect, and analyze complex datasets in real-time.
          </p>
        </div>
        <div className="flex-1 h-64 bg-gradient-to-br from-[#1a2a6c] to-primary rounded-custom"></div>
      </div>
    </section>
  );
};

export default AboutHero;