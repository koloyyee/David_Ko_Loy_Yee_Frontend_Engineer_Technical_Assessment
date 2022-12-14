/* eslint-disable valid-jsdoc */
import {NextApiRequest, NextApiResponse} from 'next/types';

/**
 * handler - create a new booking.
 * @param {NextApiRequest} req - request from frontend
 * @param { NextApiResponse} res - response to frontend
 * @return
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {
  const body = req.body;
  if (!body) return;
  try {
    await fetch(`${process.env.URL}/booking`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-api-key': process.env.API_KEY!,
      },
      body: JSON.stringify(body),
    });
    return res.json(body);
  } catch (e) {
    console.error(e);
    return;
  }
}
