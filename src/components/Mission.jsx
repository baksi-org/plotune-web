import React from 'react';

const Mission = () => {
  return (
    <section className="py-16 bg-dark-bg">
      <div className="container mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-light-text">Our Mission</h2>
        </div>
        <p className="text-gray-text max-w-3xl mx-auto mb-4">
          At Plotune, our mission is to give engineers, researchers, and makers <strong>complete control over their data</strong>—from real-time acquisition to interactive visualization. We aim to replace slow, rigid tools with a platform that’s <strong>modular, efficient, and fully extendable</strong>, letting users tailor every chart, dashboard, and oscilloscope to their workflow.
        </p>
        <p className="text-gray-text max-w-3xl mx-auto">
          We bridge the gap between complex data systems and actionable insight. By focusing on <strong>performance, flexibility, and live streaming</strong>, Plotune empowers professionals to explore, analyze, and present data <strong>without compromise</strong>, all while supporting an ecosystem of extensions that grow with their needs.
        </p>
      </div>
    </section>
  );
};

export default Mission;
