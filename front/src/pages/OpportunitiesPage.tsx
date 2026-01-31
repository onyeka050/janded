import React, { useState } from 'react';
import { Briefcase, GraduationCap, MapPin, Clock, DollarSign, Search, Filter, ArrowRight, Bookmark, Globe, Plane, ChevronDown, SlidersHorizontal, User, LogIn } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '../components/ui/sheet';

const jobs = [
  {
    id: 1,
    title: 'Registered Nurse',
    company: 'NHS Healthcare Trust',
    location: 'United Kingdom',
    country: 'UK',
    flag: '🇬🇧',
    salary: '£28,000 - £35,000',
    type: 'Full-time',
    category: 'Healthcare',
    visaSponsored: true,
    posted: '2d ago',
    requirements: ['Nursing degree', 'NMC registration', 'English proficiency'],
    description: 'Join our team providing excellent patient care. Full visa sponsorship and relocation assistance available.',
  },
  {
    id: 2,
    title: 'Software Engineer',
    company: 'TechStart GmbH',
    location: 'Germany',
    country: 'Germany',
    flag: '🇩🇪',
    salary: '€55,000 - €75,000',
    type: 'Full-time',
    category: 'Technology',
    visaSponsored: true,
    posted: '1d ago',
    requirements: ['Bachelor\'s in CS', '2+ years experience', 'JavaScript/Python'],
    description: 'Build innovative solutions with our growing tech team. EU Blue Card sponsorship provided.',
  },
  {
    id: 3,
    title: 'Care Worker',
    company: 'Maple Care Services',
    location: 'Canada',
    country: 'Canada',
    flag: '🇨🇦',
    salary: 'CAD $40,000 - $50,000',
    type: 'Full-time',
    category: 'Healthcare',
    visaSponsored: true,
    posted: '3d ago',
    requirements: ['High school diploma', 'Care experience', 'Clean background check'],
    description: 'Provide compassionate care to seniors. Work permit and PR pathway available.',
  },
  {
    id: 4,
    title: 'Electrician',
    company: 'Aussie Trades Ltd',
    location: 'Australia',
    country: 'Australia',
    flag: '🇦🇺',
    salary: 'AUD $65,000 - $85,000',
    type: 'Full-time',
    category: 'Skilled Trades',
    visaSponsored: true,
    posted: '5d ago',
    requirements: ['Trade certificate', '3+ years experience', 'Electrical license'],
    description: 'Join our commercial electrical team. Skilled worker visa (482) sponsored.',
  },
  {
    id: 5,
    title: 'Data Analyst',
    company: 'Global Analytics Inc',
    location: 'United States',
    country: 'USA',
    flag: '🇺🇸',
    salary: '$70,000 - $95,000',
    type: 'Full-time',
    category: 'Technology',
    visaSponsored: true,
    posted: '1w ago',
    requirements: ['Bachelor\'s degree', 'SQL & Python', 'Data visualization'],
    description: 'Analyze data to drive business insights. H-1B visa sponsorship available.',
  },
  {
    id: 6,
    title: 'Hospitality Manager',
    company: 'Emirates Resorts',
    location: 'UAE',
    country: 'UAE',
    flag: '🇦🇪',
    salary: 'AED 120,000 - 160,000',
    type: 'Full-time',
    category: 'Hospitality',
    visaSponsored: true,
    posted: '4d ago',
    requirements: ['Hospitality degree', '5+ years management', 'Multi-lingual'],
    description: 'Lead our luxury resort operations. Employment visa and benefits included.',
  },
  {
    id: 7,
    title: 'Civil Engineer',
    company: 'BuildPro Construction',
    location: 'Canada',
    country: 'Canada',
    flag: '🇨🇦',
    salary: 'CAD $70,000 - $90,000',
    type: 'Full-time',
    category: 'Engineering',
    visaSponsored: true,
    posted: '1d ago',
    requirements: ['Engineering degree', 'P.Eng license', '5+ years experience'],
    description: 'Design and oversee infrastructure projects. Express Entry support provided.',
  },
  {
    id: 8,
    title: 'Medical Doctor',
    company: 'Royal Hospital Group',
    location: 'United Kingdom',
    country: 'UK',
    flag: '🇬🇧',
    salary: '£45,000 - £75,000',
    type: 'Full-time',
    category: 'Healthcare',
    visaSponsored: true,
    posted: '2d ago',
    requirements: ['Medical degree', 'GMC registration', 'Specialist training'],
    description: 'Practice medicine in the NHS. Comprehensive visa sponsorship and training.',
  },
];

