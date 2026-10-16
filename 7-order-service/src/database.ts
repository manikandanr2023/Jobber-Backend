import {winstonLogger} from '@manikandanr2023/jobber-shared';
import {Logger} from 'winston';
import {config} from '@order/config';
import mongoose from 'mongoose';

const log:Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`,'OrderDatabaseServer','debug');
const databaseConnection = async():Promise<void>=>{
  try{
    await mongoose.connect(`${config.DATABASE_URL}`);
    log.info('Database connection established successfully');
  }catch(error){
    log.log('error',`OrderService databaseConnection() method error:`,error);
  }
}
export {databaseConnection};
