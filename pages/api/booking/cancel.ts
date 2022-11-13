import {NextApiRequest, NextApiResponse} from 'next';
import {BookingInterface} from '../../../interfaces/booking.interface';


export default async function handler(req: NextApiRequest, res:NextApiResponse<BookingInterface>) {
    const body = req.body;
    if(!body) return;
    try {
        const data = await fetch(`${process.env.URL}/booking/${body.id}`,{
            method:'PATCH',
            headers:{
                'Content-type' : 'application/json',
                'x-api-key': process.env.API_KEY!
            },
            // body: JSON.stringify(body)
        });
        console.log(data);
        return res.json(body);
    }catch(e){
        console.error(e);
    }
    return;
}

