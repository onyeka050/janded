import React from 'react';
import { Download, TrendingUp, Award, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const templates = [
  {
    type: 'Daily Update',
    icon: TrendingUp,
    color: 'from-blue-600 to-blue-700',
    title: '5 New Visa-Sponsored Jobs',
    subtitle: 'Canada, UK, Germany',
    badge: 'Today',
    accentColor: 'bg-amber-400',
  },
  {
    type: 'Scholarship Alert',
    icon: Award,
    color: 'from-amber-600 to-amber-700',
    title: 'Fully Funded Master\'s',
    subtitle: 'Deadline: December 15, 2024',
    badge: 'Urgent',
    accentColor: 'bg-emerald-400',
  },
  {
    type: 'Visa News',
    icon: AlertCircle,
    color: 'from-emerald-600 to-emerald-700',
    title: 'Canada Express Entry Update',
    subtitle: 'New CRS Score: 485',
    badge: 'Breaking',
    accentColor: 'bg-blue-400',
  },
  {
    type: 'Success Story',
    icon: CheckCircle,
    color: 'from-purple-600 to-purple-700',
    title: 'From Lagos to London',
    subtitle: 'Chioma\'s Journey',
    badge: 'Inspiring',
    accentColor: 'bg-amber-400',
  },
];

export function SocialTemplates() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 rounded-full px-4 py-2 mb-4">
            <Download size={16} />
            <span>Social Media</span>
          </div>
          <h2 className="text-slate-900 mb-4">
            Stay Connected Everywhere
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Follow us on social media for daily updates, breaking news, and success stories
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {templates.map((template, index) => {
            const Icon = template.icon;
            return (
              <Card key={index} className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all">
                <div className={`bg-gradient-to-br ${template.color} p-6 relative`}>
                  {/* Logo in corner */}
                  <div className="absolute top-4 left-4 text-white/80 text-xs tracking-wider">
                    JANDED
                  </div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`${template.accentColor} text-slate-900 px-3 py-1 rounded-full text-xs`}>
                      {template.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-12">
                    <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-white mb-2">
                      {template.title}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {template.subtitle}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 flex items-center gap-2 text-white/90 text-sm">
                    <span>Learn More →</span>
                  </div>

                  {/* Decorative element */}
                  <div className={`absolute bottom-0 right-0 w-32 h-32 ${template.accentColor} opacity-10 rounded-tl-full`} />
                </div>
                <CardContent className="p-4 bg-slate-50">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>{template.type}</span>
                    <Download size={14} className="text-slate-400" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Social proof section */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </div>
              <div className="text-blue-900 mb-1">Twitter/X</div>
              <div className="text-blue-600 text-sm">@getjanded</div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div className="text-purple-900 mb-1">Instagram</div>
              <div className="text-purple-600 text-sm">@janded.official</div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-emerald-50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </div>
              <div className="text-emerald-900 mb-1">TikTok</div>
              <div className="text-emerald-600 text-sm">@janded</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
