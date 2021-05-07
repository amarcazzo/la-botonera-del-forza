import { NextApiRequest, NextApiResponse } from 'next';
import { add } from '../../../lib/asset';
import formidable, { Fields, File, Files } from 'formidable';

export const config = {
  api: {
    bodyParser: false
  }
};

const uploadToBucket = (file: File) => {
  return add(file.path, file.name!);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const form = new formidable.IncomingForm();
    return form.parse(
      req,
      async function (_err: any, _fields: Fields, files: Files) {
        const file = await uploadToBucket(files.file as File);
        return res.status(201).send(file);
      }
    );
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
