import { EaCRuntimeHandler } from '@fathym/eac/runtime';
import { establishOpenStarWebStateMiddleware } from '../../../src/eac/establishOpenStarWebStateMiddleware.ts';

export default [
  establishOpenStarWebStateMiddleware(),
] as EaCRuntimeHandler[];
