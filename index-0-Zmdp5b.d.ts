import { a as AnyObject, i as AnyFunction } from "./types-BIlurZpa.js";
import { n as ReactNavigationParamList } from "./react-navigation-C0E6Cr3d.js";
import { ComponentProps, ComponentType, FC, ForwardRefExoticComponent, MemoExoticComponent, ReactElement, ReactNode, RefAttributes, RefObject } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ImageSourcePropType, ImageStyle, LayoutRectangle, NativeScrollEvent, PressableProps, ScrollView, ScrollViewProps, StyleProp, TextInputProps as TextInputProps$1, TextProps as TextProps$1, TextStyle, View, ViewProps, ViewStyle } from "react-native";
import { NativeGesture } from "react-native-gesture-handler";
import { AnimatedRef, SharedValue } from "react-native-reanimated";
import * as NodeBuffer from "buffer";
//#region lib/discord/src/types/api.d.ts
declare module '@revenge-mod/plugins/types' {
  interface InitPluginApi<O extends PluginApiExtensionsOptions> {
    logger: DiscordModules.Logger;
  }
}
//#endregion
//#region lib/discord/src/types/polyfills.d.ts
declare global {
  var Buffer: typeof NodeBuffer.Buffer;
}
//#endregion
//#region lib/discord/src/types/index.d.ts
declare namespace DiscordModules {
  namespace Flux {
    interface DispatcherPayload {
      type: string;
      [key: PropertyKey]: any;
    }
    type DispatcherDependency = any;
    interface StoreChangeCallbacks {
      add(cb: () => void): void;
      addConditional(cb: () => boolean): void;
      listeners: Set<() => void>;
      remove(cb: () => void): void;
      has(cb: () => void): boolean;
      hasAny(): boolean;
      invokeAll(): void;
    }
    type Store<T = object> = T & {
      addChangeListener(cb: () => void): void;
      removeChangeListener(cb: () => void): void;
      addReactChangeListener(cb: () => void): void;
      removeReactChangeListener(cb: () => void): void;
      addConditionalChangeListener(cb: () => boolean): void;
      callback(cb: () => void): void;
      throttledCallback(): unknown;
      getName(): string;
      __getLocalVars?(): object;
      _changeCallbacks: StoreChangeCallbacks;
      _isInitialized: boolean;
      _version: number;
      _reactChangeCallbacks: StoreChangeCallbacks;
      _dispatchToken: string;
    };
    interface Dispatcher {
      _actionHandlers: unknown;
      _interceptors?: ((payload: DispatcherPayload) => undefined | boolean)[];
      _currentDispatchActionType: undefined | string;
      _processingWaitQueue: boolean;
      _subscriptions: Record<string, Set<(payload: DispatcherPayload) => void>>;
      _waitQueue: unknown[];
      addDependencies(node1: DispatcherDependency, node2: DispatcherDependency): void;
      dispatch(payload: DispatcherPayload): Promise<void>;
      flushWaitQueue(): void;
      isDispatching(): boolean;
      register(name: string, actionHandler: Record<string, (e: DispatcherPayload) => void>, storeDidChange: (e: DispatcherPayload) => boolean): string;
      setInterceptor(interceptor?: (payload: DispatcherPayload) => undefined | boolean): void;
      /**
       * Subscribes to an action type
       * @param actionType The action type to subscribe to
       * @param callback The callback to call when the action is dispatched
       */
      subscribe(actionType: string, callback: (payload: DispatcherPayload) => void): void;
      /**
       * Unsubscribes from an action type
       * @param actionType The action type to unsubscribe from
       * @param callback The callback to remove
       */
      unsubscribe(actionType: string, callback: (payload: DispatcherPayload) => void): void;
      wait(cb: () => void): void;
    }
  }
  namespace AppStartPerformance {
    type MarkArgs = [emoji: string, log: string, delta?: number];
  }
  interface AppStartPerformance {
    mark(...args: AppStartPerformance.MarkArgs): void;
    markAndLog(logger: Logger, ...args: AppStartPerformance.MarkArgs): void;
    [index: string]: unknown;
  }
  interface Constants {
    [K: string]: string | number | boolean | null | AnyFunction | Constants;
  }
  /**
   * Discord's `Logger` class.
   *
   * Logs will be shown in the **Debug Logs** section in settings.
   */
  class Logger {
    constructor(tag: string);
    logDangerously(...args: unknown[]): void;
    log(...args: unknown[]): void;
    error(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    info(...args: unknown[]): void;
    time(...args: unknown[]): void;
    trace(...args: unknown[]): void;
    fileOnly(...args: unknown[]): void;
    verboseDangerously(...args: unknown[]): void;
    verbose(...args: unknown[]): void;
  }
  namespace Actions {
    interface AlertActionCreators {
      openAlert(key: string, alert: ReactElement, onDismiss?: () => unknown, options?: {
        dismissable?: boolean;
      }): void;
      dismissAlert(key: string): void;
      dismissAlerts(): void;
      useAlertStore(): unknown;
    }
    interface ToastActionCreators {
      open(options: {
        key: string;
        content?: string;
        icon?: number | FC;
        IconComponent?: FC;
        /**
         * The icon's color, same string format as `<Text>`'s color prop
         */
        iconColor?: string;
        containerStyle?: ViewStyle;
      }): void;
      close(): void;
    }
    interface ActionSheetActionCreators {
      openLazy<T extends ComponentType<any>>(sheet: Promise<{
        default: T;
      }>, key: string, props: {
        impressionName?: string;
        impressionProperties?: AnyObject;
        backdropKind?: string;
        disableHapticOnOpen?: boolean;
        appEntryKey?: string;
      } & ComponentProps<T>, stackingBehavior?: 'replaceTopSheet' | 'replaceAll' | 'stack'): void;
      hideActionSheet(key?: string): void;
      hideAllActionSheets(): void;
      setActionSheetZIndex(zIndex: number): void;
      resetActionSheetsForAppEntryKey(appEntryKey: string): void;
    }
  }
  namespace Components {
    namespace Styles {
      type TextType = 'heading' | 'text';
      type BasicTextSize = 'sm' | 'md' | 'lg';
      type BasicTextSizeWithExtraLarges = BasicTextSize | 'xl' | 'xxl';
      type TextSize = BasicTextSizeWithExtraLarges | 'xs' | 'xxs';
      type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
      type TextWeightWithExtraBold = TextWeight | 'extrabold';
      type RedesignTextCategory = 'message-preview' | 'channel-title';
      type TextVariant = `heading-${BasicTextSizeWithExtraLarges}/${TextWeightWithExtraBold}` | `text-${TextSize}/${TextWeight}` | `display-${BasicTextSize}` | `redesign/${RedesignTextCategory}/${TextWeight}` | 'redesign/heading-18/bold' | 'eyebrow';
      type TextStyleSheet = Record<TextVariant, TextStyle>;
      type CreateStylesFunction = <const S extends Record<string, TextStyle | ViewStyle | ImageStyle>>(styles: S) => () => S;
    }
    type UseTooltipFunction = (ref: RefObject<View | null>, props: UseTooltipFunctionProps) => unknown;
    interface UseTooltipFunctionProps {
      label: string;
      position?: 'top' | 'bottom';
      visible?: boolean;
      onPress?: () => void;
    }
    interface BaseButtonProps extends PressableProps, RefAttributes<View> {
      disabled?: boolean;
      size?: ButtonSize;
      variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'active' | 'expressive' | 'primary-overlay' | 'secondary-overlay';
      loading?: boolean;
      grow?: boolean;
      scaleAmountInPx?: number;
    }
    interface ButtonProps extends BaseButtonProps {
      icon?: number;
      loading?: boolean;
      iconPosition?: 'start' | 'end';
      renderIcon?(): ReactNode;
      renderRightIcon?(): ReactNode;
      renderShine?(): ReactNode;
      renderLinearGradient?(): ReactNode;
      cornerRadius?: number;
      textStyle?: TextStyle;
      loadingColorLight?: string;
      loadingColorDark?: string;
      text: string;
    }
    type ButtonSize = 'sm' | 'md' | 'lg';
    type Button = FC<ButtonProps>;
    interface IconButtonProps extends BaseButtonProps {
      icon: number;
      label?: string;
    }
    type IconButton = FC<IconButtonProps>;
    interface ImageButtonProps extends BaseButtonProps {
      image: ImageSourcePropType;
    }
    type ImageButton = FC<ImageButtonProps>;
    interface FloatingActionButtonProps {
      icon: number;
      onPress: () => void;
      disabled?: boolean;
      positionBottom?: number;
      accessibilityLabel?: string;
    }
    type FloatingActionButton = FC<FloatingActionButtonProps>;
    interface StackProps extends ViewProps {
      spacing?: number;
      align?: ViewStyle['alignItems'];
      justify?: ViewStyle['justifyContent'];
      direction?: 'vertical' | 'horizontal';
    }
    type Stack = FC<StackProps>;
    interface CardProps extends ViewProps {
      start?: boolean;
      end?: boolean;
      variant?: 'primary' | 'secondary' | 'transparent';
      border?: 'faint' | 'normal' | 'strong' | 'subtle' | 'none';
      shadow?: 'none' | 'low' | 'medium' | 'high' | 'border' | 'ledge';
      children: ReactNode;
    }
    type Card = FC<CardProps>;
    interface TextFieldProps {
      onChange?: (value: string) => void;
      onBlur?: () => void;
      onFocus?: () => void;
      leadingIcon?: FC;
      trailingIcon?: FC;
      leadingText?: string;
      trailingText?: string;
      description?: string;
      errorMessage?: string;
      isDisabled?: boolean;
      focusable?: boolean;
      editable?: boolean;
      status?: TextFieldStatus;
      defaultValue?: string;
      value?: string;
      placeholder?: string;
      placeholderTextColor?: string;
      maxLength?: number;
      multiline?: boolean;
      autoFocus?: boolean;
      secureTextEntry?: boolean;
      returnKeyType?: TextInputProps$1['returnKeyType'];
      isClearable?: boolean;
      size?: TextFieldSize;
      style?: StyleProp<ViewStyle>;
    }
    type TextFieldSize = 'sm' | 'md' | 'lg';
    type TextFieldStatus = 'default' | 'error';
    interface TextInputProps extends TextFieldProps {
      isRound?: boolean;
      label?: string;
    }
    interface TextAreaProps extends Omit<TextInputProps, 'multiline'> {}
    type TextInput = FC<TextInputProps>;
    type TextField = FC<TextFieldProps>;
    type TextArea = FC<TextAreaProps>;
    interface FormSwitchProps extends ViewProps {
      value: boolean;
      onValueChange(value: boolean): void;
      disabled?: boolean;
    }
    type FormSwitch = FC<FormSwitchProps>;
    interface ActionSheetProps {
      scrollable?: boolean;
      startExpanded?: boolean;
      /** Whether the bottom sheet handle is disabled. */
      handleDisabled?: boolean;
      showGradient?: boolean;
      startHeight?: number;
      maxHeight?: number;
      containerHeight?: number;
      contentHeight?: number;
      backdropOpacity?: number;
      children?: ReactNode;
      header?: ReactNode;
      footer?: ReactNode;
      extraContent?: ReactNode;
      backdropChildren?: ReactNode;
      handleComponent?: ComponentType<any> | null;
      backgroundComponent?: ComponentType<any>;
      bodyStyles?: StyleProp<ViewStyle>;
      contentStyles?: StyleProp<ViewStyle>;
      backgroundStyles?: StyleProp<ViewStyle>;
      borderGradient?: string[] | Record<string, any>;
      onExpand?: () => void;
      onDismiss?: () => void;
      animatedIndex?: unknown;
      keyboardShouldPersistTaps?: 'always' | 'never' | 'handled' | boolean;
      dismissAccessibilityLabel?: string;
    }
    type ActionSheet = ForwardRefExoticComponent<ActionSheetProps & RefAttributes<{
      expandActionSheet(): void;
      closeActionSheet(force?: boolean): void;
      collapseActionSheet(): void;
      snapToIndex(index: number): void;
    }>>;
    interface ActionSheetCloseButtonProps extends Pick<ComponentProps<IconButton>, 'variant' | 'onPress'> {}
    type ActionSheetCloseButton = FC<ActionSheetCloseButtonProps>;
    type ActionSheetRow = TableRow;
    type ActionSheetRowIcon = TableRowIcon;
    type ActionSheetRowGroup = TableRowGroup;
    type ActionSheetSwitchRow = TableSwitchRow;
    interface BottomSheetTitleHeaderProps {
      leading?: ReactNode;
      title: string;
      trailing?: ReactNode;
    }
    type BottomSheetTitleHeader = FC<BottomSheetTitleHeaderProps>;
    type IconSize = 'extraSmall10' | 'extraSmall' | 'small' | 'small20' | 'medium' | 'large' | 'custom' | 'refreshSmall16' | 'small14';
    type TableRowVariant = 'default' | 'danger';
    interface TableCheckboxRowProps extends Omit<TableRowProps, 'trailing'> {
      checked: boolean;
      value: string;
    }
    type TableCheckboxRow = FC<TableCheckboxRowProps>;
    interface TableRadioGroupProps<T = string> extends TableRowGroupProps {
      children: ReactNode;
      onChange: (value: T) => void;
      defaultValue?: T;
    }
    interface TableRadioRowProps<T = any> extends TableRowProps {
      label: string;
      value: T;
    }
    function TableRadioGroup<T>(props: TableRadioGroupProps<T>): ReactElement;
    function TableRadioRow<T>(props: TableRadioRowProps<T>): ReactElement;
    interface TableRowProps {
      label: string;
      subLabel?: ReactNode;
      icon?: ReactNode;
      trailing?: ReactNode;
      arrow?: boolean;
      onPress?: PressableProps['onPress'];
      disabled?: boolean;
      draggable?: boolean;
      dragHandlePressableProps?: PressableProps;
      labelLineClamp?: number;
      subLabelLineClamp?: number;
      start?: boolean;
      end?: boolean;
      variant?: TableRowVariant;
    }
    interface TableRow extends FC<TableRowProps> {
      Arrow: FC;
      Icon: TableRowIcon;
      Group: TableRowGroup;
      TrailingText: TableRowTrailingText;
    }
    interface TableSwitchRowProps extends Omit<TableRowProps, 'trailing'> {
      accessibilityHint?: string;
      value: boolean;
      onValueChange(value: boolean): void;
    }
    type TableSwitchRow = FC<TableSwitchRowProps>;
    interface TableRowGroupProps {
      title?: string;
      description?: string;
      hasIcons?: boolean;
      accessibilityLabel?: string;
      accessibilityRole?: string;
      children: ReactNode;
    }
    type TableRowGroup = FC<TableRowGroupProps>;
    interface TableRowGroupTitleProps {
      title: string;
    }
    type TableRowGroupTitle = FC<TableRowGroupTitleProps>;
    type TableRowIconVariant = 'default' | 'danger' | 'secondary' | 'translucent';
    interface TableRowIconProps {
      source: ImageSourcePropType;
      variant?: TableRowIconVariant;
    }
    type TableRowIcon = FC<TableRowIconProps>;
    interface TableRowTrailingTextProps {
      text: string;
    }
    type TableRowTrailingText = FC<TableRowTrailingTextProps>;
    interface AlertModalProps {
      title?: ReactNode;
      content?: ReactNode;
      extraContent?: ReactNode;
      actions?: ReactNode;
    }
    type AlertModal = FC<AlertModalProps>;
    type AlertActionButton = Button;
    interface ContextMenuProps {
      title: ReactNode;
      triggerOnLongPress?: boolean;
      items: Array<ContextMenuItem | ContextMenuItem[]>;
      align?: 'left' | 'right' | 'above' | 'below';
      children: (props: Partial<BaseButtonProps>) => ReactNode;
    }
    type ContextMenu = FC<ContextMenuProps>;
    interface ContextMenuItem {
      label: string;
      IconComponent?: FC;
      variant?: 'default' | 'destructive';
      action(): void;
    }
    interface TextProps extends TextProps$1 {
      variant?: Styles.TextVariant;
      color?: string;
      style?: StyleProp<TextStyle>;
      lineClamp?: number;
      ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
      tabularNumbers?: boolean;
      children?: ReactNode;
    }
    type Text = FC<TextProps>;
    interface IntlLinkProps {
      target: string;
      children?: ReactNode;
    }
    type IntlLink = FC<IntlLinkProps>;
    interface SliderProps {
      step: number;
      value: number;
      minimumValue: number;
      maximumValue: number;
      onValueChange: (value: number) => void;
      onSlidingStart?: () => void;
      onSlidingComplete?: (value: number) => void;
      startIcon?: ReactNode;
      endIcon?: ReactNode;
    }
    type Slider = FC<SliderProps>;
    interface NavigatorHeaderProps {
      icon?: ReactNode;
      title: string;
      subtitle?: string;
    }
    type NavigatorHeader = FC<NavigatorHeaderProps>;
    interface LayerScopeProps {
      children?: ReactNode;
      zIndex?: number;
    }
    type LayerScope = FC<LayerScopeProps>;
    interface SegmentedControlItem {
      id: string;
      label: string;
      /**
       * The page to render.
       *
       * Only rendered by {@link SegmentedControlPages}.
       */
      page?: ReactNode;
      /**
       * The count to render after the label, formatted by {@link TabsProps.formatCount}.
       *
       * Only rendered by {@link Tabs}.
       */
      count?: number;
      /**
       * The icon to render above the label.
       *
       * Only rendered by {@link SegmentedControl} when its variant is `experimental_Large`.
       */
      icon?: ReactNode;
    }
    interface UseSegmentedControlStateFunctionProps {
      items: SegmentedControlItem[];
      /** The width of a single page. {@link SegmentedControlPages} renders nothing when this is `0`. */
      pageWidth: number;
      /** @default 0 */
      defaultIndex?: number;
      /**
       * The gap between items.
       *
       * @default tokens.space.PX_24
       */
      itemSpacing?: number;
      /** Called once a page has fully scrolled into view. */
      onPageChange?: (index: number) => void;
      /**
       * Called before {@link SegmentedControlState.setActiveIndex} changes the index.
       * The change only happens once `commit` is called.
       */
      onPageChangeStart?: (index: number, commit: () => void) => void;
      /** Called when {@link SegmentedControlState.setActiveIndex} changes the index. */
      onSetActiveIndex?: (index: number) => void;
    }
    interface SegmentedControlState {
      /** The active index. Fractional while the pager is being dragged. */
      activeIndex: SharedValue<number>;
      /** The range of page indices that are currently mounted and unfrozen. */
      visiblePageRange: SharedValue<[start: number, end: number]>;
      /** Ref to {@link SegmentedControlPages}' scroll view. */
      pagerRef: AnimatedRef<ScrollView>;
      /** The scroll offset the pager is animating to, or `-1` when it is not animating. */
      scrollTarget: SharedValue<number>;
      /** How far the pager is overscrolled past its bounds. Used to squish the indicator. */
      scrollOverflow: SharedValue<number>;
      /** The horizontal scroll offset of the {@link Tabs} bar. */
      scrollOffset: SharedValue<number>;
      items: SegmentedControlItem[];
      /** The measured layout of every item, keyed by index. */
      itemDimensions: SharedValue<LayoutRectangle[]>;
      itemSpacing: number;
      pageWidth: number;
      /** The index of the item currently being pressed, or `-1`. */
      pressedIndex: SharedValue<number>;
      onPageChangeRef: RefObject<((index: number) => void) | undefined>;
      /**
       * Scrolls to, and activates, the given index.
       *
       * @param index The index to activate.
       * @param hapticFeedback Whether to trigger haptic feedback. Defaults to `true`.
       * @param immediate Whether to skip the scroll animation. Defaults to `false`.
       */
      setActiveIndex(index: number, hapticFeedback?: boolean, immediate?: boolean): void;
      setItemDimensions(index: number, dimensions: LayoutRectangle): void;
      useReducedMotion: boolean;
    }
    type UseSegmentedControlStateFunction = (props: UseSegmentedControlStateFunctionProps) => SegmentedControlState;
    interface TabsProps {
      state: SegmentedControlState;
      /**
       * Whether items should grow to fill the available width.
       *
       * @default true
       */
      grow?: boolean;
      /**
       * Formats {@link SegmentedControlItem.count}.
       *
       * @default count => count.toLocaleString(locale)
       */
      formatCount?: (count: number) => string;
      /**
       * A gesture the tab bar may be scrolled simultaneously with.
       *
       * Usually {@link SegmentedControlPagesProps.nativeGesture}, so dragging the
       * pager does not cancel the tab bar's own scroll gesture.
       */
      simultaneousHandlers?: NativeGesture;
      /** Worklet called with the horizontal scroll offset of the tab bar. */
      onScrollWorklet?: (offsetX: number) => void;
      /** Worklet called once the user stops dragging the tab bar. */
      onEndDrag?: () => void;
      /** Use `gradient-background` to color the indicator and labels for non-flat backgrounds. */
      variant?: 'gradient-background';
    }
    type Tabs = FC<TabsProps>;
    interface SegmentedControlPagesProps {
      state: SegmentedControlState;
      style?: StyleProp<ViewStyle>;
      bounces?: boolean;
      /**
       * A gesture the pager may be scrolled simultaneously with.
       *
       * The pager is wrapped in a `GestureDetector` for this gesture.
       */
      nativeGesture?: NativeGesture;
      /** Worklet called whenever the pager scrolls. */
      onScrollWorklet?: (event: NativeScrollEvent) => void;
      /** Worklet called once the user starts dragging the pager. */
      onBeginDragWorklet?: (event: NativeScrollEvent) => void;
      /** Worklet called once the user stops dragging the pager. */
      onEndDragWorklet?: (event: NativeScrollEvent) => void;
    }
    type SegmentedControlPages = FC<SegmentedControlPagesProps>;
    interface SegmentedControlProps {
      state: SegmentedControlState;
      /**
       * `experimental_Large` additionally renders {@link SegmentedControlItem.icon}s,
       * doubles the spacing around the indicator, scales labels up, and lets the
       * indicator be dragged between segments.
       *
       * `experimental_Small` only shrinks the vertical padding of the segments.
       *
       * @default 'default'
       */
      variant?: 'default' | 'experimental_Small' | 'experimental_Large';
      /** Forwarded to the underlying horizontal `ScrollView`. */
      keyboardShouldPersistTaps?: ScrollViewProps['keyboardShouldPersistTaps'];
    }
    type SegmentedControl = FC<SegmentedControlProps>;
  }
  namespace Modules {
    namespace Settings {
      export interface SettingListRenderer {
        SettingsList: SettingsList;
        SearchableSettingsList: SearchableSettingsList;
      }
      export interface SettingsListProps {
        containerStyle?: StyleProp<ViewStyle>;
        initialSetting?: string;
        node: {
          type: 'list';
          ListHeaderComponent?: ComponentType;
          ListFooterComponent?: ComponentType;
          sections: Array<{
            label?: string | ReactNode;
            settings: string[];
            subLabel?: string | ReactNode;
          }>;
        };
      }
      export type SettingsList = MemoExoticComponent<FC<SettingsListProps>>;
      export type SearchableSettingsList = MemoExoticComponent<FC<SettingsListProps>>;
      export interface SettingsSection {
        label: string;
        settings: string[];
        index?: number;
      }
      interface BaseSettingsItem {
        useTitle: () => string;
        parent: string | null;
        unsearchable?: boolean;
        variant?: Components.TableRowProps['variant'];
        IconComponent?: () => ReactNode;
        usePredicate?: () => boolean;
        useTrailing?: () => ReactNode;
        useDescription?: () => string;
        useIsDisabled?: () => boolean;
      }
      export interface PressableSettingsItem extends BaseSettingsItem {
        type: 'pressable';
        withArrow?: boolean;
        onPress?: () => void;
      }
      export interface ToggleSettingsItem extends BaseSettingsItem {
        type: 'toggle';
        useValue: () => boolean;
        onValueChange?: (value: boolean) => void;
      }
      export interface RouteSettingsItem extends BaseSettingsItem {
        type: 'route';
        screen: {
          route: string;
          getComponent(): ComponentType<StackScreenProps<ReactNavigationParamList>>;
        };
      }
      export interface StaticSettingsItem extends BaseSettingsItem {
        type: 'static';
      }
      export type SettingsItem = PressableSettingsItem | ToggleSettingsItem | RouteSettingsItem | StaticSettingsItem;
      export {};
    }
  }
  namespace Utils {
    namespace TypedEventEmitter {
      type DefaultEventMap = [never];
      type EventMap<T> = Record<keyof T, any[]> | DefaultEventMap;
      type Listener<T, K extends keyof T> = T[K] extends any[] ? (...args: T[K]) => void : never;
    }
    class TypedEventEmitter<T extends Record<string, any[]> = Record<string, any[]>> {
      addListener<K extends keyof T>(event: K, listener: TypedEventEmitter.Listener<T, K>): this;
      on<K extends keyof T>(event: K, listener: TypedEventEmitter.Listener<T, K>): this;
      once<K extends keyof T>(event: K, listener: TypedEventEmitter.Listener<T, K>): this;
      removeListener<K extends keyof T>(event: K, listener: TypedEventEmitter.Listener<T, K>): this;
      off<K extends keyof T>(event: K, listener: TypedEventEmitter.Listener<T, K>): this;
      removeAllListeners(event?: keyof T): this;
      emit<K extends keyof T>(event: K, ...args: T[K]): boolean;
      listenerCount<K extends keyof T>(event: K, listener?: TypedEventEmitter.Listener<T, K>): number;
    }
  }
}
//#endregion
export { DiscordModules as t };