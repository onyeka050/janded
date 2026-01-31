import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Building2, GraduationCap, MapPin, ExternalLink, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'motion/react';

interface School {
  name: string;
  location: string;
  country: string;
  visaTypes: string[];
  programs: string[];
  acceptanceRate: string;
  tuition: string;
  ranking: string;
}

interface Company {
  name: string;
  industry: string;
  location: string;
  country: string;
  visaTypes: string[];
  roles: string[];
  employees: string;
  sponsorshipRate: string;
}

const allSchools: School[] = [
  // United States
  { name: 'Harvard University', location: 'Cambridge, MA', country: 'United States', visaTypes: ['F-1', 'J-1'], programs: ['Business', 'Engineering', 'Medicine', 'Law'], acceptanceRate: '3.4%', tuition: '$54,269/year', ranking: '#3 Global' },
  { name: 'Stanford University', location: 'Stanford, CA', country: 'United States', visaTypes: ['F-1', 'J-1'], programs: ['Computer Science', 'Engineering', 'Business', 'Medicine'], acceptanceRate: '3.7%', tuition: '$56,169/year', ranking: '#2 Global' },
  { name: 'MIT', location: 'Cambridge, MA', country: 'United States', visaTypes: ['F-1', 'J-1'], programs: ['Engineering', 'Computer Science', 'Physics', 'Economics'], acceptanceRate: '3.9%', tuition: '$55,510/year', ranking: '#1 Global' },
  { name: 'Columbia University', location: 'New York, NY', country: 'United States', visaTypes: ['F-1', 'J-1'], programs: ['Business', 'Engineering', 'Journalism', 'Law'], acceptanceRate: '3.7%', tuition: '$63,530/year', ranking: '#10 Global' },
  { name: 'UC Berkeley', location: 'Berkeley, CA', country: 'United States', visaTypes: ['F-1', 'J-1'], programs: ['Computer Science', 'Engineering', 'Business', 'Data Science'], acceptanceRate: '14.5%', tuition: '$43,176/year', ranking: '#4 Global' },
  { name: 'NYU', location: 'New York, NY', country: 'United States', visaTypes: ['F-1', 'J-1'], programs: ['Business', 'Arts', 'Film', 'Public Policy'], acceptanceRate: '12.8%', tuition: '$56,500/year', ranking: '#25 Global' },
  
  // United Kingdom
  { name: 'University of Oxford', location: 'Oxford', country: 'United Kingdom', visaTypes: ['Student Visa'], programs: ['Law', 'Medicine', 'PPE', 'Engineering'], acceptanceRate: '17.5%', tuition: '£26,770-£37,510/year', ranking: '#1 UK' },
  { name: 'University of Cambridge', location: 'Cambridge', country: 'United Kingdom', visaTypes: ['Student Visa'], programs: ['Natural Sciences', 'Engineering', 'Computer Science', 'Medicine'], acceptanceRate: '18.8%', tuition: '£22,227-£58,038/year', ranking: '#2 UK' },
  { name: 'Imperial College London', location: 'London', country: 'United Kingdom', visaTypes: ['Student Visa'], programs: ['Engineering', 'Medicine', 'Business', 'Data Science'], acceptanceRate: '14.3%', tuition: '£32,000-£45,300/year', ranking: '#6 Global' },
  { name: 'LSE', location: 'London', country: 'United Kingdom', visaTypes: ['Student Visa'], programs: ['Economics', 'Politics', 'Law', 'Finance'], acceptanceRate: '8.9%', tuition: '£23,330/year', ranking: '#3 UK' },
  { name: 'UCL', location: 'London', country: 'United Kingdom', visaTypes: ['Student Visa'], programs: ['Architecture', 'Engineering', 'Law', 'Medicine'], acceptanceRate: '11.0%', tuition: '£21,600-£34,100/year', ranking: '#4 UK' },
  
  // Canada
  { name: 'University of Toronto', location: 'Toronto, ON', country: 'Canada', visaTypes: ['Study Permit'], programs: ['Engineering', 'Computer Science', 'Business', 'Medicine'], acceptanceRate: '43%', tuition: 'CAD $58,160/year', ranking: '#1 Canada' },
  { name: 'McGill University', location: 'Montreal, QC', country: 'Canada', visaTypes: ['Study Permit'], programs: ['Medicine', 'Law', 'Engineering', 'Business'], acceptanceRate: '46%', tuition: 'CAD $20,000-$50,000/year', ranking: '#2 Canada' },
  { name: 'UBC', location: 'Vancouver, BC', country: 'Canada', visaTypes: ['Study Permit'], programs: ['Computer Science', 'Business', 'Engineering', 'Forestry'], acceptanceRate: '52%', tuition: 'CAD $40,000-$50,000/year', ranking: '#3 Canada' },
  { name: 'University of Waterloo', location: 'Waterloo, ON', country: 'Canada', visaTypes: ['Study Permit'], programs: ['Engineering', 'Computer Science', 'Math', 'Co-op Programs'], acceptanceRate: '53%', tuition: 'CAD $45,000-$60,000/year', ranking: '#4 Canada' },
  
  // Germany
  { name: 'TU Munich', location: 'Munich', country: 'Germany', visaTypes: ['Student Visa'], programs: ['Engineering', 'Computer Science', 'Physics', 'Management'], acceptanceRate: '8%', tuition: '€144.40/semester', ranking: '#1 Germany' },
  { name: 'LMU Munich', location: 'Munich', country: 'Germany', visaTypes: ['Student Visa'], programs: ['Medicine', 'Physics', 'Business', 'Law'], acceptanceRate: '15%', tuition: 'Free-€1,500/semester', ranking: '#2 Germany' },
  { name: 'Heidelberg University', location: 'Heidelberg', country: 'Germany', visaTypes: ['Student Visa'], programs: ['Medicine', 'Law', 'Biology', 'Physics'], acceptanceRate: '19%', tuition: '€171.75/semester', ranking: '#3 Germany' },
  
  // Australia
  { name: 'University of Melbourne', location: 'Melbourne, VIC', country: 'Australia', visaTypes: ['Student Visa'], programs: ['Law', 'Medicine', 'Engineering', 'Business'], acceptanceRate: '70-80%', tuition: 'AUD $32,000-$50,000/year', ranking: '#1 Australia' },
  { name: 'ANU', location: 'Canberra, ACT', country: 'Australia', visaTypes: ['Student Visa'], programs: ['Politics', 'International Relations', 'Science', 'Engineering'], acceptanceRate: '35%', tuition: 'AUD $40,000-$45,000/year', ranking: '#2 Australia' },
  { name: 'University of Sydney', location: 'Sydney, NSW', country: 'Australia', visaTypes: ['Student Visa'], programs: ['Medicine', 'Law', 'Business', 'Engineering'], acceptanceRate: '30%', tuition: 'AUD $42,000-$52,000/year', ranking: '#3 Australia' },
];

