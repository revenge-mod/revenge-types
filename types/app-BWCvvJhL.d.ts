declare namespace app_d_exports {
  export { reloadApp };
}
declare function reloadApp(): void;
declare module '@revenge-mod/modules/native' {
  interface NativeMethods {
    'revenge.app.reload': [[], null];
  }
}
//#endregion
export { reloadApp as n, app_d_exports as t };