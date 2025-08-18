import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
export function App() {
  return <div className="w-full min-h-screen bg-black text-white font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>;
}