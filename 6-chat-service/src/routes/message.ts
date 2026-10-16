import { conversation, conversationList, message, userMessage } from "@chat/controllers/get";
import { markMultipleMessage, markSingleMessage, offer } from "@chat/controllers/update";
import express,{Router} from 'express';


const router:Router = express.Router();

const messageRoutes=():Router=>{
  router.get('/conversation/:senderUsername/:receiverUsername',conversation);
  router.get('/conversations/:username',conversationList);
  router.get('/:senderUsername/:receiverUsername',message);
  router.get('/:conversationId',userMessage);
  router.get('/',message);
  router.put('/offer',offer);
  router.put('/mark-as-read',markSingleMessage);
  router.put('/mark-multiple-as-read',markMultipleMessage);
  return router;

}
export {messageRoutes};

