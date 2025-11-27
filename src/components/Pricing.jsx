import React from 'react';

const Pricing = () => {
  const plans = [
    {
      name: 'Academic',
      subtitle: 'For Students & Researchers',
      price: 'Free',
      period: 'Non-commercial use',
      features: [
        'Plotune Core access',
        'Basic data orchestration',
        'Community support',
        'Educational resources',
        'Single user license'
      ],
      link: '/academic-apply',
      buttonText: 'Apply for Access',
      featured: false,
      note: 'Verified academic email required'
    },
    {
      name: 'Premium',
      subtitle: 'For Growing Teams',
      price: 'Starting at $149',
      period: 'per month',
      features: [
        'Core + Stream services',
        'Up to 5 team members',
        'Standard support & SLA',
        'Basic data governance',
        'API access & integrations'
      ],
      link: '#/register',
      buttonText: 'Start Free Trial',
      featured: true,
    },
    {
      name: 'Enterprise',
      subtitle: 'For Large Organizations',
      price: 'Custom',
      period: 'Tailored to your needs',
      features: [
        'Dedicated infrastructure',
        'Advanced security & compliance',
        '24/7 premium support',
        'Custom plugin development',
        'On-premises deployment options',
        'Training & certification'
      ],
      link: '#/contact',
      buttonText: 'Schedule Consultation',
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-dark-surface">
      <div className="container mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-light-text mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-text max-w-2xl mx-auto text-lg">
            Choose the partnership level that matches your organization's data operations maturity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-dark-card rounded-custom p-8 border-2 ${plan.featured ? 'border-primary shadow-custom scale-105' : 'border-white/5'} relative overflow-hidden transition-all duration-300 hover:-translate-y-2`}
            >
              {plan.featured && (
                <div className="absolute top-6 right-[-30px] bg-primary text-white px-10 py-1 transform rotate-45 text-xs font-semibold">
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-light-text mb-1">
                  {plan.name}
                </h3>
                <p className="text-gray-text text-sm mb-4">
                  {plan.subtitle}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-gray-text text-sm ml-1">
                    {plan.period}
                  </span>
                </div>
                {plan.note && (
                  <p className="text-gray-text text-xs mt-2 italic">
                    {plan.note}
                  </p>
                )}
              </div>

              {/* Features List */}
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-light-text/80 text-sm">
                    <i className="fas fa-check text-primary mr-3 mt-1 text-xs flex-shrink-0"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href={plan.link}
                className={`w-full block text-center py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.featured 
                    ? 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg' 
                    : 'border-2 border-primary text-primary hover:bg-primary/10'
                }`}
              >
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="text-center mt-12 max-w-3xl mx-auto">
          <div className="bg-dark-card/50 rounded-custom p-6 border border-white/5">
            <h3 className="text-lg font-semibold text-light-text mb-3">
              All Plans Include
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-text">
              <div className="flex items-center justify-center">
                <i className="fas fa-sync-alt text-primary mr-2"></i>
                Continuous platform updates
              </div>
              <div className="flex items-center justify-center">
                <i className="fas fa-shield-alt text-primary mr-2"></i>
                Enterprise-grade security
              </div>
              <div className="flex items-center justify-center">
                <i className="fas fa-graduation-cap text-primary mr-2"></i>
                Onboarding assistance
              </div>
            </div>
          </div>
          
          <p className="text-gray-text mt-8 text-sm">
            Need a custom solution? <a href="/contact" className="text-primary hover:underline">Let's build it together</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;