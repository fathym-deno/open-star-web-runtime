import { redirectRequest, respond } from '@fathym/common';
import {
  EaCCommitResponse,
  EaCStatusProcessingTypes,
  loadEaCSvc,
  waitForStatusWithFreshJwt,
} from '@fathym/eac/api';
import { EaCRuntimeHandlers } from '@fathym/eac/runtime';
import { OpenStarEaC } from '../../../src/eac/OpenStarEaC.ts';
import { OpenStarWebState } from '../../../src/state/OpenStarWebState.ts';

export default {
  GET(_req, ctx) {
    return respond(ctx.State.EaC || {});
  },

  async POST(req, ctx) {
    const formData = await req.formData();

    const saveEaC: OpenStarEaC = {
      EnterpriseLookup: formData.get('entLookup') as string | undefined,
      Details: {
        Name: formData.get('name') as string,
        Description: formData.get('description') as string,
      },
    };

    const parentEaCSvc = await loadEaCSvc();

    let eacCall: Promise<EaCCommitResponse>;

    if (saveEaC.EnterpriseLookup) {
      const username = ctx.State.Username;

      const jwt = await parentEaCSvc.JWT(saveEaC.EnterpriseLookup, username);

      const eacSvc = await loadEaCSvc(jwt.Token);

      eacCall = eacSvc.Commit<OpenStarEaC>(saveEaC, 60);
    } else {
      eacCall = parentEaCSvc.Create<OpenStarEaC>(
        saveEaC,
        ctx.State.Username,
        60,
      );
    }

    const saveResp = await eacCall;

    const status = await waitForStatusWithFreshJwt(
      parentEaCSvc,
      saveResp.EnterpriseLookup,
      saveResp.CommitID,
      ctx.State.Username,
    );

    if (status.Processing == EaCStatusProcessingTypes.COMPLETE) {
      await ctx.State.OBiotechKV.set(
        ['User', ctx.State.Username, 'Current', 'EnterpriseLookup'],
        saveResp.EnterpriseLookup,
      );

      return redirectRequest('/dashboard', false, false);
    } else {
      return redirectRequest(
        `/dashboard?commitId=${saveResp.CommitID}`,
        false,
        false,
      );
    }
  },
} as EaCRuntimeHandlers<OpenStarWebState>;
