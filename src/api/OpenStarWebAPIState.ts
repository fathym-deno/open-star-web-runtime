import { OpenStarAPIJWTPayload } from './OpenStarAPIJWTPayload.ts';

export type OpenStarWebAPIState = {
  EaCJWT?: string;
} & OpenStarAPIJWTPayload;
