import { redirectRequest } from '@fathym/common';
import { EaCCloudAzureDetails } from '@fathym/eac';
import { EaCStatusProcessingTypes, loadEaCSvc, waitForStatus } from '@fathym/eac/api';
import { EaCRuntimeHandlers } from '@fathym/eac/runtime';
import { OpenStarEaC } from '../../../../src/eac/OpenStarEaC.ts';
import { OpenStarWebState } from '../../../../src/state/OpenStarWebState.ts';

export const handler: EaCRuntimeHandlers<OpenStarWebState> = {
  async POST(req, ctx) {
    const formData = await req.formData();

    const cloudLookup = (formData.get('cloudLookup') as string) || crypto.randomUUID();

    const eac: OpenStarEaC = {
      EnterpriseLookup: ctx.State.EaC!.EnterpriseLookup,
      Clouds: {
        [cloudLookup]: {
          Token: ctx.State.Cloud.AzureAccessToken,
          Details: {
            Name: formData.get('name') as string,
            Description: formData.get('description') as string,
            ApplicationID: formData.get('application-id') as string,
            AuthKey: formData.get('auth-key') as string,
            SubscriptionID: formData.get('subscription-id') as string,
            TenantID: formData.get('tenant-id') as string,
            Type: 'Azure',
          } as EaCCloudAzureDetails,
        },
      },
    };

    const eacSvc = await loadEaCSvc(ctx.State.EaCJWT!);

    const commitResp = await eacSvc.Commit(eac, 60);

    const status = await waitForStatus(
      eacSvc,
      commitResp.EnterpriseLookup,
      commitResp.CommitID,
    );

    if (status.Processing == EaCStatusProcessingTypes.COMPLETE) {
      return redirectRequest('/dashboard/getting-started/cloud', false, false);
    } else {
      return redirectRequest(
        `/dashboard/getting-started/cloud?commitId=${commitResp.CommitID}`,
        false,
        false,
      );
    }
  },
};
