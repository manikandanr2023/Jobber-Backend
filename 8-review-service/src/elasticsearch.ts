import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse} from '@elastic/elasticsearch/lib/api/types';
import { config } from '@review/config';
import { winstonLogger } from '@manikandanr2023/jobber-shared';
import { Logger } from 'winston';


const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'reviewElasticSearchServer', 'debug');

const elasticSearchClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`
});

const checkConnection = async(): Promise<void> =>{
  let isConnected = false;

  while (!isConnected) {
    try {
      const health: ClusterHealthResponse = await elasticSearchClient.cluster.health();
      log.info(`reviewService Elasticsearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error(`Connection to Elasticsearch failed.Retrying...`);
      log.log('error', 'reviewService checkConnection() method:', error);
    }
  }
}




export {checkConnection};