const scholarships = [
  {
    id: 1,
    name: 'Chevening Scholarship',
    organization: 'UK Government',
    location: 'United Kingdom',
    country: 'UK',
    flag: '🇬🇧',
    level: 'Master\'s',
    funding: 'Fully Funded',
    deadline: 'Nov 7, 2024',
    category: 'Government',
    fields: ['All fields'],
    description: 'Cover tuition, living expenses, flights, and visa. Leadership-focused program.',
    benefits: ['Full tuition', 'Monthly stipend', 'Flights', 'Visa fees'],
  },
  {
    id: 2,
    name: 'DAAD Scholarship',
    organization: 'German Academic Exchange',
    location: 'Germany',
    country: 'Germany',
    flag: '🇩🇪',
    level: 'Master\'s / PhD',
    funding: 'Fully Funded',
    deadline: 'Dec 1, 2024',
    category: 'Government',
    fields: ['Engineering', 'Sciences', 'Business'],
    description: 'Study at top German universities. Monthly allowance and full tuition coverage.',
    benefits: ['Full tuition', '€934/month', 'Health insurance', 'Travel grant'],
  },
  {
    id: 3,
    name: 'Vanier Canada Graduate',
    organization: 'Government of Canada',
    location: 'Canada',
    country: 'Canada',
    flag: '🇨🇦',
    level: 'PhD',
    funding: 'Fully Funded',
    deadline: 'Nov 3, 2024',
    category: 'Government',
    fields: ['Health', 'Social Sciences', 'Engineering'],
    description: 'Prestigious doctoral scholarship for top students. $50,000 per year for 3 years.',
    benefits: ['$50,000/year', '3 years', 'Research funding', 'Conference travel'],
  },
  {
    id: 4,
    name: 'Erasmus Mundus',
    organization: 'European Union',
    location: 'Europe (Multiple)',
    country: 'Europe',
    flag: '🇪🇺',
    level: 'Master\'s',
    funding: 'Fully Funded',
    deadline: 'Jan 15, 2025',
    category: 'Government',
    fields: ['Various programs'],
    description: 'Study in 2-3 European countries. Full scholarship covering all costs.',
    benefits: ['Full tuition', '€1,400/month', 'Travel costs', 'Insurance'],
  },
  {
    id: 5,
    name: 'Australia Awards',
    organization: 'Australian Government',
    location: 'Australia',
    country: 'Australia',
    flag: '🇦🇺',
    level: 'Master\'s',
    funding: 'Fully Funded',
    deadline: 'Apr 30, 2024',
    category: 'Government',
    fields: ['Development', 'Public Policy', 'Education'],
    description: 'Long-term development awards for future leaders. Full financial support.',
    benefits: ['Full tuition', 'Living allowance', 'Airfare', 'Visa support'],
  },
  {
    id: 6,
    name: 'Fulbright Program',
    organization: 'US Government',
    location: 'United States',
    country: 'USA',
    flag: '🇺🇸',
    level: 'Master\'s / PhD',
    funding: 'Fully Funded',
    deadline: 'May 31, 2024',
    category: 'Government',
    fields: ['All fields'],
    description: 'Study and research at US universities. Comprehensive funding package.',
    benefits: ['Full tuition', 'Monthly stipend', 'Health insurance', 'Book allowance'],
  },
  {
    id: 7,
    name: 'Commonwealth Scholarship',
    organization: 'UK Commonwealth',
    location: 'United Kingdom',
    country: 'UK',
    flag: '🇬🇧',
    level: 'Master\'s / PhD',
    funding: 'Fully Funded',
    deadline: 'Dec 14, 2024',
    category: 'Government',
    fields: ['Development', 'Science', 'Technology'],
    description: 'For students from low and middle income Commonwealth countries.',
    benefits: ['Full tuition', 'Airfare', 'Living allowance', 'Thesis grant'],
  },
  {
    id: 8,
    name: 'MEXT Scholarship',
    organization: 'Japanese Government',
    location: 'Japan',
    country: 'Japan',
    flag: '🇯🇵',
    level: 'Bachelor / Master / PhD',
    funding: 'Fully Funded',
    deadline: 'Apr 15, 2024',
    category: 'Government',
    fields: ['All fields'],
    description: 'Study at Japanese universities with full financial support.',
    benefits: ['Full tuition', '¥144,000/month', 'Airfare', 'Language training'],
  },
];

