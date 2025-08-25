import React, { useState } from 'react';

const FaqSection = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      question: 'What are the system requirements for Plotune?',
      answer: (
        <>
          <p>Plotune runs on Windows 10/11 (64-bit) and most modern Linux distributions. Minimum requirements:</p>
          <ul className="ml-5 mt-2 list-disc">
            <li><strong>Processor:</strong> 2 GHz dual-core</li>
            <li><strong>Memory:</strong> 4 GB RAM</li>
            <li><strong>Storage:</strong> 500 MB available space</li>
            <li><strong>Graphics:</strong> OpenGL 3.3 compatible</li>
          </ul>
        </>
      ),
    },
    {
      question: "What's the difference between stable and alpha versions?",
      answer: (
        <>
          <p><strong>Stable versions</strong> (v1.0.0) are production-ready releases that have been thoroughly tested. These are recommended for most users.</p>
          <p><strong>Alpha versions</strong> (v0.9.0-alpha) are early access releases that include experimental features. These may be unstable and are intended for testing and development purposes only.</p>
        </>
      ),
    },
    {
      question: 'Can I upgrade from Lite to Pro without reinstalling?',
      answer: (
        <p>Yes! You can upgrade from Lite to Pro at any time without reinstalling the software. Simply purchase a Pro license and enter your activation key in the application settings.</p>
      ),
    },
    {
      question: 'How do I install the Linux version?',
      answer: (
        <>
          <p>For <strong>.deb</strong> packages (Debian/Ubuntu):</p>
          <pre className="bg-dark-surface p-3 rounded-custom my-2 text-gray-text">
            sudo dpkg -i plotune_1.0.0_amd64.deb
            sudo apt install -f
          </pre>
          <p>For <strong>.rpm</strong> packages (Red Hat/Fedora):</p>
          <pre className="bg-dark-surface p-3 rounded-custom my-2 text-gray-text">
            sudo rpm -i plotune-1.0.0-1.x86_64.rpm
          </pre>
        </>
      ),
    },
    {
      question: 'Where can I get older versions of Plotune?',
      answer: (
        <p>
          Previous stable versions of Plotune are available in our{' '}
          <a href="#" className="text-primary hover:underline">
            version archive
          </a>
          . We recommend always using the latest stable version unless you have specific compatibility requirements.
        </p>
      ),
    },
  ];

  return (
    <section className="py-16 bg-dark-bg">
      <div className="container mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-light-text mb-3">Download FAQs</h2>
          <p className="text-gray-text">Common questions about installing and using Plotune</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-dark-card rounded-custom p-4 border border-white/5 ${activeFaq === index ? 'shadow-custom' : ''}`}
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <h3 className="text-lg font-semibold text-light-text">{faq.question}</h3>
                <i className={`fas fa-chevron-down text-primary transition-transform ${activeFaq === index ? 'rotate-180' : ''}`}></i>
              </div>
              {activeFaq === index && (
                <div className="mt-3 text-gray-text">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;