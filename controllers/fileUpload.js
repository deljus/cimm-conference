import { keys } from 'lodash';

export default async (req, res) => {
  if (keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let fileUpload = req.files.fileUpload;

  console.log(req.files);

  try {
    await fileUpload.mv(`${__dirname}/../public/images/${fileUpload.name}`);
    res.status(200).send({ data: { link: `/images/${fileUpload.name}`, type: fileUpload.mimetype }});
  } catch (err) {
    return res.status(500).send(err);
  }
};
