import { UserEaCLicense, UserEaCRecord } from '@fathym/eac/api';
import { SetupPhaseTypes } from './SetupPhaseTypes.ts';
import { OpenStarEaC } from '../eac/OpenStarEaC.ts';
import { CloudPhaseTypes } from './CloudPhaseTypes.ts';
import { DevicesPhaseTypes } from './DevicesPhaseTypes.ts';
import { DataPhaseTypes } from './DataPhaseTypes.ts';

export type OpenStarWebState =
  & {
    Cloud: OpenStarCloudState;

    Data: OpenStarDataState;

    Devices: OpenStarDevicesState;

    EaC?: OpenStarEaC;

    EaCJWT?: string;

    GitHub?: OpenStarGitHubState;

    OBiotechKV: Deno.Kv;

    Phase: SetupPhaseTypes;

    UserEaCs?: UserEaCRecord[];

    UserLicenses?: Record<string, UserEaCLicense>;

    Username: string;
  }
  //   & WithSession
  & Record<string, unknown>;

export type OpenStarCloudState = {
  AzureAccessToken?: string;

  CloudLookup?: string;

  Phase: CloudPhaseTypes;

  ResourceGroupLookup?: string;

  Storage?: {
    Cold: boolean;

    Hot: boolean;

    Warm: boolean;
  };
};

export type OpenStarDevicesState = {
  IoTLookup?: string;

  JWT: string;

  Phase: DevicesPhaseTypes;
};

export type OpenStarDataState = {
  Phase: DataPhaseTypes;
};

export type OpenStarGitHubState = {
  Username: string;
};
