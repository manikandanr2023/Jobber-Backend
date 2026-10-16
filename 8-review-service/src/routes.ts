import { verifyGatewayRequest } from '@manikandanr2023/jobber-shared';
import { Application } from 'express';
import { reviewRoutes } from './routes/review';
import { healthRoutes } from './routes/health';



const BASE_PATH= '/api/v1/gig';


const appRoutes = (app:Application):void=>{
  app.use('',healthRoutes());
  app.use(BASE_PATH,verifyGatewayRequest,reviewRoutes());

}
export {appRoutes};
