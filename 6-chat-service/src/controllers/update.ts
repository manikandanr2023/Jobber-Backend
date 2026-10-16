import { markManyMessagesAsRead, markMessageAsRead, updateOffer } from "@chat/services/message.service";
import { IMessageDocument } from "@manikandanr2023/jobber-shared";
import { StatusCodes } from "http-status-codes";
import {Request,Response} from 'express';
const offer = async (req:Request,res:Response):Promise<void>=>{
  const {messageId,type}= req.body;
  const message:IMessageDocument= await updateOffer(messageId,type);
  res.status(StatusCodes.OK).json({message:'Message updated',singleMessage:message});
}

const markMultipleMessage = async(req:Request,res:Response):Promise<void>=>{
  const {messageId,senderUsername,receiverUsername} = req.body;
  await markManyMessagesAsRead(receiverUsername,senderUsername,messageId);
  res.status(StatusCodes.OK).json({message:'Messages marked as read'});
}

const  markSingleMessage= async(req:Request,res:Response):Promise<void>=>{
  const {messageId} = req.body;
  const message:IMessageDocument = await markMessageAsRead(messageId);
  res.status(StatusCodes.OK).json({message:'Message marked as read',singleMessage:message});

}

export {offer,markMultipleMessage,markSingleMessage};
