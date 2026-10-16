import { ISellerDocument } from '@manikandanr2023/jobber-shared';
import { getRandomSellers, getSellerById, getSellerByUsername } from '@users/services/seller.service';
import {Request,Response} from 'express';
import { StatusCodes } from 'http-status-codes';


const  id = async (req:Request,res:Response):Promise<void>=>{
  const seller:ISellerDocument | null = await getSellerById(req.params.sellerId as string);
  res.status(StatusCodes.OK).json({message:'Seller profile',seller});
}

const username = async (req:Request,res:Response):Promise<void>=>{
  const seller:ISellerDocument|null = await getSellerByUsername(req.params.username as string);
  res.status(StatusCodes.OK).json({message:'Seller profile',seller});
}

const random = async(req:Request,res:Response):Promise<void>=>{
  const sellers:ISellerDocument[]   = await getRandomSellers(parseInt(req.params.size as string,10));
    res.status(StatusCodes.OK).json({message:'Random sellers profile',sellers});
}

export {id,username,random};
