import { NextApiRequest, NextApiResponse } from "next";
import { add } from "../../../lib/key";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body: key } = req;
    const newKey = await add(key);

    res.status(200).json(newKey);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
