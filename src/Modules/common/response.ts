import { Response } from 'express';
import { response_status_codes } from './response_status_codes';

export function successResponse(message: string, DATA: any, res: Response) {
  res.status(response_status_codes.success).json({
    STATUS: 'SUCCESS',
    MESSAGE: message,
    DATA,
  });
}

export function failureResponse(message: string, DATA: any, res: Response) {
  res.status(response_status_codes.success).json({
    STATUS: 'FAILURE',
    MESSAGE: message,
    DATA,
  });
}

export function noUserName(res: Response) {
  res.status(response_status_codes.bad_request).json({
    STATUS: 'FAILURE',
    MESSAGE: 'NO USER-NAME PROVIDED',
    DATA: {},
  });
}

export function mongoError(err: any, res: Response) {
  res.status(response_status_codes.internal_server_error).json({
    STATUS: 'FAILURE',
    MESSAGE: 'MongoDB error',
    DATA: err,
  });
}
