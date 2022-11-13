import {NextApiRequest, NextApiResponse} from 'next/types';
import {BookingInterface} from '../../../interfaces/booking.interface';

/**
 * @function handler - create a new booking.
 * @param {NextApiRequest} req
 * @param { NextApiResponse<BookingInterface>} res
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<BookingInterface>){
    const body = req.body;
    if(!body) return;
    try {

        await fetch(`${process.env.URL}/booking`,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'x-api-key': process.env.API_KEY!
            },
            body: JSON.stringify(body)
            });
            res.json(body);
        }catch(e){
            console.error(e);
            return;
        }

    }