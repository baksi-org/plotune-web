import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import BusinessImpact from '../components/BusinessImpact';
import TechStack from '../components/TechStack';
import Pricing from '../components/Pricing';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <BusinessImpact/>
      <TechStack />
      <Pricing />
    </>
  );
};

export default Home;