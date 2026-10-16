import { config } from '@review/config';
import { winstonLogger } from '@manikandanr2023/jobber-shared';
import { Channel } from 'amqplib';
import { Logger } from 'winston';
import { createConnection } from '@review/queues/connection';


const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'reviewServiceProducer', 'debug');

export async function publishFanoutMessage(
  channel: Channel,
  exchangeName: string,

  message: string,
  logMessage: string
): Promise<void> {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    await channel.assertExchange(exchangeName, 'direct');
    channel.publish(exchangeName, '', Buffer.from(message));
    log.info(logMessage);
  } catch (error) {
    log.log('error', 'reviewService Provider publicDirectMessage() method error:', error);
  }
}
