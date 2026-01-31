const db = require('../config/database');

const createTables = async () => {
  try {
    console.log('🔄 Starting database migration...');

    // Users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        profile_picture VARCHAR(500),
        country VARCHAR(100),
        phone VARCHAR(50),
        bio TEXT,
        resume_url VARCHAR(500),
        linkedin_url VARCHAR(500),
        is_verified BOOLEAN DEFAULT false,
        verification_token VARCHAR(255),
        reset_token VARCHAR(255),
        reset_token_expiry TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Users table created');

    // Jobs table
    await db.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        country VARCHAR(100) NOT NULL,
        flag VARCHAR(10),
        salary VARCHAR(100),
        salary_min INTEGER,
        salary_max INTEGER,
        currency VARCHAR(10),
        job_type VARCHAR(50) DEFAULT 'Full-time',
        category VARCHAR(100) NOT NULL,
        visa_sponsored BOOLEAN DEFAULT false,
        description TEXT,
        requirements TEXT[],
        benefits TEXT[],
        application_url VARCHAR(500),
        company_logo VARCHAR(500),
        company_website VARCHAR(500),
        posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deadline_date TIMESTAMP,
        is_active BOOLEAN DEFAULT true,
        view_count INTEGER DEFAULT 0,
        application_count INTEGER DEFAULT 0,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Jobs table created');

    // Scholarships table
    await db.query(`
      CREATE TABLE IF NOT EXISTS scholarships (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        organization VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        country VARCHAR(100) NOT NULL,
        flag VARCHAR(10),
        level VARCHAR(50) NOT NULL,
        funding_type VARCHAR(50) NOT NULL,
        deadline DATE NOT NULL,
        category VARCHAR(100),
        fields TEXT[],
        description TEXT,
        benefits TEXT[],
        eligibility TEXT[],
        application_url VARCHAR(500),
        organization_logo VARCHAR(500),
        is_active BOOLEAN DEFAULT true,
        view_count INTEGER DEFAULT 0,
        application_count INTEGER DEFAULT 0,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Scholarships table created');

    // Visa Sponsors table
    await db.query(`
      CREATE TABLE IF NOT EXISTS visa_sponsors (
        id SERIAL PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL,
        country VARCHAR(100) NOT NULL,
        industry VARCHAR(100),
        visa_types TEXT[],
        active_positions INTEGER DEFAULT 0,
        company_size VARCHAR(50),
        website VARCHAR(500),
        description TEXT,
        logo_url VARCHAR(500),
        success_rate DECIMAL(5,2),
        is_verified BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Visa Sponsors table created');

    // Saved Items table (jobs & scholarships)
    await db.query(`
      CREATE TABLE IF NOT EXISTS saved_items (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        item_type VARCHAR(20) NOT NULL CHECK (item_type IN ('job', 'scholarship')),
        item_id INTEGER NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, item_type, item_id)
      );
    `);
    console.log('✅ Saved Items table created');

    // Applications table
    await db.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        item_type VARCHAR(20) NOT NULL CHECK (item_type IN ('job', 'scholarship')),
        item_id INTEGER NOT NULL,
        status VARCHAR(50) DEFAULT 'applied' CHECK (status IN ('applied', 'reviewing', 'interview', 'offer', 'accepted', 'rejected', 'withdrawn')),
        cover_letter TEXT,
        resume_url VARCHAR(500),
        application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        notes TEXT,
        follow_up_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Applications table created');

    // Newsletter Subscriptions table
    await db.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        is_active BOOLEAN DEFAULT true,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        unsubscribed_at TIMESTAMP,
        preferences JSONB DEFAULT '{}'::jsonb
      );
    `);
    console.log('✅ Newsletter Subscriptions table created');

    // News/Blog Posts table
    await db.query(`
      CREATE TABLE IF NOT EXISTS news_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        category VARCHAR(100),
        tags TEXT[],
        featured_image VARCHAR(500),
        author_id INTEGER REFERENCES users(id),
        is_published BOOLEAN DEFAULT false,
        published_at TIMESTAMP,
        view_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ News Posts table created');

    // Comments table (for community features)
    await db.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        post_id INTEGER REFERENCES news_posts(id) ON DELETE CASCADE,
        parent_comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        is_approved BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Comments table created');

    // Create indexes for better performance
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_jobs_country ON jobs(country);
      CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
      CREATE INDEX IF NOT EXISTS idx_jobs_visa_sponsored ON jobs(visa_sponsored);
      CREATE INDEX IF NOT EXISTS idx_scholarships_country ON scholarships(country);
      CREATE INDEX IF NOT EXISTS idx_scholarships_level ON scholarships(level);
      CREATE INDEX IF NOT EXISTS idx_saved_items_user ON saved_items(user_id);
      CREATE INDEX IF NOT EXISTS idx_applications_user ON applications(user_id);
      CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
    `);
    console.log('✅ Indexes created');

    console.log('✅ Database migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

createTables();
