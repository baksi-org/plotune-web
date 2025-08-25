import React from 'react';

const Mission = () => {
  return (
    <section className="py-16 bg-dark-bg">
      <div className="container mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-light-text">Our Mission</h2>
        </div>
        <p className="text-gray-text max-w-3xl mx-auto mb-4">
          At Plotune, we believe that data visualization shouldn't be a bottleneck in the discovery process. Our mission is to empower engineers, analysts, and researchers to unlock the full potential of their data through intuitive, real-time visualization tools.
        </p>
        <p className="text-gray-text max-w-3xl mx-auto">
          We're building a platform that bridges the gap between complex data systems and human understanding, enabling professionals to make faster, more informed decisions without sacrificing depth or precision.
        </p>
      </div>
    </section>
  );
};

export default Mission;