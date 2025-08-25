import React from 'react';

const Values = () => {
  const values = [
    {
      icon: 'fa-lightbulb',
      title: 'Innovation',
      description: 'We constantly push boundaries to develop cutting-edge visualization techniques that solve real-world problems.',
    },
    {
      icon: 'fa-users',
      title: 'Empowerment',
      description: 'We build tools that amplify human capabilities, not replace them. Our platform empowers users to achieve more.',
    },
    {
      icon: 'fa-lock-open',
      title: 'Openness',
      description: 'We believe in extensible systems. Our plugin architecture ensures Plotune can adapt to any workflow.',
    },
    {
      icon: 'fa-bolt',
      title: 'Performance',
      description: 'We optimize for speed and efficiency because real-time data requires real-time responses.',
    },
    {
      icon: 'fa-handshake',
      title: 'Integrity',
      description: 'We build trust through transparent practices, honest communication, and ethical data handling.',
    },
    {
      icon: 'fa-graduation-cap',
      title: 'Education',
      description: "We're committed to helping our users master data visualization through comprehensive resources.",
    },
  ];

  return (
    <section className="py-16 bg-dark-bg">
      <div className="container mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-light-text mb-3">Our Core Values</h2>
          <p className="text-gray-text">These principles guide everything we do at Plotune</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-dark-card rounded-custom p-6 border border-white/5 hover:border-primary/30 hover:-translate-y-2 hover:shadow-custom transition-all duration-300"
            >
              <div className="text-3xl text-primary mb-4">
                <i className={`fas ${value.icon}`}></i>
              </div>
              <h3 className="text-xl font-semibold text-light-text mb-2">{value.title}</h3>
              <p className="text-gray-text">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;