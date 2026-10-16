import { getConversation, getMessages, getUserConversationList, getUserMessages } from '@chat/services/message.service';
import { IConversationDocument, IMessageDocument } from '@manikandanr2023/jobber-shared';
import { StatusCodes } from 'http-status-codes';
import {Request,Response} from 'express';
const   conversation = async (req:Request,res:Response):Promise<void>=>{
  const {senderUsername,receiverUsername} = req.params;
  const conversations:IConversationDocument[] = await getConversation(senderUsername as string,receiverUsername as string);
  res.status(StatusCodes.OK).json({message:`Chat conversation`,conversations});
}

const message = async(req:Request,res:Response):Promise<void>=>{
  const {senderUsername,receiverUsername} = req.params;
  const messages:IMessageDocument[] = await getMessages(senderUsername as string,receiverUsername as string);
  res.status(StatusCodes.OK).json({message:'Chat messages',messages});
}

const conversationList = async(req:Request,res:Response):Promise<void>=>{
  const {username} = req.params;
  const messages:IMessageDocument[]  = await getUserConversationList(username as string);
  res.status(StatusCodes.OK).json({message:'Conversation list',conversations:messages});
}

const userMessage = async (req:Request,res:Response):Promise<void>=>{
  const {conversationId}=req.params;
  const messages:IMessageDocument[] = await getUserMessages(conversationId as string);
  res.status(StatusCodes.OK).json({message:'Chat messages',messages});
}

export {conversation,message,conversationList,userMessage};
