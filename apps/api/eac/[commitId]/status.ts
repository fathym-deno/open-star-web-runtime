import { respond } from '@fathym/common';
import { loadEaCSvc } from '@fathym/eac/api';
import { EaCRuntimeHandlers } from '@fathym/eac/runtime';
import { OpenStarWebState } from '../../../../src/state/OpenStarWebState.ts';

export const handler: EaCRuntimeHandlers<OpenStarWebState> = {
  async GET(_req, ctx) {
    const eacSvc = await loadEaCSvc(ctx.State.EaCJWT!);

    const commitId = ctx.Params.commitId!;

    const status = await eacSvc.Status(ctx.State.EaC!.EnterpriseLookup!, commitId);

    return respond(status);
  },
};
