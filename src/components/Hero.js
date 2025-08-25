import React from 'react';

const Hero = () => {
  // 3 farklı mesaj seti
  const messages = [
    {
      title: (
        <>
          Visualize, Inspect, and Analyze <span className="text-primary">Complex Datasets</span> in Real Time
        </>
      ),
      desc: "Empower engineers, analysts, and researchers with an intuitive and interactive platform for real-time data visualization and analysis. Drag, drop, and discover insights faster than ever before.",
      cta1: "Download Now",
      cta2: "Explore Features",
    },
    {
      title: (
        <>
          Unlock Insights from <span className="text-primary">Big Data</span> Instantly
        </>
      ),
      desc: "Transform messy datasets into meaningful visuals. Perfect for decision makers, scientists, and anyone who wants clarity at a glance.",
      cta1: "Get Started",
      cta2: "See How It Works",
    },
    {
      title: (
        <>
          Make <span className="text-primary">Data Exploration</span> Simple and Interactive
        </>
      ),
      desc: "Stop struggling with static charts. Dive into your data with dynamic visualizations built for speed and discovery.",
      cta1: "Download Now",
      cta2: "Discover Tools",
    },
  ];

  // rastgele seç
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <section className="min-h-screen flex items-center py-24 relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(38,166,154,0.1),transparent_70%)]">
      <div className="container mx-auto px-5">
        <div className="max-w-2xl z-10 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-light-text mb-5">
            {randomMessage.title}
          </h2>
          <p className="text-lg text-gray-text mb-8">{randomMessage.desc}</p>
          <div className="flex gap-4 justify-center md:justify-start">
            <a
              href="/download"
              className="bg-primary text-white px-7 py-3 rounded-full font-semibold hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              {randomMessage.cta1}
            </a>
            <a
              href="#features"
              className="border-2 border-primary text-primary px-7 py-3 rounded-full font-semibold hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300"
            >
              {randomMessage.cta2}
            </a>
          </div>
        </div>
      </div>
      <div className="absolute right-[-50px] top-1/2 -translate-y-1/2 w-1/2 max-w-xl h-auto rounded-custom shadow-custom opacity-90 hidden md:block">
        <div className="w-full h-full bg-gradient-to-r from-[#1a2a6c] via-primary to-[#b21f1f] rounded-custom"></div>
      </div>
    </section>
  );
};

export default Hero;
