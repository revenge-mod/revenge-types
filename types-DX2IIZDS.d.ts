import { t as error_d_exports } from "./error-DaAofQGb.js";
import { n as promise_d_exports } from "./promise-8SAFxUcZ.js";
import { s as proxy_d_exports } from "./proxy-BnHPvsOT.js";
import { FC, ReactElement } from "react";
declare namespace callback_d_exports {
  export { asap, debounce, noop };
}
declare function debounce<F extends (...args: any[]) => any>(func: F, timeout: number): (...args: Parameters<F>) => Promise<unknown>;
/**
 * A non-blocking function that runs the callback as soon as possible.
 * @param cb The callback to run.
 */
declare const asap: (cb: AnyFunction) => void;
declare const noop: () => void;
declare namespace object_d_exports {
  export { cloneDeep, defineLazyProperties, defineLazyProperty, isObject, mergeDeep };
}
/**
 * Simple check if to see if value is an object.
 *
 * @param val The value to check.
 */
declare function isObject(val: any): val is AnyObject;
/**
 * Clone an object deeply.
 *
 * @param source The source object to clone.
 */
declare function cloneDeep<T>(source: T, cache?: WeakMap<WeakKey, any>): T;
/**
 * Deep merge two objects.
 *
 * @param target The object to merge into.
 * @param source The object to merge from.
 *
 * @returns The merged target.
 */
declare function mergeDeep(target: AnyObject, source: AnyObject): AnyObject;
/**
 * Define a lazy property on an object that will be loaded when accessed.
 *
 * @param target The target object to define the property on.
 * @param property The property key to define.
 * @param loader The function that will be called to load the property value when accessed.
 * @return The target object with the lazy property defined.
 */
declare function defineLazyProperty<T extends object, K extends keyof T>(target: T, property: K, loader: () => T[K]): T;
/**
 * Define multiple lazy properties on an object that will be loaded when accessed.
 *
 * @param target The target object to define the properties on.
 * @param loaders An object where each key is a property name and the value is a function that returns the property value when accessed.
 * @returns The target object with the lazy properties defined.
 */
declare function defineLazyProperties<T extends object>(target: T, loaders: Partial<Record<keyof T, () => T[keyof T]>>): T;
declare namespace tree_d_exports {
  export { FindInTreeOptions, SearchFilter, SearchTree, findInTree };
}
type SearchTree = Record<string, any>;
type SearchFilter = (tree: SearchTree) => boolean;
interface FindInTreeOptions {
  /**
   * A set of keys to search for in the tree.
   */
  walkable?: Set<string>;
  /**
   * A set of keys to ignore when searching the tree.
   */
  ignore?: Set<string>;
  /**
   * The maximum depth to search in the tree.
   *
   * @default 100
   */
  maxDepth?: number;
}
declare function findInTree<F extends SearchFilter>(tree: SearchTree, filter: F, opts?: FindInTreeOptions): ExtractPredicate<F> | undefined;
declare namespace react_d_exports {
  export { findInReactFiber, useIsFirstRender, useReRender };
}
declare function useIsFirstRender(): boolean;
declare function useReRender(): import("react").ActionDispatch<[]>;
declare function findInReactFiber<F extends SearchFilter>(fiber: ReactElement, filter: F): ExtractPredicate<F> | undefined;
//#endregion
//#region lib/modules/src/finders/filters/constants.d.ts
/**
 * Scopes to limit filters to certain module states.
 */
