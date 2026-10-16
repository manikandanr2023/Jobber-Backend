import { Request, Response } from 'express';
import crypto from 'crypto';
import { StatusCodes } from 'http-status-codes';
import { UploadApiResponse } from 'cloudinary';

import { messageSchema } from '@chat/schemes/message';
import { addMessage, createConversation } from '@chat/services/message.service';

import {
  BadRequestError,
  IMessageDocument,
  uploads
} from '@manikandanr2023/jobber-shared';

const message = async (req: Request, res: Response): Promise<void> => {
  // Validate request body
  const { error } = messageSchema.validate(req.body);

  if (error) {
    throw new BadRequestError(
      error.details[0].message,
      'Create message() method'
    );
  }

  let file: string = req.body.file || '';

  // Generate random filename
  const randomBytes: Buffer = crypto.randomBytes(20);
  const randomCharacters: string = randomBytes.toString('hex');

  // Upload file if provided
  if (file) {
    let result: UploadApiResponse;

    if (req.body.fileType === 'zip') {
      result = await uploads(
        file,
        `${randomCharacters}.zip`
      ) as UploadApiResponse;
    } else {
      result = await uploads(file) as UploadApiResponse;
    }

    if (!result || !result.public_id) {
      throw new BadRequestError(
        'File upload error. Try again',
        'Create message() method'
      );
    }

    file = result.secure_url;
  }

  // Create message object
  const messageData: IMessageDocument = {
    conversationId: req.body.conversationId,
    body: req.body.body,
    file,
    fileType: req.body.fileType,
    fileSize: req.body.fileSize,
    fileName: req.body.fileName,
    gigId: req.body.gigId,
    buyerId: req.body.buyerId,
    sellerId: req.body.sellerId,
    senderUsername: req.body.senderUsername,
    senderPicture: req.body.senderPicture,
    receiverPicture: req.body.receiverPicture,
    receiverUsername: req.body.receiverUsername,
    isRead: req.body.isRead,
    hasOffer: req.body.hasOffer,
    offer: req.body.offer
  };

  // Create conversation if it doesn't already exist
  if (!req.body.hasConversationId) {
    await createConversation(
      `${messageData.conversationId}`,
      `${messageData.senderUsername}`,
      `${messageData.receiverUsername}`
    );
  }

  // Add message
  await addMessage(messageData);

  res.status(StatusCodes.OK).json({
    message: 'Message added',
    conversationId: req.body.conversationId,
    messageData
  });
};

export { message };
