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
router.route("/").post(protect, businessController.createBusiness);

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
router.route("/").get(protect, businessController.getBusinesses);

/**
 * @swagger
 * /api/business/{id}:
 *   get:
 *     summary: business_id
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The business ID
 *     responses:
 *       200:
 *         description: Business details
 *       404:
 *         description: Business not found
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.get("/:id", protect, businessController.getBusinessById);

/**
 * @swagger
 * /api/business/{id}:
 *   put:
 *     summary: Update a business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The business ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Business name (optional)"
 *               address:
 *                 type: string
 *                 description: "Business address (optional)"
 *     responses:
 *       200:
 *         description: Business updated successfully
 *       400:
 *         description: Bad request (Invalid JSON)
 *       404:
 *         description: Business not found
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */

router.put("/:id", protect, businessController.updateBusiness);

/**
 * @swagger
 * /api/business/{id}:
 *   delete:
 *     summary: Delete a business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The business ID
 *     responses:
 *       200:
 *         description: Business deleted successfully
 *       404:
 *         description: Business not found
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.delete("/:id", protect, businessController.deleteBusiness);

module.exports = router;
