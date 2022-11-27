/* eslint-disable require-jsdoc */
import {NextApiRequest, NextApiResponse} from 'next';


export default async function handler(
    req: NextApiRequest, res:NextApiResponse) {
  const body = req.body;
  if (!body) return;
  try {
    const data = await fetch(`${process.env.URL}/booking/${body.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'x-api-key': process.env.API_KEY!,
      },
      body: JSON.stringify({
        status: 'cancel',
      }),
    });


    return res.json(data.status);
  } catch (e) {
    console.error(e);
  }
}

