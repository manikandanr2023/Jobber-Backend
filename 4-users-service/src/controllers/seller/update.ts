import { sellerSchema } from "@users/schemes/seller";
import { BadRequestError, ISellerDocument } from '@manikandanr2023/jobber-shared';
import {Request,Response} from 'express';
import { StatusCodes } from "http-status-codes";
import { updateSeller} from '@users/services/seller.service';


const seller = async (req:Request,res:Response):Promise<void>=>{
  const {error} = await Promise.resolve(sellerSchema.validate(req.body));
  if(error?.details)
  {
    throw new BadRequestError(error.details[0].message,'Update seller() method error');
  }
  const seller:ISellerDocument={
    profilePublicId:req.body.profilePublicId,
    fullName:req.body.fullName,
    username:req.body.username,
    email:req.body.email,
    profilePicture:req.body.profilePicture,
    description:req.body.description,
    oneliner:req.body.oneliner,
    country:req.body.country,
    skills:req.body.skills,
    languages:req.body.languages,
    responseTime:req.body.responseTime,
    experience:req.body.experience,
    education:req.body.education,
    socialLinks:req.body.socialLinks,
    certificates:req.body.certificates
  };
  const updatedSeller:ISellerDocument = await updateSeller(req.params.sellerId as string,seller);
  res.status(StatusCodes.CREATED).json({message:'Seller created successfully.',seller:updatedSeller});
}

export {seller};
