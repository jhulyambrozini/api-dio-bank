import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';

export function verifyAuth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (authToken) {
    const [, token] = authToken.split(' ');

    try {
      verify(token, '1234567');
      return next();
    } catch (error) {
      return response.status(401).json({ message: 'Unauthorized' });
    }
  }

  return response.status(401).json({ message: 'Unauthorized' });
}