declare const FilterScopes: {
  /**
   * Include all modules (both initialized and uninitialized, including blacklisted).
   * This overrides {@link FilterScopes.Uninitialized} and {@link FilterScopes.Initialized}.
   *
   * **Filter generators generally don't need this scope.**
   *
   * When combining multiple filters with composite filters, the {@link FilterScopes.All} scope doesn't set assumptions for the filter predicate.
   * It only decides which modules to run the predicate against.
   * **Filter generators must include {@link FilterScopes.Uninitialized} and/or {@link FilterScopes.Initialized} as well.**
   */
  readonly All: 1;
  /**
   * Include uninitialized modules in the search. Implies the predicate can run without exports.
   */
  readonly Uninitialized: 2;
  /**
   * Include initialized modules from the search.
   */
  readonly Initialized: 4;
};
type FilterScope = (typeof FilterScopes)[keyof typeof FilterScopes];
/**
 * @see {@link FilterScopes}
 */
type FilterScopeValue = number;
interface FilterInfo {
  /**
   * The result type of the filter.
   */
  Result: any;
  /**
   * Scopes the filter matches modules in.
   */
  Scopes: FilterScope[];
}
interface DefaultFilterInfo extends FilterInfo {
  Result: any;
  Scopes: FilterScope[];
}
//#endregion
//#region lib/modules/src/finders/filters/utils.d.ts
type FilterResult<F> = F extends Filter<infer I> ? I['Result'] : never;
type FilterInfoOf<F> = F extends Filter<infer I> ? I : FilterInfo;
declare const FilterInfoBrand: unique symbol;
interface FilterBase<Info extends FilterInfo = DefaultFilterInfo> {
  (id: Metro.ModuleID, exports?: Metro.ModuleExports, initialized?: boolean): boolean;
  key: string;
  scopes: FilterScopeValue;
  /** @internal */
  readonly [FilterInfoBrand]?: Info;
}
type Filter<Info extends FilterInfo = DefaultFilterInfo> = FilterHelpers<Info> & FilterBase<Info>;
type MergeFilterInfo<I1 extends FilterInfo, I2 extends FilterInfo> = {
  Result: I1['Result'] & I2['Result'];
  Scopes: [...I1['Scopes'], ...I2['Scopes']];
};
type UnionFilterInfo<I1 extends FilterInfo, I2 extends FilterInfo> = {
  Result: I1['Result'] | I2['Result'];
  Scopes: [...I1['Scopes'], ...I2['Scopes']];
};
interface FilterHelpers<Info extends FilterInfo = DefaultFilterInfo> {
  /**
   * Manually the key for this filter.
   *
   * **Don't use this unless you know what you're doing.** Only API exports should be using this.
   *
   * @param key The key to set for this filter.
   */
  keyAs<T extends FilterBase<any>>(this: T, key: string): T;
  /**
   * Combines this filter with another filter, returning a new filter that matches if **both** filters match.
   *
   * @param filter The filter to combine with.
   */
  and<T extends FilterBase<any>, F extends FilterBase<any>>(this: T, filter: F): Filter<MergeFilterInfo<Info, FilterInfoOf<F>>>;
  /**
   * Combines this filter with another filter, returning a new filter that matches if **either** filter matches.
   *
   * @param filter The filter to combine with.
   */
  or<T extends Filter<Info>, F extends FilterBase<any>>(this: T, filter: F): Filter<UnionFilterInfo<Info, FilterInfoOf<F>>>;
  /**
   * Creates a new instance of this filter.
   */
  'new'(this: Filter<Info>): Filter<Info>;
  /**
   * Scopes this filter to match specific modules.
   *
   * @param scopes The scopes of modules to match.
   */
  scope<T extends Filter<Info>, const S extends FilterScope[]>(this: T, ...scopes: S): Filter<Info & {
    Scopes: S;
  }>;
}
type FilterGenerator<G extends (...args: any[]) => Filter> = G & {
  keyFor(args: Parameters<G>): string;
  defaultScopesFor(args: Parameters<G>): FilterScopeValue;
};
/**
 * Create a filter generator.
 *
 * @param filter The function that filters the modules.
 * @param keyFor The function that generates the key for the filter.
 * @param defaultScopesFor The function that generates the default scopes for the filter, or static scopes. Defaults to {@link FilterScopes.Initialized}.
 * @returns A function that generates a filter with the specified arguments.
 *
 * @example
 * ```ts
 * const custom = createFilterGenerator<[arg1: number, arg2: string]>(
 *   ([arg1, arg2], id, exports, initialized) => {
 *     // WARNING: exports can be a Proxy, nullish, or a primitive, so be careful when using it
 *     // filter logic
 *     return true
 *   },
 *   ([arg1, arg2]) => `custom(${arg1}, ${arg2})`
 * )
 * ```
 *
 * @see {@link withProps} for an example on custom-typed filters.
 */
