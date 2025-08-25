//
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const features = [
    { icon: 'fa-puzzle-piece', title: 'Modular Components', desc: 'Drag-and-drop interface with modular components for building custom data visualization workflows.' },
    { icon: 'fa-bolt', title: 'Real-time Dashboards', desc: 'Create and monitor dynamic dashboards that update in real-time as new data streams in.' },
    { icon: 'fa-plug', title: 'Extension System', desc: 'Extend functionality with plugins and extensions from our marketplace.' },
    { icon: 'fa-sync-alt', title: 'Multi-source Integration', desc: 'Connect to UART, CAN, Bluetooth, databases, and more with unified interface.' },
    { icon: 'fa-tachometer-alt', title: 'Low-latency Performance', desc: 'Optimized for high-performance data processing with minimal delay.' },
    { icon: 'fa-history', title: 'Auto-save & Replay', desc: 'Never lose work with auto-save and replay capabilities for data sessions.' },
  ];

  return (
    <section id="features" className="py-24" ref={ref}>
      <div className="container mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-light-text mb-4">Core Features</h2>
          <p className="text-gray-text max-w-2xl mx-auto text-lg">
            Plotune delivers a powerful set of features designed for professionals working with complex data systems.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-dark-card rounded-custom p-6 border border-white/5 hover:border-primary/30 hover:-translate-y-2 hover:shadow-custom transition-all duration-300"
              variants={variants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-5">
                <i className={`fas ${feature.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold text-light-text mb-3">{feature.title}</h3>
              <p className="text-gray-text">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;