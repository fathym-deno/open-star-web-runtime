import { EaCStripeProcessor, EverythingAsCode } from '@fathym/eac';
import { EaCRuntimeConfig, EaCRuntimeEaC, EaCRuntimePlugin, EaCRuntimePluginConfig } from '@fathym/eac/runtime';
import * as djwt from 'https://deno.land/x/djwt@v3.0.0/mod.ts';
import { loadEaCSvc } from '@fathym/eac/api';
import { IoCContainer } from 'https://deno.land/x/fathym_ioc@v0.0.10/src/ioc/ioc.ts';
import { parse } from 'https://deno.land/std@0.220.1/jsonc/parse.ts';

export default class OpenStarEaCOverridesPlugin implements EaCRuntimePlugin {
  constructor() {}

  public async Setup(_config: EaCRuntimeConfig): Promise<EaCRuntimePluginConfig> {
    const eacConfigContents = await Deno.readTextFile('../../configs/eac.config.jsonc')

    const eacConfig = parse(eacConfigContents) as EaCRuntimeEaC

    const pluginConfig: EaCRuntimePluginConfig = {
      Name: OpenStarEaCOverridesPlugin.name,
      EaC: eacConfig
    };

    return pluginConfig;
  }
}
