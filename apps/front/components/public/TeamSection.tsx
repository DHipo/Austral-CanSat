'use client';

import React from 'react';
import { Mail, Linkedin, GraduationCap, Shield, CheckCircle2 } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: "Bautista D'Hipólito",
      role: 'Líder de Proyecto & Sistemas',
      career: 'Ingeniería Informática',
      university: 'Universidad Austral',
      subsystem: 'Arquitectura, Aviónica & Software Orbit',
      email: 'bdhipolito@austral.edu.ar',
      linkedin: 'https://linkedin.com/in/bautistadhipolito',
      bio: 'Coordinador general del proyecto y responsable de la arquitectura de telemetría y software embebido en ESP32-S3.',
      badge: 'Team Lead',
      initials: 'BD',
    },
    {
      name: 'Mateo Fernández',
      role: 'Responsable de Aviónica & Hardware',
      career: 'Ingeniería Informática',
      university: 'Universidad Austral',
      subsystem: 'Aviónica, Sensores & Transceptor LoRa 915MHz',
      email: 'mfernandez@austral.edu.ar',
      linkedin: 'https://linkedin.com/in/mateo-fernandez',
      bio: 'Diseñador del hardware de aviónica, bus de sensores I2C, gestión de energía LiPo y módulo de comunicación por radiofrecuencia.',
      badge: 'Hardware Lead',
      initials: 'MF',
    },
    {
      name: 'Sofía Rossi',
      role: 'Navegación & Control de Paraglider',
      career: 'Ingeniería Industrial',
      university: 'Universidad Austral',
      subsystem: 'Recuperación, Dinámica de Vuelo & Mecanismos',
      email: 'srossi@austral.edu.ar',
      linkedin: 'https://linkedin.com/in/sofia-rossi',
      bio: 'Especialista en aerodinámica de planeo guiado, accionamiento de servomotores y sistema de eyección amortiguada de la carga a 2m.',
      badge: 'Flight Lead',
      initials: 'SR',
    },
  ];

  return (
    <section id="equipo" className="py-28 text-[#F5F5F7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Apple Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <div className="inline-block mb-6">
            <span className="apple-label text-[#FF7A1A] px-6 py-2 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-xl">
              Universidad Austral
            </span>
          </div>

          <h2 className="apple-title-section text-[#F5F5F7] font-bold mb-6">
            Equipo Técnico AuSat
          </h2>

          <p className="apple-body-large text-[#C9D6F2] font-normal leading-relaxed">
            Tres estudiantes de ingeniería de la Universidad Austral comprometidos bajo contrato de 6 horas semanales para representar a la institución en el certamen CanSat CONAE 2026.
          </p>
        </div>

        {/* 3 Core Engineering Members Apple Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="rounded-[32px] bg-gradient-to-b from-[#17264F]/50 via-[#0B1633]/70 to-[#050711] border border-white/12 p-8 backdrop-blur-2xl transition-all duration-300 hover:border-[#FF7A1A]/50 hover:-translate-y-2 hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.8)] flex flex-col justify-between group"
            >
              <div>
                {/* Header: Initials Badge & Role Pill */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E3268] to-[#0B1633] border border-white/20 flex items-center justify-center font-bold text-xl text-[#FF7A1A] shadow-md group-hover:scale-105 transition-transform">
                    {member.initials}
                  </div>
                  <span className="apple-label-small px-3.5 py-1 rounded-full bg-[#FF7A1A]/20 text-[#FF7A1A] border border-[#FF7A1A]/40 font-bold">
                    {member.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F7] mb-1">
                  {member.name}
                </h3>

                <p className="text-sm font-semibold text-[#FF7A1A] mb-4">
                  {member.role}
                </p>

                <div className="space-y-2 mb-6 text-xs text-[#86868B]">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#C9D6F2]" />
                    <span>{member.career} • {member.university}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#10B981]" />
                    <span className="text-[#C9D6F2]">{member.subsystem}</span>
                  </div>
                </div>

                <p className="text-sm text-[#C9D6F2] font-normal leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              {/* Footer: Contacts & Links */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#86868B] hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#FF7A1A]" />
                  <span>{member.email}</span>
                </a>
                
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-[#FF7A1A] text-[#C9D6F2] hover:text-white transition-all duration-200"
                  title="Perfil LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment Banner: Apple Clean Pill Layout */}
        <div className="max-w-4xl mx-auto rounded-[28px] bg-white/[0.04] border border-white/10 p-6 sm:p-8 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
            </div>
            <div>
              <div className="apple-label-small text-[#F5F5F7] mb-1">
                Dedicación Oficial Certificada
              </div>
              <p className="text-sm text-[#86868B]">
                6 horas semanales formalmente computadas para diseño, ensayos mecánicos y bitácoras técnicas en Orbit.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <span className="apple-label-small px-5 py-2 rounded-full bg-white/[0.08] text-white border border-white/20">
              CONAE 2026 • AUSTRAL
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