declare function createFilterGenerator<A extends any[]>(filter: (args: A, id: Metro.ModuleID, exports: Metro.ModuleExports, initialized: boolean) => boolean, keyFor: (args: A) => string, defaultScopesFor?: ((args: A) => FilterScopeValue) | FilterScopeValue): FilterGenerator<(...args: A) => Filter>;
declare function createFilterGenerator<A extends any[]>(filter: (args: A, id: Metro.ModuleID) => boolean, keyFor: (args: A) => string, defaultScopesFor?: ((args: A) => FilterScopeValue) | FilterScopeValue): FilterGenerator<(...args: A) => Filter>;
//#endregion
//#region lib/modules/src/finders/filters/composite.d.ts
type AllOf = FilterGenerator<<F1 extends FilterBase, F2 extends FilterBase>(f1: F1, f2: F2) => Filter<MergeFilterInfo<FilterInfoOf<F1>, FilterInfoOf<F2>>>>;
/** @deprecated Use {@link AllOf} instead */
type And = AllOf;
/**
 * Combines two filters into one, returning true if **every** filter matches.
 *
 * If only one of the filters can run on uninitialized modules ({@link FilterScopes.Uninitialized}),
 * it is used as the prefilter for uninitialized modules, and the other only runs once a candidate is initialized.
 *
 * @param filters The filters to combine.
 *
 * @example With filter helpers
 * ```ts
 * const [SomeModule] = lookupModule(
 *   withProps('x', 'name')
 *     .and(withName('SomeName'))
 *     .and(withDependencies([1, 485, null, 2])),
 * )
 * ```
 *
 * @example
 * ```ts
 * const [SomeModule] = lookupModule(
 *   allOf(
 *     allOf(withProps('x', 'name'), withName('SomeName')),
 *     withDependencies([1, 485, null, 2]),
 *   ),
 * )
 * ```
 */
declare const allOf: (<F1 extends FilterBase, F2 extends FilterBase>(f1: F1, f2: F2) => Filter<MergeFilterInfo<FilterInfoOf<F1>, FilterInfoOf<F2>>>) & {
  keyFor(args: [f1: FilterBase<DefaultFilterInfo>, f2: FilterBase<DefaultFilterInfo>]): string;
  defaultScopesFor(args: [f1: FilterBase<DefaultFilterInfo>, f2: FilterBase<DefaultFilterInfo>]): FilterScopeValue;
} & {
  keyFor: (args: [f1: FilterBase<DefaultFilterInfo>, f2: FilterBase<DefaultFilterInfo>]) => string;
  defaultScopesFor: (args: [f1: FilterBase<DefaultFilterInfo>, f2: FilterBase<DefaultFilterInfo>]) => FilterScopeValue;
};
/** @deprecated Use {@link allOf} instead. */
declare const and: (<F1 extends FilterBase, F2 extends FilterBase>(f1: F1, f2: F2) => Filter<MergeFilterInfo<FilterInfoOf<F1>, FilterInfoOf<F2>>>) & {
  keyFor(args: [f1: FilterBase<DefaultFilterInfo>, f2: FilterBase<DefaultFilterInfo>]): string;
  defaultScopesFor(args: [f1: FilterBase<DefaultFilterInfo>, f2: FilterBase<DefaultFilterInfo>]): FilterScopeValue;
} & {
  keyFor: (args: [f1: FilterBase<DefaultFilterInfo>, f2: FilterBase<DefaultFilterInfo>]) => string;
  defaultScopesFor: (args: [f1: FilterBase<DefaultFilterInfo>, f2: FilterBase<DefaultFilterInfo>]) => FilterScopeValue;
};
type AnyOf = FilterGenerator<<F1 extends FilterBase, F2 extends FilterBase>(f1: F1, f2: F2) => Filter<UnionFilterInfo<FilterInfoOf<F1>, FilterInfoOf<F2>>>>;
/** @deprecated Use {@link AnyOf} instead. */
type Or = AnyOf;
/**
 * Combines two filters into one, returning true if **some** filters match.
 *
 * @param filters The filters to combine.
 *
 * @example With filter helpers
 * ```ts
 * const [SomeModule] = lookupModule(
 *   withProps('x', 'name')
 *     .or(withName('SomeName'))
 *     .or(withDependencies([1, 485, null, 2])),
 * )
 * ```
 *
 * @example
 * ```ts
 * const [SomeModule] = lookupModule(
 *   anyOf(
 *     anyOf(withProps('x', 'name'), withName('SomeName')),
 *     withDependencies([1, 485, null, 2]),
 *   ),
 * )
 * ```
 */
