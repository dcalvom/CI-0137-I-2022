exports.uploadFile = (req, res) => {
  const file = req.file;
  res.send({
    message: "Uploaded!",
    url: file.location,
    name: file.key,
    type: file.mimetype,
    size: file.size,
  });
};
