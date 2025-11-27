import React from 'react';

const Hero = () => {
  // Updated messages aligned with the project vision
  const messages = [
    {
      title: (
        <>
          Your Data Operations Partner for <span className="text-primary">Modern Data Teams</span>
        </>
      ),
      desc: "Streamline your data workflows with Plotune - the intelligent data orchestrator. From ingestion to insights, we simplify complex data operations with our Core, Stream, and Cloud solutions.",
      cta1: "Get Started",
      cta2: "View Services",
    },
    {
      title: (
        <>
          DataOps Excellence with <span className="text-primary">Plotune Orchestrator</span>
        </>
      ),
      desc: "Transform your data operations with our comprehensive DataOps platform. Plotune orchestrates your entire data lifecycle, making complex workflows simple and manageable.",
      cta1: "Get Started",
      cta2: "View Services",
    },
    {
      title: (
        <>
          Orchestrate Your Data with <span className="text-primary">Plotune Platform</span>
        </>
      ),
      desc: "Choose from Plotune Core for on-premise control, Stream for real-time processing, or Cloud for scalable solutions. Your complete data operations partner.",
      cta1: "Get Started",
      cta2: "View Services",
    },
  ];

  // Random selection
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
              href="/get-started"
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
      
      {/* Right side image - hidden on mobile, visible on desktop */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 max-w-2xl h-auto hidden md:block pr-8">
        <div className="relative w-full h-full max-w-lg ml-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
            <div className="flex items-start mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2 mt-1"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2 mt-1"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-4 mt-1"></div>
              <h3 className="text-light-text font-semibold text-lg">DataOps with Plotune</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center bg-primary/10 rounded-lg p-3 border-l-4 border-primary">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-cogs text-white text-sm"></i>
                </div>
                <div>
                  <p className="text-light-text font-medium text-sm">Orchestrate</p>
                  <p className="text-gray-text text-xs">Unified control plane</p>
                </div>
              </div>
              
              <div className="flex items-center bg-blue-500/10 rounded-lg p-3 border-l-4 border-blue-500">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-bolt text-white text-sm"></i>
                </div>
                <div>
                  <p className="text-light-text font-medium text-sm">Process</p>
                  <p className="text-gray-text text-xs">Real-time execution</p>
                </div>
              </div>
              
              <div className="flex items-center bg-green-500/10 rounded-lg p-3 border-l-4 border-green-500">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-cloud text-white text-sm"></i>
                </div>
                <div>
                  <p className="text-light-text font-medium text-sm">Govern</p>
                  <p className="text-gray-text text-xs">Secure data management</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-gray-text text-sm text-center">
                End-to-end DataOps lifecycle management
              </p>
            </div>
          </div>
          
          {/* Floating elements for visual interest */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/4 -left-6 w-4 h-4 bg-green-500/20 rounded-full animate-pulse delay-500"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;