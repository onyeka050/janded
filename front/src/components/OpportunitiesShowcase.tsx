import React, { useState } from 'react';
import { Briefcase, GraduationCap, MapPin, Clock, DollarSign, Users, ArrowRight, Bookmark, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const jobs = [
  {
    id: 1,
    title: 'Registered Nurse',
    company: 'NHS Healthcare Trust',
    location: 'United Kingdom',
    flag: '🇬🇧',
    salary: '£28,000 - £35,000',
    type: 'Full-time',
    visaSponsored: true,
    posted: '2 days ago',
    requirements: ['Nursing degree', 'NMC registration', 'English proficiency'],
    description: 'Join our team providing excellent patient care. Full visa sponsorship and relocation assistance available.',
  },
  {
    id: 2,
    title: 'Software Engineer',
    company: 'TechStart GmbH',
    location: 'Germany',
    flag: '🇩🇪',
    salary: '€55,000 - €75,000',
    type: 'Full-time',
    visaSponsored: true,
    posted: '1 day ago',
    requirements: ['Bachelor\'s in CS', '2+ years experience', 'JavaScript/Python'],
    description: 'Build innovative solutions with our growing tech team. EU Blue Card sponsorship provided.',
  },
  {
    id: 3,
    title: 'Care Worker',
    company: 'Maple Care Services',
    location: 'Canada',
    flag: '🇨🇦',
    salary: 'CAD $40,000 - $50,000',
    type: 'Full-time',
    visaSponsored: true,
    posted: '3 days ago',
    requirements: ['High school diploma', 'Care experience', 'Clean background check'],
    description: 'Provide compassionate care to seniors. Work permit and PR pathway available.',
  },
  {
    id: 4,
    title: 'Electrician',
    company: 'Aussie Trades Ltd',
    location: 'Australia',
    flag: '🇦🇺',
    salary: 'AUD $65,000 - $85,000',
    type: 'Full-time',
    visaSponsored: true,
    posted: '5 days ago',
    requirements: ['Trade certificate', '3+ years experience', 'Electrical license'],
    description: 'Join our commercial electrical team. Skilled worker visa (482) sponsored.',
  },
  {
    id: 5,
    title: 'Data Analyst',
    company: 'Global Analytics Inc',
    location: 'United States',
    flag: '🇺🇸',
    salary: '$70,000 - $95,000',
    type: 'Full-time',
    visaSponsored: true,
    posted: '1 week ago',
    requirements: ['Bachelor\'s degree', 'SQL & Python', 'Data visualization'],
    description: 'Analyze data to drive business insights. H-1B visa sponsorship available.',
  },
  {
    id: 6,
    title: 'Hospitality Manager',
    company: 'Emirates Resorts',
    location: 'UAE',
    flag: '🇦🇪',
    salary: 'AED 120,000 - 160,000',
    type: 'Full-time',
    visaSponsored: true,
    posted: '4 days ago',
    requirements: ['Hospitality degree', '5+ years management', 'Multi-lingual'],
    description: 'Lead our luxury resort operations. Employment visa and benefits included.',
  },
];

const scholarships = [
  {
    id: 1,
    name: 'Chevening Scholarship',
    organization: 'UK Government',
    location: 'United Kingdom',
    flag: '🇬🇧',
    level: 'Master\'s',
    funding: 'Fully Funded',
    deadline: 'November 7, 2024',
    fields: ['All fields'],
    description: 'Cover tuition, living expenses, flights, and visa. Leadership-focused program.',
    benefits: ['Full tuition', 'Monthly stipend', 'Flights', 'Visa fees'],
  },
  {
    id: 2,
    name: 'DAAD Scholarship',
    organization: 'German Academic Exchange',
    location: 'Germany',
    flag: '🇩🇪',
    level: 'Master\'s / PhD',
    funding: 'Fully Funded',
    deadline: 'December 1, 2024',
    fields: ['Engineering', 'Sciences', 'Business'],
    description: 'Study at top German universities. Monthly allowance and full tuition coverage.',
    benefits: ['Full tuition', '€934/month', 'Health insurance', 'Travel grant'],
  },
  {
    id: 3,
    name: 'Vanier Canada Graduate',
    organization: 'Government of Canada',
    location: 'Canada',
    flag: '🇨🇦',
    level: 'PhD',
    funding: 'Fully Funded',
    deadline: 'November 3, 2024',
    fields: ['Health', 'Social Sciences', 'Engineering'],
    description: 'Prestigious doctoral scholarship for top students. $50,000 per year for 3 years.',
    benefits: ['$50,000/year', '3 years', 'Research funding', 'Conference travel'],
  },
  {
    id: 4,
    name: 'Erasmus Mundus',
    organization: 'European Union',
    location: 'Europe (Multiple)',
    flag: '🇪🇺',
    level: 'Master\'s',
    funding: 'Fully Funded',
    deadline: 'January 15, 2025',
    fields: ['Various programs'],
    description: 'Study in 2-3 European countries. Full scholarship covering all costs.',
    benefits: ['Full tuition', '€1,400/month', 'Travel costs', 'Insurance'],
  },
  {
    id: 5,
    name: 'Australia Awards',
    organization: 'Australian Government',
    location: 'Australia',
    flag: '🇦🇺',
    level: 'Master\'s',
    funding: 'Fully Funded',
    deadline: 'April 30, 2024',
    fields: ['Development', 'Public Policy', 'Education'],
    description: 'Long-term development awards for future leaders. Full financial support.',
    benefits: ['Full tuition', 'Living allowance', 'Airfare', 'Visa support'],
  },
  {
    id: 6,
    name: 'Fulbright Program',
    organization: 'US Government',
    location: 'United States',
    flag: '🇺🇸',
    level: 'Master\'s / PhD',
    funding: 'Fully Funded',
    deadline: 'May 31, 2024',
    fields: ['All fields'],
    description: 'Study and research at US universities. Comprehensive funding package.',
    benefits: ['Full tuition', 'Monthly stipend', 'Health insurance', 'Book allowance'],
  },
];

export function OpportunitiesShowcase() {
  const [savedItems, setSavedItems] = useState<number[]>([]);

  const toggleSave = (id: number) => {
    setSavedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="opportunities" className="py-20 bg-white scroll-mt-16">
      {/* Fix Issue #3: Standardized max-w-6xl */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 rounded-full px-4 py-2 mb-4">
            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
            <span>Live Opportunities</span>
          </div>
          <h2 className="text-slate-900 mb-4">
            Latest Verified Opportunities
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Browse real visa-sponsored jobs and fully-funded scholarships. All opportunities are verified and updated daily.
          </p>
        </div>

        <Tabs defaultValue="jobs" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="jobs" className="gap-2">
              <Briefcase size={16} />
              Jobs ({jobs.length})
            </TabsTrigger>
            <TabsTrigger value="scholarships" className="gap-2">
              <GraduationCap size={16} />
              Scholarships ({scholarships.length})
            </TabsTrigger>
          </TabsList>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-slate-900">{job.title}</h3>
                          <button
                            onClick={() => toggleSave(job.id)}
                            className="text-slate-400 hover:text-amber-500 transition-colors"
                          >
                            <Bookmark 
                              size={18} 
                              fill={savedItems.includes(job.id) ? 'currentColor' : 'none'}
                            />
                          </button>
                        </div>
                        <p className="text-slate-600 text-sm">{job.company}</p>
                      </div>
                      {job.visaSponsored && (
                        <Badge className="bg-emerald-100 text-emerald-700">
                          Visa Sponsored
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={14} className="text-blue-600" />
                        <span className="flex items-center gap-1">
                          <span>{job.flag}</span>
                          <span>{job.location}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <DollarSign size={14} className="text-emerald-600" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock size={14} className="text-amber-600" />
                        <span>{job.posted}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm mb-4">
                      {job.description}
                    </p>

                    <div className="mb-4">
                      <p className="text-xs text-slate-500 mb-2">Requirements:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
                      Apply Now
                      <ArrowRight size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center pt-8">
              <Button variant="outline" className="gap-2">
                View All Jobs
                <ExternalLink size={16} />
              </Button>
            </div>
          </TabsContent>

          {/* Scholarships Tab */}
          <TabsContent value="scholarships" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {scholarships.map((scholarship) => (
                <Card key={scholarship.id} className="hover:shadow-lg transition-shadow border-amber-200 bg-gradient-to-br from-white to-amber-50/30">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-slate-900">{scholarship.name}</h3>
                          <button
                            onClick={() => toggleSave(scholarship.id + 100)}
                            className="text-slate-400 hover:text-amber-500 transition-colors"
                          >
                            <Bookmark 
                              size={18} 
                              fill={savedItems.includes(scholarship.id + 100) ? 'currentColor' : 'none'}
                            />
                          </button>
                        </div>
                        <p className="text-slate-600 text-sm">{scholarship.organization}</p>
                      </div>
                      <Badge className="bg-amber-100 text-amber-700">
                        {scholarship.funding}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={14} className="text-blue-600" />
                        <span className="flex items-center gap-1">
                          <span>{scholarship.flag}</span>
                          <span>{scholarship.location}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <GraduationCap size={14} className="text-purple-600" />
                        <span>{scholarship.level}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock size={14} className="text-rose-600" />
                        <span>Deadline: {scholarship.deadline}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm mb-4">
                      {scholarship.description}
                    </p>

                    <div className="mb-4">
                      <p className="text-xs text-slate-500 mb-2">Benefits:</p>
                      <div className="flex flex-wrap gap-2">
                        {scholarship.benefits.map((benefit, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white gap-2">
                      View Details
                      <ArrowRight size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center pt-8">
              <Button variant="outline" className="gap-2">
                View All Scholarships
                <ExternalLink size={16} />
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Briefcase className="text-blue-600" size={20} />
              <span className="text-blue-600">150+</span>
            </div>
            <p className="text-slate-600 text-sm">Active Jobs</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <GraduationCap className="text-amber-600" size={20} />
              <span className="text-amber-600">80+</span>
            </div>
            <p className="text-slate-600 text-sm">Scholarships</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin className="text-emerald-600" size={20} />
              <span className="text-emerald-600">35+</span>
            </div>
            <p className="text-slate-600 text-sm">Countries</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="text-purple-600" size={20} />
              <span className="text-purple-600">2,000+</span>
            </div>
            <p className="text-slate-600 text-sm">Placed This Year</p>
          </div>
        </div>
      </div>
    </section>
  );
}