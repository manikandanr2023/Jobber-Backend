import { verifyGatewayRequest } from '@manikandanr2023/jobber-shared';
import { Application } from 'express';
import { healthRoutes } from './routes/health';
import { messageRoutes } from './routes/message';



const BASE_PATH= '/api/v1/message';


const appRoutes = (app:Application):void=>{
app.use('',healthRoutes());
app.use(BASE_PATH,verifyGatewayRequest,messageRoutes());
}
export {appRoutes};
