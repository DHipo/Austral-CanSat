'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../context/ThemeContext';
import { InteractiveBackground } from '../../components/public/InteractiveBackground';
import { Navbar } from '../../components/public/Navbar';
import { Hero } from '../../components/public/Hero';
import { CanSatSpecs } from '../../components/public/CanSatSpecs';
import { TeamSection } from '../../components/public/TeamSection';
import { Newsletter } from '../../components/public/Newsletter';
import { Footer } from '../../components/public/Footer';

export default function HomePage() {
  const { theme } = useTheme();
  const router = useRouter();

  // El middleware redirige a /orbit/login si no hay sesión.
  const goToOrbit = () => router.push('/orbit');

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
          onOrbitClick={goToOrbit}
          onNavigateSection={scrollToSection}
        />

        {/* Cinematic Apple-Style Hero */}
        <div id="hero">
          <Hero
            onSpecsClick={() => scrollToSection('subsistemas')}
            onOrbitAccessClick={goToOrbit}
          />
        </div>

        {/* CanSat Technical Specifications & CONAE Timeline */}
        <CanSatSpecs />

        {/* 3 Core Universidad Austral Students Section */}
        <TeamSection />

        {/* Newsletter Outreach Subscription */}
        <Newsletter />

        {/* Institutional Footer */}
        <Footer onOrbitClick={goToOrbit} />
      </div>
    </main>
  );
}
