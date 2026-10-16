import { ISellerGig, ISearchResult } from '@manikandanr2023/jobber-shared';
import { getGigById, getSellerGigs, getSellerPausedGigs } from '@gig/services/gig.service';
import {Request,Response} from 'express';
import { StatusCodes } from 'http-status-codes';
import { getUserSelectedGigCategory } from '@gig/redis/gig.cache';
import { getMoreGigsLikeThis, getTopRatedGigsByCategory, gigsSearchByCategory } from '@gig/services/search.service';



const gigById = async (req:Request,res:Response):Promise<void>=>{
  const gig:ISellerGig = await getGigById(req.params.gigId as string);
  res.status(StatusCodes.OK).json({message:'Get gig by id',gig});
}

const sellerGigs = async (req:Request,res:Response):Promise<void>=>{
  const gigs:ISellerGig[] = await getSellerGigs(req.params.sellerId as string);
  res.status(StatusCodes.OK).json({message:'Seller gigs',gigs});
}

const sellerInactiveGigs =async (req:Request,res:Response):Promise<void>=>{
  const gigs:ISellerGig[] = await getSellerPausedGigs(req.params.sellerId as string);
  res.status(StatusCodes.OK).json({message:'Seller gigs',gigs});
}

const topRatedGigsByCategory = async(req:Request,res:Response):Promise<void>=>{
  const category= await getUserSelectedGigCategory(`selectedCategories:${req.params.username}`);
  const resultHits:ISellerGig[] =[];
  const gigs:ISearchResult  = await getTopRatedGigsByCategory(`${category}`);
  for(const item of gigs.hits)
  {
    resultHits.push(item._source as ISellerGig);
  }
  res.status(StatusCodes.OK).json({message:'Search top gigs results',total:gigs.total,gigs:resultHits});
}

const gigsByCategory = async (req:Request,res:Response):Promise<void>=>{
  const category = await getUserSelectedGigCategory(`selectedCategories:${req.params.username}`);
  const resultHits:ISellerGig[] =[];
  const gigs:ISearchResult = await gigsSearchByCategory(`${category}`);
  for(const item of gigs.hits)
  {
    resultHits.push(item._source as ISellerGig);
  }
  res.status(StatusCodes.OK).json({message:'Search gigs category results',total:gigs.total,gigs:resultHits});
}
const moreLikeThis = async(req:Request,res:Response):Promise<void>=>{
  const resultHits:ISellerGig[] =[];
  const gigs:ISearchResult = await  getMoreGigsLikeThis(req.params.gigId as string);
  for(const item of gigs.hits)
  {
    resultHits.push(item._source as ISellerGig);
  }
  res.status(StatusCodes.OK).json({message:'More gigs like this result',total:gigs.total,gigs:resultHits})
}
export {gigById,sellerGigs,sellerInactiveGigs,topRatedGigsByCategory,gigsByCategory,moreLikeThis};
