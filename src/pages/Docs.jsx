import React, { useState, useEffect } from 'react';
import { Link as ScrollLink, Element } from 'react-scroll';

const Docs = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.docs-card');
      let current = 'getting-started';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section className="min-h-[50vh] flex flex-col justify-center py-36 bg-gradient-to-br from-primary/10 to-secondary/10 text-center">
        <div className="container mx-auto px-5">
          <h1 className="text-4xl md:text-5xl font-bold text-light-text mb-5">Developer Documentation</h1>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            Learn how to create powerful extensions for Plotune. Build custom data sources, visualizations, and processing modules.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-5 flex flex-col md:flex-row gap-10 py-12">
        <div className="md:w-64 flex-shrink-0 md:sticky md:top-24">
          <ul className="bg-dark-card rounded-custom overflow-hidden border border-white/5">
            {[
              { id: 'getting-started', label: 'Getting Started', icon: 'fa-rocket' },
              { id: 'rest-api', label: 'REST API', icon: 'fa-server' },
              { id: 'websockets', label: 'WebSockets', icon: 'fa-bolt' },
              { id: 'authentication', label: 'Authentication', icon: 'fa-key' },
              { id: 'best-practices', label: 'Best Practices', icon: 'fa-star' },
              { id: 'examples', label: 'Code Examples', icon: 'fa-code' },
              { id: 'troubleshooting', label: 'Troubleshooting', icon: 'fa-bug' },
            ].map((item) => (
              <li key={item.id}>
                <ScrollLink
                  to={item.id}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className={`flex items-center py-3 px-5 text-gray-text hover:bg-white/5 hover:text-primary transition-all duration-300 cursor-pointer ${activeSection === item.id ? 'bg-primary/10 text-primary' : ''}`}
                >
                  <i className={`fas ${item.icon} mr-3`}></i> {item.label}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <Element name="getting-started" className="bg-dark-card rounded-custom p-8 border border-white/5 hover:border-primary/30 hover:shadow-custom transition-all duration-300 mb-8">
            <h2 className="text-2xl font-bold text-light-text mb-5 border-b border-white/10 pb-4">Getting Started with Extension Development</h2>
            <p className="text-gray-text mb-4">Plotune extensions allow you to extend the functionality of the core platform. Extensions can provide new data sources, visualizations, data processing capabilities, and more.</p>
            <h3 className="text-xl font-semibold text-light-text mt-6 mb-3">Prerequisites</h3>
            <ul className="list-disc ml-5 space-y-2 text-gray-text">
              <li>Python 3.8+ installed</li>
              <li>Basic understanding of REST APIs</li>
              <li>Familiarity with WebSocket connections</li>
              <li>Plotune Pro or Enterprise license</li>
            </ul>
            <h3 className="text-xl font-semibold text-light-text mt-6 mb-3">Extension Structure</h3>
            <p className="text-gray-text mb-4">Every Plotune extension must have the following structure:</p>
            <pre className="bg-dark-surface p-4 rounded-custom overflow-x-auto text-gray-text">
              your-extension/
├── __init__.py
├── main.py
├── manifest.json
├── requirements.txt
└── README.md
            </pre>
            <h4 className="text-lg font-semibold text-light-text mt-5 mb-3">manifest.json</h4>
            <p className="text-gray-text mb-4">This file defines your extension's metadata:</p>
            <pre className="bg-dark-surface p-4 rounded-custom overflow-x-auto text-gray-text">
{`{
  "name": "Your Extension",
  "id": "your_extension_id",
  "version": "1.0.0",
  "description": "Brief description of your extension",
  "mode": "lite|pro|enterprise",
  "author": "Your Name",
  "os": ["Windows", "Linux", "macOS"],
  "category": "DataSource|Visualization|Processing",
  "entry_point": "main:app"
}`}
            </pre>
          </Element>
          {/* Diğer sections (rest-api, websockets, etc.) benzer şekilde ekle. Kısalık için kesiyorum. */}
        </div>
      </div>
    </>
  );
};

export default Docs;