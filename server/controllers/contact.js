const Contact = require("../models/contact");

module.exports = {
  add_contact: async (req, res) => {
    try {
      let contact = req.body;
      const savedContact = await Contact.create(contact);
      return res.status(201).json(savedContact);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getAllUserContasts: async (req, res) => {
    try {
      const user = req.params.id;
      const contact_list = await Contact.find({ user_id: user });
      return res.status(200).json(contact_list);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  deleteContact: async (req, res) => {
    try {
      const contactId = req.params.id;
      const deleted_contact = await Contact.deleteOne({ _id: contactId });
      return res.status(200).json(deleted_contact);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  updateContact: async (req, res) => {
    try {
      const contactId = req.params.id;
      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedContact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      return res.status(200).json(updatedContact);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  updateContactField: async (req, res) => {
    try {
      const contactId = req.params.id;
      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!updatedContact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      res.status(200).json(updatedContact);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
