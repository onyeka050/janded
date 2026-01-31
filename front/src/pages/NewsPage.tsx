import React, { useState } from 'react';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Newspaper, Clock, ArrowRight, BookOpen, Globe, TrendingUp, FileText, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  country: string;
  date: string;
  readTime: string;
  image: string;
}

interface Guide {
  id: string;
  title: string;
  description: string;
  country: string;
  steps: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: React.ReactNode;
}

const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Canada Announces New Express Entry Draw with Lower CRS Cutoff',
    excerpt: 'Immigration, Refugees and Citizenship Canada (IRCC) has announced a new Express Entry draw with a CRS score of 486, inviting 4,750 candidates to apply for permanent residence.',
    category: 'Policy Update',
    country: 'Canada',
    date: 'Nov 20, 2025',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'UK Graduate Visa Extended to 3 Years for STEM Students',
    excerpt: 'The UK government has announced an extension of the Graduate visa route for international students in Science, Technology, Engineering, and Mathematics (STEM) fields from 2 to 3 years.',
    category: 'Visa Update',
    country: 'United Kingdom',
    date: 'Nov 18, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'H-1B Visa Cap for 2026 Reaches Record Applications',
    excerpt: 'USCIS reports receiving over 780,000 H-1B visa applications for the 2026 fiscal year, marking the highest number in history. The lottery selection process will begin next month.',
    category: 'Statistics',
    country: 'United States',
    date: 'Nov 15, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&h=400&fit=crop'
  },
  {
    id: '4',
    title: 'Germany Introduces New Opportunity Card for Job Seekers',
    excerpt: 'Germany\'s new Opportunity Card (Chancenkarte) allows skilled workers from non-EU countries to enter Germany for up to one year to search for employment without a job offer.',
    category: 'New Program',
    country: 'Germany',
    date: 'Nov 12, 2025',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=400&fit=crop'
  },
  {
    id: '5',
    title: 'Australia Increases Skilled Migration Cap by 35,000',
    excerpt: 'The Australian government has announced an increase in the skilled migration program cap to 195,000 places for 2025-26, responding to labor shortages in key industries.',
    category: 'Policy Update',
    country: 'Australia',
    date: 'Nov 10, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=400&fit=crop'
  },
  {
    id: '6',
    title: 'New Zealand Resumes Parent Category Visa Applications',
    excerpt: 'Immigration New Zealand has reopened the Parent Category visa applications after a three-year pause, allowing up to 2,500 applications per year.',
    category: 'Visa Update',
    country: 'New Zealand',
    date: 'Nov 8, 2025',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop'
  },
];

const migrationGuides: Guide[] = [
  {
    id: '1',
    title: 'Complete Guide to Canadian Express Entry',
    description: 'Step-by-step instructions on how to apply for Canadian permanent residence through Express Entry, including CRS score improvement tips.',
    country: 'Canada',
    steps: 12,
    difficulty: 'Intermediate',
    icon: <FileText size={24} className="text-blue-600" />
  },
  {
    id: '2',
    title: 'H-1B Visa Application Process Explained',
    description: 'Everything you need to know about applying for an H-1B work visa in the United States, from lottery registration to approval.',
    country: 'United States',
    steps: 8,
    difficulty: 'Advanced',
    icon: <BookOpen size={24} className="text-blue-600" />
  },
  {
    id: '3',
    title: 'UK Student Visa to Work Visa Pathway',
    description: 'Learn how to transition from a UK Student visa to a Skilled Worker visa after graduation, including salary requirements and sponsorship.',
    country: 'United Kingdom',
    steps: 10,
    difficulty: 'Intermediate',
    icon: <TrendingUp size={24} className="text-blue-600" />
  },
  {
    id: '4',
    title: 'Germany Job Seeker Visa Guide',
    description: 'How to apply for Germany\'s Job Seeker visa (Chancenkarte) and successfully find employment in Germany within the visa period.',
    country: 'Germany',
    steps: 9,
    difficulty: 'Beginner',
    icon: <Globe size={24} className="text-blue-600" />
  },
  {
    id: '5',
    title: 'Australian Skilled Migration Points System',
    description: 'Understanding Australia\'s points-based immigration system and how to maximize your score for skilled migration.',
    country: 'Australia',
    steps: 11,
    difficulty: 'Intermediate',
    icon: <FileText size={24} className="text-blue-600" />
  },
  {
    id: '6',
    title: 'Study Abroad Scholarship Application Tips',
    description: 'Proven strategies for securing fully-funded scholarships to study at top universities worldwide.',
    country: 'Global',
    steps: 7,
    difficulty: 'Beginner',
    icon: <BookOpen size={24} className="text-blue-600" />
  },
];

export function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Policy Update', 'Visa Update', 'Statistics', 'New Program'];

  const filteredNews = selectedCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-amber-500 text-slate-900 hover:bg-amber-500">
              <Newspaper size={14} className="mr-1" />
              Updated Daily
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              Migration News & Guides
            </h1>
            <p className="text-xl text-blue-100">
              Stay informed with the latest immigration policy updates, visa changes, and comprehensive migration guides from around the world.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="news" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="news" className="text-base">
              <Newspaper size={18} className="mr-2" />
              Latest News
            </TabsTrigger>
            <TabsTrigger value="guides" className="text-base">
              <BookOpen size={18} className="mr-2" />
              Migration Guides
            </TabsTrigger>
          </TabsList>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-blue-600' : ''}
                >
                  {category === 'all' ? 'All News' : category}
                </Button>
              ))}
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${article.image})` }}
                  />
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                        {article.category}
                      </Badge>
                      <Badge variant="outline">{article.country}</Badge>
                    </div>
                    <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{article.readTime}</span>
                      </div>
                      <span>{article.date}</span>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-blue-600">
                      Read Full Article
                      <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Guides Tab */}
          <TabsContent value="guides" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {migrationGuides.map((guide) => (
                <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        {guide.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{guide.country}</Badge>
                          <Badge 
                            variant="secondary" 
                            className={
                              guide.difficulty === 'Beginner' 
                                ? 'bg-green-50 text-green-700'
                                : guide.difficulty === 'Intermediate'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-red-50 text-red-700'
                            }
                          >
                            {guide.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">{guide.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">{guide.steps} Steps</span>
                      <Button variant="outline" size="sm">
                        Read Guide
                        <ExternalLink size={14} className="ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
