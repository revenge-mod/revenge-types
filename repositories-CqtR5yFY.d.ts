import { t as DiscordModules } from "./index-DT0BJraE.js";
declare namespace repositories_d_exports {
  export { DownloadProgressEvent, InstallPlan, InstallPlanAction, Repo, RepoConfigEntry, RepoPluginListing, RepoStateEvent, RepoUpdate, installFromRepo, listAllUpdates, listRepoPlugins, listRepos, listUpdates, planInstall, refreshAllRepos, refreshRepo, registerRepositoryEvents, repoEvents, setRepos, updateAllPlugins };
}
interface DownloadProgressEvent {
  id: string;
  version: string;
  /** The repository the artifact downloads from. */
  repo: string;
  /** Bytes received so far. */
  received: number;
  /** Total bytes, from the plan's size field. */
  total: number;
  /** 1-based position of this artifact in the plan. */
  index: number;
  /** Number of artifacts in the plan. */
  count: number;
}
interface RepoStateEvent {
  url: string;
  state: 'refreshing' | 'ready' | 'error';
  error?: string;
}
declare const repoEvents: DiscordModules.Utils.TypedEventEmitter<{
  downloadProgress: [DownloadProgressEvent];
  repoState: [RepoStateEvent];
}>;
declare function registerRepositoryEvents(): void;
/**
 * A plugin repository as reported by native.
 *
 * The repository's URL is its identity.
 * The hidden internal repository (serving internal plugins) is always first and cannot be modified or removed.
 */
interface Repo {
  /** Absolute URL of the repository root; also its identity. */
  url: string;
  enabled: boolean;
  internal: boolean;
  /** Display metadata from the cached index, if any. */
  name: string | null;
  description: string | null;
  /** A Discord-packaged asset name or a `data:` URL. Never a remote URL. */
  icon: string | null;
}
interface RepoConfigEntry {
  url: string;
  enabled?: boolean;
}
declare function listRepos(): Promise<Repo[]>;
declare function setRepos(config: RepoConfigEntry[]): Promise<null>;
declare function refreshRepo(url: string): Promise<Repo>;
/**
 * Refreshes every enabled user repository in parallel.
 * Per-repo failures are collected instead.
 */
declare function refreshAllRepos(): Promise<{
  refreshed: Repo[];
  errors: {
    url: string;
    error: unknown;
  }[];
}>;
interface RepoPluginListing {
  id: string;
  name: string;
  description: string;
  author: string;
  /** A Discord-packaged asset name or a `data:` URL. Never a remote URL. */
  icon: string | null;
  /** Channel pointers (eg. `latest`), each naming a key of {@link versions}. */
  channels: Record<string, string>;
  versions: Record<string, {
    /** Absolute artifact URL. `null` for the internal repository (nothing downloadable). */
    url: string | null;
    sha256: string | null;
    size: number;
    dependencies: Record<string, {
      version: string;
      optional: boolean;
    }>;
  }>;
}
interface InstallPlanAction {
  id: string;
  version: string;
  url: string;
  sha256: string;
  size: number;
  /** The repository this action installs from (recorded as provenance). */
  repo: string;
  /** The channel followed for future update checks. */
  channel: string;
  /** The installed version being replaced, or `null` for a fresh install. */
  replaces: string | null;
}
interface InstallPlan {
  actions: InstallPlanAction[];
  /** Non-blocking problems (skipped optionals, dependent-range conflicts). */
  warnings: string[];
}
interface RepoUpdate {
  id: string;
  installed: string;
  available: string;
  channel: string;
}
/**
 * Lists one repository's plugins from its cached index.
 */
declare function listRepoPlugins(url: string): Promise<RepoPluginListing[]>;
/**
 * Resolves an install of one plugin (+ unsatisfied dependencies) against cached indexes.
 */
declare function planInstall(id: string, version?: string, channel?: string, filteredRepos?: string[]): Promise<InstallPlan>;
/**
 * Executes one confirmed install plan: download all, verify all, then apply on disk.
 *
 * - Fresh plugins (new IDs with live dependencies) load immediately (`installed`).
 * - Updates, and fresh IDs depending on them, only land on disk and load at next reload (`pending`).
 * - `skipped` lists actions an overlapping plan already satisfied.
 */
declare function installFromRepo(plan: InstallPlan): Promise<{
  installed: string[];
  pending: string[];
  skipped: string[];
}>;
/**
 * Lists available updates for plugins pinned to one repository, from its **cached index**.
 * Call {@link refreshRepo} first to ensure the index is up-to-date.
 */
declare function listUpdates(url: string): Promise<RepoUpdate[]>;
/**
 * Lists updates across every enabled user repository in parallel.
 * Per-repo failures (eg. no cached index yet) are returned.
 */
declare function listAllUpdates(): Promise<{
  updates: RepoUpdate[];
  errors: {
    url: string;
    error: unknown;
  }[];
}>;
/**
 * Resolves and installs updates for every entry of {@link listAllUpdates}.
 * Failures are collected per plugin. Updates land on disk only (`pending`), a reload applies them.
 */
declare function updateAllPlugins(): Promise<{
  installed: string[];
  pending: string[];
  errors: {
    id: string;
    error: unknown;
  }[];
}>;
declare module '@revenge-mod/modules/native' {
  interface NativeMethods {
    'revenge.plugins.repos.list': [[], Repo[]];
    'revenge.plugins.repos.set': [[config: RepoConfigEntry[]], null];
    'revenge.plugins.repos.refresh': [[url: string], Repo];
    'revenge.plugins.repos.listPlugins': [[url: string], RepoPluginListing[]];
    'revenge.plugins.repos.listUpdates': [[url: string], RepoUpdate[]];
    'revenge.plugins.planInstall': [[id: string, version: string | null, channel: string | null, filteredRepos: string[] | null], InstallPlan];
    'revenge.plugins.install': [[plan: InstallPlan], {
      installed: string[];
      pending: string[];
      skipped: string[];
    }];
  }
}
//#endregion
export { registerRepositoryEvents as _, RepoConfigEntry as a, setRepos as b, RepoUpdate as c, listRepoPlugins as d, listRepos as f, refreshRepo as g, refreshAllRepos as h, Repo as i, installFromRepo as l, planInstall as m, InstallPlan as n, RepoPluginListing as o, listUpdates as p, InstallPlanAction as r, RepoStateEvent as s, DownloadProgressEvent as t, listAllUpdates as u, repoEvents as v, updateAllPlugins as x, repositories_d_exports as y };