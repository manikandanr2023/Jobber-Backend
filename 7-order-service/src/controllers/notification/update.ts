import { markNotificationAsRead } from '@order/services/notification.service';
import {IOrderNotifcation} from '@manikandanr2023/jobber-shared';
import { StatusCodes } from 'http-status-codes';
import {Request,Response} from 'express';



const markSingleNotificationAsRead = async (req:Request,res:Response):Promise<void>=>{
  const {notificationId} = req.body;
  const notification:IOrderNotifcation = await markNotificationAsRead(notificationId as string);
  res.status(StatusCodes.OK).json({message:'Notification updated successfully.',notification});
}

export {markSingleNotificationAsRead};