declare const anyOf: (<F1 extends FilterBase, F2 extends FilterBase>(f1: F1, f2: F2) => Filter<UnionFilterInfo<FilterInfoOf<F1>, FilterInfoOf<F2>>>) & {
  keyFor(args: [f1: FilterBase<DefaultFilterInfo>, f2: FilterBase<DefaultFilterInfo>]): string;
  defaultScopesFor(args: [f1: FilterBase<DefaultFilterInfo>, f2: FilterBase<DefaultFilterInfo>]): FilterScopeValue;
} & {
  keyFor: (args: [f1: FilterBase<DefaultFilterInfo>, f2: FilterBase<DefaultFilterInfo>]) => string;
  defaultScopesFor: (args: [f1: FilterBase<DefaultFilterInfo>, f2: FilterBase<DefaultFilterInfo>]) => FilterScopeValue;
};
/** @deprecated Use {@link anyOf} instead. */
declare const or: (<F1 extends FilterBase, F2 extends FilterBase>(f1: F1, f2: F2) => Filter<UnionFilterInfo<FilterInfoOf<F1>, FilterInfoOf<F2>>>) & {
  keyFor(args: [f1: FilterBase<DefaultFilterInfo>, f2: FilterBase<DefaultFilterInfo>]): string;
  defaultScopesFor(args: [f1: FilterBase<DefaultFilterInfo>, f2: FilterBase<DefaultFilterInfo>]): FilterScopeValue;
} & {
  keyFor: (args: [f1: FilterBase<DefaultFilterInfo>, f2: FilterBase<DefaultFilterInfo>]) => string;
  defaultScopesFor: (args: [f1: FilterBase<DefaultFilterInfo>, f2: FilterBase<DefaultFilterInfo>]) => FilterScopeValue;
};
//#endregion
//#region lib/modules/src/finders/filters/dynamic.d.ts
/** @internal This structure is not stable, and should only be referenced internally. */
interface ComparableDependencyMap extends Array<Metro.ModuleID | number | null | undefined | ComparableDependencyMap |
/** @deprecated Resolve the module ID with `lookupModule` and pass the ID. */
Filter> {
  p?: boolean;
  r?: number;
  s?: number;
  n?: number;
  x?: number;
  u?: boolean;
  o?: boolean;
}
declare const withDependencies: WithDependencies;
type WithDependencies = FilterGenerator<<T>(deps: ComparableDependencyMap) => Filter<{
  Result: T;
  Scopes: [typeof FilterScopes.Uninitialized, typeof FilterScopes.Initialized];
}>> & {
  partial: typeof partial;
  relative: typeof relative;
  skip: typeof skip;
  last: typeof last;
  atLeast: typeof atLeast;
  atMost: typeof atMost;
  unordered: typeof unordered;
  ordered: typeof ordered;
  /** @deprecated Use {@link withDependencies.partial} instead. */
  loose: typeof partial;
  /** @deprecated Use {@link withDependencies.unordered} instead. */
  includes: typeof unordered;
};
/**
 * Compare the set without requiring it to reach the end of the dependency map.
 *
 * On its own this matches the **leading** dependencies. Can be used with {@link withDependencies.skip}.
 *
 * Order still matters. If you mark an index as dynamic, the same index must also be present during comparison to pass.
 *
 * @param deps The dependency map to compare partially. This permanently modifies the array.
 * @returns The modified dependency map.
 *
 * @see {@link withDependencies.last} for the trailing counterpart.
 */
