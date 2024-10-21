import { respond } from '@fathym/common';
import { loadEaCSvc } from '@fathym/eac/api';
import { EaCRuntimeHandlers } from '@fathym/eac/runtime';
import { OpenStarWebState } from '../../../src/state/OpenStarWebState.ts';
import { OpenStarEaC } from '../../../src/eac/OpenStarEaC.ts';

export const handler: EaCRuntimeHandlers<OpenStarWebState> = {
  async GET(_req, ctx) {
    const eacSvc = await loadEaCSvc(ctx.State.EaCJWT!);

    const eacConnections = await eacSvc.Connections<OpenStarEaC>(
      ctx.State.EaC!,
    );

    return respond(eacConnections);
  },

  async POST(req, ctx) {
    const eac: OpenStarEaC = await req.json();

    const eacSvc = await loadEaCSvc(ctx.State.EaCJWT!);

    const eacConnections = await eacSvc.Connections<OpenStarEaC>(
      eac || ctx.State.EaC!,
    );

    return respond(eacConnections);
  },
};
