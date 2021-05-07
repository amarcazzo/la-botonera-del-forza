import { Storage } from '@google-cloud/storage';
import config from '../config';

const storage = new Storage({
  projectId: config.BUCKET_PROJECT_ID,
  credentials: {
    client_email: config.BUCKET_EMAIL,
    private_key: config.BUCKET_PRIVATE_KEY
  }
});

const add = async (filePath: string, fileName: string) => {
  try {
    const bucket = await storage.bucket(config.BUCKET_NAME);
    const file = await bucket.upload(filePath, {
      destination: fileName
    });

    return file;
  } catch (err) {
    console.log(err);
  }
};

export { add };