declare function partial(deps: ComparableDependencyMap): ComparableDependencyMap;
/**
 * Skip a number of dependencies before comparing positionally.
 *
 * Passing `Infinity` anchors the set to the end, matching the **last** `deps.length` dependencies.
 * Anything before them is unconstrained.
 *
 * @param amount The amount of dependencies to skip from the start, or `Infinity` to anchor to the end.
 * @param deps The dependency map to skip in. This permanently modifies the array.
 * @returns The modified dependency map.
 *
 * @see {@link withDependencies.last} for the `Infinity` shorthand.
 */
declare function skip(amount: number, deps?: ComparableDependencyMap): ComparableDependencyMap;
/**
 * Match the **last** `deps.length` dependencies, leaving anything before them unconstrained.
 *
 * Shorthand for {@link withDependencies.skip} with `Infinity`.
 * Prefer this over leading comparisons when a module's trailing dependencies are the stable part of its fingerprint.
 *
 * @param deps The dependency map to anchor to the end. This permanently modifies the array.
 * @returns The modified dependency map.
 *
 * @example
 * ```ts
 * const { last, relative } = withDependencies
 *
 * // Matches modules whose last three dependencies are [Any, module ID + 1, 2]
 * withDependencies(last([null, relative(1), 2]))
 * ```
 */
declare function last(deps?: ComparableDependencyMap): ComparableDependencyMap;
/**
 * Require the module to have at least `count` dependencies.
 *
 * This implies {@link withDependencies.partial}, as an exact length check would never pass alongside a bound.
 *
 * @param count The minimum amount of dependencies.
 * @param deps The dependency map to bound. This permanently modifies the array.
 * @returns The modified dependency map.
 */
declare function atLeast(count: number, deps?: ComparableDependencyMap): ComparableDependencyMap;
/**
 * Require the module to have at most `count` dependencies.
 *
 * This implies {@link withDependencies.partial}, as an exact length check would never pass alongside a bound.
 *
 * @param count The maximum amount of dependencies.
 * @param deps The dependency map to bound. This permanently modifies the array.
 * @returns The modified dependency map.
 */
declare function atMost(count: number, deps?: ComparableDependencyMap): ComparableDependencyMap;
/**
 * Compare the set in order, allowing any number of unrelated dependencies between the entries.
 *
 * Entries must appear in the given order. Gaps before, between and after them are unconstrained.
 * Dynamic (`null`) entries consume one dependency slot.
 *
 * Each entry takes the earliest dependency satisfying it. That is exact for subsequences,
 * so entries matching overlapping dependencies never cause a false negative.
 *
 * @param deps The dependency map to compare as a subsequence. This permanently modifies the array.
 * @returns The modified dependency map.
 *
 * @see {@link withDependencies.unordered} to drop the order requirement too.
 *
 * @example
 * ```ts
 * const { ordered, relative } = withDependencies
 *
 * // Matches modules depending on module ID 4, then its own next module, in that order,
 * // with any number of other dependencies around them
 * withDependencies(ordered([4, relative(1)]))
 * ```
 */
