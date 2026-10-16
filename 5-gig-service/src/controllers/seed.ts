import { consumeSeedDirectMessage } from "@gig/queues/gig.consumer";
import { publishDirectMessage } from "@gig/queues/gig.producer";
import { gigChannel } from "@gig/server";
import {Request,Response} from 'express';
import { StatusCodes } from 'http-status-codes';


const gig = async(req:Request,res:Response):Promise<void>=>{
  const {count} = req.params ;
  await publishDirectMessage(
    gigChannel,
    'jobber-gig',
    'get-sellers',
    JSON.stringify({type:'getSellers',count}),
    'Gig seed message sent to user service'
  )
  await consumeSeedDirectMessage(gigChannel);
  res.status(StatusCodes.OK).json({message:'Gig created successfully'});
}

export {gig};
