import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { useRouter } from '../components/UseRouter';


export function Hero() {
  const { navigateTo } = useRouter();

  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center overflow-hidden pt-14 bg-[#0A1628]">
      <div className="absolute inset-0 opacity-10 pointer-events-none">

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(#2DD4BF 1px, transparent 1px), linear-gradient(90deg, #2DD4BF 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 text-center pointer-events-auto">

        <motion.p
          className="text-gray-400 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Your trusted guide for international opportunities
        </motion.p>

        <motion.h1
          className="text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="block text-4xl md:text-6xl mb-2">Find verified</span>
          <span className="block text-4xl md:text-6xl mb-2">
            <span className="text-teal-400">opportunities</span> to
          </span>
          <span className="block text-4xl md:text-6xl">work abroad</span>
        </motion.h1>

        <motion.p className="text-gray-300 max-w-2xl mx-auto mb-8">
          We help West Africans access real visa-sponsored jobs, scholarships,
          and migration pathways.
        </motion.p>
<Button onClick={() => navigateTo('signup')}>
  Join Now
</Button>



        <div className="flex justify-center gap-6 mt-8 text-gray-400 text-sm">
          {['No scams', 'Verified daily', 'Free access'].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle size={16} className="text-teal-400" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}