const db = require('../config/database');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Create sample jobs
    const jobsData = [
      {
        title: 'Registered Nurse',
        company: 'NHS Healthcare Trust',
        location: 'London, United Kingdom',
        country: 'United Kingdom',
        flag: '🇬🇧',
        salary: '£28,000 - £35,000',
        salary_min: 28000,
        salary_max: 35000,
        currency: 'GBP',
        job_type: 'Full-time',
        category: 'Healthcare',
        visa_sponsored: true,
        description: 'Join our team providing excellent patient care. Full visa sponsorship and relocation assistance available.',
        requirements: ['Nursing degree', 'NMC registration', 'English proficiency'],
        benefits: ['Visa sponsorship', 'Health insurance', 'Pension scheme', 'Relocation assistance']
      },
      {
        title: 'Software Engineer',
        company: 'TechStart GmbH',
        location: 'Berlin, Germany',
        country: 'Germany',
        flag: '🇩🇪',
        salary: '€55,000 - €75,000',
        salary_min: 55000,
        salary_max: 75000,
        currency: 'EUR',
        job_type: 'Full-time',
        category: 'Technology',
        visa_sponsored: true,
        description: 'Build innovative solutions with our growing tech team. EU Blue Card sponsorship provided.',
        requirements: ['Bachelor\'s in CS', '2+ years experience', 'JavaScript/Python'],
        benefits: ['EU Blue Card', 'Remote work', '30 days vacation', 'Learning budget']
      },
      {
        title: 'Care Worker',
        company: 'Maple Care Services',
        location: 'Toronto, Canada',
        country: 'Canada',
        flag: '🇨🇦',
        salary: 'CAD $40,000 - $50,000',
        salary_min: 40000,
        salary_max: 50000,
        currency: 'CAD',
        job_type: 'Full-time',
        category: 'Healthcare',
        visa_sponsored: true,
        description: 'Provide compassionate care to seniors. Work permit and PR pathway available.',
        requirements: ['High school diploma', 'Care experience', 'Clean background check'],
        benefits: ['Work permit', 'PR pathway', 'Health benefits', 'Training provided']
      }
    ];

    for (const job of jobsData) {
      await db.query(`
        INSERT INTO jobs (
          title, company, location, country, flag, salary, salary_min, salary_max, 
          currency, job_type, category, visa_sponsored, description, requirements, benefits
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      `, [
        job.title, job.company, job.location, job.country, job.flag, job.salary,
        job.salary_min, job.salary_max, job.currency, job.job_type, job.category,
        job.visa_sponsored, job.description, job.requirements, job.benefits
      ]);
    }
    console.log('✅ Sample jobs created');

    // Create sample scholarships
    const scholarshipsData = [
      {
        name: 'Chevening Scholarship',
        organization: 'UK Government',
        location: 'United Kingdom',
        country: 'United Kingdom',
        flag: '🇬🇧',
        level: 'Master\'s',
        funding_type: 'Fully Funded',
        deadline: '2025-11-07',
        category: 'Government',
        fields: ['All fields'],
        description: 'Cover tuition, living expenses, flights, and visa. Leadership-focused program.',
        benefits: ['Full tuition', 'Monthly stipend', 'Flights', 'Visa fees'],
        eligibility: ['Bachelor\'s degree', '2 years work experience', 'English proficiency', 'Leadership potential']
      },
      {
        name: 'DAAD Scholarship',
        organization: 'German Academic Exchange',
        location: 'Germany',
        country: 'Germany',
        flag: '🇩🇪',
        level: 'Master\'s / PhD',
        funding_type: 'Fully Funded',
        deadline: '2025-12-01',
        category: 'Government',
        fields: ['Engineering', 'Sciences', 'Business'],
        description: 'Study at top German universities. Monthly allowance and full tuition coverage.',
        benefits: ['Full tuition', '€934/month', 'Health insurance', 'Travel grant'],
        eligibility: ['Bachelor\'s degree', 'Good academic record', 'Research proposal']
      },
      {
        name: 'Vanier Canada Graduate',
        organization: 'Government of Canada',
        location: 'Canada',
        country: 'Canada',
        flag: '🇨🇦',
        level: 'PhD',
        funding_type: 'Fully Funded',
        deadline: '2025-11-03',
        category: 'Government',
        fields: ['Health', 'Social Sciences', 'Engineering'],
        description: 'Prestigious doctoral scholarship for top students. $50,000 per year for 3 years.',
        benefits: ['$50,000/year', '3 years', 'Research funding', 'Conference travel'],
        eligibility: ['Enrolled in PhD program', 'Canadian university', 'Outstanding academic achievement']
      }
    ];

    for (const scholarship of scholarshipsData) {
      await db.query(`
        INSERT INTO scholarships (
          name, organization, location, country, flag, level, funding_type, 
          deadline, category, fields, description, benefits, eligibility
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      `, [
        scholarship.name, scholarship.organization, scholarship.location, scholarship.country,
        scholarship.flag, scholarship.level, scholarship.funding_type, scholarship.deadline,
        scholarship.category, scholarship.fields, scholarship.description, 
        scholarship.benefits, scholarship.eligibility
      ]);
    }
    console.log('✅ Sample scholarships created');

    // Create sample visa sponsors
    const sponsorsData = [
      {
        company_name: 'NHS',
        country: 'United Kingdom',
        industry: 'Healthcare',
        visa_types: ['Skilled Worker Visa', 'Health and Care Worker Visa'],
        active_positions: 150,
        company_size: 'Large (1000+)',
        description: 'National Health Service - UK\'s largest employer of healthcare professionals',
        success_rate: 92.5,
        is_verified: true
      },
      {
        company_name: 'Google',
        country: 'United States',
        industry: 'Technology',
        visa_types: ['H-1B', 'O-1', 'L-1'],
        active_positions: 50,
        company_size: 'Large (1000+)',
        description: 'Leading technology company with global operations',
        success_rate: 88.0,
        is_verified: true
      },
      {
        company_name: 'Siemens',
        country: 'Germany',
        industry: 'Engineering',
        visa_types: ['EU Blue Card', 'Work Permit'],
        active_positions: 75,
        company_size: 'Large (1000+)',
        description: 'Global engineering and technology company',
        success_rate: 85.5,
        is_verified: true
      }
    ];

    for (const sponsor of sponsorsData) {
      await db.query(`
        INSERT INTO visa_sponsors (
          company_name, country, industry, visa_types, active_positions, 
          company_size, description, success_rate, is_verified
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        sponsor.company_name, sponsor.country, sponsor.industry, sponsor.visa_types,
        sponsor.active_positions, sponsor.company_size, sponsor.description,
        sponsor.success_rate, sponsor.is_verified
      ]);
    }
    console.log('✅ Sample visa sponsors created');

    // Create a test user (password: Test123!)
    const hashedPassword = await bcrypt.hash('Test123!', 10);
    await db.query(`
      INSERT INTO users (email, password, first_name, last_name, country, is_verified)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (email) DO NOTHING
    `, ['test@janded.com', hashedPassword, 'Test', 'User', 'Nigeria', true]);
    console.log('✅ Test user created (email: test@janded.com, password: Test123!)');

    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
