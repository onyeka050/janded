const db = require('../config/database');

// Save an item (job or scholarship)
exports.saveItem = async (req, res) => {
  try {
    const { itemType, itemId, notes } = req.body;

    // Validate item type
    if (!['job', 'scholarship'].includes(itemType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid item type. Must be "job" or "scholarship"'
      });
    }

    // Check if already saved
    const existing = await db.query(
      'SELECT id FROM saved_items WHERE user_id = $1 AND item_type = $2 AND item_id = $3',
      [req.user.id, itemType, itemId]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Item already saved'
      });
    }

    // Save the item
    const result = await db.query(
      'INSERT INTO saved_items (user_id, item_type, item_id, notes) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, itemType, itemId, notes]
    );

    res.status(201).json({
      success: true,
      message: 'Item saved successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Save item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save item'
    });
  }
};

// Get all saved items for user
exports.getSavedItems = async (req, res) => {
  try {
    const { itemType } = req.query;

    let query = `
      SELECT si.*, 
        CASE 
          WHEN si.item_type = 'job' THEN j.title
          WHEN si.item_type = 'scholarship' THEN s.name
        END as title,
        CASE 
          WHEN si.item_type = 'job' THEN j.company
          WHEN si.item_type = 'scholarship' THEN s.organization
        END as organization,
        CASE 
          WHEN si.item_type = 'job' THEN j.country
          WHEN si.item_type = 'scholarship' THEN s.country
        END as country
      FROM saved_items si
      LEFT JOIN jobs j ON si.item_type = 'job' AND si.item_id = j.id
      LEFT JOIN scholarships s ON si.item_type = 'scholarship' AND si.item_id = s.id
      WHERE si.user_id = $1
    `;

    const params = [req.user.id];

    if (itemType && ['job', 'scholarship'].includes(itemType)) {
      query += ' AND si.item_type = $2';
      params.push(itemType);
    }

    query += ' ORDER BY si.created_at DESC';

    const result = await db.query(query, params);

    res.json({
      success: true,
      data: result.rows.map(item => ({
        id: item.id,
        itemType: item.item_type,
        itemId: item.item_id,
        title: item.title,
        organization: item.organization,
        country: item.country,
        notes: item.notes,
        savedAt: item.created_at
      }))
    });
  } catch (error) {
    console.error('Get saved items error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch saved items'
    });
  }
};

// Remove saved item
exports.removeSavedItem = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      'DELETE FROM saved_items WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Saved item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item removed from saved list'
    });
  } catch (error) {
    console.error('Remove saved item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove saved item'
    });
  }
};

// Create application
exports.createApplication = async (req, res) => {
  try {
    const { itemType, itemId, coverLetter, resumeUrl, notes } = req.body;

    // Validate item type
    if (!['job', 'scholarship'].includes(itemType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid item type. Must be "job" or "scholarship"'
      });
    }

    // Check if already applied
    const existing = await db.query(
      'SELECT id FROM applications WHERE user_id = $1 AND item_type = $2 AND item_id = $3',
      [req.user.id, itemType, itemId]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied to this opportunity'
      });
    }

    // Create application
    const result = await db.query(
      `INSERT INTO applications 
       (user_id, item_type, item_id, cover_letter, resume_url, notes, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [req.user.id, itemType, itemId, coverLetter, resumeUrl, notes, 'applied']
    );

    // Increment application count
    const table = itemType === 'job' ? 'jobs' : 'scholarships';
    await db.query(
      `UPDATE ${table} SET application_count = application_count + 1 WHERE id = $1`,
      [itemId]
    );

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application'
    });
  }
};

// Get user applications
exports.getApplications = async (req, res) => {
  try {
    const { status, itemType } = req.query;

    let query = `
      SELECT a.*, 
        CASE 
          WHEN a.item_type = 'job' THEN j.title
          WHEN a.item_type = 'scholarship' THEN s.name
        END as title,
        CASE 
          WHEN a.item_type = 'job' THEN j.company
          WHEN a.item_type = 'scholarship' THEN s.organization
        END as organization,
        CASE 
          WHEN a.item_type = 'job' THEN j.country
          WHEN a.item_type = 'scholarship' THEN s.country
        END as country,
        CASE 
          WHEN a.item_type = 'job' THEN j.location
          WHEN a.item_type = 'scholarship' THEN s.location
        END as location
      FROM applications a
      LEFT JOIN jobs j ON a.item_type = 'job' AND a.item_id = j.id
      LEFT JOIN scholarships s ON a.item_type = 'scholarship' AND a.item_id = s.id
      WHERE a.user_id = $1
    `;

    const params = [req.user.id];
    let paramCount = 2;

    if (status) {
      query += ` AND a.status = $${paramCount++}`;
      params.push(status);
    }

    if (itemType && ['job', 'scholarship'].includes(itemType)) {
      query += ` AND a.item_type = $${paramCount++}`;
      params.push(itemType);
    }

    query += ' ORDER BY a.application_date DESC';

    const result = await db.query(query, params);

    res.json({
      success: true,
      data: result.rows.map(app => ({
        id: app.id,
        itemType: app.item_type,
        itemId: app.item_id,
        title: app.title,
        organization: app.organization,
        location: app.location,
        country: app.country,
        status: app.status,
        coverLetter: app.cover_letter,
        resumeUrl: app.resume_url,
        applicationDate: app.application_date,
        notes: app.notes,
        followUpDate: app.follow_up_date
      }))
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications'
    });
  }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, followUpDate } = req.body;

    const validStatuses = ['applied', 'reviewing', 'interview', 'offer', 'accepted', 'rejected', 'withdrawn'];
    
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const result = await db.query(
      `UPDATE applications 
       SET status = COALESCE($1, status), 
           notes = COALESCE($2, notes),
           follow_up_date = COALESCE($3, follow_up_date),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [status, notes, followUpDate, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      message: 'Application updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application'
    });
  }
};

// Delete application
exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      'DELETE FROM applications WHERE id = $1 AND user_id = $2 RETURNING item_type, item_id',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Decrement application count
    const { item_type, item_id } = result.rows[0];
    const table = item_type === 'job' ? 'jobs' : 'scholarships';
    await db.query(
      `UPDATE ${table} SET application_count = GREATEST(0, application_count - 1) WHERE id = $1`,
      [item_id]
    );

    res.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete application'
    });
  }
};
