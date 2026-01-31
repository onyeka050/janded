import React from 'react';
import { Star, Quote } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

const testimonials = [
  {
    name: 'Chioma Okafor',
    location: 'Lagos',
    country: '🇳🇬',
    role: 'Now in Canada',
    image: 'https://images.unsplash.com/photo-1730099343718-83989120758d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGFmcmljYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYzNzQyMDYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    quote: 'I found my nursing job in Canada through JANDED. The visa sponsorship was real, and the process was clear.',
    rating: 5,
  },
  {
    name: 'Kwame Mensah',
    location: 'Accra',
    country: '🇬🇭',
    role: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1623715537851-8bc15aa8c145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MzY4ODk5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    quote: 'The daily newsletter keeps me updated on tech opportunities. I got a job offer in Germany within 3 months.',
    rating: 5,
  },
  {
    name: 'Fatima Bah',
    location: 'Banjul',
    country: '🇬🇲',
    role: 'Master\'s Student',
    image: 'https://images.unsplash.com/photo-1521656958087-ed26dfcf5a30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwc3VjY2Vzc3xlbnwxfHx8fDE3NjM2NjUwNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    quote: 'I secured a fully-funded scholarship to study in the UK thanks to JANDED\'s scholarship alerts.',
    rating: 5,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

export function Testimonials() {
  return (
    // Fix Issue #14: Standardized spacing py-20
    <section id="testimonials" className="py-20 bg-white scroll-mt-16">
      {/* Fix Issue #3: Standardized max-w-6xl */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-gray-900 mb-4 text-4xl md:text-5xl">
            Real people, real results
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-xl">
            Stories from West Africans who found opportunities abroad
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
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
              className="bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:border-teal-400 hover:shadow-lg transition-all"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-amber-400" size={16} fill="currentColor" />
                ))}
              </div>

              <p className="text-gray-700 mb-8 leading-relaxed">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-12 h-12 rounded-full overflow-hidden bg-gray-200"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div>
                  <div className="text-gray-900 flex items-center gap-2">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}