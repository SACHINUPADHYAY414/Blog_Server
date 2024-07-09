const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get order by ID
router.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM orders WHERE order_id = $1', [orderId]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/customerDetails', async (req, res) => {
    try {
    
      const customerId = req.user.id;
      const customer = await Customer.findById(customerId);
  
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
  
      res.json({
        customerId: customer.id,
        email: customer.email,
        mobile: customer.mobile,
      });
    } catch (error) {
      console.error('Error fetching customer details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = router;
