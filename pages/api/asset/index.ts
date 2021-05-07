import { NextApiRequest, NextApiResponse } from "next";
import { add } from "../../../lib/asset";
import formidable, { Fields, File, Files } from "formidable";
import fs from "fs";
import { join } from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveFile = async (file: File) => {
  const buffer = fs.readFileSync(file.path);
  const filePath = join(process.cwd(), "public", "tmp", file.name!);

  fs.writeFileSync(filePath, buffer);
  const newFile = await add(filePath, file.name!);
  fs.unlinkSync(filePath);

  return newFile;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const form = new formidable.IncomingForm();
    return form.parse(
      req,
      async function (_err: any, _fields: Fields, files: Files) {
        const publicFileUrl = await saveFile(files.file as File);
        return res.status(201).send(publicFileUrl);
      }
    );
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
