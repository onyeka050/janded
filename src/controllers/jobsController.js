const db = require('../config/database');

// Get all jobs with filtering and pagination
exports.getJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      country,
      category,
      visaSponsored,
      search,
      minSalary,
      maxSalary,
      jobType
    } = req.query;

    const offset = (page - 1) * limit;
    let conditions = ['is_active = true'];
    let params = [];
    let paramCount = 1;

    // Build dynamic query based on filters
    if (country && country !== 'All') {
      params.push(country);
      conditions.push(`country = $${paramCount++}`);
    }

    if (category && category !== 'All') {
      params.push(category);
      conditions.push(`category = $${paramCount++}`);
    }

    if (visaSponsored === 'true') {
      conditions.push('visa_sponsored = true');
    }

    if (jobType) {
      params.push(jobType);
      conditions.push(`job_type = $${paramCount++}`);
    }

    if (minSalary) {
      params.push(parseInt(minSalary));
      conditions.push(`salary_min >= $${paramCount++}`);
    }

    if (maxSalary) {
      params.push(parseInt(maxSalary));
      conditions.push(`salary_max <= $${paramCount++}`);
    }

    if (search) {
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      conditions.push(`(
        title ILIKE $${paramCount++} OR 
        company ILIKE $${paramCount++} OR 
        description ILIKE $${paramCount++}
      )`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get total count
    const countResult = await db.query(
      `SELECT COUNT(*) FROM jobs ${whereClause}`,
      params
    );
    const totalJobs = parseInt(countResult.rows[0].count);

    // Get jobs
    params.push(limit, offset);
    const result = await db.query(
      `SELECT 
        id, title, company, location, country, flag, salary, salary_min, salary_max,
        currency, job_type, category, visa_sponsored, description, requirements,
        benefits, application_url, company_logo, posted_date, deadline_date,
        view_count, application_count
       FROM jobs
       ${whereClause}
       ORDER BY posted_date DESC
       LIMIT $${paramCount++} OFFSET $${paramCount++}`,
      params
    );

    res.json({
      success: true,
      data: {
        jobs: result.rows.map(job => ({
          id: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          country: job.country,
          flag: job.flag,
          salary: job.salary,
          salaryMin: job.salary_min,
          salaryMax: job.salary_max,
          currency: job.currency,
          type: job.job_type,
          category: job.category,
          visaSponsored: job.visa_sponsored,
          description: job.description,
          requirements: job.requirements,
          benefits: job.benefits,
          applicationUrl: job.application_url,
          companyLogo: job.company_logo,
          posted: job.posted_date,
          deadline: job.deadline_date,
          viewCount: job.view_count,
          applicationCount: job.application_count
        })),
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalJobs / limit),
          totalItems: totalJobs,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs'
    });
  }
};

// Get single job by ID
exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    // Increment view count
    await db.query(
      'UPDATE jobs SET view_count = view_count + 1 WHERE id = $1',
      [id]
    );

    const result = await db.query(
      `SELECT 
        id, title, company, location, country, flag, salary, salary_min, salary_max,
        currency, job_type, category, visa_sponsored, description, requirements,
        benefits, application_url, company_logo, company_website, posted_date, 
        deadline_date, view_count, application_count
       FROM jobs
       WHERE id = $1 AND is_active = true`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    const job = result.rows[0];

    res.json({
      success: true,
      data: {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        country: job.country,
        flag: job.flag,
        salary: job.salary,
        salaryMin: job.salary_min,
        salaryMax: job.salary_max,
        currency: job.currency,
        type: job.job_type,
        category: job.category,
        visaSponsored: job.visa_sponsored,
        description: job.description,
        requirements: job.requirements,
        benefits: job.benefits,
        applicationUrl: job.application_url,
        companyLogo: job.company_logo,
        companyWebsite: job.company_website,
        posted: job.posted_date,
        deadline: job.deadline_date,
        viewCount: job.view_count,
        applicationCount: job.application_count
      }
    });
  } catch (error) {
    console.error('Get job by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job'
    });
  }
};

// Get job categories
exports.getCategories = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT DISTINCT category, COUNT(*) as count
       FROM jobs
       WHERE is_active = true
       GROUP BY category
       ORDER BY count DESC`
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories'
    });
  }
};

// Get job countries
exports.getCountries = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT DISTINCT country, flag, COUNT(*) as count
       FROM jobs
       WHERE is_active = true
       GROUP BY country, flag
       ORDER BY count DESC`
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get countries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch countries'
    });
  }
};

// Create new job (admin only - you can add admin middleware)
exports.createJob = async (req, res) => {
  try {
    const {
      title, company, location, country, flag, salary, salaryMin, salaryMax,
      currency, jobType, category, visaSponsored, description, requirements,
      benefits, applicationUrl, companyLogo, companyWebsite, deadlineDate
    } = req.body;

    const result = await db.query(
      `INSERT INTO jobs (
        title, company, location, country, flag, salary, salary_min, salary_max,
        currency, job_type, category, visa_sponsored, description, requirements,
        benefits, application_url, company_logo, company_website, deadline_date,
        created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      RETURNING *`,
      [
        title, company, location, country, flag, salary, salaryMin, salaryMax,
        currency, jobType, category, visaSponsored, description, requirements,
        benefits, applicationUrl, companyLogo, companyWebsite, deadlineDate,
        req.user?.id
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create job'
    });
  }
};

// Update job
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    // Build dynamic update query
    const setClause = Object.keys(updateFields)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    const values = [...Object.values(updateFields), id];

    const result = await db.query(
      `UPDATE jobs 
       SET ${setClause}, updated_at = CURRENT_TIMESTAMP
       WHERE id = $${values.length}
       RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.json({
      success: true,
      message: 'Job updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update job'
    });
  }
};

// Delete job (soft delete)
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      'UPDATE jobs SET is_active = false WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete job'
    });
  }
};
