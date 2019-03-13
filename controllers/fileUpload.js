import { keys } from 'lodash';

export default async (req, res) => {
  if (keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let uploadFile = req.files.uploadFile;

  try {
    await uploadFile.mv('../public/');
    res.send('File uploaded!');
  } catch (err) {
    return res.status(500).send(err);
  }
};
