import React from 'react';

const PricingSection = () => {
  return (
    <section className="py-16 bg-dark-bg">
      <div className="container mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-light-text mb-3">Simple, Transparent Pricing</h2>
          <p className="text-gray-text">Choose the plan that fits your needs and budget</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-dark-card rounded-custom p-6 border border-white/5 hover:border-primary/30 hover:-translate-y-2 hover:shadow-custom transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-light-text">Lite</h3>
              <div className="text-2xl font-bold text-light-text">Free</div>
              <div className="text-gray-text">Forever</div>
            </div>
            <ul className="space-y-3 mb-6 text-gray-text">
              <li>Basic visualization tools</li>
              <li>CSV data import</li>
              <li>Real-time plotting (1 source)</li>
              <li>Community support</li>
              <li>5 extension slots</li>
            </ul>
            <a href="#" className="block text-center py-2 px-4 bg-dark-card border border-gray-text text-gray-text rounded hover:border-light-text hover:text-light-text transition-all duration-300">
              Get Started
            </a>
          </div>
          <div className="bg-dark-card rounded-custom p-6 border-2 border-primary/50 hover:-translate-y-2 hover:shadow-custom transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-light-text">Pro</h3>
              <div className="text-2xl font-bold text-light-text">$5</div>
              <div className="text-gray-text">per month</div>
            </div>
            <ul className="space-y-3 mb-6 text-gray-text">
              <li>All Lite features</li>
              <li>Advanced visualization tools</li>
              <li>Multiple data sources (UART, CAN, Bluetooth)</li>
              <li>Priority support</li>
              <li>Unlimited extensions</li>
              <li>Auto-save & replay</li>
              <li>Custom dashboard layouts</li>
            </ul>
            <a href="#" className="block text-center py-2 px-4 bg-primary text-white rounded hover:bg-primary-dark transition-all duration-300">
              Get Pro
            </a>
          </div>
          <div className="bg-dark-card rounded-custom p-6 border border-white/5 hover:border-primary/30 hover:-translate-y-2 hover:shadow-custom transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-light-text">Enterprise</h3>
              <div className="text-2xl font-bold text-light-text">Custom</div>
              <div className="text-gray-text">Tailored solution</div>
            </div>
            <ul className="space-y-3 mb-6 text-gray-text">
              <li>All Pro features</li>
              <li>Custom data source integration</li>
              <li>White-label solution</li>
              <li>Dedicated support</li>
              <li>Team management</li>
              <li>On-premises deployment</li>
              <li>Custom extension development</li>
            </ul>
            <a href="#" className="block text-center py-2 px-4 bg-dark-card border border-gray-text text-gray-text rounded hover:border-light-text hover:text-light-text transition-all duration-300">
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;