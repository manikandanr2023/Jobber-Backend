import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

dotenv.config({});
if(process.env.ENABLE_APM === '1')
{
  require('elastic-apm-node').start({
    serviceName: 'jobber-gig',
    serverUrl: process.env.ELASTIC_APM_SERVER_URL,
    secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
    environment: process.env.NODE_ENV,
    cloudProvider: 'none',
    active:true,
    captureBody: 'all',
    errorOnAbortedRequest: true,
    captureErrorLogStackTraces: 'always'
  })
}


class Config {
  public NODE_ENV: string | undefined;
  public RABBITMQ_ENDPOINT: string | undefined;
  public MYSQL_DB: string | undefined;
  public JWT_TOKEN: string | undefined;
  public CLOUD_NAME: string | undefined;
  public CLOUD_API_KEY: string | undefined;
  public CLOUD_API_SECRET: string | undefined;
  public GATEWAY_JWT_TOKEN: string | undefined;
  public API_GATEWAY_URL: string | undefined;
  public CLIENT_URL: string | undefined;
  public ELASTIC_SEARCH_URL: string | undefined;
  public DATABASE_URL: string | undefined;
  public REDIS_HOST:string|undefined;

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.RABBITMQ_ENDPOINT = process.env.RABBITMQ_ENDPOINT || '';
    this.MYSQL_DB = process.env.MYSQL_DB || '';
    this.JWT_TOKEN = process.env.JWT_TOKEN;
    this.CLOUD_NAME = process.env.CLOUD_NAME;
    this.CLOUD_API_KEY = process.env.CLOUD_API_KEY;
    this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
    this.GATEWAY_JWT_TOKEN = process.env.GATEWAY_JWT_TOKEN;
    this.API_GATEWAY_URL = process.env.API_GATEWAY_URL;
    this.ELASTIC_SEARCH_URL = process.env.ELASTIC_SEARCH_URL;
    this.DATABASE_URL =process.env.DATABASE_URL;
    this.REDIS_HOST = process.env.REDIS_HOST;
  }

  public cloudinaryConfig(): void {
    cloudinary.v2.config({
      cloud_name: this.CLOUD_NAME,
      api_key: this.CLOUD_API_KEY,
      api_secret: this.CLOUD_API_SECRET
    });
  }
}

export const config: Config = new Config();
