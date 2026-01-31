const db = require('../config/database');

// Get all scholarships with filtering and pagination
exports.getScholarships = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      country,
      level,
      fundingType,
      category,
      search
    } = req.query;

    const offset = (page - 1) * limit;
    let conditions = ['is_active = true'];
    let params = [];
    let paramCount = 1;

    if (country && country !== 'All') {
      params.push(country);
      conditions.push(`country = $${paramCount++}`);
    }

    if (level && level !== 'All') {
      params.push(level);
      conditions.push(`level = $${paramCount++}`);
    }

    if (fundingType) {
      params.push(fundingType);
      conditions.push(`funding_type = $${paramCount++}`);
    }

    if (category) {
      params.push(category);
      conditions.push(`category = $${paramCount++}`);
    }

    if (search) {
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      conditions.push(`(
        name ILIKE $${paramCount++} OR 
        organization ILIKE $${paramCount++} OR 
        description ILIKE $${paramCount++}
      )`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get total count
    const countResult = await db.query(
      `SELECT COUNT(*) FROM scholarships ${whereClause}`,
      params
    );
    const totalScholarships = parseInt(countResult.rows[0].count);

    // Get scholarships
    params.push(limit, offset);
    const result = await db.query(
      `SELECT 
        id, name, organization, location, country, flag, level, funding_type,
        deadline, category, fields, description, benefits, eligibility,
        application_url, organization_logo, view_count, application_count
       FROM scholarships
       ${whereClause}
       ORDER BY deadline ASC
       LIMIT $${paramCount++} OFFSET $${paramCount++}`,
      params
    );

    res.json({
      success: true,
      data: {
        scholarships: result.rows.map(scholarship => ({
          id: scholarship.id,
          name: scholarship.name,
          organization: scholarship.organization,
          location: scholarship.location,
          country: scholarship.country,
          flag: scholarship.flag,
          level: scholarship.level,
          fundingType: scholarship.funding_type,
          deadline: scholarship.deadline,
          category: scholarship.category,
          fields: scholarship.fields,
          description: scholarship.description,
          benefits: scholarship.benefits,
          eligibility: scholarship.eligibility,
          applicationUrl: scholarship.application_url,
          organizationLogo: scholarship.organization_logo,
          viewCount: scholarship.view_count,
          applicationCount: scholarship.application_count
        })),
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalScholarships / limit),
          totalItems: totalScholarships,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get scholarships error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch scholarships'
    });
  }
};

// Get single scholarship by ID
exports.getScholarshipById = async (req, res) => {
  try {
    const { id } = req.params;

    // Increment view count
    await db.query(
      'UPDATE scholarships SET view_count = view_count + 1 WHERE id = $1',
      [id]
    );

    const result = await db.query(
      `SELECT 
        id, name, organization, location, country, flag, level, funding_type,
        deadline, category, fields, description, benefits, eligibility,
        application_url, organization_logo, view_count, application_count
       FROM scholarships
       WHERE id = $1 AND is_active = true`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Scholarship not found'
      });
    }

    const scholarship = result.rows[0];

    res.json({
      success: true,
      data: {
        id: scholarship.id,
        name: scholarship.name,
        organization: scholarship.organization,
        location: scholarship.location,
        country: scholarship.country,
        flag: scholarship.flag,
        level: scholarship.level,
        fundingType: scholarship.funding_type,
        deadline: scholarship.deadline,
        category: scholarship.category,
        fields: scholarship.fields,
        description: scholarship.description,
        benefits: scholarship.benefits,
        eligibility: scholarship.eligibility,
        applicationUrl: scholarship.application_url,
        organizationLogo: scholarship.organization_logo,
        viewCount: scholarship.view_count,
        applicationCount: scholarship.application_count
      }
    });
  } catch (error) {
    console.error('Get scholarship by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch scholarship'
    });
  }
};

// Get scholarship levels
exports.getLevels = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT DISTINCT level, COUNT(*) as count
       FROM scholarships
       WHERE is_active = true
       GROUP BY level
       ORDER BY count DESC`
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get levels error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch levels'
    });
  }
};

// Get scholarship countries
exports.getCountries = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT DISTINCT country, flag, COUNT(*) as count
       FROM scholarships
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

// Create new scholarship
exports.createScholarship = async (req, res) => {
  try {
    const {
      name, organization, location, country, flag, level, fundingType,
      deadline, category, fields, description, benefits, eligibility,
      applicationUrl, organizationLogo
    } = req.body;

    const result = await db.query(
      `INSERT INTO scholarships (
        name, organization, location, country, flag, level, funding_type,
        deadline, category, fields, description, benefits, eligibility,
        application_url, organization_logo, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *`,
      [
        name, organization, location, country, flag, level, fundingType,
        deadline, category, fields, description, benefits, eligibility,
        applicationUrl, organizationLogo, req.user?.id
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Scholarship created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Create scholarship error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create scholarship'
    });
  }
};

// Update scholarship
exports.updateScholarship = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    const setClause = Object.keys(updateFields)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    const values = [...Object.values(updateFields), id];

    const result = await db.query(
      `UPDATE scholarships 
       SET ${setClause}, updated_at = CURRENT_TIMESTAMP
       WHERE id = $${values.length}
       RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Scholarship not found'
      });
    }

    res.json({
      success: true,
      message: 'Scholarship updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update scholarship error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update scholarship'
    });
  }
};

// Delete scholarship (soft delete)
exports.deleteScholarship = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      'UPDATE scholarships SET is_active = false WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Scholarship not found'
      });
    }

    res.json({
      success: true,
      message: 'Scholarship deleted successfully'
    });
  } catch (error) {
    console.error('Delete scholarship error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete scholarship'
    });
  }
};
