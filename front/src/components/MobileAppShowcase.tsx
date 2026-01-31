import React, { useState } from 'react';
import { Smartphone, Home, Briefcase, GraduationCap, Globe, BookmarkCheck, ChevronRight, MapPin, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const screens = [
  { id: 'onboarding', name: 'Onboarding' },
  { id: 'home', name: 'Home Feed' },
  { id: 'jobs', name: 'Jobs' },
  { id: 'scholarships', name: 'Scholarships' },
];

export function MobileAppShowcase() {
  const [activeScreen, setActiveScreen] = useState('home');

  return (
    // Fix Issue #14: Standardized spacing py-20
    // Fix Issue #15: Alternating background
    <section className="py-20 bg-white">
      {/* Fix Issue #3: Standardized max-w-6xl */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-2 mb-4">
            <Smartphone size={16} />
            <span>Mobile Experience</span>
          </div>
          <h2 className="text-slate-900 mb-4">
            Access Opportunities On The Go
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our mobile-first design makes it easy to browse and apply to opportunities from anywhere
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Mobile screen preview */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone frame */}
              <div className="w-80 h-[600px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="bg-white px-6 py-3 flex items-center justify-between border-b border-slate-100">
                    <span className="text-slate-900">9:41</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-slate-400 rounded-full" />
                      <div className="w-1 h-1 bg-slate-400 rounded-full" />
                      <div className="w-1 h-1 bg-slate-400 rounded-full" />
                    </div>
                  </div>

                  {/* Screen content */}
                  {activeScreen === 'onboarding' && <OnboardingScreen />}
                  {activeScreen === 'home' && <HomeScreen />}
                  {activeScreen === 'jobs' && <JobsScreen />}
                  {activeScreen === 'scholarships' && <ScholarshipsScreen />}

                  {/* Bottom navigation */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3">
                    <div className="flex items-center justify-between">
                      <button className={`flex flex-col items-center gap-1 ${activeScreen === 'home' ? 'text-blue-600' : 'text-slate-400'}`}>
                        <Home size={20} />
                        <span className="text-xs">Home</span>
                      </button>
                      <button className={`flex flex-col items-center gap-1 ${activeScreen === 'jobs' ? 'text-blue-600' : 'text-slate-400'}`}>
                        <Briefcase size={20} />
                        <span className="text-xs">Jobs</span>
                      </button>
                      <button className={`flex flex-col items-center gap-1 ${activeScreen === 'scholarships' ? 'text-blue-600' : 'text-slate-400'}`}>
                        <GraduationCap size={20} />
                        <span className="text-xs">Scholar</span>
                      </button>
                      <button className="flex flex-col items-center gap-1 text-slate-400">
                        <Globe size={20} />
                        <span className="text-xs">Visas</span>
                      </button>
                      <button className="flex flex-col items-center gap-1 text-slate-400">
                        <BookmarkCheck size={20} />
                        <span className="text-xs">Saved</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg text-xs animate-pulse">
                5 New Jobs Today
              </div>
            </div>
          </div>

          {/* Features list */}
          <div>
            <div className="space-y-4 mb-8">
              {screens.map((screen) => (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreen(screen.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    activeScreen === screen.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-slate-700 hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{screen.name}</span>
                    <ChevronRight size={20} />
                  </div>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-slate-900">
                Mobile-First Features
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-emerald-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-slate-600">Personalized feed based on your preferences</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-emerald-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-slate-600">Push notifications for new opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-emerald-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-slate-600">Save and bookmark opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-emerald-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-slate-600">One-tap apply to jobs and scholarships</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OnboardingScreen() {
  return (
    <div className="p-6 h-[490px] overflow-y-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <Globe className="text-white" size={32} />
        </div>
        <h3 className="text-slate-900 mb-2">Welcome to JANDED</h3>
        <p className="text-slate-600 text-sm">Let's personalize your experience</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-slate-700 text-sm mb-2 block">Select Your Country</label>
          <div className="grid grid-cols-2 gap-2">
            {['🇳🇬 Nigeria', '🇬🇭 Ghana', '🇬🇲 Gambia', '🇸🇱 S. Leone'].map((country) => (
              <button key={country} className="p-3 border border-slate-200 rounded-lg text-sm hover:border-blue-600 hover:bg-blue-50">
                {country}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-slate-700 text-sm mb-2 block">I'm interested in:</label>
          <div className="space-y-2">
            {['💼 Jobs Abroad', '🎓 Scholarships', '🛂 Visa Info', '🔧 Skilled Migration'].map((interest) => (
              <button key={interest} className="w-full p-3 border border-slate-200 rounded-lg text-sm text-left hover:border-blue-600 hover:bg-blue-50">
                {interest}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeScreen() {
  return (
    <div className="h-[490px] overflow-y-auto">
      <div className="p-6 pb-20">
        <div className="mb-6">
          <h3 className="text-slate-900 mb-1">Today's Opportunities</h3>
          <p className="text-slate-600 text-sm">5 new opportunities for you</p>
        </div>

        <div className="space-y-4">
          <Card className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <Badge className="bg-blue-100 text-blue-700">Job</Badge>
                <span className="text-xs text-slate-500">2h ago</span>
              </div>
              <h4 className="text-slate-900 text-sm mb-1">Software Engineer</h4>
              <div className="flex items-center gap-2 text-xs text-slate-600 mb-2">
                <MapPin size={12} />
                <span>🇨🇦 Canada</span>
                <span>•</span>
                <span>Visa Sponsored</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-emerald-600 text-sm">$80k - $120k</span>
                <ChevronRight size={16} className="text-slate-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <Badge className="bg-amber-100 text-amber-700">Scholarship</Badge>
                <span className="text-xs text-slate-500">5h ago</span>
              </div>
              <h4 className="text-slate-900 text-sm mb-1">Master's Fully Funded</h4>
              <div className="flex items-center gap-2 text-xs text-slate-600 mb-2">
                <MapPin size={12} />
                <span>🇬🇧 UK</span>
                <span>•</span>
                <span>All expenses</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-rose-600 text-sm">Deadline: Dec 15</span>
                <ChevronRight size={16} className="text-slate-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <Badge className="bg-emerald-100 text-emerald-700">Visa Update</Badge>
                <span className="text-xs text-slate-500">1d ago</span>
              </div>
              <h4 className="text-slate-900 text-sm mb-1">New Express Entry Draw</h4>
              <div className="flex items-center gap-2 text-xs text-slate-600 mb-2">
                <Globe size={12} />
                <span>🇨🇦 Canada Immigration</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-600 text-sm">Read Update</span>
                <ChevronRight size={16} className="text-slate-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function JobsScreen() {
  return (
    <div className="h-[490px] overflow-y-auto">
      <div className="p-6 pb-20">
        <div className="mb-6">
          <h3 className="text-slate-900 mb-3">Visa-Sponsored Jobs</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Badge className="bg-blue-600 text-white whitespace-nowrap">All</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Tech</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Healthcare</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Trades</Badge>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { title: 'Registered Nurse', company: 'NHS Trust', country: '🇬🇧 UK', salary: '£30k - £40k', type: 'Healthcare' },
            { title: 'Web Developer', company: 'Tech Startup', country: '🇩🇪 Germany', salary: '€50k - €70k', type: 'Tech' },
            { title: 'Electrician', company: 'Construction Co', country: '🇦🇺 Australia', salary: 'AU$70k+', type: 'Trades' },
          ].map((job, i) => (
            <Card key={i} className="border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-slate-900 text-sm mb-1">{job.title}</h4>
                    <p className="text-slate-600 text-xs">{job.company}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">{job.type}</Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>{job.country}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign size={12} />
                    <span>{job.salary}</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm">
                  Apply Now
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScholarshipsScreen() {
  return (
    <div className="h-[490px] overflow-y-auto">
      <div className="p-6 pb-20">
        <div className="mb-6">
          <h3 className="text-slate-900 mb-3">Scholarships & Grants</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Badge className="bg-amber-600 text-white whitespace-nowrap">All Levels</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Bachelor's</Badge>
            <Badge variant="outline" className="whitespace-nowrap">Master's</Badge>
            <Badge variant="outline" className="whitespace-nowrap">PhD</Badge>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { title: 'Chevening Scholarship', level: 'Master\'s', country: '🇬🇧 UK', deadline: 'Nov 7, 2023', funding: 'Full' },
            { title: 'DAAD Scholarship', level: 'Master\'s/PhD', country: '🇩🇪 Germany', deadline: 'Dec 1, 2023', funding: 'Full' },
            { title: 'Vanier CGS', level: 'PhD', country: '🇨🇦 Canada', deadline: 'Nov 3, 2023', funding: 'Full' },
          ].map((scholarship, i) => (
            <Card key={i} className="border-amber-200 bg-amber-50/30">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-slate-900 text-sm mb-1">{scholarship.title}</h4>
                    <p className="text-slate-600 text-xs">{scholarship.level}</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 text-xs">{scholarship.funding}</Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>{scholarship.country}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{scholarship.deadline}</span>
                  </div>
                </div>
                <button className="w-full bg-amber-600 text-white py-2 rounded-lg text-sm">
                  View Details
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}