const allCompanies: Company[] = [
  // United States
  { name: 'Google', industry: 'Technology', location: 'Mountain View, CA', country: 'United States', visaTypes: ['H-1B', 'L-1', 'O-1'], roles: ['Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer'], employees: '182,000+', sponsorshipRate: '94%' },
  { name: 'Microsoft', industry: 'Technology', location: 'Redmond, WA', country: 'United States', visaTypes: ['H-1B', 'L-1', 'O-1'], roles: ['Software Engineer', 'Cloud Architect', 'AI Researcher', 'Program Manager'], employees: '221,000+', sponsorshipRate: '92%' },
  { name: 'Amazon', industry: 'Technology', location: 'Seattle, WA', country: 'United States', visaTypes: ['H-1B', 'L-1'], roles: ['Software Developer', 'Data Engineer', 'Solutions Architect', 'Operations Manager'], employees: '1.5M+', sponsorshipRate: '88%' },
  { name: 'Apple', industry: 'Technology', location: 'Cupertino, CA', country: 'United States', visaTypes: ['H-1B', 'L-1', 'O-1'], roles: ['Hardware Engineer', 'Software Engineer', 'Industrial Designer', 'ML Engineer'], employees: '164,000+', sponsorshipRate: '85%' },
  { name: 'Meta', industry: 'Technology', location: 'Menlo Park, CA', country: 'United States', visaTypes: ['H-1B', 'L-1', 'O-1'], roles: ['Software Engineer', 'Data Scientist', 'Product Designer', 'Research Scientist'], employees: '86,000+', sponsorshipRate: '91%' },
  { name: 'Goldman Sachs', industry: 'Finance', location: 'New York, NY', country: 'United States', visaTypes: ['H-1B', 'L-1'], roles: ['Financial Analyst', 'Quantitative Analyst', 'Software Engineer', 'Investment Banker'], employees: '49,000+', sponsorshipRate: '78%' },
  { name: 'JPMorgan Chase', industry: 'Finance', location: 'New York, NY', country: 'United States', visaTypes: ['H-1B', 'L-1'], roles: ['Software Engineer', 'Data Analyst', 'Risk Analyst', 'Business Analyst'], employees: '293,000+', sponsorshipRate: '76%' },
  { name: 'Deloitte', industry: 'Consulting', location: 'New York, NY', country: 'United States', visaTypes: ['H-1B', 'L-1'], roles: ['Consultant', 'Business Analyst', 'Data Scientist', 'Audit Associate'], employees: '457,000+', sponsorshipRate: '72%' },
  
  // United Kingdom
  { name: 'Barclays', industry: 'Finance', location: 'London', country: 'United Kingdom', visaTypes: ['Skilled Worker Visa'], roles: ['Software Engineer', 'Financial Analyst', 'Data Scientist', 'Cybersecurity Analyst'], employees: '85,000+', sponsorshipRate: '82%' },
  { name: 'HSBC', industry: 'Banking', location: 'London', country: 'United Kingdom', visaTypes: ['Skilled Worker Visa'], roles: ['Investment Banker', 'Risk Analyst', 'Compliance Officer', 'IT Specialist'], employees: '220,000+', sponsorshipRate: '79%' },
  { name: 'DeepMind', industry: 'AI Research', location: 'London', country: 'United Kingdom', visaTypes: ['Skilled Worker Visa', 'Global Talent'], roles: ['Research Scientist', 'ML Engineer', 'Software Engineer', 'Data Scientist'], employees: '1,000+', sponsorshipRate: '95%' },
  { name: 'BP', industry: 'Energy', location: 'London', country: 'United Kingdom', visaTypes: ['Skilled Worker Visa'], roles: ['Petroleum Engineer', 'Data Analyst', 'Project Manager', 'Environmental Scientist'], employees: '66,000+', sponsorshipRate: '68%' },
  { name: 'Revolut', industry: 'FinTech', location: 'London', country: 'United Kingdom', visaTypes: ['Skilled Worker Visa'], roles: ['Software Engineer', 'Product Manager', 'Data Analyst', 'Compliance Officer'], employees: '7,000+', sponsorshipRate: '86%' },
  
  // Canada
  { name: 'Shopify', industry: 'E-commerce', location: 'Ottawa, ON', country: 'Canada', visaTypes: ['Work Permit'], roles: ['Software Engineer', 'Product Manager', 'UX Designer', 'Data Scientist'], employees: '10,000+', sponsorshipRate: '89%' },
  { name: 'RBC', industry: 'Banking', location: 'Toronto, ON', country: 'Canada', visaTypes: ['Work Permit'], roles: ['Financial Analyst', 'Software Developer', 'Data Scientist', 'Risk Analyst'], employees: '92,000+', sponsorshipRate: '74%' },
  { name: 'TD Bank', industry: 'Banking', location: 'Toronto, ON', country: 'Canada', visaTypes: ['Work Permit'], roles: ['Business Analyst', 'Software Engineer', 'Financial Advisor', 'Data Engineer'], employees: '90,000+', sponsorshipRate: '71%' },
  { name: 'Bombardier', industry: 'Aerospace', location: 'Montreal, QC', country: 'Canada', visaTypes: ['Work Permit'], roles: ['Aerospace Engineer', 'Mechanical Engineer', 'Project Manager', 'Designer'], employees: '60,000+', sponsorshipRate: '65%' },
  
  // Germany
  { name: 'SAP', industry: 'Software', location: 'Walldorf', country: 'Germany', visaTypes: ['EU Blue Card', 'Work Visa'], roles: ['Software Developer', 'Cloud Architect', 'Consultant', 'Data Engineer'], employees: '107,000+', sponsorshipRate: '88%' },
  { name: 'Siemens', industry: 'Engineering', location: 'Munich', country: 'Germany', visaTypes: ['EU Blue Card', 'Work Visa'], roles: ['Electrical Engineer', 'Software Engineer', 'Project Manager', 'Research Scientist'], employees: '311,000+', sponsorshipRate: '83%' },
  { name: 'BMW', industry: 'Automotive', location: 'Munich', country: 'Germany', visaTypes: ['EU Blue Card', 'Work Visa'], roles: ['Mechanical Engineer', 'Software Developer', 'Designer', 'Production Manager'], employees: '150,000+', sponsorshipRate: '80%' },
  { name: 'Deutsche Bank', industry: 'Banking', location: 'Frankfurt', country: 'Germany', visaTypes: ['EU Blue Card', 'Work Visa'], roles: ['Investment Banker', 'Risk Analyst', 'Software Engineer', 'Compliance Officer'], employees: '84,000+', sponsorshipRate: '75%' },
  
  // Australia
  { name: 'Atlassian', industry: 'Software', location: 'Sydney, NSW', country: 'Australia', visaTypes: ['TSS Visa'], roles: ['Software Engineer', 'Product Manager', 'Designer', 'DevOps Engineer'], employees: '10,000+', sponsorshipRate: '92%' },
  { name: 'Canva', industry: 'Technology', location: 'Sydney, NSW', country: 'Australia', visaTypes: ['TSS Visa'], roles: ['Software Engineer', 'Product Designer', 'Marketing Manager', 'Data Analyst'], employees: '4,000+', sponsorshipRate: '90%' },
  { name: 'Commonwealth Bank', industry: 'Banking', location: 'Sydney, NSW', country: 'Australia', visaTypes: ['TSS Visa'], roles: ['Business Analyst', 'Software Developer', 'Cybersecurity Specialist', 'Data Scientist'], employees: '52,000+', sponsorshipRate: '77%' },
  { name: 'BHP', industry: 'Mining', location: 'Melbourne, VIC', country: 'Australia', visaTypes: ['TSS Visa'], roles: ['Mining Engineer', 'Geologist', 'Environmental Scientist', 'Project Manager'], employees: '80,000+', sponsorshipRate: '70%' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function VisaSponsorsDirectory() {
  const [activeTab, setActiveTab] = useState<'schools' | 'companies'>('schools');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');

  const countries = ['All Countries', 'United States', 'United Kingdom', 'Canada', 'Germany', 'Australia'];

  const filteredSchools = allSchools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         school.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'All Countries' || school.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  const filteredCompanies = allCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'All Countries' || company.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <section id="visa-sponsors" className="py-32 bg-[#F9FAFB] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-gray-900 mb-4 text-4xl md:text-5xl">
            Visa sponsors directory
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Verified schools and companies that sponsor international students and workers
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div 
          className="flex flex-col lg:flex-row gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Tab Toggle - Move to left */}
          <div className="flex rounded-lg border border-gray-200 bg-white p-1">
            <motion.button
              onClick={() => setActiveTab('schools')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded transition-all ${
                activeTab === 'schools'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <GraduationCap size={18} />
              <span>Schools</span>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('companies')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded transition-all ${
                activeTab === 'companies'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Building2 size={18} />
              <span>Companies</span>
            </motion.button>
          </div>

          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 border-gray-200 bg-white"
            />
          </div>

          {/* Country Filter */}
          <motion.select 
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-4 py-3 h-12 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-gray-900"
            whileFocus={{ scale: 1.02 }}
          >
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </motion.select>
        </motion.div>

        {/* List View */}
        <AnimatePresence mode="wait">
          {activeTab === 'schools' ? (
            <motion.div 
              key="schools"
              className="space-y-4"
              variants={container}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              {filteredSchools.map((school, index) => (
                <motion.div 
                  key={index}
                  variants={item}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-900 hover:shadow-lg transition-all cursor-pointer"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <motion.div 
                        className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0"
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: '#F0FDFA',
                          transition: { duration: 0.2 }
                        }}
                      >
                        <GraduationCap className="text-gray-900" size={22} />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 text-lg mb-1">{school.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <MapPin size={14} />
                          <span>{school.location}, {school.country}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {school.visaTypes.map((visa, i) => (
                            <Badge key={i} className="bg-gray-100 text-gray-700 border-0 text-xs font-normal">
                              {visa}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <ExternalLink size={18} />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}

              {filteredSchools.length === 0 && (
                <motion.div 
                  className="text-center py-16 bg-white rounded-xl border border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-gray-500">No schools found</p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="companies"
              className="space-y-4"
              variants={container}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              {filteredCompanies.map((company, index) => (
                <motion.div 
                  key={index}
                  variants={item}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-900 hover:shadow-lg transition-all cursor-pointer"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <motion.div 
                        className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0"
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: '#F0FDFA',
                          transition: { duration: 0.2 }
                        }}
                      >
                        <Building2 className="text-gray-900" size={22} />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 text-lg mb-1">{company.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <MapPin size={14} />
                          <span>{company.location}, {company.country}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {company.visaTypes.map((visa, i) => (
                            <Badge key={i} className="bg-gray-100 text-gray-700 border-0 text-xs font-normal">
                              {visa}
                            </Badge>
                          ))}
                          <Badge className="bg-gray-100 text-gray-700 border-0 text-xs font-normal">
                            {company.industry}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <ExternalLink size={18} />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}

              {filteredCompanies.length === 0 && (
                <motion.div 
                  className="text-center py-16 bg-white rounded-xl border border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-gray-500">No companies found</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div 
          className="mt-16 bg-gray-900 rounded-2xl p-12 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl mb-4">
            Want these sent to your inbox?
          </h3>
          <p className="text-gray-400 mb-8 text-lg">
            Get fresh opportunities delivered every morning
          </p>
          <motion.a 
            href="#newsletter"
            className="inline-block bg-teal-500 text-white px-8 py-4 rounded-lg hover:bg-teal-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}