declare function ordered(deps: ComparableDependencyMap): ComparableDependencyMap;
/**
 * Compare the set without caring about order or position, only that every dependency exists somewhere.
 *
 * Entries are matched independently, so two identical entries can both match the same dependency.
 * Dynamic (`null`) entries are meaningless here and are ignored.
 *
 * **This is much more expensive than positional comparison**, as every entry is compared against every dependency.
 * Bound it with {@link withDependencies.atLeast} or {@link withDependencies.atMost} where possible, as those are checked first.
 *
 * @param deps The dependency map to compare unordered. This permanently modifies the array.
 * @returns The modified dependency map.
 *
 * @see {@link withDependencies.ordered} to keep the order requirement.
 */
declare function unordered(deps: ComparableDependencyMap): ComparableDependencyMap;
/**
 * Marks this dependency to compare relatively to the module ID being compared.
 *
 * @param magnitude The relative magnitude to use when comparing module IDs. Positive values mean the dependency's module ID is greater than the module being compared, negative values mean it's less.
 * @param root Marks this dependency to compare relatively to the root (returning) module ID being compared. Useful for nested comparisons where you want to compare by the root module ID instead of the parent's module ID of the nested dependency.
 *
 * @see {@link relative.within} to accept a range of magnitudes.
 */
declare function relative(magnitude: Metro.ModuleID, root?: boolean): number;
declare namespace index_d_exports {
  export { AllOf, And, AnyOf, ComparableDependencyMap, DefaultFilterInfo, Filter, FilterBase, FilterGenerator, FilterHelpers, FilterInfo, FilterInfoOf, FilterResult, FilterScope, FilterScopeValue, FilterScopes, MergeFilterInfo, Or, UnionFilterInfo, WithName, WithProps, WithSingleProp, WithoutProps, allOf, and, anyOf, createFilterGenerator, or, withDependencies, withName, withProps, withSingleProp, withoutProps };
}
type FilterRequiringExports<T> = Filter<{
  Result: T;
  Scopes: [typeof FilterScopes.Initialized];
}>;
/**
 * Filter modules by their exports having all of the specified properties.
 *
 * @param prop The property to check for.
 * @param props More properties to check for (optional).
 *
 * @example
 * ```ts
 * const [React] = lookupModule(withProps<typeof import('react')>('createElement'))
 * // const React: typeof import('react')
 * ```
 */
declare const withProps: WithProps;
type WithProps = FilterGenerator<<T extends Record<string, any> = Record<string, any>>(prop: keyof T, ...props: Array<keyof T>) => FilterRequiringExports<T>>;
/**
 * Filter modules by their exports having none of the specified properties.
 *
 * @param prop The property to check for.
 * @param props More properties to check for (optional).
 */
declare const withoutProps: WithoutProps;
type WithoutProps = FilterGenerator<<T extends Record<string, any>>(prop: string, ...props: string[]) => FilterRequiringExports<T>>;
/**
 * Filter modules by their exports having only the specified property.
 *
 * @param prop The property to check for.
 *
 * @example
 * ```ts
 * const [FormSwitchModule] = lookupModule(withSingleProp('FormSwitch'))
 * // const FormSwitchModule: { FormSwitch: any }
 * ```
 */
declare const withSingleProp: WithSingleProp;
type WithSingleProp = FilterGenerator<<T extends Record<string, any>>(prop: keyof T) => FilterRequiringExports<T>>;
/**
 * Filter modules by their exports having the specified name.
 *
 * Usually used for function components or classes.
 *
 * @param name The name to check for.
 *
 * @example Auto-typing as object
 * ```ts
 * const [SomeComponent] = lookupModule(withName('SomeComponent'))
 * // const SomeComponent: { name: 'SomeComponent' }
 * ```
 *
 * @example Typing as function component
 * ```ts
 * type MyComponent = React.FC<{ foo: string }>
 *
 * const [MyComponent] = lookupModule(withName<MyComponent>('MyComponent'))
 * // const MyComponent: MyComponent & { name: 'MyComponent' }
 * ```
 *
 * @example Typing as class
 * ```
 * interface SomeClass {
 *    someMethod(): void
 * }
 *
 * const [SomeClass] = lookupModule(withName<{ new(param: string): SomeClass }>('SomeClass'))
 * // const SomeClass: { new(): SomeClass, name: 'SomeClass' }
 */
