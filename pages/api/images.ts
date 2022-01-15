import type { NextApiRequest, NextApiResponse } from 'next'
import AbstractMicroService from '../../microservices/AbstractMicroService';

type Data = {
  id: number;
  url: string;
}

const baseUrl: string = 'http://localhost:4200';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
//${root}/${key}/${size}
  const response = await fetch(`${baseUrl}/images`)

  res.status(200).json(response)
}

export default handler;