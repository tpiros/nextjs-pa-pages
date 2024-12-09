import cloudinary from '@/utils/cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { NextApiRequest, NextApiResponse } from 'next';

// Disable Next.js body parsing for this route to handle raw binary data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // Collect the raw binary data into a buffer
      const buffer = await new Promise<Buffer>((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', (err) => reject(err));
      });

      // using Cloudinary's upload_stream to upload (wrapped in a Promise)
      const result: UploadApiResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              tags: [process.env.CLOUDINARY_TAG],
            },
            (error, result) => {
              if (error || !result) {
                reject(error);
                return;
              }
              resolve(result);
            }
          )
          .end(buffer);
      });

      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