declare const withName: WithName;
type WithName = FilterGenerator<<T extends object = object>(name: string) => FilterRequiringExports<T>>;
declare namespace discord_d_exports {
  export { WithGeneratedIconComponent, lookupGeneratedIconComponent, withGeneratedIconComponent };
}
type WithGeneratedIconComponent = FilterGenerator<<N extends string>(name: N, ...assets: string[]) => Filter<{
  Result: { [K in N]: FC<any>; };
  Scopes: [typeof FilterScopes.Uninitialized, typeof FilterScopes.Initialized];
}>>;
/**
 * Filter by icon component name and asset names.
 *
 * @param names The component name, then the asset names if the component has multiple assets. *
 * @example
 * ```ts
 * const [CopyIconModule] = lookupModule(
 *   withGeneratedIconComponent('CopyIcon'),
 * )
 * if (CopyIconModule) {
 *   const { CopyIcon } = CopyIconModule
 *   // Use CopyIcon as a React component
 * }
 * ```
 * @example
 * ```ts
 * const [CircleXIconModule] = lookupModule(
 *   withGeneratedIconComponent(
 *     'CircleXIcon',
 *     'CircleXIcon-secondary',
 *     'CircleXIcon-primary',
 *   ),
 * )
 * ```
 */
declare const withGeneratedIconComponent: WithGeneratedIconComponent;
/**
 * Looks up a generated icon component by its name and asset names.
 *
 * @param names The component name, then the asset names if the component has multiple assets.
 * @returns The icon component, or `undefined` if it could not be found.
 */
declare function lookupGeneratedIconComponent<N extends string>(...names: [N, ...string[]]): FC<any> | undefined;
//#endregion
//#region lib/utils/src/types.d.ts
type Nullish = null | undefined;
type If<T, Then, Else> = T extends true ? Then : Else;
type Not<T extends boolean> = T extends true ? false : true;
type AnyObject = Record<PropertyKey, any>;
type AnyFunction = (...args: any[]) => any;
type LogicalOr<T1, T2> = T1 extends true ? true : T2 extends true ? true : false;
type LogicalAnd<T1, T2> = T1 extends true ? T2 extends true ? true : false : false;
type DeepPartial<T> = { [K in keyof T]?: T[K] extends AnyObject ? DeepPartial<T[K]> : T[K]; };
type ExtractPredicate<T> = T extends ((arg: any) => arg is infer R) ? R : never;
type KeyWithType<O extends AnyObject, T> = { [K in keyof O]: O[K] extends T ? K : never; }[keyof O];
interface PreInitPluginApiUtils {
  callback: typeof callback_d_exports;
  error: typeof error_d_exports;
  object: typeof object_d_exports;
  promise: typeof promise_d_exports;
  proxy: typeof proxy_d_exports;
  tree: typeof tree_d_exports;
  react: typeof react_d_exports;
}
interface PluginApiUtils extends PreInitPluginApiUtils {
  discord: typeof discord_d_exports;
}
declare module '@revenge-mod/plugins/types' {
  interface UnscopedPreInitPluginApi {
    utils: PreInitPluginApiUtils;
  }
  interface UnscopedInitPluginApi {
    utils: PluginApiUtils;
  }
}
//#endregion
//#region lib/modules/src/types.d.ts
/**
 * Metro is a bundler for React Native.
 *
 * @see {@link https://github.com/facebook/metro/blob/main/packages/metro-runtime/src/polyfills/require.js}
 */
