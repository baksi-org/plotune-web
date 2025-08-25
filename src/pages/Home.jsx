import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import UniqueAdvantages from '../components/UniqueAdvantages';
import TargetUsers from '../components/TargetUsers';
import TechStack from '../components/TechStack';
import Pricing from '../components/Pricing';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <UniqueAdvantages />
      <TargetUsers />
      <TechStack />
      <Pricing />
    </>
  );
};

export default Home;