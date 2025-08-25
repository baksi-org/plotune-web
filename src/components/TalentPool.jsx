import React from 'react';

const TalentPool = () => {
  const handleJoinTalentPool = (e) => {
    e.preventDefault();
    alert('Redirecting to talent pool form or contact page. Please provide an actual form or email link.');
  };

  return (
    <section className="py-16 bg-dark-bg">
      <div className="container mx-auto px-5 text-center">
        <h2 className="text-3xl font-bold text-light-text mb-4">Stay Connected</h2>
        <p className="text-gray-text max-w-2xl mx-auto mb-6">
          Interested in joining Plotune in the future? Join our talent pool to be notified when new positions open or to share your skills with us.
        </p>
        <a
          href="#"
          className="py-2 px-4 bg-primary text-white rounded hover:bg-primary-dark transition-all duration-300"
          onClick={handleJoinTalentPool}
        >
          <i className="fas fa-envelope mr-2"></i> Join Our Talent Pool
        </a>
      </div>
    </section>
  );
};

export default TalentPool;