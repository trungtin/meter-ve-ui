import { NextApiRequest, NextApiResponse } from 'next';
import { PairController } from '../../../lib/controllers/pair';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return PairController.getBaseAssets(req, res);
  } else {
  }
}
