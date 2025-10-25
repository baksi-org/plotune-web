import React from 'react';

const AboutHero = () => {
  return (
    <section className="py-32 md:py-36 bg-dark-bg">
      <div className="container mx-auto px-5 flex flex-col md:flex-row items-center gap-10">
        {/* Sol: Metin */}
        <div className="flex-1 space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold text-light-text leading-tight">
            Shaping the <span className="text-primary">Next Generation of Data Interaction</span>
          </h1>

          <p className="text-gray-text text-lg leading-relaxed">
            Plotune began in <strong>2025</strong> from a simple frustration: engineers, researchers, and makers needed a faster, smarter, and more flexible way to visualize and analyze data. Not locked into rigid tools or ecosystems, Plotune is built for the real world.
          </p>

          <p className="text-gray-text text-lg leading-relaxed">
            We focus on <strong>modular, real-time visualization</strong>. Every chart, oscilloscope, and dashboard component is designed to be extendable, interactive, and efficient—even with high-volume streaming data.
          </p>

          <p className="text-gray-text text-lg leading-relaxed font-medium">
            Built for professionals who demand performance and clarity, Plotune empowers users to connect, analyze, and present data their way, without compromise.
          </p>

          <div className="pt-4">
            <a
              href="#/extensions"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all font-medium"
            >
              Explore Extensions
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Sağ: Görsel */}
        <div className="flex-1 h-64 md:h-80 bg-gradient-to-br from-[#0f1b3d] via-primary/20 to-primary/40 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5"></div>
          <div className="absolute bottom-4 right-4 text-white/70 text-sm font-mono">
            v0.9.0-alpha
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
