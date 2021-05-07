import { NextApiRequest, NextApiResponse } from 'next';
import { add } from '../../../lib/asset';
import formidable, { Fields, File, Files } from 'formidable';
import { readFileSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';

export const config = {
  api: {
    bodyParser: false
  }
};

const saveFile = (file: File) => {
  const buffer = readFileSync(file.path);
  const filePath = join(process.cwd(), 'public', 'tmp', file.name!);

  writeFileSync(filePath, buffer);
  return add(filePath, file.name!).then((file) => {
    unlinkSync(filePath);

    return file;
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const form = new formidable.IncomingForm();
    return form.parse(
      req,
      async function (_err: any, _fields: Fields, files: Files) {
        const file = await saveFile(files.file as File);
        return res.status(201).send(file);
      }
    );
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
