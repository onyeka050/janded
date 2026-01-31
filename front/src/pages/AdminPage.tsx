import { useState } from 'react';
import { Users, Briefcase, TrendingUp, AlertCircle, Search, MoreVertical, Check, X, Plus, Upload, Newspaper, Link as LinkIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';

const AVAILABLE_COUNTRIES = [
  'Canada',
  'United Kingdom',
  'United States',
  'Germany',
  'Australia',
  'Netherlands',
  'Sweden',
  'Norway',
];

const NEWS_CATEGORIES = [
  'Policy Update',
  'Visa Update',
  'Statistics',
  'Immigration News',
  'Education',
];

interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  country: string;
  type: 'job' | 'scholarship';
  category: string;
  isVisaSponsored: boolean;
  salary?: string;
  deadline: string;
  description: string;
  link: string;
  postedDate: string;
}

interface NewsArticle {
  id: string;
  title: string;
  category: string;
  country: string;
  description: string;
  readTime: string;
  date: string;
  imageUrl: string;
  link: string;
}

const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'TechCorp',
    location: 'Berlin',
    country: 'Germany',
    type: 'job',
    category: 'Technology',
    isVisaSponsored: true,
    salary: '$80,000 - $120,000',
    deadline: '2026-02-15',
    description: 'Full-stack developer role with visa sponsorship',
    link: 'https://example.com/job/senior-engineer',
    postedDate: '2026-01-15',
  },
  {
    id: '2',
    title: "Master's Scholarship",
    company: 'University of Toronto',
    location: 'Toronto',
    country: 'Canada',
    type: 'scholarship',
    category: 'Education',
    isVisaSponsored: false,
    deadline: '2026-03-01',
    description: 'Fully funded master\'s program in Computer Science',
    link: 'https://example.com/scholarship/masters',
    postedDate: '2026-01-14',
  },
];

const mockNews: NewsArticle[] = [];

