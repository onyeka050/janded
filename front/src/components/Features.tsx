import React from 'react';
import { Briefcase, GraduationCap, FileText, Shield } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: <Briefcase size={28} />,
    title: 'Visa-Sponsored Jobs',
    description: 'Real job opportunities from verified companies that sponsor work visas'
  },
  {
    icon: <GraduationCap size={28} />,
    title: 'Scholarships',
    description: 'Funded programs and scholarships for African students worldwide'
  },
  {
    icon: <FileText size={28} />,
    title: 'Migration Guides',
    description: 'Step-by-step guides on visa applications and processes'
  },
  {
    icon: <Shield size={28} />,
    title: 'Verified Information',
    description: 'Every opportunity is checked and verified by our team'
  }
];

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

export function Features() {
  return (
    // Fix Issue #14: Standardized spacing py-20
    <section className="py-20 bg-slate-50">
      {/* Fix Issue #3: Standardized max-w-6xl */}
      {/* Fix Issue #15: Alternating backgrounds */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-gray-900 mb-4 text-4xl md:text-5xl">
            Everything you need
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Navigate the complex world of international migration with confidence
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="text-center group"
            >
              <motion.div 
                className="w-16 h-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mb-6 mx-auto text-gray-900"
                whileHover={{ 
                  scale: 1.1,
                  borderColor: '#14B8A6',
                  transition: { duration: 0.2 }
                }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-gray-900 mb-3 text-lg">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}