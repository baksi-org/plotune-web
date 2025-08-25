import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pricing = () => {
  const [plans, setPlans] = useState([
    {
      name: 'Lite',
      price: 'Free',
      period: 'Forever',
      features: ['Basic visualization tools', 'Basic data import', 'Real-time plotting (1 source)', 'Community support', '5 extension slots'],
      link: '/download',
      buttonText: 'Get Started',
      featured: false,
    },
    {
      name: 'Pro',
      price: '$5',
      period: 'per month',
      features: ['All Lite features', 'Advanced visualization tools', 'Multiple data sources (UART, CAN, Bluetooth)', 'Priority support', 'Unlimited extensions', 'Auto-save & replay', 'Custom dashboard layouts'],
      link: '/download',
      buttonText: 'Get Pro',
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'Tailored solution',
      features: ['All Pro features', 'Custom data source integration', 'White-label solution', 'Dedicated support', 'Team management', 'On-premises deployment', 'Custom extension development'],
      link: '/download',
      buttonText: 'Contact Sales',
      featured: false,
    },
  ]);

  // Backend'den veri çekmek için (örnek)
  useEffect(() => {
    // axios.get('YOUR_BACKEND_API_ENDPOINT/pricing')
    //   .then(response => setPlans(response.data))
    //   .catch(error => console.error('Error fetching pricing:', error));
  }, []);

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-light-text mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-text max-w-2xl mx-auto text-lg">
            Choose the plan that fits your needs and budget.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-dark-card rounded-custom p-8 text-center border border-white/5 ${plan.featured ? 'border-primary scale-105 shadow-custom' : ''} relative overflow-hidden transition-all duration-300`}
            >
              {plan.featured && (
                <div className="absolute top-4 right-[-30px] bg-primary text-white px-10 py-1 transform rotate-45 text-xs font-semibold">
                  Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-light-text mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-primary">{plan.price}</div>
                <div className="text-gray-text">{plan.period}</div>
              </div>
              <ul className="mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="py-2 border-b border-white/5 last:border-b-0">{feature}</li>
                ))}
              </ul>
              <a
                href={plan.link}
                className={`px-7 py-3 rounded-full font-semibold ${plan.featured ? 'bg-primary text-white hover:bg-primary-dark' : 'border-2 border-primary text-primary hover:bg-primary/10'} transition-all duration-300`}
              >
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;