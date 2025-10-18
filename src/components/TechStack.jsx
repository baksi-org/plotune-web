import React from 'react';

const TechStack = () => {
  const techs = [
    { icon: 'fa-code', title: 'Python Backend', desc: 'High-performance backend handling real-time data streams and plugin architecture.' },
    { icon: 'fa-desktop', title: 'PyQt5 Frontend', desc: 'Cross-platform, resizable, drag-and-drop GUI with modular components.' },
    { icon: 'fa-database', title: 'Redis', desc: 'Fast data processing, caching, and auto-save capabilities.' },
    { icon: 'fa-plug', title: 'Plugin API', desc: 'Extend functionality with custom data sources and visualization plugins.' },
    { icon: 'fa-network-wired', title: 'Kafka Streams', desc: 'Robust, real-time data streaming for industrial and electronic systems.' },
    { icon: 'fa-bolt', title: 'High-Performance Architecture', desc: 'Optimized for low-latency data capture and visualization.' },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-dark-surface to-[#1a1a2e]">
      <div className="container mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-light-text mb-4">Technology Stack</h2>
          <p className="text-gray-text max-w-2xl mx-auto text-lg">
            Built on a robust and modern technology foundation for high-performance data visualization and analysis.
          </p>
        </div>
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8">
          {techs.map((tech, index) => (
            <div key={index} className="text-center max-w-xs">
              <div className="text-primary text-5xl mb-3">
                <i className={`fas ${tech.icon}`}></i>
              </div>
              <h3 className="text-xl font-semibold text-light-text mb-2">{tech.title}</h3>
              <p className="text-gray-text">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
