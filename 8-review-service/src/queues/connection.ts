import { winstonLogger } from '@manikandanr2023/jobber-shared';
import { config } from '@review/config';
import client, { Channel, RecoveringChannelModel } from 'amqplib';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'reviewQueueConnection', 'debug');
async function createConnection(): Promise<Channel | undefined> {
  try {
    const connection: RecoveringChannelModel = await client.connect(`${config.RABBITMQ_ENDPOINT}`);
    const channel: Channel = await connection.createChannel();
    log.info('Order server connected to queue successfully...');
    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    log.log('error', 'review Service error createConnection() method:', error);
  }
}
function closeConnection(channel: Channel, connection: RecoveringChannelModel): void {
  process.once('SIGINT', async () => {
    await channel.close();
    await connection.close();
  });
}
export { createConnection };
