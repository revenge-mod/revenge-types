import { t as DiscordModules } from "./index-DT0BJraE.js";
import { a as PluginApiExtensionsOptions, b as UnscopedPreInitPluginApi, f as PluginManifest, m as PluginOptionsFactory, n as Plugin, p as PluginOptions, s as PluginCleanup, v as UnscopedInitPluginApi, y as UnscopedPluginApi } from "./types-D_22-Fn-.js";
declare namespace external_plugins_d_exports {
  export { confirmInstall, registerExternalPlugin, registerExternalPlugins, resyncPluginSources, uninstallExternalPlugin };
}
interface ExternalPlugin {
  manifest: PluginManifest;
  script?: string;
  internal?: boolean;
  essential?: boolean;
  enabledByDefault?: boolean;
  api?: boolean;
  /**
   * The plugin failed to load at native boot (session-skip).
   * It is registered so the user sees it and the reasons, but it never runs this session.
   * - Dependency failures keep the enabled flag (auto-recovers next boot once resolved).
   * - Own-fault failures (bad code, bad manifest) arrive already disabled by native.
   */
  failed?: boolean;
  /** Where the plugin came from. Missing or `repo: null` means sideloaded. */
  source?: PluginSource | null;
  unsatisfiedOptionalDependencies?: string[];
  /** Errors the native side already hit (eg. at boot before JS was up, after faulty update). */
  errors?: PluginError[];
}
declare function registerExternalPlugins(): void;
declare function registerExternalPlugin(external: ExternalPlugin): string;
declare function uninstallExternalPlugin(plugin: AnyPlugin): Promise<void>;
declare function resyncPluginSources(): Promise<void>;
declare function confirmInstall(token: string, accepted: boolean): Promise<{
  result: 'installed' | 'pending' | 'cancelled';
}>;
declare module '@revenge-mod/modules/native' {
  interface NativeMethods {
    'revenge.plugins.list': [[], ExternalPlugin[] | null];
    'revenge.plugins.installFile': [[], null];
    'revenge.plugins.uninstall': [[string], null];
    'revenge.plugins.confirmInstall': [[token: string, accepted: boolean], {
      result: 'installed' | 'pending' | 'cancelled';
    }];
  }
}
declare namespace index_d_exports {
  export { AnyPlugin, InternalPluginFlags, InternalPluginManifest, InternalPluginMeta, PluginError, PluginErrorCodes, PluginFlags, PluginInstallEvent, PluginInstallReadyEvent, PluginSource, SavedPluginStates, confirmInstall, deleteStorageForPlugin, disablePlugin, enablePlugin, forgetInitialPluginState, formatPluginError, getInternalPluginMeta, getMissingPluginDependencies, getPluginDependencies, getPluginDependents, handlePluginError, initPlugin, isDefaultsOnlyBoot, isPluginEnabled, isPluginEnabledInSavedStates, isPluginError, isPluginErrored, isPluginEssential, isPluginFailed, isPluginInternal, isPluginPendingReload, isPluginPendingUpdate, isPluginStartable, isPluginStartedLate, pEmitter, pList, pUnscopedApi, preInitPlugin, registerInternalPlugin, registerPlugin, requestNextBootDefaultsOnly, resyncPluginSources, runPluginLate, startPlugin, stopPlugin, toPluginError, uninstallExternalPlugin };
}
type AnyPlugin = Plugin<any, any>;
declare const PluginFlags: {
  Enabled: number;
  PendingReload: number;
  StartedLate: number;
  /**
   * A newer version of the plugin is on disk, but the running version is still active.
   * The new plugin version will be reloaded on next reload.
   *
   * This flag is JS-side.
   */
  PendingUpdate: number;
  /**
   * The plugin failed to load this session (aka. session-skip), but is registered so the user sees it and the reason.
   * It can never run in this session, and it isn't disabled however.
   *
   * This is usually because some dependencies failed to start, but could be caused by other misc errors too,
   * such as missing dependencies, bad code, etc.
   *
   * This flag is JS-side.
   */
  Failed: number;
};
declare const InternalPluginFlags: {
  /**
   * Marks the plugin as internal.
   */
  Internal: number;
  /**
   * Marks the plugin as essential. This means it should not be removed, disabled, or stopped by normal means.
   */
  Essential: number;
  /**
   * Marks the plugin as an API plugin, which decorates all other plugins.
   * API plugins themselves won't be decorated by other API plugins unless explicitly declared in dependencies.
   */
  API: number;
};
interface InternalPluginMeta {
  handleError: (e: unknown) => Promise<void>;
  promises: Promise<void>[];
  cleanups: PluginCleanup[];
  iflags: number;
  apiLevel: number;
  unsatisfiedOptionalDependencies: readonly string[];
  options: PluginOptions<any>;
  optionsFactory?: PluginOptionsFactory<any>;
  flags: number;
  nativeErrors: readonly PluginError[];
  /**
   * Where the plugin came from. `repo: null` or missing means sideloaded.
   * Internal plugins never have one.
   */
  source?: PluginSource | null;
}
interface PluginSource {
  repo: string | null;
  channel: string;
}
declare const pUnscopedApi: UnscopedInitPluginApi<PluginApiExtensionsOptions> | UnscopedPluginApi<PluginApiExtensionsOptions> | UnscopedPreInitPluginApi<PluginApiExtensionsOptions>;
declare const pEmitter: DiscordModules.Utils.TypedEventEmitter<{
  register: [AnyPlugin, PluginOptions<any>, update?: true];
  unregister: [AnyPlugin];
  disabled: [AnyPlugin];
  enabled: [AnyPlugin];
  preInited: [AnyPlugin];
  inited: [AnyPlugin];
  started: [AnyPlugin];
  stopped: [AnyPlugin];
  errored: [AnyPlugin, unknown];
  flagUpdate: [AnyPlugin];
  install: [PluginInstallEvent];
  installReady: [PluginInstallReadyEvent];
}>;
/**
 * A sideloaded plugin was staged and validated.
 * The user can confirm (or declines) through `confirmInstall(token, accepted)`.
 */
