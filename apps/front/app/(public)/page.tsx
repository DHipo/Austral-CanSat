'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../context/ThemeContext';
import { InteractiveBackground } from '../../components/public/InteractiveBackground';
import { Navbar } from '../../components/public/Navbar';
import { Hero } from '../../components/public/Hero';
import { CanSatSpecs } from '../../components/public/CanSatSpecs';
import { TeamSection } from '../../components/public/TeamSection';
import { Newsletter } from '../../components/public/Newsletter';
import { Footer } from '../../components/public/Footer';
import { OrbitAuthModal } from '../../components/orbit/OrbitAuthModal';

export default function HomePage() {
  const { theme } = useTheme();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const router = useRouter();

  const handleOrbitSuccess = (_userData?: any) => {
    // Navigate to the private Orbit dashboard
    router.push('/orbit');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLight = theme === 'light';

  return (
    <main className={`relative min-h-screen font-sans transition-colors duration-500 overflow-x-hidden ${
      isLight ? 'bg-transparent text-[#0B1633] selection:bg-[#FF7A1A]/20' : 'bg-transparent text-[#F5F5F7] selection:bg-[#FF7A1A]/30'
    }`}>
      {/* Dynamic Animated Mesh & Mouse Reactive Interactive Background */}
      <InteractiveBackground />

      {/* Page Content Layers */}
      <div className="relative z-10">
        {/* Top Persistent Glass Navbar */}
        <Navbar
          onOrbitClick={() => setIsAuthModalOpen(true)}
          onNavigateSection={scrollToSection}
        />

        {/* Cinematic Apple-Style Hero */}
        <div id="hero">
          <Hero
            onSpecsClick={() => scrollToSection('subsistemas')}
            onOrbitAccessClick={() => setIsAuthModalOpen(true)}
          />
        </div>

        {/* CanSat Technical Specifications & CONAE Timeline */}
        <CanSatSpecs />

        {/* 3 Core Universidad Austral Students Section */}
        <TeamSection />

        {/* Newsletter Outreach Subscription */}
        <Newsletter />

        {/* Institutional Footer */}
        <Footer onOrbitClick={() => setIsAuthModalOpen(true)} />
      </div>

      {/* Orbit Authentication Modal */}
      <OrbitAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleOrbitSuccess}
      />
    </main>
  );
}
