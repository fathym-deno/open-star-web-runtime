import {
  EverythingAsCode,
  EverythingAsCodeClouds,
  EverythingAsCodeGitHub,
  EverythingAsCodeIdentity,
  EverythingAsCodeIoT,
  EverythingAsCodeSources,
} from '@fathym/eac';

export type OpenStarEaC =
  & EverythingAsCodeClouds
  & EverythingAsCodeGitHub
  & EverythingAsCodeIdentity
  & EverythingAsCodeIoT
  & EverythingAsCodeSources
  & EverythingAsCode;
