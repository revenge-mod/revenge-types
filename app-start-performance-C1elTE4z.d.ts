import { t as DiscordModules } from "./index-0-Zmdp5b.js";
import { t as FluxEventDispatchPatch } from "./dispatcher-BI4a1WDn.js";
declare namespace flux_d_exports {
  export { fPatches, fPatchesAll };
}
declare const fPatchesAll: Set<FluxEventDispatchPatch<any>>;
declare const fPatches: Map<string, Set<FluxEventDispatchPatch<any>>>;
//#endregion
//#region lib/discord/src/preinit.d.ts
declare const AppStartPerformance: DiscordModules.AppStartPerformance;
declare namespace app_start_performance_d_exports {
  export { AppStartPerformance };
}
//#endregion
export { AppStartPerformance as n, flux_d_exports as r, app_start_performance_d_exports as t };