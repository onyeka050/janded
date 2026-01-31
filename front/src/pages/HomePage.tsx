import React from 'react';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { WhoItHelps } from '../components/WhoItHelps';
import { Features } from '../components/Features';
import { MobileAppShowcase } from '../components/MobileAppShowcase';
import { Testimonials } from '../components/Testimonials';
import { SocialTemplates } from '../components/SocialTemplates';
import { OpportunitiesShowcase } from '../components/OpportunitiesShowcase';
import { useAuth } from "../components/AuthContext";
export function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <OpportunitiesShowcase />
      <WhoItHelps />
      <Features />
      <MobileAppShowcase />
      <Testimonials />
      <SocialTemplates />
    </>
  );
}