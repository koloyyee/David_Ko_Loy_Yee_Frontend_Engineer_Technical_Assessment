import {NextApiRequest, NextApiResponse} from 'next/types';
import {BookingInterface} from '../../../interfaces/booking.interface';

/**
 *
 * @param {NextApiRequest} req
 * @param { NextApiResponse<BookingInterface>} res
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<BookingInterface>){
    const body = req.body;
        await fetch(`${process.env.URL}/booking`,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'x-api-key': process.env.API_KEY!
            },
            body: JSON.stringify(body)
    
        });
    
    console.log('success');
    res.json(body);
    }