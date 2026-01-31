import React from 'react';
import { Logo } from './Logo';
import { Card, CardContent } from './ui/card';
import { Copy, Check } from 'lucide-react';

const colors = [
  { name: 'Primary Blue', hex: '#1E40AF', rgb: 'rgb(30, 64, 175)', usage: 'Main brand color, CTAs, headers' },
  { name: 'Deep Blue', hex: '#0F172A', rgb: 'rgb(15, 23, 42)', usage: 'Dark backgrounds, text' },
  { name: 'Amber Gold', hex: '#F59E0B', rgb: 'rgb(245, 158, 11)', usage: 'Accent color, highlights, CTAs' },
  { name: 'Emerald', hex: '#10B981', rgb: 'rgb(16, 185, 129)', usage: 'Success states, verified badges' },
  { name: 'Teal', hex: '#14B8A6', rgb: 'rgb(20, 184, 166)', usage: 'Secondary accent, links' },
];

const typography = [
  { name: 'Headings', font: 'Space Grotesk', weight: '700', size: '2.5rem - 4rem', usage: 'Hero titles, section headers' },
  { name: 'Subheadings', font: 'Inter', weight: '600', size: '1.5rem - 2rem', usage: 'Card titles, subsections' },
  { name: 'Body Text', font: 'Inter', weight: '400', size: '1rem', usage: 'Paragraphs, descriptions' },
  { name: 'Small Text', font: 'Inter', weight: '400', size: '0.875rem', usage: 'Captions, labels' },
];

export function BrandKit() {
  const [copiedColor, setCopiedColor] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(name);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 rounded-full px-4 py-2 mb-4">
            <div className="w-2 h-2 bg-purple-600 rounded-full" />
            <span>Brand Identity</span>
          </div>
        </div>
      </div>
    </section>
  );
}