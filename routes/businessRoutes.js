const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const businessController = require("../controllers/buisnessController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Business
 *   description: Business management
 */

/**
 * @swagger
 * /api/business:
 *   post:
 *     summary: Create a new business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Business created successfully
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/business:
 *   get:
 *     summary: Get all businesses for the logged-in user
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of businesses
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router
  .route("/")
  .post(protect, businessController.createBusiness)
  .get(protect, businessController.getBusinesses);

module.exports = router;
