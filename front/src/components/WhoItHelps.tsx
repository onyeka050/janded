import React from 'react';
import { GraduationCap, Briefcase, Code, Heart, Users, Award } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const audiences = [
  {
    icon: GraduationCap,
    title: 'Students',
    description: 'Find scholarships, study abroad programs, and student visa pathways',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: Briefcase,
    title: 'Job Seekers',
    description: 'Discover visa-sponsored jobs across industries and skill levels',
    gradient: 'from-amber-500 to-amber-600',
  },
  {
    icon: Code,
    title: 'Tech Workers',
    description: 'Access tech roles with visa sponsorship in growing markets',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Heart,
    title: 'Caregivers',
    description: 'Healthcare and caregiver opportunities with visa support',
    gradient: 'from-rose-500 to-rose-600',
  },
  {
    icon: Users,
    title: 'Skilled Workers',
    description: 'Trades, skilled labor, and professional migration pathways',
    gradient: 'from-teal-500 to-teal-600',
  },
  {
    icon: Award,
    title: 'Recent Graduates',
    description: 'Entry-level opportunities and graduate programs abroad',
    gradient: 'from-purple-500 to-purple-600',
  },
];

export function WhoItHelps() {
  return (
    <section id="about" className="py-20 bg-white scroll-mt-16">
      {/* Fix Issue #3: Standardized max-w-6xl */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 rounded-full px-4 py-2 mb-4">
            <Users size={16} />
            <span>For Everyone</span>
          </div>
          <h2 className="text-slate-900 mb-4">
            Who JANDED Helps
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Whether you're a student, professional, or skilled worker, we have opportunities for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <Card 
                key={index} 
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${audience.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="text-white" size={24} strokeWidth={2} />
                  </div>
                  <h3 className="text-slate-900 mb-2">
                    {audience.title}
                  </h3>
                  <p className="text-slate-600">
                    {audience.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Box */}
        <div className="mt-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
          <h3 className="text-white mb-3">
            Ready to Start Your Journey?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of West Africans already using JANDED to find their path abroad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-3 rounded-lg transition-colors">
              Get Started Free
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3 rounded-lg backdrop-blur transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}