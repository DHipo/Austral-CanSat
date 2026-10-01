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
    },
  ];

  return (
    <section id="equipo" className="py-24 bg-[#0B1633] text-[#EEF2FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#17264F] text-[#FF7A1A] border border-white/10">
            Universidad Austral
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4 text-[#EEF2FA]">
            Equipo Técnico AuSat
          </h2>
          <p className="text-base sm:text-lg text-[#C9D6F2] font-normal leading-relaxed">
            Tres estudiantes de ingeniería de la Universidad Austral comprometidos bajo contrato de 6 horas semanales para representar a la institución en el certamen CanSat CONAE 2026.
          </p>
        </div>

        {/* 3 Core Engineering Members Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#17264F] border border-white/10 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between hover:border-[#FF7A1A]/40 transition-all duration-300 shadow-xl group hover:-translate-y-1"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#FF7A1A]/20 text-[#FF7A1A]">
                    {member.badge}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#0B1633] flex items-center justify-center text-xs font-mono font-bold text-[#C9D6F2]">
                    0{idx + 1}
                  </div>
                </div>

                {/* Member Info */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#EEF2FA] group-hover:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-[#FF7A1A] mb-3">
                  {member.role}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-[#5A6785] mb-4">
                  <GraduationCap className="w-3.5 h-3.5 text-[#C9D6F2]" />
                  <span>{member.career} • {member.university}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#C9D6F2] leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              {/* Subsystem Focus & Contact */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-[11px] text-[#5A6785] font-semibold uppercase tracking-wider">
                  Foco: <span className="text-[#EEF2FA] font-normal">{member.subsystem}</span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 rounded-xl bg-[#0B1633] text-[#C9D6F2] hover:text-[#FF7A1A] hover:bg-[#0B1633]/80 transition-colors"
                    title={`Email ${member.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-[#0B1633] text-[#C9D6F2] hover:text-[#FF7A1A] hover:bg-[#0B1633]/80 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <span className="text-[11px] font-mono text-[#5A6785] ml-auto">
                    {member.email.split('@')[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Commitment & Agreement Highlight */}
        <div className="rounded-3xl bg-[#17264F]/50 border border-white/10 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#10B981] mb-2">
                <Shield className="w-4 h-4" />
                Marco de Compromiso Ético & Técnico
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[#EEF2FA]">
                Convenio Interno de Dedicación Semanal
              </h4>
              <p className="text-xs sm:text-sm text-[#C9D6F2] max-w-2xl mt-1">
                Respaldado por el acuerdo de convivencia del equipo: 6 horas de laboratorio semanales, respuesta inmediata en menos de 24 horas y propiedad intelectual conjunta de la Universidad Austral.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-[#EEF2FA] bg-[#0B1633]/70 px-4 py-3 rounded-2xl border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>Sede de Ensayos: Campus Austral (Pilar)</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
