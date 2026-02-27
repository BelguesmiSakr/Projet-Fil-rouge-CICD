const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact");

router.route("/add").post(contactController.add_contact);
router.route("/:id").get(contactController.getAllUserContasts);
router.route("/:id").delete(contactController.deleteContact);
router.put("/:id", contactController.updateContact);
router.patch("/:id", contactController.updateContactField);

module.exports = router;
