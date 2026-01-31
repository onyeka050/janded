import React from 'react';
import { Globe, Mail, Search, Shield } from 'lucide-react';

const steps = [
  {
    icon: Mail,
    title: 'Subscribe for Free',
    description: 'Get daily verified opportunities delivered straight to your inbox',
    color: 'bg-blue-500',
  },
  {
    icon: Search,
    title: 'Browse Opportunities',
    description: 'Explore visa-sponsored jobs, scholarships, and migration pathways',
    color: 'bg-amber-500',
  },
  {
    icon: Shield,
    title: 'Verified & Safe',
    description: 'Every opportunity is vetted to protect you from scams',
    color: 'bg-emerald-500',
  },
  {
    icon: Globe,
    title: 'Take Action',
    description: 'Apply with confidence and start your journey abroad',
    color: 'bg-teal-500',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-slate-50 scroll-mt-16">
      {/* Fix Issue #3: Standardized max-w-6xl */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-2 mb-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full" />
            <span>Simple Process</span>
          </div>
          <h2 className="text-slate-900 mb-4">
            How JANDED Works
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We make finding opportunities abroad simple, safe, and stress-free
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className={`${step.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-${step.color}/20`}>
                    <Icon className="text-white" size={28} strokeWidth={2} />
                  </div>
                  <div className="absolute top-8 -right-4 hidden lg:block">
                    {index < steps.length - 1 && (
                      <div className="w-8 h-0.5 bg-gradient-to-r from-slate-300 to-transparent" />
                    )}
                  </div>
                  <h3 className="text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl">
          <div className="text-center">
            <div className="text-blue-600 mb-2">50K+</div>
            <div className="text-slate-600">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-amber-600 mb-2">1,000+</div>
            <div className="text-slate-600">Jobs Posted</div>
          </div>
          <div className="text-center">
            <div className="text-emerald-600 mb-2">500+</div>
            <div className="text-slate-600">Scholarships</div>
          </div>
          <div className="text-center">
            <div className="text-teal-600 mb-2">30+</div>
            <div className="text-slate-600">Countries</div>
          </div>
        </div>
      </div>
    </section>
  );
}