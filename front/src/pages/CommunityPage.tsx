£import React from 'react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { MessageCircle, Users, Globe, Zap, Heart, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function CommunityPage() {
  const benefits = [
    {
      icon: <Users size={24} className="text-teal-600" />,
      title: 'Connect with Members',
      description: 'Join West Africans who are successfully navigating their migration journey'
    },
    {
      icon: <MessageCircle size={24} className="text-teal-600" />,
      title: 'Real-time Support',
      description: 'Get instant answers to your questions from experienced community members'
    },
    {
      icon: <Trophy size={24} className="text-teal-600" />,
      title: 'Success Stories',
      description: 'Learn from members who have successfully secured visas, jobs, and scholarships'
    },
    {
      icon: <Zap size={24} className="text-teal-600" />,
      title: 'Exclusive Resources',
      description: 'Access templates, guides, and tools shared exclusively in our Discord'
    },
    {
      icon: <Globe size={24} className="text-teal-600" />,
      title: 'Country-Specific Channels',
      description: 'Dedicated channels for USA, Canada, UK, Germany, Australia, and more'
    },
    {
      icon: <Heart size={24} className="text-teal-600" />,
      title: 'Mentorship Program',
      description: 'Get paired with mentors who have already made the move abroad'
    }
  ];

  const channels = [
    { name: '🇺🇸 usa-opportunities', description: 'H-1B, green cards, and US jobs' },
    { name: '🇨🇦 canada-immigration', description: 'Express Entry, PNP, and study permits' },
    { name: '🇬🇧 uk-visa-support', description: 'Skilled Worker, Student, and Graduate visas' },
    { name: '🇩🇪 germany-opportunities', description: 'Job Seeker visa and EU Blue Card' },
    { name: '🎓 scholarships', description: 'Fully-funded opportunities worldwide' },
    { name: '💼 job-listings', description: 'Daily verified job postings with sponsorship' },
    { name: '📝 resume-review', description: 'Get feedback on your CV and applications' },
    { name: '🎉 success-stories', description: 'Celebrate wins and inspire others' }
  ];

  const testimonials = [
    {
      name: 'Chioma A.',
      country: 'Nigeria → Canada',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      quote: 'The community helped me improve my Express Entry score. I got my ITA last month!',
      role: 'Software Engineer'
    },
    {
      name: 'Kwame O.',
      country: 'Ghana → UK',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      quote: 'Found my sponsor through a connection in the Discord. Now working in London as a Data Analyst.',
      role: 'Data Analyst'
    },
    {
      name: 'Amara N.',
      country: 'Nigeria → Germany',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      quote: 'Got a fully-funded scholarship to TU Munich thanks to the tips shared in the scholarships channel!',
      role: 'Masters Student'
    }
  ];

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="bg-teal-600 text-white py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <MessageCircle size={32} className="text-white" />
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join the JANDED Community on Discord
            </motion.h1>
            <motion.p 
              className="text-xl text-teal-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Connect with West Africans navigating their journey abroad. Get support, share experiences, and unlock opportunities together.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-lg px-8 py-6 h-auto"
                >
                  <MessageCircle className="mr-2" size={24} />
                  Join Discord Server
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6 h-auto backdrop-blur-sm"
                >
                  Preview Community
                </Button>
              </motion.div>
            </motion.div>

            <motion.p 
              className="text-sm text-teal-200 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Free forever · No credit card required · Join in 30 seconds
            </motion.p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl mb-4 text-gray-900">Why Join Our Discord Community?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              More than just a chat group—it's your support system for migrating abroad
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="border-2 hover:border-teal-300 hover:shadow-lg transition-all h-full">
                  <CardHeader>
                    <motion.div 
                      className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mb-4"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {benefit.icon}
                    </motion.div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    <CardDescription className="text-base">{benefit.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Channels Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl mb-4 text-gray-900">Popular Channels</h2>
            <p className="text-xl text-gray-600">
              Organized channels for every step of your journey
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {channels.map((channel, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer"
                whileHover={{ 
                  x: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <h3 className="text-lg text-gray-900 mb-2">#{channel.name}</h3>
                <p className="text-gray-600">{channel.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl mb-4 text-gray-900">Real People, Real Results</h2>
            <p className="text-xl text-gray-600">
              Here's how the community has helped members achieve their dreams
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="bg-gradient-to-br from-teal-50 to-emerald-50 border-0 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <motion.img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div>
                        <h3 className="text-lg text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {testimonial.country}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-gray-700 text-base italic">
                      "{testimonial.quote}"
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-4xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join West Africans who are making their dreams a reality
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-lg px-12 py-6 h-auto"
            >
              <MessageCircle className="mr-2" size={24} />
              Join Our Discord Community
            </Button>
          </motion.div>

          <motion.div 
            className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              { text: 'Free to join' },
              { text: 'No spam' },
              { text: 'Safe community' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <CheckCircle2 size={16} className="text-green-400" />
                {item.text}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