interface PluginInstallReadyEvent {
  /** Single-use confirmation token. */
  token: string;
  manifest: {
    id: string;
    name: string;
    description: string;
    author: string;
    version: string;
    icon?: string | null;
  };
  /** The installed version this replaces, or null for a fresh install. */
  replaces: string | null;
}
type PluginInstallEvent = {
  error: false;
  manifest: PluginManifest;
  updated: boolean;
  pending: false;
} | {
  /**
   * The plugin was applied on disk only. The running version, if any, is
   * untouched and the new one loads at next reload.
   */
  error: false;
  pending: true;
  id: string;
  version: string;
} | {
  error: PluginError;
};
interface PluginError {
  /** One of {@link PluginErrorCodes}, or something unknown. */
  code: string;
  message: string;
  stack?: string | null;
}
declare const PluginErrorCodes: {
  readonly ManifestInvalid: 'MANIFEST_INVALID';
  readonly DependencyMissing: 'DEPENDENCY_MISSING';
  readonly DependencyUnsatisfied: 'DEPENDENCY_UNSATISFIED';
  readonly DependencyFailed: 'DEPENDENCY_FAILED';
  readonly DependencyCycle: 'DEPENDENCY_CYCLE';
  readonly LoadFailed: 'LOAD_FAILED';
  readonly PluginError: 'PLUGIN_ERROR';
  readonly InstallInvalidZip: 'INSTALL_INVALID_ZIP';
  readonly InstallVerifyFailed: 'INSTALL_VERIFY_FAILED';
  readonly InstallMismatch: 'INSTALL_MISMATCH';
  readonly InstallFailed: 'INSTALL_FAILED';
};
declare function isPluginError(e: unknown): e is PluginError;
declare function toPluginError(e: unknown): PluginError;
declare function formatPluginError(e: unknown): string;
declare const pList: Map<string, AnyPlugin>;
/**
 * Whether this boot is running with default plugins only, ignoring the user's saved states.
 */
declare const isDefaultsOnlyBoot: boolean;
/**
 * The user's real saved states, only sent when this boot ignores them (recovery/defaults-only).
 *
 * @see {@link isDefaultsOnlyBoot}
 */
declare const SavedPluginStates: {
  [id: string]: PluginStateObject;
} | null;
/**
 * Whether a plugin is enabled in the user's saved setup, which in a defaults-only boot is not
 * what's running. Falls back to the session state on a normal boot.
 */
declare function isPluginEnabledInSavedStates(plugin: AnyPlugin): boolean;
declare function forgetInitialPluginState(id: PluginManifest['id']): void;
/**
 * Registers a new plugin with the system.
 *
 * @param manifest The manifest of the plugin.
 * @param options The options for the plugin.
 * @param defflags The default flags for the plugin.
 */
