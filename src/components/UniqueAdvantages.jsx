import React from 'react';

const UniqueAdvantages = () => {
  const advantages = [
    { icon: 'fa-layer-group', title: 'Enterprise-Grade GUI', desc: 'Component-based interface with resizable, draggable layers for complex workflows.' },
    { icon: 'fa-store', title: 'Extension Marketplace', desc: 'Enhance functionality with specialized plugins and extensions from our marketplace.' },
    { icon: 'fa-chart-line', title: 'Seamless Real-time Plotting', desc: 'Intuitive tools for real-time data visualization and calculation capabilities.' },
    { icon: 'fa-key', title: 'Flexible Licensing', desc: 'User-friendly licensing and authentication system for commercial deployment.' },
  ];

  return (
    <section className="py-24 bg-dark-surface">
      <div className="container mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-light-text mb-4">Unique Advantages</h2>
          <p className="text-gray-text max-w-2xl mx-auto text-lg">
            Why professionals choose Plotune for their critical data visualization needs.
          </p>
        </div>
        <div className="bg-dark-surface rounded-custom p-10 shadow-custom">
          {advantages.map((advantage, index) => (
            <div key={index} className="flex gap-5 py-5 border-b border-white/5 last:border-b-0">
              <div className="text-primary text-2xl min-w-10">
                <i className={`fas ${advantage.icon}`}></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-light-text mb-2">{advantage.title}</h3>
                <p className="text-gray-text">{advantage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UniqueAdvantages;