import JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAutherizedError } from './error-handler';
const tokens: string[] = [
  'auth',
  'seller',
  'gig',
  'search',
  'buyer',
  'message',
  'order',
  'review',
];

export function verifyGatewayRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.headers?.gatewaytoken) {
    throw new NotAutherizedError(
      'Invalid Request',
      'verifyGatewayRequest() method: Request not coming from api gateway'
    );
  }
  const token: string = req.headers?.gatewaytoken as string;

  if (!token) {
    throw new NotAutherizedError(
      'Invalid Request',
      'verifyGatewayRequest() method: Request not coming from api gateway'
    );
  }

  try {
    const payload: { id: string; iat: number } = JWT.verify(
      token,
      '1282722b942e08c8a6cb033aa6ce850e'
    ) as { id: string; iat: number };

    if (!tokens.includes(payload.id)) {
      throw new NotAutherizedError(
        'Invalid Request',
        'verifyGatewayRequest() method: Request not coming from api gateway'
      );
    }
  } catch (error) {
    throw new NotAutherizedError(
      'Invalid Request',
      'verifyGatewayRequest() method: Request not coming from api gateway'
    );
  }
  next();
}