declare namespace Metro {
  type DependencyMap = Array<ModuleID>;
  type FactoryFn = (global: object, require: RequireFn, metroImportDefault: RequireFn, metroImportAll: RequireFn, moduleObject: Module, exports: ModuleExports, dependencyMap: DependencyMap) => void;
  type RegisterSegmentFn = (segmentId: number, moduleDefiner: (moduleId: ModuleID) => void, moduleIds?: ReadonlyArray<ModuleID> | null) => void;
  type ModuleID = number;
  interface ModuleDefinition<Initialized = boolean> {
    /**
     * Dependencies of this module (set to `undefined` once the module is initialized)
     */
    dependencyMap: If<Initialized, undefined, DependencyMap>;
    /**
     * Error that occurred during initialization
     */
    error?: any;
    /**
     * Factory function that initializes the module
     */
    factory: If<Initialized, undefined, FactoryFn>;
    /**
     * Whether an error occurred during initialization
     */
    hasError: boolean;
    importedAll: ModuleExports;
    importedDefault: ModuleExports;
    /**
     * Whether factory has been successfully called
     * */
    isInitialized: boolean;
    publicModule: Module;
  }
  type Module = {
    id?: ModuleID;
    exports: ModuleExports;
  };
  type ModuleList = Map<ModuleID, ModuleDefinition>;
  type RequireFn = (id: ModuleID) => ModuleExports;
  type DefineFn = (factory: FactoryFn, moduleId: ModuleID, dependencyMap: DependencyMap) => void;
  type ClearFn = () => ModuleList;
  interface Require extends RequireFn {
    importDefault: RequireFn;
    importAll: RequireFn;
  }
  type ModuleExports = any;
}
declare namespace RevengeMetro {
  type Module = {
    id: Metro.ModuleID;
    exports: Metro.ModuleExports;
  };
  type ModuleDefinition<Initialized = boolean> = {
    flags: number;
    module?: Module;
    factory: If<Initialized, undefined, () => void>;
    importedDefault?: Metro.ModuleExports;
    importedAll?: Metro.ModuleExports;
    error?: If<Initialized, undefined, any>;
  };
  type ModuleList = Map<Metro.ModuleID, ModuleDefinition>;
}
/**
 * Maybe the default export matched instead of the namespace, because you're using `options.returnNamespace`.
 */
type MaybeDefaultExportMatched<T> = T | {
  default: T;
};
//#endregion
export { useIsFirstRender as $, AllOf as A, FilterGenerator as B, index_d_exports as C, withoutProps as D, withSingleProp as E, and as F, UnionFilterInfo as G, FilterInfoOf as H, anyOf as I, FilterInfo as J, createFilterGenerator as K, or as L, AnyOf as M, Or as N, ComparableDependencyMap as O, allOf as P, findInReactFiber as Q, Filter as R, WithoutProps as S, withProps as T, FilterResult as U, FilterHelpers as V, MergeFilterInfo as W, FilterScopeValue as X, FilterScope as Y, FilterScopes as Z, lookupGeneratedIconComponent as _, AnyObject as a, cloneDeep as at, WithProps as b, If as c, isObject as ct, LogicalOr as d, debounce as dt, useReRender as et, Not as f, noop as ft, WithGeneratedIconComponent as g, PreInitPluginApiUtils as h, AnyFunction as i, findInTree as it, And as j, withDependencies as k, KeyWithType as l, mergeDeep as lt, PluginApiUtils as m, Metro as n, SearchFilter as nt, DeepPartial as o, defineLazyProperties as ot, Nullish as p, DefaultFilterInfo as q, RevengeMetro as r, SearchTree as rt, ExtractPredicate as s, defineLazyProperty as st, MaybeDefaultExportMatched as t, FindInTreeOptions as tt, LogicalAnd as u, asap as ut, withGeneratedIconComponent as v, withName as w, WithSingleProp as x, WithName as y, FilterBase as z };