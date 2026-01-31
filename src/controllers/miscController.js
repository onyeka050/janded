const db = require('../config/database');

// Visa Sponsors Controller

exports.getVisaSponsors = async (req, res) => {
  try {
    const { country, industry, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let conditions = [];
    let params = [];
    let paramCount = 1;

    if (country && country !== 'All') {
      params.push(country);
      conditions.push(`country = $${paramCount++}`);
    }

    if (industry) {
      params.push(industry);
      conditions.push(`industry = $${paramCount++}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get total count
    const countResult = await db.query(
      `SELECT COUNT(*) FROM visa_sponsors ${whereClause}`,
      params
    );
    const totalSponsors = parseInt(countResult.rows[0].count);

    // Get sponsors
    params.push(limit, offset);
    const result = await db.query(
      `SELECT * FROM visa_sponsors
       ${whereClause}
       ORDER BY success_rate DESC, active_positions DESC
       LIMIT $${paramCount++} OFFSET $${paramCount++}`,
      params
    );

    res.json({
      success: true,
      data: {
        sponsors: result.rows.map(sponsor => ({
          id: sponsor.id,
          companyName: sponsor.company_name,
          country: sponsor.country,
          industry: sponsor.industry,
          visaTypes: sponsor.visa_types,
          activePositions: sponsor.active_positions,
          companySize: sponsor.company_size,
          website: sponsor.website,
          description: sponsor.description,
          logoUrl: sponsor.logo_url,
          successRate: sponsor.success_rate,
          isVerified: sponsor.is_verified
        })),
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalSponsors / limit),
          totalItems: totalSponsors,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get visa sponsors error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch visa sponsors'
    });
  }
};

exports.getVisaSponsorById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      'SELECT * FROM visa_sponsors WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Visa sponsor not found'
      });
    }

    const sponsor = result.rows[0];

    res.json({
      success: true,
      data: {
        id: sponsor.id,
        companyName: sponsor.company_name,
        country: sponsor.country,
        industry: sponsor.industry,
        visaTypes: sponsor.visa_types,
        activePositions: sponsor.active_positions,
        companySize: sponsor.company_size,
        website: sponsor.website,
        description: sponsor.description,
        logoUrl: sponsor.logo_url,
        successRate: sponsor.success_rate,
        isVerified: sponsor.is_verified
      }
    });
  } catch (error) {
    console.error('Get visa sponsor error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch visa sponsor'
    });
  }
};

// Newsletter Controller

exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email, preferences } = req.body;

    // Check if already subscribed
    const existing = await db.query(
      'SELECT id, is_active FROM newsletter_subscriptions WHERE email = $1',
      [email.toLowerCase()]
    );

    if (existing.rows.length > 0) {
      const sub = existing.rows[0];
      
      if (sub.is_active) {
        return res.status(400).json({
          success: false,
          message: 'Email is already subscribed to newsletter'
        });
      }

      // Reactivate subscription
      await db.query(
        `UPDATE newsletter_subscriptions 
         SET is_active = true, unsubscribed_at = NULL, preferences = $1
         WHERE id = $2`,
        [preferences || {}, sub.id]
      );

      return res.json({
        success: true,
        message: 'Newsletter subscription reactivated'
      });
    }

    // Create new subscription
    await db.query(
      'INSERT INTO newsletter_subscriptions (email, preferences) VALUES ($1, $2)',
      [email.toLowerCase(), preferences || {}]
    );

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter'
    });
  } catch (error) {
    console.error('Subscribe newsletter error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe to newsletter'
    });
  }
};

exports.unsubscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await db.query(
      `UPDATE newsletter_subscriptions 
       SET is_active = false, unsubscribed_at = CURRENT_TIMESTAMP
       WHERE email = $1 AND is_active = true
       RETURNING id`,
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Email not found or already unsubscribed'
      });
    }

    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    console.error('Unsubscribe newsletter error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe from newsletter'
    });
  }
};

exports.getNewsletterStats = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        COUNT(*) as total_subscribers,
        COUNT(*) FILTER (WHERE is_active = true) as active_subscribers,
        COUNT(*) FILTER (WHERE is_active = false) as unsubscribed
      FROM newsletter_subscriptions
    `);

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get newsletter stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch newsletter stats'
    });
  }
};
