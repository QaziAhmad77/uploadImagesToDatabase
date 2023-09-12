const imageModal = require('../model/imageDetail');

module.exports = {
  uploadImage: async (req, res) => {
    try {
      const { base64 } = req.body;
      const newImage = await imageModal.create({
        image:base64,
      });
      res.status(201).send({ message: 'Image add successfully' });
    } catch (err) {
      console.log(err);
    }
  },
};
