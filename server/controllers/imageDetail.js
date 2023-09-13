const imageModal = require('../model/imageDetail');

module.exports = {
  uploadImage: async (req, res) => {
    try {
      const { base64 } = req.body;
      const newImage = await imageModal.create({
        image: base64,
      });
      res.status(201).send({ message: 'Image add successfully' });
    } catch (err) {
      console.log(err);
    }
  },
  getAllImages: async (req, res) => {
    try {
      const images = await imageModal.find();
      res
        .status(200)
        .send({ images, success: true, message: 'Images fetch successfully' });
    } catch (err) {
      console.log(err, 'something went wrong while calling getAllImages Api');
    }
  },
};
