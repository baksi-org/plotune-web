import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const services = [
    { 
      icon: 'fa-cogs', 
      title: 'Plotune Core', 
      subtitle: 'Control Plane',
      desc: 'Orchestrate, monitor, and manage your entire data ecosystem through a unified interface. The brain of your data operations.',
      features: ['Data Orchestration', 'Unified UI/UX', 'Real-time Monitoring', 'Workflow Management']
    },
    { 
      icon: 'fa-bolt', 
      title: 'Plotune Stream', 
      subtitle: 'Execution Plane',
      desc: 'Real-time ETL and event operations with lightning-fast data processing. Transform and move data as it happens.',
      features: ['Real-time ETL', 'Event Operations', 'Stream Processing', 'Low-latency Execution']
    },
    { 
      icon: 'fa-cloud', 
      title: 'Plotune Cloud', 
      subtitle: 'Data Governance Plane',
      desc: 'Scalable storage, comprehensive metadata management, and enterprise-grade data governance policies.',
      features: ['Data Storage', 'Metadata Management', 'Policy Enforcement', 'Scalable Infrastructure']
    },
  ];

  return (
    <section id="features" className="py-24 bg-dark-card/30" ref={ref}>
      <div className="container mx-auto px-5">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-dark-card rounded-custom p-8 border border-white/5 hover:border-primary/30 hover:-translate-y-2 hover:shadow-custom transition-all duration-300 group"
              variants={variants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: index * 0.2 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className={`fas ${service.icon} text-white text-2xl`}></i>
              </div>
              
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-light-text mb-1">
                  {service.title}
                </h3>
                <p className="text-primary font-semibold text-sm uppercase tracking-wide">
                  {service.subtitle}
                </p>
              </div>
              
              <p className="text-gray-text mb-6 leading-relaxed">
                {service.desc}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-light-text/80 text-sm">
                    <i className="fas fa-check text-primary mr-3 text-xs"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional call-to-action */}
        <motion.div 
          className="text-center mt-16"
          variants={variants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-text mb-6 max-w-2xl mx-auto">
            Ready to transform your data operations? Learn how our integrated platform can work for you.
          </p>
          <a
            href="#/contact"
            className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all duration-300 inline-block"
          >
            Schedule a Demo
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;