export function AdminPage() {
  const [opportunities, setOpportunities] = useState(mockOpportunities);
  const [newsArticles, setNewsArticles] = useState(mockNews);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddNews, setShowAddNews] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    country: '',
    type: 'job' as 'job' | 'scholarship',
    category: '',
    isVisaSponsored: false,
    salary: '',
    deadline: '',
    description: '',
    link: '',
  });
  const [newsData, setNewsData] = useState({
    title: '',
    category: '',
    country: '',
    description: '',
    readTime: '',
    date: '',
    imageUrl: '',
    link: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNewsInputChange = (field: string, value: string) => {
    setNewsData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOpportunity: Opportunity = {
      id: String(opportunities.length + 1),
      ...formData,
      postedDate: new Date().toISOString().split('T')[0],
    };
    setOpportunities((prev) => [newOpportunity, ...prev]);
    setFormData({
      title: '',
      company: '',
      location: '',
      country: '',
      type: 'job',
      category: '',
      isVisaSponsored: false,
      salary: '',
      deadline: '',
      description: '',
      link: '',
    });
    setShowAddForm(false);
  };

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newArticle: NewsArticle = {
      id: String(newsArticles.length + 1),
      ...newsData,
      imageUrl: imagePreview || 'https://via.placeholder.com/400x200',
    };
    setNewsArticles((prev) => [newArticle, ...prev]);
    setNewsData({
      title: '',
      category: '',
      country: '',
      description: '',
      readTime: '',
      date: '',
      imageUrl: '',
      link: '',
    });
    setSelectedImage(null);
    setImagePreview('');
    setShowAddNews(false);
  };

  const handleDelete = (id: string) => {
    setOpportunities((prev) => prev.filter((opp) => opp.id !== id));
  };

  const handleDeleteNews = (id: string) => {
    setNewsArticles((prev) => prev.filter((article) => article.id !== id));
  };

  return (
    <div className="bg-gray-50 w-full" style={{ paddingTop: '100px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-row items-start justify-between w-full">
          <div className="flex-1">
            <h1 className="text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Upload and manage opportunities on the platform</p>
          </div>
          <div className="flex flex-row gap-3 flex-shrink-0" style={{ display: 'flex' }}>
            <button
              onClick={() => setShowAddNews(!showAddNews)}
              style={{
                backgroundColor: '#f87171',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Newspaper className="h-4 w-4" />
              Add News
            </button>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              style={{
                backgroundColor: '#00d4aa',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Plus className="h-4 w-4" />
              Add Opportunity
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-900 text-base">Total Posted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-900">{opportunities.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-900 text-base">Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-900">
                {opportunities.filter((o) => o.type === 'job').length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-900 text-base">Scholarships</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-900">
                {opportunities.filter((o) => o.type === 'scholarship').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Opportunity Form */}
        {showAddForm && (
          <Card className="bg-white border-gray-200 mb-8">
            <CardHeader>
              <CardTitle className="text-gray-900">Add New Opportunity</CardTitle>
              <CardDescription className="text-gray-600">
                Fill in the details to post a new job or scholarship
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-900">
                      Job Title / Scholarship Name *
                    </Label>
                    <Input
                      id="title"
                      required
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="bg-white border-gray-200"
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-gray-900">
                      Company / Institution *
                    </Label>
                    <Input
                      id="company"
                      required
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="bg-white border-gray-200"
                      placeholder="e.g., TechCorp International"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-900">
                      City *
                    </Label>
                    <Input
                      id="location"
                      required
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="bg-white border-gray-200"
                      placeholder="e.g., Berlin"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-gray-900">
                      Country *
                    </Label>
                    <select
                      id="opp-country"
                      required
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full h-9 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm"
                    >
                      <option value="">Select country</option>
                      {AVAILABLE_COUNTRIES.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-gray-900">
                      Type *
                    </Label>
                    <select
                      id="opp-type"
                      required
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full h-9 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm"
                    >
                      <option value="job">Job</option>
                      <option value="scholarship">Scholarship</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-gray-900">
                      Category *
                    </Label>
                    <Input
                      id="category"
                      required
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="bg-white border-gray-200"
                      placeholder="e.g., Technology, Healthcare"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary" className="text-gray-900">
                      Salary Range (optional)
                    </Label>
                    <Input
                      id="salary"
                      value={formData.salary}
                      onChange={(e) => handleInputChange('salary', e.target.value)}
                      className="bg-white border-gray-200"
                      placeholder="e.g., $80,000 - $120,000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline" className="text-gray-900">
                      Application Deadline *
                    </Label>
                    <Input
                      id="deadline"
                      type="date"
                      required
                      value={formData.deadline}
                      onChange={(e) => handleInputChange('deadline', e.target.value)}
                      className="bg-white border-gray-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-900">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="bg-white border-gray-200 min-h-32"
                    placeholder="Provide a detailed description of the opportunity..."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="visaSponsored"
                    checked={formData.isVisaSponsored}
                    onCheckedChange={(checked) =>
                      handleInputChange('isVisaSponsored', checked as boolean)
                    }
                    className="border-gray-300"
                  />
                  <Label htmlFor="visaSponsored" className="text-gray-900 cursor-pointer">
                    Visa Sponsorship Available
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link" className="text-gray-900">
                    Link (optional)
                  </Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => handleInputChange('link', e.target.value)}
                    className="bg-white border-gray-200"
                    placeholder="e.g., https://example.com/job/senior-engineer"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="border-gray-200 text-gray-900 hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#00d4aa] text-white hover:bg-[#00d4aa]/90"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Publish Opportunity
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Add News Form */}
        {showAddNews && (
          <Card className="bg-white border-gray-200 mb-8">
            <CardHeader>
              <CardTitle className="text-gray-900">Add New News Article</CardTitle>
              <CardDescription className="text-gray-600">
                Fill in the details to post a new news article
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNewsSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-900">
                      Title *
                    </Label>
                    <Input
                      id="title"
                      required
                      value={newsData.title}
                      onChange={(e) => handleNewsInputChange('title', e.target.value)}
                      className="bg-white border-gray-200"
                      placeholder="e.g., New Visa Policy Update"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-gray-900">
                      Category *
                    </Label>
                    <select
                      id="category"
                      required
                      value={newsData.category}
                      onChange={(e) => handleNewsInputChange('category', e.target.value)}
                      className="w-full h-9 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm"
                    >
                      <option value="">Select category</option>
                      {NEWS_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-gray-900">
                      Country *
                    </Label>
                    <select
                      id="news-country"
                      required
                      value={newsData.country}
                      onChange={(e) => handleNewsInputChange('country', e.target.value)}
                      className="w-full h-9 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm"
                    >
                      <option value="">Select country</option>
                      {AVAILABLE_COUNTRIES.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-gray-900">
                      Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={newsData.date}
                      onChange={(e) => handleNewsInputChange('date', e.target.value)}
                      className="bg-white border-gray-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-900">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    required
                    value={newsData.description}
                    onChange={(e) => handleNewsInputChange('description', e.target.value)}
                    className="bg-white border-gray-200 min-h-32"
                    placeholder="Provide a detailed description of the news article..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="readTime" className="text-gray-900">
                    Read Time (optional)
                  </Label>
                  <Input
                    id="readTime"
                    value={newsData.readTime}
                    onChange={(e) => handleNewsInputChange('readTime', e.target.value)}
                    className="bg-white border-gray-200"
                    placeholder="e.g., 5 minutes"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link" className="text-gray-900">
                    Link (optional)
                  </Label>
                  <Input
                    id="link"
                    value={newsData.link}
                    onChange={(e) => handleNewsInputChange('link', e.target.value)}
                    className="bg-white border-gray-200"
                    placeholder="e.g., https://example.com/news/visa-update"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="text-gray-900">
                    Image (optional)
                  </Label>
                  <Input
                    id="imageUrl"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="bg-white border-gray-200"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-full h-auto"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddNews(false)}
                    className="border-gray-200 text-gray-900 hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#00d4aa] text-white hover:bg-[#00d4aa]/90"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Publish News Article
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Opportunities List */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Posted Opportunities</CardTitle>
            <CardDescription className="text-gray-600">
              Manage all opportunities you've posted
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-900">Title</TableHead>
                  <TableHead className="text-gray-900">Company</TableHead>
                  <TableHead className="text-gray-900">Location</TableHead>
                  <TableHead className="text-gray-900">Type</TableHead>
                  <TableHead className="text-gray-900">Deadline</TableHead>
                  <TableHead className="text-gray-900">Posted</TableHead>
                  <TableHead className="text-gray-900 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {opportunities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-600 py-8">
                      No opportunities posted yet. Click "Add Opportunity" to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  opportunities.map((opp) => (
                    <TableRow key={opp.id}>
                      <TableCell className="text-gray-900 max-w-xs">
                        <div>
                          {opp.title}
                          {opp.isVisaSponsored && (
                            <Badge className="ml-2 bg-[#00d4aa]/20 text-[#00d4aa] border-[#00d4aa]/30 text-xs">
                              Visa
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700">{opp.company}</TableCell>
                      <TableCell className="text-gray-700">
                        {opp.location}, {opp.country}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-300 text-gray-700">
                          {opp.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700">{opp.deadline}</TableCell>
                      <TableCell className="text-gray-700">{opp.postedDate}</TableCell>
                      <TableCell className="text-right relative">
                        <div className="relative inline-block">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const dropdown = e.currentTarget.nextElementSibling as HTMLElement;
                              if (dropdown) {
                                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                              }
                            }}
                            className="p-2 hover:bg-gray-100 rounded"
                          >
                            <MoreVertical className="h-4 w-4 text-gray-600" />
                          </button>
                          <div
                            className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[120px]"
                            style={{ display: 'none', zIndex: 9999 }}
                          >
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => console.log('Edit', opp.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              onClick={() => handleDelete(opp.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* News Articles List */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Posted News Articles</CardTitle>
            <CardDescription className="text-gray-600">
              Manage all news articles you've posted
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-900">Title</TableHead>
                  <TableHead className="text-gray-900">Category</TableHead>
                  <TableHead className="text-gray-900">Country</TableHead>
                  <TableHead className="text-gray-900">Date</TableHead>
                  <TableHead className="text-gray-900">Read Time</TableHead>
                  <TableHead className="text-gray-900">Posted</TableHead>
                  <TableHead className="text-gray-900 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newsArticles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-600 py-8">
                      No news articles posted yet. Click "Add News" to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  newsArticles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="text-gray-900 max-w-xs">
                        <div>
                          {article.title}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700">{article.category}</TableCell>
                      <TableCell className="text-gray-700">{article.country}</TableCell>
                      <TableCell className="text-gray-700">{article.date}</TableCell>
                      <TableCell className="text-gray-700">{article.readTime}</TableCell>
                      <TableCell className="text-gray-700">{new Date().toISOString().split('T')[0]}</TableCell>
                      <TableCell className="text-right relative">
                        <div className="relative inline-block">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const dropdown = e.currentTarget.nextElementSibling as HTMLElement;
                              if (dropdown) {
                                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                              }
                            }}
                            className="p-2 hover:bg-gray-100 rounded"
                          >
                            <MoreVertical className="h-4 w-4 text-gray-600" />
                          </button>
                          <div
                            className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[120px]"
                            style={{ display: 'none', zIndex: 9999 }}
                          >
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => console.log('Edit', article.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              onClick={() => handleDeleteNews(article.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}