const jobCategories = ['All', 'Healthcare', 'Technology', 'Engineering', 'Skilled Trades', 'Hospitality'];
const countries = ['All', 'UK', 'Germany', 'Canada', 'Australia', 'USA', 'UAE', 'Japan'];
const scholarshipLevels = ['All', 'Bachelor\'s', 'Master\'s', 'PhD', 'Master\'s / PhD'];

export function OpportunitiesPage() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [savedItems, setSavedItems] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleSave = (id: number) => {
    setSavedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesCountry = selectedCountry === 'All' || job.country === selectedCountry;
    return matchesSearch && matchesCategory && matchesCountry;
  });

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || scholarship.level.includes(selectedLevel);
    const matchesCountry = selectedCountry === 'All' || scholarship.country === selectedCountry;
    return matchesSearch && matchesLevel && matchesCountry;
  });

  const FilterContent = () => (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-slate-600 mb-2 block">Country</label>
        <div className="flex flex-wrap gap-1.5">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                selectedCountry === country
                  ? 'bg-teal-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {country}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-slate-600 mb-2 block">Job Category</label>
        <div className="flex flex-wrap gap-1.5">
          {jobCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-slate-600 mb-2 block">Study Level</label>
        <div className="flex flex-wrap gap-1.5">
          {scholarshipLevels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                selectedLevel === level
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    // Fix Issue #1: Proper header offset pt-14 mobile, pt-16 desktop
    <div className="min-h-screen bg-white pt-14 md:pt-16">
      {/* Desktop Hero */}
      {/* Fix Issue #14: Standardized spacing py-20 */}
      {/* Fix Issue #3: Standardized max-w-6xl */}
      <section className="hidden md:block bg-gradient-to-br from-[#0A1628] via-[#0F2744] to-[#0A1628] text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
              <span>Updated Daily</span>
            </div>
            {/* Fix Issue #12: H2 for section titles */}
            <h2 className="text-white text-4xl md:text-5xl mb-6">
              Verified Opportunities Abroad
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mb-8">
              Browse visa-sponsored jobs and fully-funded scholarships. Every opportunity is verified and comes with step-by-step application guidance
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3">
                <Briefcase className="text-teal-400" size={20} />
                <div>
                  <div className="text-white text-sm">Jobs</div>
                  <div className="text-xs text-gray-400">Visa Sponsored</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3">
                <GraduationCap className="text-amber-400" size={20} />
                <div>
                  <div className="text-white text-sm">Scholarships</div>
                  <div className="text-xs text-gray-400">Fully Funded</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3">
                <Globe className="text-blue-400" size={20} />
                <div>
                  <div className="text-white text-sm">Multiple Countries</div>
                  <div className="text-xs text-gray-400">Worldwide Options</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Compact Header with Auth */}
      <div className="md:hidden sticky top-14 z-40 bg-white border-b border-slate-200">
        {/* Auth Bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 bg-teal-500 rounded-full" />
            <span className="text-xs text-slate-600">Updated daily</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs text-slate-700 hover:text-slate-900 px-2 py-1 flex items-center gap-1">
              <LogIn size={12} />
              Sign In
            </button>
            <button className="text-xs bg-teal-500 text-white hover:bg-teal-600 px-2.5 py-1 rounded-md flex items-center gap-1">
              <User size={12} />
              Sign Up
            </button>
          </div>
        </div>

        {/* Search and Tab Bar */}
        <div className="px-3 py-2">
          <div className="flex gap-2 mb-2">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-7 pr-2 h-8 border-slate-200 text-sm bg-slate-50"
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <button className="w-8 h-8 rounded-md border border-slate-200 flex items-center justify-center flex-shrink-0 hover:bg-slate-50">
                  <SlidersHorizontal size={14} className="text-slate-600" />
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[75vh]">
                <SheetHeader className="mb-4">
                  <SheetTitle className="text-base">Filters</SheetTitle>
                </SheetHeader>
                <div className="overflow-y-auto h-[calc(100%-100px)]">
                  <FilterContent />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t border-slate-200 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedCountry('All');
                      setSelectedLevel('All');
                    }}
                    className="flex-1 h-8 text-xs"
                  >
                    Clear
                  </Button>
                  <SheetClose asChild>
                    <Button size="sm" className="flex-1 bg-teal-500 hover:bg-teal-600 text-white h-8 text-xs">
                      Apply
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Compact Tabs */}
          <div className="flex gap-1 bg-slate-100 rounded-lg p-0.5">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-all text-xs ${
                activeTab === 'jobs'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600'
              }`}
            >
              <Briefcase size={12} />
              <span>Jobs</span>
              <span className="text-[10px] px-1 py-0.5 rounded bg-slate-200 text-slate-600">
                {filteredJobs.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('scholarships')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-all text-xs ${
                activeTab === 'scholarships'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600'
              }`}
            >
              <GraduationCap size={12} />
              <span>Scholarships</span>
              <span className="text-[10px] px-1 py-0.5 rounded bg-slate-200 text-slate-600">
                {filteredScholarships.length}
              </span>
            </button>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="overflow-x-auto scrollbar-hide px-3 pb-2">
          <div className="flex gap-1.5">
            {activeTab === 'jobs' ? (
              jobCategories.slice(0, 5).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 px-2 py-0.5 rounded text-[11px] transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))
            ) : (
              scholarshipLevels.slice(0, 4).map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`flex-shrink-0 px-2 py-0.5 rounded text-[11px] transition-colors ${
                    selectedLevel === level
                      ? 'bg-amber-500 text-white'
                      : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {level}
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Desktop Search and Filter */}
      <section className="hidden md:block sticky top-16 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <Input
                type="text"
                placeholder="Search opportunities, companies, countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 h-12 bg-slate-50 border-slate-200"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 gap-2 border-slate-200"
            >
              <Filter size={18} />
              Filters
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-900">Filter Opportunities</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedCountry('All');
                    setSelectedLevel('All');
                  }}
                  className="text-sm"
                >
                  Clear All
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <FilterContent />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-0 md:py-12">
        <div className="max-w-7xl mx-auto px-0 md:px-4 lg:px-8">
          {/* Desktop Tabs */}
          <Tabs defaultValue="jobs" className="w-full hidden md:block">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="jobs" className="gap-2">
                <Briefcase size={16} />
                Jobs ({filteredJobs.length})
              </TabsTrigger>
              <TabsTrigger value="scholarships" className="gap-2">
                <GraduationCap size={16} />
                Scholarships ({filteredScholarships.length})
              </TabsTrigger>
            </TabsList>

            {/* Desktop Jobs */}
            <TabsContent value="jobs">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                    <Search className="text-slate-400" size={24} />
                  </div>
                  <h3 className="text-slate-900 mb-2">No jobs found</h3>
                  <p className="text-slate-600 mb-4">Try adjusting your search or filters</p>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedCountry('All');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredJobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-lg transition-all border-slate-200 hover:border-teal-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-slate-900">{job.title}</h3>
                              <button onClick={() => toggleSave(job.id)} className="text-slate-400 hover:text-amber-500 transition-colors">
                                <Bookmark size={18} fill={savedItems.includes(job.id) ? 'currentColor' : 'none'} />
                              </button>
                            </div>
                            <p className="text-slate-600 text-sm">{job.company}</p>
                          </div>
                          {job.visaSponsored && (
                            <Badge className="bg-emerald-100 text-emerald-700 border-0">Visa Sponsored</Badge>
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
                        <p className="text-slate-600 text-sm mb-4">{job.description}</p>
                        <div className="mb-4">
                          <p className="text-xs text-slate-500 mb-2">Requirements:</p>
                          <div className="flex flex-wrap gap-2">
                            {job.requirements.map((req, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">{req}</Badge>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
                          View Details
                          <ArrowRight size={16} />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Desktop Scholarships */}
            <TabsContent value="scholarships">
              {filteredScholarships.length === 0 ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                    <Search className="text-slate-400" size={24} />
                  </div>
                  <h3 className="text-slate-900 mb-2">No scholarships found</h3>
                  <p className="text-slate-600 mb-4">Try adjusting your search or filters</p>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm('');
                    setSelectedLevel('All');
                    setSelectedCountry('All');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredScholarships.map((scholarship) => (
                    <Card key={scholarship.id} className="hover:shadow-lg transition-all border-amber-200 bg-gradient-to-br from-white to-amber-50/30 hover:border-amber-400">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-slate-900">{scholarship.name}</h3>
                              <button onClick={() => toggleSave(scholarship.id + 100)} className="text-slate-400 hover:text-amber-500 transition-colors">
                                <Bookmark size={18} fill={savedItems.includes(scholarship.id + 100) ? 'currentColor' : 'none'} />
                              </button>
                            </div>
                            <p className="text-slate-600 text-sm">{scholarship.organization}</p>
                          </div>
                          <Badge className="bg-amber-100 text-amber-700 border-0">{scholarship.funding}</Badge>
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
                        <p className="text-slate-600 text-sm mb-4">{scholarship.description}</p>
                        <div className="mb-4">
                          <p className="text-xs text-slate-500 mb-2">Benefits:</p>
                          <div className="flex flex-wrap gap-2">
                            {scholarship.benefits.map((benefit, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">{benefit}</Badge>
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
              )}
            </TabsContent>
          </Tabs>

          {/* Mobile Compact List */}
          <div className="md:hidden">
            {activeTab === 'jobs' && (
              <div className="divide-y divide-slate-100">
                {filteredJobs.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <div className="text-4xl mb-2">🔍</div>
                    <p className="text-sm text-slate-600 mb-3">No jobs found</p>
                    <Button size="sm" variant="outline" onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                      setSelectedCountry('All');
                    }} className="h-7 text-xs">
                      Clear filters
                    </Button>
                  </div>
                ) : (
                  filteredJobs.map((job) => (
                    <div key={job.id} className="px-3 py-3 hover:bg-slate-50 active:bg-slate-100 transition-colors">
                      <div className="flex items-start gap-2 mb-1.5">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <h3 className="text-sm text-slate-900 truncate">{job.title}</h3>
                            <span className="text-xs flex-shrink-0">{job.flag}</span>
                          </div>
                          <p className="text-xs text-slate-600">{job.company}</p>
                        </div>
                        <button
                          onClick={() => toggleSave(job.id)}
                          className="flex-shrink-0 text-slate-400 hover:text-amber-500"
                        >
                          <Bookmark size={14} fill={savedItems.includes(job.id) ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-emerald-50 text-emerald-700 border-0 text-[10px] px-1.5 py-0">
                          Visa
                        </Badge>
                        <span className="text-[11px] text-slate-500">{job.posted}</span>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-700">{job.location}</span>
                        <span className="text-xs text-emerald-700">{job.salary}</span>
                      </div>

                      <button className="w-full bg-blue-600 text-white rounded-md py-1.5 text-xs hover:bg-blue-700 active:bg-blue-800 transition-colors">
                        View Details
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'scholarships' && (
              <div className="divide-y divide-slate-100">
                {filteredScholarships.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <div className="text-4xl mb-2">🔍</div>
                    <p className="text-sm text-slate-600 mb-3">No scholarships found</p>
                    <Button size="sm" variant="outline" onClick={() => {
                      setSearchTerm('');
                      setSelectedLevel('All');
                      setSelectedCountry('All');
                    }} className="h-7 text-xs">
                      Clear filters
                    </Button>
                  </div>
                ) : (
                  filteredScholarships.map((scholarship) => (
                    <div key={scholarship.id} className="px-3 py-3 hover:bg-amber-50/30 active:bg-amber-50/50 transition-colors">
                      <div className="flex items-start gap-2 mb-1.5">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <h3 className="text-sm text-slate-900">{scholarship.name}</h3>
                            <span className="text-xs flex-shrink-0">{scholarship.flag}</span>
                          </div>
                          <p className="text-xs text-slate-600">{scholarship.organization}</p>
                        </div>
                        <button
                          onClick={() => toggleSave(scholarship.id + 100)}
                          className="flex-shrink-0 text-slate-400 hover:text-amber-500"
                        >
                          <Bookmark size={14} fill={savedItems.includes(scholarship.id + 100) ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-amber-50 text-amber-700 border-0 text-[10px] px-1.5 py-0">
                          {scholarship.funding}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-slate-200">
                          {scholarship.level}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-700">{scholarship.location}</span>
                        <span className="text-xs text-rose-600">Due {scholarship.deadline}</span>
                      </div>

                      <button className="w-full bg-amber-600 text-white rounded-md py-1.5 text-xs hover:bg-amber-700 active:bg-amber-800 transition-colors">
                        View Details
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 md:w-16 md:h-16 bg-teal-100 rounded-full mb-3 md:mb-6">
            <Plane className="text-teal-600" size={18} />
          </div>
          <h2 className="text-slate-900 mb-2 md:mb-4 text-lg md:text-2xl">
            Start Exploring Opportunities
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-xs md:text-base">
            Create an account to save opportunities and track your applications
          </p>
        </div>
      </section>
    </div>
  );
}