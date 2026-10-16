import { config } from '@notifications/config';
import { IEmailLocals, winstonLogger } from '@manikandanr2023/jobber-shared';
import { Logger } from 'winston';
import { emailTemplates } from '@notifications/helpers';
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'mailTransport', 'debug');

async function sendEmail(template: string, recieverEmail: string, locals: IEmailLocals): Promise<void> {
  try {
    emailTemplates(template, recieverEmail, locals);
    log.info('Email sent Successfully.');
  } catch (error) {
    log.log('error', 'NotificationService MailTransport sendEmail() method error:', error);
  }
}

export { sendEmail };
