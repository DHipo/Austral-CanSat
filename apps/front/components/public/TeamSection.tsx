'use client';

import React from 'react';
import { Mail, Linkedin, GraduationCap, Shield, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const TeamSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const teamMembers = [
    {
      name: "Bautista D'Hipólito",
      role: 'Líder de Proyecto & Sistemas',
      career: '3er año • Ingeniería Informática',
      university: 'Universidad Austral',
      subsystem: 'Arquitectura, Aviónica & Software Orbit',
      email: 'bdhipolito@austral.edu.ar',
      linkedin: 'https://linkedin.com/in/bautistadhipolito',
      bio: 'Coordinador general del proyecto y responsable de la arquitectura de telemetría y software embebido en ESP32-S3.',
      badge: 'Team Lead',
      initials: 'BD',
    },
    {
      name: 'María Paz Fogliato',
      role: 'Responsable de Aviónica & Hardware',
      career: '2do año • Ingeniería Informática',
      university: 'Universidad Austral',
      subsystem: 'Aviónica, Sensores & Transceptor LoRa 915MHz',
      email: 'mfogliato@austral.edu.ar',
      linkedin: 'https://linkedin.com/in/maria-paz-fogliato',
      bio: 'Diseñadora del hardware de aviónica, bus de sensores I2C, gestión de energía LiPo y módulo de comunicación por radiofrecuencia.',
      badge: 'Hardware Lead',
      initials: 'MP',
    },
    {
      name: 'Joaquín Viani',
      role: 'Navegación & Control de Paraglider',
      career: '1er año • Ingeniería Informática',
      university: 'Universidad Austral',
      subsystem: 'Recuperación, Dinámica de Vuelo & Mecanismos',
      email: 'jviani@austral.edu.ar',
      linkedin: 'https://linkedin.com/in/joaquin-viani',
      bio: 'Especialista en aerodinámica de planeo guiado, accionamiento de servomotores y sistema de eyección amortiguada de la carga a 2m.',
      badge: 'Flight Lead',
      initials: 'JV',
    },
  ];

  return (
    <section id="equipo" className="py-28 text-[#F5F5F7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Apple Section Header with Faculty Seal */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-xl mb-6 shadow-sm">
            <img
              src="/logo_facultad.jpg"
              alt="Universidad Austral"
              className="w-5 h-5 rounded-full object-contain bg-white"
            />
            <span className="apple-label text-[#FF7A1A]">
              Facultad de Ingeniería • Universidad Austral
            </span>
          </div>

          <h2 className={`apple-title-section font-bold mb-4 transition-colors duration-500 ${
            isLight ? 'text-[#0B1633]' : 'text-[#F5F5F7]'
          }`}>
            Equipo Técnico AuSat
          </h2>

          <p className={`apple-body-large font-normal leading-relaxed transition-colors duration-500 ${
            isLight ? 'text-[#4B5563]' : 'text-[#C9D6F2]'
          }`}>
            Tres estudiantes de ingeniería informática de la Universidad Austral comprometidos bajo contrato de 6 horas semanales para representar a la institución en el certamen CanSat CONAE 2026.
          </p>
        </div>

        {/* 3 Core Engineering Members Apple Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className={`rounded-[32px] p-8 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group ${
                isLight
                  ? 'bg-white/90 border border-black/[0.08] shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:border-[#FF7A1A]/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)]'
                  : 'bg-gradient-to-b from-[#17264F]/50 via-[#0B1633]/70 to-[#050711] border border-white/12 hover:border-[#FF7A1A]/50 hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.8)]'
              }`}
            >
              <div>
                {/* Header: Initials Badge & Role Pill */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform ${
                    isLight 
                      ? 'bg-[#0B1633] text-[#FF7A1A] border border-black/10' 
                      : 'bg-gradient-to-br from-[#1E3268] to-[#0B1633] border border-white/20 text-[#FF7A1A]'
                  }`}>
                    {member.initials}
                  </div>
                  <span className="apple-label-small px-3.5 py-1 rounded-full bg-[#FF7A1A]/20 text-[#FF7A1A] border border-[#FF7A1A]/40 font-bold">
                    {member.badge}
                  </span>
                </div>

                <h3 className={`text-2xl font-bold mb-1 ${isLight ? 'text-[#0B1633]' : 'text-[#F5F5F7]'}`}>
                  {member.name}
                </h3>

                <p className="text-sm font-semibold text-[#FF7A1A] mb-4">
                  {member.role}
                </p>

                <div className="space-y-2 mb-6 text-xs">
                  <div className="flex items-center gap-2">
                    <GraduationCap className={`w-4 h-4 ${isLight ? 'text-[#0B1633]' : 'text-[#C9D6F2]'}`} />
                    <span className={`font-semibold ${isLight ? 'text-[#1D1D1F]' : 'text-[#EEF2FA]'}`}>
                      {member.career}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#10B981]" />
                    <span className={isLight ? 'text-[#4B5563]' : 'text-[#C9D6F2]'}>
                      {member.subsystem}
                    </span>
                  </div>
                </div>

                <p className={`text-sm font-normal leading-relaxed mb-6 ${isLight ? 'text-[#5A6785]' : 'text-[#C9D6F2]'}`}>
                  {member.bio}
                </p>
              </div>

              {/* Footer: Contacts & Links */}
              <div className={`pt-6 border-t flex items-center justify-between ${
                isLight ? 'border-black/[0.08]' : 'border-white/10'
              }`}>
                <a
                  href={`mailto:${member.email}`}
                  className={`inline-flex items-center gap-2 text-xs font-semibold transition-colors ${
                    isLight ? 'text-[#5A6785] hover:text-[#0B1633]' : 'text-[#86868B] hover:text-white'
                  }`}
                >
                  <Mail className="w-4 h-4 text-[#FF7A1A]" />
                  <span>{member.email}</span>
                </a>
                
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-xl transition-all duration-200 ${
                    isLight 
                      ? 'bg-black/5 text-[#0B1633] hover:bg-[#FF7A1A] hover:text-white' 
                      : 'bg-white/[0.06] text-[#C9D6F2] hover:bg-[#FF7A1A] hover:text-white'
                  }`}
                  title="Perfil LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment Banner: Apple Clean Pill Layout */}
        <div className={`max-w-4xl mx-auto rounded-[28px] p-6 sm:p-8 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left border transition-colors ${
          isLight
            ? 'bg-white/80 border-black/[0.08] shadow-md'
            : 'bg-white/[0.04] border-white/10'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
            </div>
            <div>
              <div className={`apple-label-small mb-1 ${isLight ? 'text-[#0B1633]' : 'text-[#F5F5F7]'}`}>
                Dedicación Oficial Certificada • 3 Estudiantes
              </div>
              <p className={`text-xs ${isLight ? 'text-[#5A6785]' : 'text-[#86868B]'}`}>
                6 horas semanales formalmente computadas para diseño, ensayos mecánicos y bitácoras técnicas en Orbit.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <img
              src="/logo_facultad.jpg"
              alt="Universidad Austral"
              className="h-8 w-auto rounded-lg bg-white p-0.5 shadow-sm"
            />
            <span className={`apple-label-small px-4 py-2 rounded-full border ${
              isLight ? 'bg-black/5 text-[#0B1633] border-black/10' : 'bg-white/[0.08] text-white border-white/20'
            }`}>
              CONAE 2026 • AUSTRAL
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
