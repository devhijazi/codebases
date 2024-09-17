import { ErrorObject } from '@marinetesio/errors';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function custom(
  response: Response,
  status: StatusCodes,
  data?: any | undefined,
): void {
  if (data) {
    response.status(status).json(data);

    return;
  }

  response.status(status).end();
}

export function ok(response: Response, data?: any | undefined): void {
  if (data) {
    custom(response, StatusCodes.OK, data);

    return;
  }

  response.status(StatusCodes.OK).end();
}

export function created(response: Response, data?: any | undefined): void {
  if (data) {
    response.status(StatusCodes.CREATED).json(data);

    return;
  }

  response.status(StatusCodes.CREATED).end();
}

export function redirect(response: Response, url: string): void {
  response.status(StatusCodes.PERMANENT_REDIRECT).redirect(url);
}

export function clientError(
  response: Response,
  error?: ErrorObject | undefined,
): void {
  custom(response, StatusCodes.BAD_REQUEST, error);
}

export function unauthorized(
  response: Response,
  error?: ErrorObject | undefined,
): void {
  custom(response, StatusCodes.UNAUTHORIZED, error);
}

export function forbidden(
  response: Response,
  error?: ErrorObject | undefined,
): void {
  custom(response, StatusCodes.FORBIDDEN, error);
}

export function conflict(
  response: Response,
  error?: ErrorObject | undefined,
): void {
  custom(response, StatusCodes.CONFLICT, error);
}

export function tooMany(
  response: Response,
  error?: ErrorObject | undefined,
): void {
  custom(response, StatusCodes.TOO_MANY_REQUESTS, error);
}

export function fail(
  response: Response,
  error?: ErrorObject | undefined,
): void {
  custom(response, StatusCodes.INTERNAL_SERVER_ERROR, error);
}
