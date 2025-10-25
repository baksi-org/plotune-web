import React, { useState } from 'react';

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState('info');

  const contacts = [
      {
      icon: 'fa-envelope',
      title: 'Email',
      info: 'contact@plotune.net',
      link: 'mailto:contact@plotune.net',
      bgColor: 'from-green-500 to-teal-600'
    },
    {
      icon: 'fa-map-marker-alt',
      title: 'Address',
      info: 'Tuzla, Istanbul, Turkey',
      link: 'https://goo.gl/maps/XXXXXXX',
      bgColor: 'from-orange-500 to-red-600'
    },
    {
      title: 'Discord',
      icon: 'fa-brands fa-discord',
      info: 'Join our Discord Server',
      link: 'https://discord.gg/plotune',
      bgColor: 'from-indigo-500 to-purple-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-dark-surface to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-5 max-w-7xl relative z-10">
        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - SADECE CONTACTS */}
          <div className="space-y-6">
            {contacts.map((contact, index) => (
              <a
                key={index}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-dark-card/50 to-dark-card/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 flex items-center space-x-6 hover:scale-[1.02] hover:shadow-2xl"
              >
                <div className={`p-4 rounded-xl bg-gradient-to-br ${contact.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`fas ${contact.icon} text-2xl text-white`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary">{contact.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{contact.info}</p>
                </div>
                <div className="ml-auto">
                  <i className="fas fa-arrow-right text-primary text-xl group-hover:translate-x-1 transition-transform"></i>
                </div>
              </a>
            ))}
          </div>

          {/* Right Side - GERÇEK MAP */}
          <div>
            <div className="bg-gradient-to-br from-dark-card/30 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full">
              <h3 className="text-2xl font-bold text-white mb-6">Find Us</h3>
              
              {/* ✅ GERÇEK GOOGLE MAPS IFRAME */}
              <div className="relative w-full h-96 rounded-xl overflow-hidden mb-6 shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3015.846968486693!2d28.97551431548492!3d41.10924397932371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7167a3c3b1b%3A0x8ddca3a4a9e5c7c!2sTuzla%2C%20Sariyer%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1699000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Plotune Location"
                ></iframe>
              </div>

              {/* Additional Info */}
              <div className="space-y-4">
                <p className="text-gray-400 text-sm flex items-center">
                  <span className="mr-2">📍</span> Aydınlı Mah., 34485 Tuzla/İstanbul
                </p>
                <p className="text-gray-400 text-sm flex items-center">
                  <span className="mr-2">🕒</span> Mon - Fri: 9AM - 6PM
                </p>
                <p className="text-gray-400 text-sm flex items-center">
                  <span className="mr-2">📧</span> 24/7 Email Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;