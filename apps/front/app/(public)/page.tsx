'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../components/public/Navbar';
import { Hero } from '../../components/public/Hero';
import { CanSatSpecs } from '../../components/public/CanSatSpecs';
import { TeamSection } from '../../components/public/TeamSection';
import { Newsletter } from '../../components/public/Newsletter';
import { Footer } from '../../components/public/Footer';
import { OrbitAuthModal } from '../../components/orbit/OrbitAuthModal';

export default function HomePage() {
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

  return (
    <main className="bg-black text-[#F5F5F7] min-h-screen font-sans">
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

      {/* Orbit Authentication Modal */}
      <OrbitAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleOrbitSuccess}
      />
    </main>
  );
}