declare function registerPlugin<O extends PluginApiExtensionsOptions>(manifest: PluginManifest, options: PluginOptions<O> | PluginOptionsFactory<O>, defflags: number): string;
type InternalPluginManifest = Omit<PluginManifest, 'version' | 'format' | 'dependencies'> & Partial<Pick<PluginManifest, 'version' | 'format' | 'dependencies'>>;
declare function registerInternalPlugin<O extends PluginApiExtensionsOptions>(manifest: InternalPluginManifest, options: PluginOptions<O> | PluginOptionsFactory<O>, defflags: number, iflags?: number): string;
declare function getPluginDependencies(plugin: AnyPlugin, throwOnMissing?: boolean): AnyPlugin[];
declare function getMissingPluginDependencies(plugin: AnyPlugin): string[];
declare function getPluginDependents(plugin: AnyPlugin, includeLinkedOptionals?: boolean): AnyPlugin[];
declare function isPluginEnabled(plugin: AnyPlugin): boolean;
declare function isPluginStartedLate(plugin: AnyPlugin): boolean;
declare function isPluginEssential({ iflags }: InternalPluginMeta): boolean;
declare function isPluginInternal({ iflags }: InternalPluginMeta): boolean;
declare function isPluginErrored(plugin: AnyPlugin): boolean;
declare function isPluginPendingReload(plugin: AnyPlugin): boolean;
declare function isPluginPendingUpdate(plugin: AnyPlugin): boolean;
/** @see {@link Flag.Failed} */
declare function isPluginFailed(plugin: AnyPlugin): boolean;
/**
 * Checks if a plugin is startable.
 *
 * @see {@link requirePluginStartableState}.
 */
declare function isPluginStartable(plugin: AnyPlugin): boolean;
/**
 * Handles errors that occur in plugins.
 */
declare function handlePluginError(e: unknown, plugin: AnyPlugin): Promise<void>;
/**
 * Disables a plugin, as well as all its dependents.
 */
declare function disablePlugin(plugin: AnyPlugin): Promise<void>;
/**
 * Enables a plugin, as well as all its dependencies.
 */
declare function enablePlugin(plugin: AnyPlugin): Promise<void>;
declare function runPluginLate(plugin: AnyPlugin): Promise<void>;
/**
 * Runs the preInit lifecycle of a plugin.
 */
declare function preInitPlugin(plugin: AnyPlugin): Promise<void>;
/**
 * Runs the init lifecycle of a plugin.
 */
declare function initPlugin(plugin: AnyPlugin): Promise<void>;
/**
 * Starts a plugin by running its start lifecycle.
 */
declare function startPlugin(plugin: AnyPlugin): Promise<void>;
/**
 * Stops a plugin by running its stop lifecycle and cleanup functions.
 */
declare function stopPlugin(plugin: AnyPlugin): Promise<void>;
declare function getInternalPluginMeta(plugin: AnyPlugin): InternalPluginMeta;
declare function deleteStorageForPlugin(plugin: Plugin<any, any>): Promise<void>;
declare function requestNextBootDefaultsOnly(): void;
declare module '@revenge-mod/modules/native' {
  interface NativeMethods {
    'revenge.plugins.startNative': [[id: PluginManifest['id']], null];
    'revenge.plugins.states.read': [[], PersistedPluginStates];
    'revenge.plugins.states.requestNextBootDefaultsOnly': [[], void];
    'revenge.plugins.setEnabled': [[id: PluginManifest['id'], enabled: boolean], SetEnabledError | null];
  }
}
type SetEnabledError = {
  code: 'DEPENDENCIES_UNSATISFIED';
  problems: Array<{
    id: PluginManifest['id'];
    /** The declared range (`*` for any). */
    required: string;
    /** Installed version, or `null` when missing entirely. */
    installed: string | null;
    enabled: boolean;
  }>;
};
interface PluginStateObject {
  enabled?: boolean;
  pendingReload?: boolean;
  errored?: boolean;
  /** @deprecated TODO: (2026-07-26) Remove this in a month's time. */
  enabledLate?: boolean;
  startedLate?: boolean;
}
interface PersistedPluginStates {
  states: {
    [id: PluginManifest['id']]: PluginStateObject;
  };
  savedStates?: {
    [id: PluginManifest['id']]: PluginStateObject;
  };
}
//#endregion
export { isPluginFailed as A, registerInternalPlugin as B, initPlugin as C, isPluginError as D, isPluginEnabledInSavedStates as E, isPluginStartedLate as F, stopPlugin as G, requestNextBootDefaultsOnly as H, pEmitter as I, external_plugins_d_exports as J, toPluginError as K, pList as L, isPluginPendingReload as M, isPluginPendingUpdate as N, isPluginErrored as O, isPluginStartable as P, pUnscopedApi as R, index_d_exports as S, isPluginEnabled as T, runPluginLate as U, registerPlugin as V, startPlugin as W, uninstallExternalPlugin as X, resyncPluginSources as Y, getInternalPluginMeta as _, PluginError as a, getPluginDependents as b, PluginInstallEvent as c, SavedPluginStates as d, deleteStorageForPlugin as f, formatPluginError as g, forgetInitialPluginState as h, InternalPluginMeta as i, isPluginInternal as j, isPluginEssential as k, PluginInstallReadyEvent as l, enablePlugin as m, InternalPluginFlags as n, PluginErrorCodes as o, disablePlugin as p, confirmInstall as q, InternalPluginManifest as r, PluginFlags as s, AnyPlugin as t, PluginSource as u, getMissingPluginDependencies as v, isDefaultsOnlyBoot as w, handlePluginError as x, getPluginDependencies as y, preInitPlugin as z };