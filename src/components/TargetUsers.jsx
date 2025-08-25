//
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TargetUsers = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const users = [
    { icon: 'fa-user-graduate', title: 'Students', desc: 'Learn data visualization and analysis with an intuitive, professional-grade tool.' },
    { icon: 'fa-flask', title: 'Researchers', desc: 'Analyze experimental data in real-time with customizable visualization tools.' },
    { icon: 'fa-cogs', title: 'Engineers', desc: 'Monitor systems, debug protocols, and visualize complex engineering data streams.' },
    { icon: 'fa-chart-pie', title: 'Data Analysts', desc: 'Transform raw data into actionable insights with powerful visualization capabilities.' },
  ];

  return (
    <section className="py-24" ref={ref}>
      <div className="container mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-light-text mb-4">Designed For Professionals</h2>
          <p className="text-gray-text max-w-2xl mx-auto text-lg">
            Plotune serves a wide range of users across multiple technical disciplines.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {users.map((user, index) => (
            <motion.div
              key={index}
              className="bg-dark-card rounded-custom p-6 text-center border border-white/5 hover:-translate-y-1 hover:shadow-custom transition-all duration-300"
              variants={variants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <div className="text-primary text-4xl mb-5">
                <i className={`fas ${user.icon}`}></i>
              </div>
              <h3 className="text-xl font-semibold text-light-text mb-3">{user.title}</h3>
              <p className="text-gray-text">{user.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetUsers;