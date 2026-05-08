/**
 * AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
 * 
 * Monaco Editor type definitions for SignalX packages.
 * Generated using dts-bundle-generator from actual source files.
 * 
 * Generated: 2026-05-08T11:51:17.839Z
 * 
 * To regenerate: pnpm run generate:types
 */

/** List of modules that can be imported in Live Code */
export const ALLOWED_MODULES = [
    "sigx",
    "@sigx/router",
    "@sigx/store",
    "@sigx/daisyui"
] as const;

export type AllowedModule = typeof ALLOWED_MODULES[number];

/** Module to window global variable mapping */
export const MODULE_GLOBALS: Record<AllowedModule, string> = {
    'sigx': '__SIGX__',
    '@sigx/router': '__SIGX_ROUTER__',
    '@sigx/store': '__SIGX_STORE__',
    '@sigx/daisyui': '__SIGX_DAISYUI__'
};

/** JSX Runtime types */
export const jsxRuntimeTypes = `
declare module "sigx/jsx-runtime" {
    export function jsx(type: any, props: any, key?: any): JSX.Element;
    export function jsxs(type: any, props: any, key?: any): JSX.Element;
    export function jsxDEV(type: any, props: any, key?: any): JSX.Element;
    export const Fragment: unique symbol;
}
`;

/** Ambient JSX types (global namespace) - includes CSSProperties, HTMLAttributes, IntrinsicElements */
export const sigxTypes = `type CSSNumericProperty = string | number;
interface CSSProperties {
    position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky' | (string & {});
    top?: CSSNumericProperty;
    right?: CSSNumericProperty;
    bottom?: CSSNumericProperty;
    left?: CSSNumericProperty;
    zIndex?: CSSNumericProperty;
    width?: CSSNumericProperty;
    height?: CSSNumericProperty;
    minWidth?: CSSNumericProperty;
    maxWidth?: CSSNumericProperty;
    minHeight?: CSSNumericProperty;
    maxHeight?: CSSNumericProperty;
    margin?: CSSNumericProperty;
    marginTop?: CSSNumericProperty;
    marginRight?: CSSNumericProperty;
    marginBottom?: CSSNumericProperty;
    marginLeft?: CSSNumericProperty;
    padding?: CSSNumericProperty;
    paddingTop?: CSSNumericProperty;
    paddingRight?: CSSNumericProperty;
    paddingBottom?: CSSNumericProperty;
    paddingLeft?: CSSNumericProperty;
    display?: string;
    flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | (string & {});
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse' | (string & {});
    justifyContent?: string;
    alignItems?: string;
    alignContent?: string;
    alignSelf?: string;
    flex?: CSSNumericProperty;
    flexGrow?: CSSNumericProperty;
    flexShrink?: CSSNumericProperty;
    flexBasis?: CSSNumericProperty;
    order?: CSSNumericProperty;
    gap?: CSSNumericProperty;
    rowGap?: CSSNumericProperty;
    columnGap?: CSSNumericProperty;
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    gridColumn?: string;
    gridRow?: string;
    gridArea?: string;
    gridGap?: CSSNumericProperty;
    fontSize?: CSSNumericProperty;
    fontFamily?: string;
    fontWeight?: CSSNumericProperty;
    fontStyle?: string;
    lineHeight?: CSSNumericProperty;
    letterSpacing?: CSSNumericProperty;
    textAlign?: 'left' | 'center' | 'right' | 'justify' | (string & {});
    textDecoration?: string;
    textTransform?: string;
    whiteSpace?: string;
    wordBreak?: string;
    wordWrap?: string;
    overflowWrap?: string;
    color?: string;
    backgroundColor?: string;
    background?: string;
    backgroundImage?: string;
    backgroundSize?: string;
    backgroundPosition?: string;
    backgroundRepeat?: string;
    border?: string;
    borderWidth?: CSSNumericProperty;
    borderStyle?: string;
    borderColor?: string;
    borderRadius?: CSSNumericProperty;
    borderTop?: string;
    borderRight?: string;
    borderBottom?: string;
    borderLeft?: string;
    opacity?: CSSNumericProperty;
    visibility?: 'visible' | 'hidden' | 'collapse' | (string & {});
    overflow?: 'visible' | 'hidden' | 'scroll' | 'auto' | (string & {});
    overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto' | (string & {});
    overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto' | (string & {});
    boxShadow?: string;
    textShadow?: string;
    transform?: string;
    transformOrigin?: string;
    transition?: string;
    transitionProperty?: string;
    transitionDuration?: string;
    transitionTimingFunction?: string;
    transitionDelay?: string;
    animation?: string;
    cursor?: string;
    pointerEvents?: 'auto' | 'none' | (string & {});
    userSelect?: 'auto' | 'none' | 'text' | 'all' | (string & {});
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | (string & {});
    objectPosition?: string;
    aspectRatio?: CSSNumericProperty;
    placeItems?: string;
    placeContent?: string;
    placeSelf?: string;
    inset?: CSSNumericProperty;
    insetBlock?: CSSNumericProperty;
    insetInline?: CSSNumericProperty;
    containerType?: 'normal' | 'size' | 'inline-size' | (string & {});
    containerName?: string;
    contain?: string;
    contentVisibility?: 'visible' | 'hidden' | 'auto' | (string & {});
    backdropFilter?: string;
    clipPath?: string;
    filter?: string;
    maskImage?: string;
    maskSize?: string;
    maskPosition?: string;
    maskRepeat?: string;
    overscrollBehavior?: string;
    scrollSnapType?: string;
    scrollSnapAlign?: string;
    scrollBehavior?: 'auto' | 'smooth' | (string & {});
    scrollMargin?: CSSNumericProperty;
    scrollPadding?: CSSNumericProperty;
    textDecorationThickness?: CSSNumericProperty;
    textUnderlineOffset?: CSSNumericProperty;
    accentColor?: string;
    colorScheme?: string;
    [key: string]: CSSNumericProperty | undefined;
}

// JSX Attribute Interfaces at top level (extracted from namespace JSX)

interface DirectiveAttributeExtensions {
 *             'use:myDirective'?: DirectiveDefinition<string> | [DirectiveDefinition<string>, string];
 *         }

interface DirectiveAttributeExtensions {
}

interface HTMLAttributes<T = HTMLElement>, DirectiveAttributeExtensions {
    children?: any;
    ref?: (el: T) => void;
    accept?: string;
    acceptCharset?: string;
    accessKey?: string;
    action?: string;
    allow?: string;
    allowFullScreen?: boolean;
    allowTransparency?: boolean;
    alt?: string;
    async?: boolean;
    autoComplete?: string;
    autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
    autoFocus?: boolean;
    autofocus?: boolean;
    autoPlay?: boolean;
    capture?: boolean | string;
    cellPadding?: number | string;
    cellSpacing?: number | string;
    charSet?: string;
    checked?: boolean;
    cite?: string;
    class?: string;
    className?: string;
    cols?: number;
    colSpan?: number;
    content?: string;
    contentEditable?: boolean | 'true' | 'false' | 'inherit';
    contextMenu?: string;
    controls?: boolean;
    coords?: string;
    crossOrigin?: string;
    data?: string;
    dateTime?: string;
    decoding?: 'sync' | 'async' | 'auto';
    default?: boolean;
    defer?: boolean;
    dir?: 'ltr' | 'rtl' | 'auto';
    dirname?: string;
    disabled?: boolean;
    download?: any;
    draggable?: boolean | 'true' | 'false';
    encType?: string;
    enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
    exportparts?: string;
    for?: string;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    fetchPriority?: 'high' | 'low' | 'auto';
    fetchpriority?: 'high' | 'low' | 'auto';
    frameBorder?: number | string;
    headers?: string;
    height?: number | string;
    hidden?: boolean | 'hidden' | 'until-found' | '';
    high?: number;
    href?: string;
    hrefLang?: string;
    htmlFor?: string;
    httpEquiv?: string;
    id?: string;
    inert?: boolean;
    inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    integrity?: string;
    is?: string;
    keyParams?: string;
    keyType?: string;
    kind?: string;
    label?: string;
    lang?: string;
    list?: string;
    loading?: 'lazy' | 'eager';
    loop?: boolean;
    low?: number;
    manifest?: string;
    marginHeight?: number;
    marginWidth?: number;
    max?: number | string;
    maxLength?: number;
    media?: string;
    mediaGroup?: string;
    method?: string;
    min?: number | string;
    minLength?: number;
    multiple?: boolean;
    muted?: boolean;
    name?: string;
    noValidate?: boolean;
    nonce?: string;
    open?: boolean;
    optimum?: number;
    part?: string;
    pattern?: string;
    placeholder?: string;
    ping?: string;
    playsInline?: boolean;
    popover?: 'auto' | 'manual' | '' | boolean;
    popoverTarget?: string;
    popoverTargetAction?: 'toggle' | 'show' | 'hide';
    poster?: string;
    preload?: string;
    readOnly?: boolean;
    referrerPolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url' | '';
    rel?: string;
    required?: boolean;
    reversed?: boolean;
    role?: string;
    rows?: number;
    rowSpan?: number;
    sandbox?: string;
    scope?: string;
    scoped?: boolean;
    scrolling?: string;
    seamless?: boolean;
    selected?: boolean;
    shape?: string;
    size?: number;
    sizes?: string;
    slot?: string;
    span?: number;
    spellCheck?: boolean | 'true' | 'false';
    src?: string;
    srcDoc?: string;
    srcLang?: string;
    srcSet?: string;
    start?: number;
    step?: number | string;
    style?: string | CSSProperties;
    summary?: string;
    tabIndex?: number;
    target?: string;
    title?: string;
    translate?: 'yes' | 'no' | '';
    type?: string;
    useMap?: string;
    value?: string | string[] | number;
    width?: number | string;
    wmode?: string;
    wrap?: string;
    blocking?: 'render' | '';
    elementTiming?: string;
    onAbort?: (event: Event) => void;
    onAnimationCancel?: (event: AnimationEvent) => void;
    onAnimationEnd?: (event: AnimationEvent) => void;
    onAnimationIteration?: (event: AnimationEvent) => void;
    onAnimationStart?: (event: AnimationEvent) => void;
    onBeforeInput?: (event: InputEvent) => void;
    onBlur?: (event: FocusEvent) => void;
    onCancel?: (event: Event) => void;
    onCanPlay?: (event: Event) => void;
    onCanPlayThrough?: (event: Event) => void;
    onChange?: (event: Event) => void;
    onClick?: (event: MouseEvent) => void;
    onClose?: (event: Event) => void;
    onCompositionEnd?: (event: CompositionEvent) => void;
    onCompositionStart?: (event: CompositionEvent) => void;
    onCompositionUpdate?: (event: CompositionEvent) => void;
    onContextMenu?: (event: MouseEvent) => void;
    onCopy?: (event: ClipboardEvent) => void;
    onCueChange?: (event: Event) => void;
    onCut?: (event: ClipboardEvent) => void;
    onDblClick?: (event: MouseEvent) => void;
    onDrag?: (event: DragEvent) => void;
    onDragEnd?: (event: DragEvent) => void;
    onDragEnter?: (event: DragEvent) => void;
    onDragExit?: (event: DragEvent) => void;
    onDragLeave?: (event: DragEvent) => void;
    onDragOver?: (event: DragEvent) => void;
    onDragStart?: (event: DragEvent) => void;
    onDrop?: (event: DragEvent) => void;
    onDurationChange?: (event: Event) => void;
    onEmptied?: (event: Event) => void;
    onEnded?: (event: Event) => void;
    onError?: (event: Event) => void;
    onFocus?: (event: FocusEvent) => void;
    onGotPointerCapture?: (event: PointerEvent) => void;
    onInput?: (event: InputEvent) => void;
    onInvalid?: (event: Event) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
    onKeyPress?: (event: KeyboardEvent) => void;
    onKeyUp?: (event: KeyboardEvent) => void;
    onLoad?: (event: Event) => void;
    onLoadedData?: (event: Event) => void;
    onLoadedMetadata?: (event: Event) => void;
    onLoadStart?: (event: Event) => void;
    onLostPointerCapture?: (event: PointerEvent) => void;
    onMouseDown?: (event: MouseEvent) => void;
    onMouseEnter?: (event: MouseEvent) => void;
    onMouseLeave?: (event: MouseEvent) => void;
    onMouseMove?: (event: MouseEvent) => void;
    onMouseOut?: (event: MouseEvent) => void;
    onMouseOver?: (event: MouseEvent) => void;
    onMouseUp?: (event: MouseEvent) => void;
    onMouseWheel?: (event: Event) => void;
    onPaste?: (event: ClipboardEvent) => void;
    onPause?: (event: Event) => void;
    onPlay?: (event: Event) => void;
    onPlaying?: (event: Event) => void;
    onPointerCancel?: (event: PointerEvent) => void;
    onPointerDown?: (event: PointerEvent) => void;
    onPointerEnter?: (event: PointerEvent) => void;
    onPointerLeave?: (event: PointerEvent) => void;
    onPointerMove?: (event: PointerEvent) => void;
    onPointerOut?: (event: PointerEvent) => void;
    onPointerOver?: (event: PointerEvent) => void;
    onPointerUp?: (event: PointerEvent) => void;
    onProgress?: (event: Event) => void;
    onRateChange?: (event: Event) => void;
    onReset?: (event: Event) => void;
    onResize?: (event: UIEvent) => void;
    onScroll?: (event: UIEvent) => void;
    onSeeked?: (event: Event) => void;
    onSeeking?: (event: Event) => void;
    onSelect?: (event: Event) => void;
    onShow?: (event: Event) => void;
    onStalled?: (event: Event) => void;
    onSubmit?: (event: Event) => void;
    onSuspend?: (event: Event) => void;
    onTimeUpdate?: (event: Event) => void;
    onToggle?: (event: Event) => void;
    onTouchCancel?: (event: TouchEvent) => void;
    onTouchEnd?: (event: TouchEvent) => void;
    onTouchMove?: (event: TouchEvent) => void;
    onTouchStart?: (event: TouchEvent) => void;
    onTransitionCancel?: (event: TransitionEvent) => void;
    onTransitionEnd?: (event: TransitionEvent) => void;
    onTransitionRun?: (event: TransitionEvent) => void;
    onTransitionStart?: (event: TransitionEvent) => void;
    onVolumeChange?: (event: Event) => void;
    onWaiting?: (event: Event) => void;
    onWheel?: (event: WheelEvent) => void;
    onabort?: (event: Event) => void;
    onanimationcancel?: (event: AnimationEvent) => void;
    onanimationend?: (event: AnimationEvent) => void;
    onanimationiteration?: (event: AnimationEvent) => void;
    onanimationstart?: (event: AnimationEvent) => void;
    onbeforeinput?: (event: InputEvent) => void;
    onblur?: (event: FocusEvent) => void;
    oncancel?: (event: Event) => void;
    oncanplay?: (event: Event) => void;
    oncanplaythrough?: (event: Event) => void;
    onchange?: (event: Event) => void;
    onclick?: (event: MouseEvent) => void;
    onclose?: (event: Event) => void;
    oncompositionend?: (event: CompositionEvent) => void;
    oncompositionstart?: (event: CompositionEvent) => void;
    oncompositionupdate?: (event: CompositionEvent) => void;
    oncontextmenu?: (event: MouseEvent) => void;
    oncopy?: (event: ClipboardEvent) => void;
    oncuechange?: (event: Event) => void;
    oncut?: (event: ClipboardEvent) => void;
    ondblclick?: (event: MouseEvent) => void;
    ondrag?: (event: DragEvent) => void;
    ondragend?: (event: DragEvent) => void;
    ondragenter?: (event: DragEvent) => void;
    ondragexit?: (event: DragEvent) => void;
    ondragleave?: (event: DragEvent) => void;
    ondragover?: (event: DragEvent) => void;
    ondragstart?: (event: DragEvent) => void;
    ondrop?: (event: DragEvent) => void;
    ondurationchange?: (event: Event) => void;
    onemptied?: (event: Event) => void;
    onended?: (event: Event) => void;
    onerror?: (event: Event | string) => void;
    onfocus?: (event: FocusEvent) => void;
    ongotpointercapture?: (event: PointerEvent) => void;
    oninput?: (event: InputEvent) => void;
    oninvalid?: (event: Event) => void;
    onkeydown?: (event: KeyboardEvent) => void;
    onkeypress?: (event: KeyboardEvent) => void;
    onkeyup?: (event: KeyboardEvent) => void;
    onload?: (event: Event) => void;
    onloadeddata?: (event: Event) => void;
    onloadedmetadata?: (event: Event) => void;
    onloadstart?: (event: Event) => void;
    onlostpointercapture?: (event: PointerEvent) => void;
    onmousedown?: (event: MouseEvent) => void;
    onmouseenter?: (event: MouseEvent) => void;
    onmouseleave?: (event: MouseEvent) => void;
    onmousemove?: (event: MouseEvent) => void;
    onmouseout?: (event: MouseEvent) => void;
    onmouseover?: (event: MouseEvent) => void;
    onmouseup?: (event: MouseEvent) => void;
    onmousewheel?: (event: Event) => void;
    onpaste?: (event: ClipboardEvent) => void;
    onpause?: (event: Event) => void;
    onplay?: (event: Event) => void;
    onplaying?: (event: Event) => void;
    onpointercancel?: (event: PointerEvent) => void;
    onpointerdown?: (event: PointerEvent) => void;
    onpointerenter?: (event: PointerEvent) => void;
    onpointerleave?: (event: PointerEvent) => void;
    onpointermove?: (event: PointerEvent) => void;
    onpointerout?: (event: PointerEvent) => void;
    onpointerover?: (event: PointerEvent) => void;
    onpointerup?: (event: PointerEvent) => void;
    onprogress?: (event: Event) => void;
    onratechange?: (event: Event) => void;
    onreset?: (event: Event) => void;
    onresize?: (event: UIEvent) => void;
    onscroll?: (event: UIEvent) => void;
    onseeked?: (event: Event) => void;
    onseeking?: (event: Event) => void;
    onselect?: (event: Event) => void;
    onshow?: (event: Event) => void;
    onstalled?: (event: Event) => void;
    onsubmit?: (event: Event) => void;
    onsuspend?: (event: Event) => void;
    ontimeupdate?: (event: Event) => void;
    ontoggle?: (event: Event) => void;
    ontouchcancel?: (event: TouchEvent) => void;
    ontouchend?: (event: TouchEvent) => void;
    ontouchmove?: (event: TouchEvent) => void;
    ontouchstart?: (event: TouchEvent) => void;
    ontransitioncancel?: (event: TransitionEvent) => void;
    ontransitionend?: (event: TransitionEvent) => void;
    ontransitionrun?: (event: TransitionEvent) => void;
    ontransitionstart?: (event: TransitionEvent) => void;
    onvolumechange?: (event: Event) => void;
    onwaiting?: (event: Event) => void;
    onwheel?: (event: WheelEvent) => void;
    [key: \`on\${string}\`]: any;
    [key: \`aria-\${string}\`]: any;
    [key: \`data-\${string}\`]: any;
    [key: \`use:\${string}\`]: import('@sigx/runtime-core').DirectiveDefinition | [import('@sigx/runtime-core').DirectiveDefinition, any] | any;
    /**
     * DOM property access — bypasses setAttribute, sets the property directly on the element.
     *
     * Prefix any DOM property name with \`prop:\` to force a direct property assignment:
     *   \`prop:innerHTML\`, \`prop:textContent\`, \`prop:innerText\`, \`prop:value\`, etc.
     *
     * The \`prop:\` prefix is stripped at runtime — \`<div prop:innerHTML={html} />\`
     * becomes \`element.innerHTML = html\`.
     *
     * @example
     * \`\`\`tsx
     * <div prop:innerHTML={renderMarkdownToHtml(content)} />
     * <input prop:value={rawValue} />
     * \`\`\`
     */
    [key: \`prop:\${string}\`]: any;
}

interface FormElementAttributes<T = HTMLElement, V = any> extends HTMLAttributes<T> {
    model?: [object, string] | (() => V) | Model<any>;
    [key: \`model:\${string}\`]: [object, string] | (() => any);
    "onUpdate:modelValue"?: (value: V) => void;
}

interface NumberInputAttributes<T = HTMLInputElement> extends FormElementAttributes<T, number> {
    type: "number";
    value?: number | string;
}

interface RangeInputAttributes<T = HTMLInputElement> extends FormElementAttributes<T, number> {
    type: "range";
    value?: number | string;
    min?: number | string;
    max?: number | string;
    step?: number | string;
}

interface CheckboxInputAttributes<T = HTMLInputElement> extends HTMLAttributes<T> {
    type: "checkbox" | "radio";
    checked?: boolean;
    model?: [object, string] | (() => boolean | any[] | string | number) | Model<any>;
    "onUpdate:modelValue"?: (checked: boolean) => void;
    [key: \`model:\${string}\`]: [object, string] | (() => any);
}

interface TextInputAttributes<T = HTMLInputElement> extends FormElementAttributes<T, string> {
    type?: "text" | "password" | "email" | "search" | "tel" | "url" | "date" | "datetime-local" | "month" | "time" | "week" | "color" | "file" | "hidden" | "image" | "reset" | "submit" | "button";
    value?: string;
}

interface TextareaHTMLAttributes<T = HTMLTextAreaElement> extends FormElementAttributes<T, string> {
    value?: string;
}

interface SingleSelectAttributes<T = HTMLSelectElement> extends FormElementAttributes<T, string> {
    multiple?: false;
    value?: string;
}

interface MultiSelectAttributes<T = HTMLSelectElement> extends FormElementAttributes<T, string[]> {
    multiple: true;
    value?: string[];
}

interface SVGAttributes<T = SVGElement> extends HTMLAttributes<T> {
    accentHeight?: number | string;
    accumulate?: 'none' | 'sum';
    additive?: 'replace' | 'sum';
    alignmentBaseline?: string;
    allowReorder?: 'no' | 'yes';
    alphabetic?: number | string;
    amplitude?: number | string;
    arabicForm?: 'initial' | 'medial' | 'terminal' | 'isolated';
    ascent?: number | string;
    attributeName?: string;
    attributeType?: string;
    autoReverse?: boolean | string;
    azimuth?: number | string;
    baseFrequency?: number | string;
    baselineShift?: number | string;
    baseProfile?: string;
    bbox?: number | string;
    begin?: number | string;
    bias?: number | string;
    by?: number | string;
    calcMode?: number | string;
    capHeight?: number | string;
    clip?: number | string;
    clipPath?: string;
    clipPathUnits?: number | string;
    clipRule?: number | string;
    colorInterpolation?: number | string;
    colorInterpolationFilters?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit';
    colorProfile?: number | string;
    colorRendering?: number | string;
    contentScriptType?: number | string;
    contentStyleType?: number | string;
    cursor?: number | string;
    cx?: number | string;
    cy?: number | string;
    d?: string;
    decelerate?: number | string;
    descent?: number | string;
    diffuseConstant?: number | string;
    direction?: number | string;
    display?: number | string;
    divisor?: number | string;
    dominantBaseline?: number | string;
    dur?: number | string;
    dx?: number | string;
    dy?: number | string;
    edgeMode?: number | string;
    elevation?: number | string;
    enableBackground?: number | string;
    end?: number | string;
    exponent?: number | string;
    externalResourcesRequired?: boolean | string;
    fill?: string;
    fillOpacity?: number | string;
    fillRule?: 'nonzero' | 'evenodd' | 'inherit';
    filter?: string;
    filterRes?: number | string;
    filterUnits?: number | string;
    floodColor?: number | string;
    floodOpacity?: number | string;
    focusable?: boolean | string;
    fontFamily?: string;
    fontSize?: number | string;
    fontSizeAdjust?: number | string;
    fontStretch?: number | string;
    fontStyle?: number | string;
    fontVariant?: number | string;
    fontWeight?: number | string;
    format?: number | string;
    from?: number | string;
    fx?: number | string;
    fy?: number | string;
    g1?: number | string;
    g2?: number | string;
    glyphName?: number | string;
    glyphOrientationHorizontal?: number | string;
    glyphOrientationVertical?: number | string;
    glyphRef?: number | string;
    gradientTransform?: string;
    gradientUnits?: string;
    hanging?: number | string;
    horizAdvX?: number | string;
    horizOriginX?: number | string;
    ideographic?: number | string;
    imageRendering?: number | string;
    in2?: number | string;
    in?: string;
    intercept?: number | string;
    k1?: number | string;
    k2?: number | string;
    k3?: number | string;
    k4?: number | string;
    k?: number | string;
    kernelMatrix?: number | string;
    kernelUnitLength?: number | string;
    kerning?: number | string;
    keyPoints?: number | string;
    keySplines?: number | string;
    keyTimes?: number | string;
    lengthAdjust?: number | string;
    letterSpacing?: number | string;
    lightingColor?: number | string;
    limitingConeAngle?: number | string;
    local?: number | string;
    markerEnd?: string;
    markerHeight?: number | string;
    markerMid?: string;
    markerStart?: string;
    markerUnits?: number | string;
    markerWidth?: number | string;
    mask?: string;
    maskContentUnits?: number | string;
    maskUnits?: number | string;
    mathematical?: number | string;
    mode?: number | string;
    numOctaves?: number | string;
    offset?: number | string;
    opacity?: number | string;
    operator?: number | string;
    order?: number | string;
    orient?: number | string;
    orientation?: number | string;
    origin?: number | string;
    overflow?: number | string;
    overlinePosition?: number | string;
    overlineThickness?: number | string;
    paintOrder?: number | string;
    panose1?: number | string;
    pathLength?: number | string;
    patternContentUnits?: string;
    patternTransform?: number | string;
    patternUnits?: string;
    pointerEvents?: number | string;
    points?: string;
    pointsAtX?: number | string;
    pointsAtY?: number | string;
    pointsAtZ?: number | string;
    preserveAlpha?: boolean | string;
    preserveAspectRatio?: string;
    primitiveUnits?: number | string;
    r?: number | string;
    radius?: number | string;
    refX?: number | string;
    refY?: number | string;
    renderingIntent?: number | string;
    repeatCount?: number | string;
    repeatDur?: number | string;
    requiredExtensions?: number | string;
    requiredFeatures?: number | string;
    restart?: number | string;
    result?: string;
    rotate?: number | string;
    rx?: number | string;
    ry?: number | string;
    scale?: number | string;
    seed?: number | string;
    shapeRendering?: number | string;
    slope?: number | string;
    spacing?: number | string;
    specularConstant?: number | string;
    specularExponent?: number | string;
    speed?: number | string;
    spreadMethod?: string;
    startOffset?: number | string;
    stdDeviation?: number | string;
    stemh?: number | string;
    stemv?: number | string;
    stitchTiles?: number | string;
    stopColor?: string;
    stopOpacity?: number | string;
    strikethroughPosition?: number | string;
    strikethroughThickness?: number | string;
    string?: number | string;
    stroke?: string;
    strokeDasharray?: string | number;
    strokeDashoffset?: string | number;
    strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit';
    strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit';
    strokeMiterlimit?: number | string;
    strokeOpacity?: number | string;
    strokeWidth?: number | string;
    surfaceScale?: number | string;
    systemLanguage?: number | string;
    tableValues?: number | string;
    targetX?: number | string;
    targetY?: number | string;
    textAnchor?: string;
    textDecoration?: number | string;
    textLength?: number | string;
    textRendering?: number | string;
    to?: number | string;
    transform?: string;
    u1?: number | string;
    u2?: number | string;
    underlinePosition?: number | string;
    underlineThickness?: number | string;
    unicode?: number | string;
    unicodeBidi?: number | string;
    unicodeRange?: number | string;
    unitsPerEm?: number | string;
    vAlphabetic?: number | string;
    vectorEffect?: number | string;
    version?: string;
    vertAdvY?: number | string;
    vertOriginX?: number | string;
    vertOriginY?: number | string;
    vHanging?: number | string;
    vIdeographic?: number | string;
    viewBox?: string;
    viewTarget?: number | string;
    visibility?: number | string;
    vMathematical?: number | string;
    widths?: number | string;
    wordSpacing?: number | string;
    writingMode?: number | string;
    x1?: number | string;
    x2?: number | string;
    x?: number | string;
    xChannelSelector?: string;
    xHeight?: number | string;
    xlinkActuate?: string;
    xlinkArcrole?: string;
    xlinkHref?: string;
    xlinkRole?: string;
    xlinkShow?: string;
    xlinkTitle?: string;
    xlinkType?: string;
    xmlBase?: string;
    xmlLang?: string;
    xmlns?: string;
    xmlnsXlink?: string;
    xmlSpace?: string;
    y1?: number | string;
    y2?: number | string;
    y?: number | string;
    yChannelSelector?: string;
    z?: number | string;
    zoomAndPan?: string;
}

type InputHTMLAttributes<T = HTMLInputElement> = NumberInputAttributes<T> | RangeInputAttributes<T> | CheckboxInputAttributes<T> | TextInputAttributes<T>;

type SelectHTMLAttributes<T = HTMLSelectElement> = SingleSelectAttributes<T> | MultiSelectAttributes<T>;


declare namespace JSX {
    // Use 'any' for Element to avoid conflicts with sigx's VNode type
    // Components return JSXElement which is compatible with any
    type Element = any;
    interface ElementClass { render: any; }
    interface ElementAttributesProperty { props: {}; }
    interface ElementChildrenAttribute { children: {}; }

    interface IntrinsicAttributes {
        key?: string | number | null;
        id?: string;
        class?: string;
        style?: string | CSSProperties;
        [key: \`data-\${string}\`]: any;
        [key: \`aria-\${string}\`]: any;
    }

    interface IntrinsicElements {
        a: HTMLAttributes<HTMLAnchorElement>;
        abbr: HTMLAttributes<HTMLElement>;
        address: HTMLAttributes<HTMLElement>;
        area: HTMLAttributes<HTMLAreaElement>;
        article: HTMLAttributes<HTMLElement>;
        aside: HTMLAttributes<HTMLElement>;
        audio: HTMLAttributes<HTMLAudioElement>;
        b: HTMLAttributes<HTMLElement>;
        base: HTMLAttributes<HTMLBaseElement>;
        bdi: HTMLAttributes<HTMLElement>;
        bdo: HTMLAttributes<HTMLElement>;
        blockquote: HTMLAttributes<HTMLQuoteElement>;
        body: HTMLAttributes<HTMLBodyElement>;
        br: HTMLAttributes<HTMLBRElement>;
        button: HTMLAttributes<HTMLButtonElement>;
        canvas: HTMLAttributes<HTMLCanvasElement>;
        caption: HTMLAttributes<HTMLTableCaptionElement>;
        cite: HTMLAttributes<HTMLElement>;
        code: HTMLAttributes<HTMLElement>;
        col: HTMLAttributes<HTMLTableColElement>;
        colgroup: HTMLAttributes<HTMLTableColElement>;
        data: HTMLAttributes<HTMLDataElement>;
        datalist: HTMLAttributes<HTMLDataListElement>;
        dd: HTMLAttributes<HTMLElement>;
        del: HTMLAttributes<HTMLModElement>;
        details: HTMLAttributes<HTMLDetailsElement>;
        dfn: HTMLAttributes<HTMLElement>;
        dialog: HTMLAttributes<HTMLDialogElement>;
        div: HTMLAttributes<HTMLDivElement>;
        dl: HTMLAttributes<HTMLDListElement>;
        dt: HTMLAttributes<HTMLElement>;
        em: HTMLAttributes<HTMLElement>;
        embed: HTMLAttributes<HTMLEmbedElement>;
        fieldset: HTMLAttributes<HTMLFieldSetElement>;
        figcaption: HTMLAttributes<HTMLElement>;
        figure: HTMLAttributes<HTMLElement>;
        footer: HTMLAttributes<HTMLElement>;
        form: HTMLAttributes<HTMLFormElement>;
        h1: HTMLAttributes<HTMLHeadingElement>;
        h2: HTMLAttributes<HTMLHeadingElement>;
        h3: HTMLAttributes<HTMLHeadingElement>;
        h4: HTMLAttributes<HTMLHeadingElement>;
        h5: HTMLAttributes<HTMLHeadingElement>;
        h6: HTMLAttributes<HTMLHeadingElement>;
        head: HTMLAttributes<HTMLHeadElement>;
        header: HTMLAttributes<HTMLElement>;
        hgroup: HTMLAttributes<HTMLElement>;
        hr: HTMLAttributes<HTMLHRElement>;
        html: HTMLAttributes<HTMLHtmlElement>;
        i: HTMLAttributes<HTMLElement>;
        iframe: HTMLAttributes<HTMLIFrameElement>;
        img: HTMLAttributes<HTMLImageElement>;
        input: InputHTMLAttributes<HTMLInputElement>;
        ins: HTMLAttributes<HTMLModElement>;
        kbd: HTMLAttributes<HTMLElement>;
        label: HTMLAttributes<HTMLLabelElement>;
        legend: HTMLAttributes<HTMLLegendElement>;
        li: HTMLAttributes<HTMLLIElement>;
        link: HTMLAttributes<HTMLLinkElement>;
        main: HTMLAttributes<HTMLElement>;
        map: HTMLAttributes<HTMLMapElement>;
        mark: HTMLAttributes<HTMLElement>;
        menu: HTMLAttributes<HTMLMenuElement>;
        meta: HTMLAttributes<HTMLMetaElement>;
        meter: HTMLAttributes<HTMLMeterElement>;
        nav: HTMLAttributes<HTMLElement>;
        noscript: HTMLAttributes<HTMLElement>;
        object: HTMLAttributes<HTMLObjectElement>;
        ol: HTMLAttributes<HTMLOListElement>;
        optgroup: HTMLAttributes<HTMLOptGroupElement>;
        option: HTMLAttributes<HTMLOptionElement>;
        output: HTMLAttributes<HTMLOutputElement>;
        p: HTMLAttributes<HTMLParagraphElement>;
        picture: HTMLAttributes<HTMLPictureElement>;
        pre: HTMLAttributes<HTMLPreElement>;
        progress: HTMLAttributes<HTMLProgressElement>;
        q: HTMLAttributes<HTMLQuoteElement>;
        rp: HTMLAttributes<HTMLElement>;
        rt: HTMLAttributes<HTMLElement>;
        ruby: HTMLAttributes<HTMLElement>;
        s: HTMLAttributes<HTMLElement>;
        samp: HTMLAttributes<HTMLElement>;
        script: HTMLAttributes<HTMLScriptElement>;
        search: HTMLAttributes<HTMLElement>;
        section: HTMLAttributes<HTMLElement>;
        select: SelectHTMLAttributes<HTMLSelectElement>;
        slot: HTMLAttributes<HTMLSlotElement>;
        small: HTMLAttributes<HTMLElement>;
        source: HTMLAttributes<HTMLSourceElement>;
        span: HTMLAttributes<HTMLSpanElement>;
        strong: HTMLAttributes<HTMLElement>;
        style: HTMLAttributes<HTMLStyleElement>;
        sub: HTMLAttributes<HTMLElement>;
        summary: HTMLAttributes<HTMLElement>;
        sup: HTMLAttributes<HTMLElement>;
        table: HTMLAttributes<HTMLTableElement>;
        tbody: HTMLAttributes<HTMLTableSectionElement>;
        td: HTMLAttributes<HTMLTableCellElement>;
        template: HTMLAttributes<HTMLTemplateElement>;
        textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
        tfoot: HTMLAttributes<HTMLTableSectionElement>;
        th: HTMLAttributes<HTMLTableCellElement>;
        thead: HTMLAttributes<HTMLTableSectionElement>;
        time: HTMLAttributes<HTMLTimeElement>;
        title: HTMLAttributes<HTMLTitleElement>;
        tr: HTMLAttributes<HTMLTableRowElement>;
        track: HTMLAttributes<HTMLTrackElement>;
        u: HTMLAttributes<HTMLElement>;
        ul: HTMLAttributes<HTMLUListElement>;
        var: HTMLAttributes<HTMLElement>;
        video: HTMLAttributes<HTMLVideoElement>;
        wbr: HTMLAttributes<HTMLElement>;
        svg: SVGAttributes<SVGSVGElement>;
        circle: SVGAttributes<SVGCircleElement>;
        clipPath: SVGAttributes<SVGClipPathElement>;
        defs: SVGAttributes<SVGDefsElement>;
        ellipse: SVGAttributes<SVGEllipseElement>;
        g: SVGAttributes<SVGGElement>;
        line: SVGAttributes<SVGLineElement>;
        path: SVGAttributes<SVGPathElement>;
        polygon: SVGAttributes<SVGPolygonElement>;
        polyline: SVGAttributes<SVGPolylineElement>;
        rect: SVGAttributes<SVGRectElement>;
        text: SVGAttributes<SVGTextElement>;
        marker: SVGAttributes<SVGMarkerElement>;
        pattern: SVGAttributes<SVGPatternElement>;
        linearGradient: SVGAttributes<SVGLinearGradientElement>;
        radialGradient: SVGAttributes<SVGRadialGradientElement>;
        stop: SVGAttributes<SVGStopElement>;
        image: SVGAttributes<SVGImageElement>;
        use: SVGAttributes<SVGUseElement>;
        mask: SVGAttributes<SVGMaskElement>;
        filter: SVGAttributes<SVGFilterElement>;
        foreignObject: SVGAttributes<SVGForeignObjectElement>;
        tspan: SVGAttributes<SVGTSpanElement>;
        textPath: SVGAttributes<SVGTextPathElement>;
        symbol: SVGAttributes<SVGSymbolElement>;
        feBlend: SVGAttributes<SVGFEBlendElement>;
        feColorMatrix: SVGAttributes<SVGFEColorMatrixElement>;
        feComponentTransfer: SVGAttributes<SVGFEComponentTransferElement>;
        feComposite: SVGAttributes<SVGFECompositeElement>;
        feConvolveMatrix: SVGAttributes<SVGFEConvolveMatrixElement>;
        feDiffuseLighting: SVGAttributes<SVGFEDiffuseLightingElement>;
        feDisplacementMap: SVGAttributes<SVGFEDisplacementMapElement>;
        feDistantLight: SVGAttributes<SVGFEDistantLightElement>;
        feDropShadow: SVGAttributes<SVGFEDropShadowElement>;
        feFlood: SVGAttributes<SVGFEFloodElement>;
        feFuncA: SVGAttributes<SVGFEFuncAElement>;
        feFuncB: SVGAttributes<SVGFEFuncBElement>;
        feFuncG: SVGAttributes<SVGFEFuncGElement>;
        feFuncR: SVGAttributes<SVGFEFuncRElement>;
        feGaussianBlur: SVGAttributes<SVGFEGaussianBlurElement>;
        feImage: SVGAttributes<SVGFEImageElement>;
        feMerge: SVGAttributes<SVGFEMergeElement>;
        feMergeNode: SVGAttributes<SVGFEMergeNodeElement>;
        feMorphology: SVGAttributes<SVGFEMorphologyElement>;
        feOffset: SVGAttributes<SVGFEOffsetElement>;
        fePointLight: SVGAttributes<SVGFEPointLightElement>;
        feSpecularLighting: SVGAttributes<SVGFESpecularLightingElement>;
        feSpotLight: SVGAttributes<SVGFESpotLightElement>;
        feTile: SVGAttributes<SVGFETileElement>;
        feTurbulence: SVGAttributes<SVGFETurbulenceElement>;
        animate: SVGAttributes<SVGAnimateElement>;
        animateMotion: SVGAttributes<SVGAnimateMotionElement>;
        animateTransform: SVGAttributes<SVGAnimateTransformElement>;
        metadata: SVGAttributes<SVGMetadataElement>;
    }
}
`;

/** @deprecated Use sigxTypes instead */
export const jsxAmbientTypes = sigxTypes;

/** sigx module types */
export const sigxModuleTypes = `declare module "sigx" {
    /**
     * Platform-specific hooks for runtime-core.
     *
     * This module has NO IMPORTS to ensure it's fully initialized before
     * any other module can import from it. This avoids circular dependency
     * issues with ES module initialization.
     */
    /**
     * Platform-specific model processor for intrinsic elements.
     * Platforms (DOM, Terminal) can register their own model handling logic.
     *
     * @param type - The intrinsic element type (e.g., 'input', 'select')
     * @param props - The props object being built (mutable)
     * @param modelBinding - The [stateObj, key] tuple for the model binding
     * @param originalProps - The original props from JSX (read-only)
     * @returns true if handled (skip generic fallback), false to use generic fallback
     */
    export type ModelProcessor = (type: string, props: Record<string, any>, modelBinding: [
    	Record<string, any>,
    	string
    ], originalProps: Record<string, any>) => boolean;
    /**
     * Component plugin registry for runtime-core.
     *
     * This module has NO IMPORTS to ensure it's fully initialized before
     * any other module can import from it. This avoids circular dependency
     * issues with ES module initialization.
     */
    /**
     * Plugin system for components (used by HMR, DevTools, SSR, etc.)
     * Note: SetupFn type is duplicated here to avoid circular imports
     */
    export type ComponentPlugin = {
    	onDefine?: (name: string | undefined, factory: Function, setup: Function) => void;
    };
    declare const MODEL_SYMBOL: unique symbol;
    /** The binding tuple for Model<T>: [sourceObject, key, updateHandler] */
    export type ModelBindingTuple<T> = readonly [
    	object,
    	string,
    	(value: T) => void
    ];
    /**
     * Model<T> - A two-way binding that can be read, written, and forwarded.
     *
     * - \`.value\` - Get or set the current value
     * - \`.binding\` - The underlying binding for forwarding
     */
    export interface Model<T> {
    	/** Get or set the current value */
    	value: T;
    	/** The underlying binding tuple for forwarding */
    	readonly binding: ModelBindingTuple<T>;
    	/** @internal Marker to identify Model objects */
    	readonly [MODEL_SYMBOL]: true;
    }
    /**
     * Creates a Model<T> from a binding tuple and update handler.
     *
     * @param tuple - The [sourceObject, key] tuple from reactivity detection
     * @param updateHandler - Function called when value is set (enables parent interception)
     * @returns A Model<T> with .value getter/setter and .binding for forwarding
     */
    export declare function createModel<T>(tuple: [
    	object,
    	string
    ], updateHandler: (value: T) => void): Model<T>;
    /**
     * Creates a Model<T> from an existing binding (for forwarding scenarios).
     *
     * @param binding - The full binding tuple [obj, key, handler]
     * @returns A new Model<T> wrapping the same binding
     */
    export declare function createModelFromBinding<T>(binding: ModelBindingTuple<T>): Model<T>;
    /**
     * Type guard to check if a value is a Model<T>.
     *
     * Used by JSX runtime to detect forwarded models and extract their bindings.
     */
    export declare function isModel(value: unknown): value is Model<unknown>;
    export type VNode = {
    	type: string | typeof Fragment | typeof Text\$1 | typeof Comment\$1 | Function;
    	props: Record<string, any>;
    	key: string | number | null;
    	children: VNode[];
    	dom: any | null;
    	text?: string | number;
    	parent?: VNode | null;
    	cleanup?: () => void;
    };
    export type JSXChild = VNode | string | number | boolean | null | undefined | JSXChild[];
    export type JSXChildren = JSXChild;
    export type JSXElement = VNode | string | number | boolean | null;
    export interface JSXProps {
    	children?: JSXChildren;
    	[key: string]: any;
    }
    export declare const Fragment: unique symbol;
    declare const Text\$1: unique symbol;
    declare const Comment\$1: unique symbol;
    /**
     * Create a JSX element - this is the core function called by TSX transpilation
     */
    export declare function jsx(type: string | Function | typeof Fragment, props: JSXProps | null, key?: string): JSXElement;
    /**
     * JSX Factory for fragments
     */
    export declare function jsxs(type: string | typeof Fragment | Function, props?: Record<string, unknown>, key?: string): JSXElement;
    export declare const jsxDEV: typeof jsx;
    /** Symbol to identify computed values */
    export declare const ComputedSymbol: unique symbol;
    export type EffectFn = () => void;
    export interface EffectRunner<T = void> {
    	(): T;
    	stop: () => void;
    }
    export interface ReactiveEffect extends EffectFn {
    	deps: Set<ReactiveEffect>[];
    }
    /**
     * Widens literal types to their base primitive types.
     * e.g., \`false\` → \`boolean\`, \`"hello"\` → \`string\`, \`123\` → \`number\`
     */
    export type Widen<T> = T extends boolean ? boolean : T extends number ? number : T extends string ? string : T extends bigint ? bigint : T extends symbol ? symbol : T;
    /** Type for object/array signals - includes \$set for replacing the whole object */
    export type Signal<T> = T & {
    	\$set: (newValue: T) => void;
    };
    /** Type for primitive values that get wrapped in { value: T } - no \$set, use .value instead */
    export type PrimitiveSignal<T> = {
    	value: Widen<T>;
    };
    /** Primitive types that will be wrapped in { value: T } */
    export type Primitive = string | number | boolean | symbol | bigint | null | undefined;
    export type WatchSource<T = any> = T | (() => T);
    export type WatchCallback<V = any, OV = any> = (value: V, oldValue: OV, onCleanup: (fn: () => void) => void) => any;
    export interface WatchOptions<Immediate = boolean> {
    	immediate?: Immediate;
    	deep?: boolean | number;
    	once?: boolean;
    }
    export interface WatchHandle {
    	(): void;
    	stop: () => void;
    	pause: () => void;
    	resume: () => void;
    }
    /** A read-only computed signal - access via .value */
    export interface Computed<T> {
    	readonly value: T;
    	readonly [ComputedSymbol]: true;
    }
    /** A writable computed signal - access and set via .value */
    export interface WritableComputed<T> {
    	value: T;
    	readonly [ComputedSymbol]: true;
    }
    export interface ComputedGetter<T> {
    	(): T;
    }
    export interface ComputedSetter<T> {
    	(value: T): void;
    }
    export interface WritableComputedOptions<T> {
    	get: ComputedGetter<T>;
    	set: ComputedSetter<T>;
    }
    export type EffectScope = {
    	run<T>(fn: () => T): T | undefined;
    	stop(fromParent?: boolean): void;
    };
    /**
     * Batch multiple reactive updates into a single flush.
     * Effects are deferred until the batch completes, avoiding redundant re-renders.
     *
     * @example
     * \`\`\`ts
     * batch(() => {
     *   count.value++;
     *   name.value = 'Alice';
     * }); // effects run once after both updates
     * \`\`\`
     */
    export declare function batch(fn: () => void): void;
    /**
     * Create a reactive effect that re-runs whenever its tracked dependencies change.
     * Returns a runner with a \`.stop()\` method to dispose the effect.
     *
     * @example
     * \`\`\`ts
     * const count = signal(0);
     * const runner = effect(() => console.log(count.value));
     * count.value++; // logs: 1
     * runner.stop();
     * \`\`\`
     */
    export declare function effect(fn: EffectFn): EffectRunner;
    /**
     * Execute a function without tracking any reactive dependencies.
     * Useful for reading signals inside an effect without creating a subscription.
     *
     * @example
     * \`\`\`ts
     * effect(() => {
     *   const val = untrack(() => someSignal.value); // not tracked
     * });
     * \`\`\`
     */
    export declare function untrack<T>(fn: () => T): T;
    /**
     * Create an effect scope that collects reactive effects for bulk disposal.
     *
     * @example
     * \`\`\`ts
     * const scope = effectScope();
     * scope.run(() => {
     *   effect(() => console.log(count.value));
     *   effect(() => console.log(name.value));
     * });
     * scope.stop(); // disposes both effects
     * \`\`\`
     */
    export declare function effectScope(_detached?: boolean): {
    	run<T>(fn: () => T): T | undefined;
    	stop(fromParent?: boolean): void;
    };
    /**
     * Returns the raw, original object from a reactive proxy.
     * If the value is not a proxy, returns it as-is.
     */
    export declare function toRaw<T>(observed: T): T;
    /**
     * Checks if a value is a reactive proxy created by signal().
     */
    export declare function isReactive(value: unknown): boolean;
    /**
     * Detect which reactive property a selector function accesses.
     *
     * Runs \`selector()\` while observing property accesses and returns the
     * last \`[target, key]\` pair accessed, or \`null\` if nothing was read.
     * Used internally by the model/two-way-binding system.
     *
     * @example
     * \`\`\`ts
     * const state = signal({ form: { name: 'Alice' } });
     * const result = detectAccess(() => state.form.name);
     * // result === [state.form, 'name']
     * \`\`\`
     */
    export declare function detectAccess(selector: () => any): [
    	any,
    	string | symbol
    ] | null;
    /**
     * Create a reactive signal from a value.
     *
     * For primitives, wraps the value as \`{ value: T }\` — access and mutate via \`.value\`.
     * For objects, returns a deeply reactive proxy with \`.\$set()\` for full replacement.
     *
     * @example
     * \`\`\`ts
     * const count = signal(0);
     * count.value++;
     *
     * const user = signal({ name: 'Alice' });
     * user.name = 'Bob'; // reactive
     * user.\$set({ name: 'Carol' }); // replace entire object
     * \`\`\`
     */
    export declare function signal<T extends Primitive>(target: T): PrimitiveSignal<T>;
    export declare function signal<T extends object>(target: T): Signal<T>;
    /**
     * Watch a reactive source and run a callback when it changes.
     * Supports deep watching, immediate invocation, and pause/resume.
     *
     * @example
     * \`\`\`ts
     * const count = signal(0);
     * const handle = watch(() => count.value, (newVal, oldVal) => {
     *   console.log(\`\${oldVal} → \${newVal}\`);
     * });
     * handle.stop(); // stop watching
     * \`\`\`
     */
    export declare function watch<T>(source: WatchSource<T>, cb: WatchCallback<T>, options?: WatchOptions): WatchHandle;
    /**
     * Creates a computed signal that lazily derives a value from other reactive sources.
     *
     * Performance characteristics:
     * - Lazy: Only computes when accessed
     * - Cached: Returns cached value if dependencies haven't changed
     * - Minimal overhead: Uses dirty flag instead of always running getter
     *
     * @example
     * \`\`\`ts
     * const count = signal({ n: 0 });
     * const doubled = computed(() => count.n * 2);
     *
     * console.log(doubled.value);  // 0
     * count.n = 5;
     * console.log(doubled.value);  // 10
     * \`\`\`
     */
    export declare function computed<T>(getter: ComputedGetter<T>): Computed<T>;
    export declare function computed<T>(options: WritableComputedOptions<T>): WritableComputed<T>;
    /**
     * Type guard to check if a value is a computed signal.
     *
     * @example
     * \`\`\`ts
     * const doubled = computed(() => count.value * 2);
     * console.log(isComputed(doubled)); // true
     * console.log(isComputed({ value: 1 })); // false
     * \`\`\`
     */
    export declare function isComputed(value: unknown): value is Computed<unknown>;
    /**
     * Extension point for additional component attributes.
     * Use module augmentation to add attributes to all components:
     *
     * @example
     * \`\`\`ts
     * // In @sigx/server-renderer
     * declare module '@sigx/runtime-core' {
     *     interface ComponentAttributeExtensions {
     *         'client:load'?: boolean;
     *         'client:visible'?: boolean;
     *         'client:idle'?: boolean;
     *     }
     * }
     * \`\`\`
     */
    export interface ComponentAttributeExtensions {
    }
    /**
     * Namespace for component definition types.
     * Provides a discoverable API for defining props, events, models, slots, and exposed APIs.
     *
     * @example
     * \`\`\`tsx
     * import { component, type Define } from 'sigx';
     *
     * type ButtonProps =
     *     & Define.Prop<'variant', 'primary' | 'secondary'>
     *     & Define.Prop<'disabled', boolean>
     *     & Define.Event<'click', MouseEvent>
     *     & Define.Slot<'default'>;
     *
     * export const Button = component<ButtonProps>(({ props, slots, emit }) => {
     *     return () => <button>{slots.default?.()}</button>;
     * });
     * \`\`\`
     */
    export declare namespace Define {
    	/**
    	 * Define a single prop with type, required/optional status
    	 */
    	type Prop<TName extends string, TType, Required extends boolean = false> = Required extends false ? {
    		[K in TName]?: TType;
    	} : {
    		[K in TName]: TType;
    	};
    	/**
    	 * Define a single custom event with its detail type
    	 */
    	type Event<TName extends string, TDetail = void> = {
    		[K in TName]?: EventDefinition<TDetail>;
    	};
    	/**
    	 * Define a 2-way bound model.
    	 *
    	 * Default form: Model<T> → props.model: Model<T>
    	 * Named form: Model<"name", T> → props.name: Model<T>
    	 *
    	 * @example
    	 * \`\`\`tsx
    	 * type InputProps = Define.Model<string> & Define.Prop<'placeholder', string>;
    	 * \`\`\`
    	 */
    	type Model<TNameOrType, TType = void> = TType extends void ? {
    		model?: Model<TNameOrType>;
    		/** @internal Marker for JSX to accept binding tuples */
    		__modelBindings?: {
    			model: TNameOrType;
    		};
    	} & Define.Event<"update:modelValue", TNameOrType> : TNameOrType extends string ? {
    		[K in TNameOrType]?: Model<TType>;
    	} & {
    		/** @internal Marker for JSX to accept binding tuples */
    		__modelBindings?: {
    			[K in TNameOrType]: TType;
    		};
    	} & Define.Event<\`update:\${TNameOrType}\`, TType> : never;
    	/**
    	 * Define a slot with optional scoped props.
    	 *
    	 * @example
    	 * \`\`\`tsx
    	 * type Props = Define.Slot<'header'> & Define.Slot<'item', { item: T; index: number }>;
    	 * \`\`\`
    	 */
    	type Slot<TName extends string, TProps = void> = {
    		__slots?: {
    			[K in TName]: TProps extends void ? () => JSXElement | JSXElement[] | null : (props: TProps) => JSXElement | JSXElement[] | null;
    		};
    	};
    	/**
    	 * Define the public API exposed by a component via \`expose()\`.
    	 *
    	 * @example
    	 * \`\`\`tsx
    	 * type Props = Define.Expose<{ reset: () => void; getValue: () => string }>;
    	 * \`\`\`
    	 */
    	type Expose<T> = {
    		__exposed?: {
    			__type: T;
    		};
    	};
    }
    /**
     * Define a single prop with type, required/optional status
     * @deprecated Use \`Define.Prop\` instead
     */
    export type DefineProp<TName extends string, TType, Required extends boolean = false> = Define.Prop<TName, TType, Required>;
    /**
     * Model binding tuple type - [stateObject, key] for forwarding
     * The state object can be a Signal or any object with the given key
     */
    export type ModelBinding<_T> = [
    	object,
    	string
    ];
    /**
     * Define a 2-way bound model.
     *
     * The component receives a Model<T> object with:
     *   - \`.value\` - Get or set the current value
     *   - \`.binding\` - The underlying binding for forwarding
     *
     * Default form: DefineModel<T>
     *   - props.model: Model<T> (read/write/forward)
     *   - props.model.value to read/write
     *   - <Child model={props.model} /> to forward
     *
     * Named form: DefineModel<"name", T>
     *   - props.name: Model<T> (read/write/forward)
     *   - props.name.value to read/write
     *   - <Child model={props.name} /> to forward
     *
     * Callers use: model={() => state.prop} or model:name={() => state.prop}
     *
     * @example
     * \`\`\`tsx
     * interface InputProps extends DefineModel<string> {
     *     placeholder?: string;
     * }
     *
     * const Input = component<InputProps>(({ props }) => {
     *     // Read
     *     console.log(props.model.value);
     *
     *     // Write
     *     props.model.value = "new value";
     *
     *     // Forward
     *     <Child model={props.model} />
     * });
     * \`\`\`
     * @deprecated Use \`Define.Model\` instead
     */
    export type DefineModel<TNameOrType, TType = void> = Define.Model<TNameOrType, TType>;
    /**
     * Extract model binding definitions from a component props type.
     * Used at JSX level to allow binding tuples for model props.
     */
    export type ExtractModelBindings<T> = T extends {
    	__modelBindings?: infer M;
    } ? NonNullable<M> : {};
    /**
     * Map model keys to their JSX prop names.
     * - "model" stays as "model" (default model)
     * - Other names become "model:name" (named models)
     */
    export type ModelPropName<K extends string> = K extends "model" ? "model" : \`model:\${K}\`;
    /**
     * Transform Model<T> props to also accept binding syntax at JSX level.
     * This allows: model={[state, "value"]} or model={props.model}
     * For named models: model:title={[state, "title"]} or model:title={() => state.title}
     */
    export type ExternalModelProps<T> = {
    	[K in keyof ExtractModelBindings<T> as K extends string ? ModelPropName<K> : never]?: Model<ExtractModelBindings<T>[K]> | ModelBinding<ExtractModelBindings<T>[K]> | (() => ExtractModelBindings<T>[K]);
    };
    export type EventDefinition<T> = {
    	__eventDetail: T;
    };
    /**
     * Define a single custom event with its detail type
     * @deprecated Use \`Define.Event\` instead
     */
    export type DefineEvent<TName extends string, TDetail = void> = Define.Event<TName, TDetail>;
    /**
     * Define a slot with optional scoped props.
     * - DefineSlot<"header"> - a simple slot named "header"
     * - DefineSlot<"item", { item: T; index: number }> - a scoped slot with props
     * @deprecated Use \`Define.Slot\` instead
     */
    export type DefineSlot<TName extends string, TProps = void> = Define.Slot<TName, TProps>;
    /**
     * Default slot function type
     */
    export type DefaultSlot = () => JSXElement[];
    /**
     * Slots object passed to components - always has default, plus any declared slots
     */
    export type SlotsObject<TSlots = {}> = {
    	default: DefaultSlot;
    } & TSlots;
    /**
     * Extract event names from an event definition
     */
    export type EventNames<TEvents> = {
    	[K in keyof TEvents]: TEvents[K] extends EventDefinition<any> | undefined ? K : never;
    }[keyof TEvents] & string;
    /**
     * Extract event detail type for a specific event name
     */
    export type EventDetail<TEvents, TName extends EventNames<TEvents>> = TEvents extends {
    	[K in TName]?: EventDefinition<infer TDetail>;
    } ? TDetail : never;
    /**
     * Typed emit function for dispatching custom events
     */
    export type EmitFn<TEvents extends Record<string, any>> = <TName extends EventNames<TEvents>>(eventName: TName, ...args: EventDetail<TEvents, TName> extends void ? [
    ] : [
    	detail: EventDetail<TEvents, TName>
    ]) => void;
    type Capitalize\$1<S extends string> = S extends \`\${infer First}\${infer Rest}\` ? \`\${Uppercase<First>}\${Rest}\` : S;
    /**
     * Convert events to event handler props (on{EventName})
     */
    export type EventHandlers<TEvents extends Record<string, any>> = {
    	[K in keyof TEvents as TEvents[K] extends EventDefinition<any> | undefined ? \`on\${Capitalize\$1<string & K>}\` : never]?: (detail: TEvents[K] extends EventDefinition<infer D> | undefined ? D : never) => void;
    };
    /**
     * Platform registry - platforms add their element type here via declaration merging
     */
    export interface PlatformTypes {
    }
    /** Resolves to the platform's element type, or 'any' if not defined */
    export type PlatformElement = PlatformTypes extends {
    	element: infer E;
    } ? E : any;
    /**
     * Base mount context - platforms can extend this via declaration merging
     */
    export interface MountContext<TElement = PlatformElement> {
    	el: TElement;
    }
    /**
     * Base setup context - platforms can extend this via declaration merging
     */
    export interface SetupContext {
    }
    /**
     * Props type after defaults are applied - all props become required (non-undefined)
     */
    export type PropsWithDefaults<TProps, D> = {
    	readonly [K in keyof TProps]-?: K extends keyof D ? NonNullable<TProps[K]> : TProps[K];
    };
    /**
     * Props accessor - a reactive proxy for component props.
     * Use destructuring with defaults for optional props.
     *
     * @example
     * \`\`\`tsx
     * // Destructure with defaults
     * const { variant = 'primary', size = 'md' } = ctx.props;
     * return () => <button class={variant}>...</button>
     *
     * // Or spread to forward all props
     * return () => <ChildComponent {...ctx.props} />
     * \`\`\`
     */
    export type PropsAccessor<TProps> = {
    	readonly [K in keyof TProps]: TProps[K];
    };
    export interface ComponentSetupContext<TElement = PlatformElement, TProps extends Record<string, any> = {}, TEvents extends Record<string, any> = {}, TRef = any, TSlots = {}> extends SetupContext {
    	el: TElement;
    	signal: typeof signal;
    	/**
    	 * Component props - includes regular props and Model<T> objects.
    	 *
    	 * Models are accessed via props: props.model.value, props.title.value
    	 *
    	 * @example
    	 * \`\`\`tsx
    	 * // Read model
    	 * const value = props.model.value;
    	 *
    	 * // Write model
    	 * props.model.value = "new value";
    	 *
    	 * // Forward to child
    	 * <Child model={props.model} />
    	 *
    	 * // Forward via context
    	 * defineProvide(ctx, () => props.model);
    	 * \`\`\`
    	 */
    	props: PropsAccessor<TProps>;
    	slots: SlotsObject<TSlots>;
    	emit: EmitFn<TEvents>;
    	parent: ComponentSetupContext | null;
    	onMounted(fn: (ctx: MountContext<TElement>) => void): void;
    	onUnmounted(fn: (ctx: MountContext<TElement>) => void): void;
    	onCreated(fn: () => void): void;
    	onUpdated(fn: () => void): void;
    	expose(exposed: TRef): void;
    	/**
    	 * The current render function. Can be replaced directly for HMR.
    	 * @internal Used by HMR - set this, then call update()
    	 */
    	renderFn: ViewFn | null;
    	/**
    	 * Force the component to re-render using the current renderFn.
    	 * For HMR: first set ctx.renderFn to the new render function, then call update().
    	 */
    	update(): void;
    }
    export type ViewFn = () => JSXElement | JSXElement[] | undefined;
    /**
     * Type for component setup functions.
     * Includes Props, Events, Ref, and Slots generics to preserve type information.
     * Can be sync or async - async setup is awaited on server, runs sync on client hydration.
     */
    export type SetupFn<TProps extends Record<string, any> = {}, TEvents extends Record<string, any> = {}, TRef = any, TSlots = {}> = (ctx: ComponentSetupContext<PlatformElement, TProps, TEvents, TRef, TSlots>) => ViewFn | Promise<ViewFn>;
    /**
     * @deprecated Use \`Define.Expose\` instead
     */
    export type DefineExpose<T> = Define.Expose<T>;
    export type Ref<T> = {
    	current: T | null;
    } | ((instance: T | null) => void);
    /**
     * Extract the exposed API type from a component.
     * Use this to type variables that will hold a component's exposed interface.
     *
     * @example
     * \`\`\`tsx
     * let api: Exposed<typeof MyComponent>;
     * <MyComponent ref={r => api = r!} />
     * api.exposedMethod();
     * \`\`\`
     */
    export type Exposed<T extends {
    	__ref: any;
    }> = T["__ref"];
    /**
     * Extract the ref (exposed) type from a component (includes function ref option).
     *
     * @example
     * \`\`\`tsx
     * const myRef = { current: null } as ComponentRef<typeof MyComponent>;
     * \`\`\`
     */
    export type ComponentRef<T extends {
    	__ref: any;
    }> = Ref<T["__ref"]>;
    /**
     * Strip internal type markers from component props for setup context (internal use).
     * Preserves model keys so components can access props.model, props.title, etc.
     *
     * Strips:
     * - Internal markers: __exposed, __slots, __models, __modelBindings
     * - JSX model:name syntax markers
     * - Event markers (update:*)
     */
    export type StripInternalMarkers<T> = {
    	[K in keyof T as K extends "__exposed" | "__slots" | "__models" | "__modelBindings" ? never : K extends \`model:\${string}\` ? never : K extends \`update:\${string}\` ? never : K]: T[K];
    };
    /**
     * Strip props for JSX external signature.
     * Same as StripInternalMarkers but also strips model keys so ExternalModelProps
     * is the sole source (avoiding intersection conflicts between Model<T> and widened union).
     */
    export type StripForJSX<T> = {
    	[K in keyof T as K extends "__exposed" | "__slots" | "__models" | "__modelBindings" ? never : K extends \`model:\${string}\` ? never : K extends \`update:\${string}\` ? never : K extends keyof ExtractModelBindings<T> ? never : K]: T[K];
    };
    /**
     * Component options (optional second param)
     */
    export interface ComponentOptions {
    	/** Component name for DevTools debugging */
    	name?: string;
    }
    /**
     * Slot props type - converts slot definitions to a slots prop object
     */
    export type SlotProps<TSlots> = TSlots extends Record<string, any> ? {
    	slots?: Partial<TSlots>;
    } : {};
    /**
     * Sync binding type - used at JSX level to enable two-way binding
     * The JSX runtime transforms sync into value + onUpdate:value
     */
    export type SyncBinding<T> = [
    	object,
    	string
    ] | (() => T);
    /**
     * Sync props - if the component has a 'value' prop, allow 'sync' binding
     */
    export type SyncProps<TCombined> = "value" extends keyof TCombined ? {
    	sync?: SyncBinding<TCombined["value"]>;
    } : {};
    export type ComponentFactory<TCombined extends Record<string, any>, TRef, TSlots> = ((props: StripForJSX<Omit<TCombined, EventNames<TCombined>>> & EventHandlers<TCombined> & SlotProps<TSlots> & SyncProps<TCombined> & ExternalModelProps<TCombined> & JSX.IntrinsicAttributes & ComponentAttributeExtensions & {
    	ref?: Ref<TRef>;
    	children?: any;
    }) => JSXElement) & {
    	/** @internal Setup function for the renderer */
    	__setup: SetupFn<StripInternalMarkers<TCombined>, TCombined, TRef, TSlots>;
    	/** @internal Component name for debugging */
    	__name?: string;
    	/** @internal Stable island identity based on file path (injected by sigxIslandsPlugin) */
    	__islandId?: string;
    	/** @internal Type brand for props */
    	__props: StripInternalMarkers<TCombined>;
    	/** @internal Type brand for events */
    	__events: TCombined;
    	/** @internal Type brand for ref */
    	__ref: TRef;
    	/** @internal Type brand for slots */
    	__slots: TSlots;
    };
    /**
     * Structural constraint type for generic functions that accept any ComponentFactory.
     *
     * Uses only the covariant brand properties (not the function signature) to avoid
     * contravariance issues with \`strictFunctionTypes\`. Any \`ComponentFactory<T, R, S>\`
     * satisfies this constraint regardless of its props type.
     *
     * @see ComponentFactory
     */
    export type AnyComponentFactory = {
    	(...args: any[]): any;
    	__setup: SetupFn<any, any, any, any>;
    	__props: any;
    	__events: any;
    	__ref: any;
    	__slots: any;
    };
    /**
     * Returns the setup context of the currently executing component, or \`null\` if called outside setup.
     *
     * Use this to access the component context (props, emit, etc.) from composable functions
     * or lifecycle hooks that run during component setup.
     *
     * @example
     * \`\`\`ts
     * function useMyComposable() {
     *     const ctx = getCurrentInstance();
     *     if (!ctx) throw new Error('Must be called during component setup');
     *     ctx.onMounted(({ el }) => console.log('Mounted to', el));
     * }
     * \`\`\`
     */
    export declare function getCurrentInstance(): any;
    /**
     * Register a callback to run after the component is mounted to the DOM.
     * Must be called during component setup.
     *
     * @param fn - Callback receiving a {@link MountContext} with the component's root element.
     *
     * @example
     * \`\`\`ts
     * const MyComponent = component(() => {
     *     onMounted(({ el }) => {
     *         console.log('Mounted to', el);
     *     });
     *     return () => <div>Hello</div>;
     * });
     * \`\`\`
     */
    export declare function onMounted(fn: (ctx: MountContext) => void): void;
    /**
     * Register a callback to run when the component is unmounted from the DOM.
     * Must be called during component setup. Use for cleanup (event listeners, timers, subscriptions).
     *
     * @param fn - Callback receiving a {@link MountContext} with the component's root element.
     *
     * @example
     * \`\`\`ts
     * const MyComponent = component(() => {
     *     const timer = setInterval(() => tick(), 1000);
     *     onUnmounted(() => clearInterval(timer));
     *     return () => <div>Tick</div>;
     * });
     * \`\`\`
     */
    export declare function onUnmounted(fn: (ctx: MountContext) => void): void;
    /**
     * Register a callback to run immediately after component setup completes,
     * before the first render. Must be called during component setup.
     *
     * @example
     * \`\`\`ts
     * const MyComponent = component(() => {
     *     onCreated(() => console.log('Setup done, about to render'));
     *     return () => <div>Hello</div>;
     * });
     * \`\`\`
     */
    export declare function onCreated(fn: () => void): void;
    /**
     * Register a callback to run after every reactive re-render of the component.
     * Must be called during component setup.
     *
     * @example
     * \`\`\`ts
     * const Counter = component(() => {
     *     const state = signal({ count: 0 });
     *     onUpdated(() => console.log('Re-rendered with count:', state.count));
     *     return () => <button onClick={() => state.count++}>{state.count}</button>;
     * });
     * \`\`\`
     */
    export declare function onUpdated(fn: () => void): void;
    /**
     * Get component metadata (for DevTools)
     */
    export declare function getComponentMeta(factory: Function): {
    	name?: string | undefined;
    	setup: SetupFn<any, any, any, any>;
    } | undefined;
    export type ExtractExposed<T> = "__exposed" extends keyof T ? (NonNullable<T["__exposed"]> extends {
    	__type: infer E;
    } ? E : void) : void;
    export type ExtractSlots<T> = T extends {
    	__slots?: infer S;
    } ? S : {};
    type StripInternalMarkers\$1<T> = {
    	[K in keyof T as K extends "__exposed" | "__slots" | "__models" | "__modelBindings" ? never : K extends \`model:\${string}\` ? never : K extends \`update:\${string}\` ? never : K]: T[K];
    };
    /**
     * Define a component. Returns a JSX factory function.
     *
     * @param setup - Setup function that receives context and returns a render function
     * @param options - Optional configuration (e.g., name for DevTools)
     *
     * @example
     * \`\`\`tsx
     * type CardProps = DefineProp<"title", string> & DefineSlot<"header">;
     *
     * export const Card = component<CardProps>((ctx) => {
     *     const { title } = ctx.props;
     *     const { slots } = ctx;
     *
     *     return () => (
     *         <div class="card">
     *             {slots.header?.() ?? <h2>{title}</h2>}
     *             {slots.default()}
     *         </div>
     *     );
     * });
     * \`\`\`
     */
    export declare function component<TCombined extends Record<string, any> = {}, TRef = ExtractExposed<TCombined>, TSlots = ExtractSlots<TCombined>>(setup: (ctx: ComponentSetupContext<PlatformElement, StripInternalMarkers\$1<TCombined>, TCombined, TRef, TSlots>) => ViewFn | Promise<ViewFn>, options?: ComponentOptions): ComponentFactory<TCombined, TRef, TSlots>;
    /**
     * Injectable function type with metadata
     */
    export interface InjectableFunction<T> {
    	(): T;
    	_factory: () => T;
    	_token: symbol;
    }
    /**
     * Define an injectable service/value that can be provided at app or component level.
     *
     * The returned function can be called to get the current instance:
     * - If provided at component level via \`defineProvide()\`, returns that instance
     * - If provided at app level via \`app.defineProvide()\`, returns that instance
     * - Otherwise falls back to a global singleton created by the factory
     *
     * @example
     * \`\`\`typescript
     * // Define a service
     * const useApiConfig = defineInjectable(() => ({
     *     baseUrl: 'https://api.example.com'
     * }));
     *
     * // Use it in any component - gets nearest provided instance or global singleton
     * const config = useApiConfig();
     * console.log(config.baseUrl);
     * \`\`\`
     */
    export declare function defineInjectable<T>(factory: () => T): InjectableFunction<T>;
    /**
     * Provide a new instance of an injectable at the current component level.
     * Child components will receive this instance when calling the injectable function.
     *
     * @param useFn - The injectable function created by defineInjectable
     * @param factory - Optional custom factory to create the instance (overrides default)
     *
     * @example
     * \`\`\`typescript
     * const useApiConfig = defineInjectable(() => ({ baseUrl: 'https://api.example.com' }));
     *
     * const MyComponent = component(() => {
     *     // Create and provide a new instance for this subtree
     *     const config = defineProvide(useApiConfig);
     *     config.baseUrl = 'https://custom.api.com';
     *
     *     return () => <ChildComponent />;
     * });
     *
     * // Or provide a pre-constructed instance:
     * const MyComponent2 = component(() => {
     *     const customService = createMyService({ custom: 'options' });
     *     defineProvide(useMyService, () => customService);
     *
     *     return () => <ChildComponent />;
     * });
     * \`\`\`
     */
    export declare function defineProvide<T>(useFn: InjectableFunction<T>, factory?: () => T): T;
    /**
     * Get the current AppContext from the component tree.
     * The AppContext is provided at the root component level during mount/hydrate/SSR.
     *
     * @example
     * \`\`\`typescript
     * const appContext = useAppContext();
     * console.log(appContext?.app);
     * \`\`\`
     */
    export declare function useAppContext(): AppContext | null;
    /**
     * Directive system for SignalX.
     *
     * Directives provide reusable element-level lifecycle hooks via the \`use:name\` prop syntax.
     * They can be registered globally via \`app.directive()\` or passed inline as imported values.
     *
     * @example
     * \`\`\`tsx
     * import { defineDirective } from 'sigx';
     *
     * const tooltip = defineDirective<string>({
     *     mounted(el, { value }) {
     *         el.title = value;
     *     },
     *     updated(el, { value }) {
     *         el.title = value;
     *     },
     *     unmounted(el) {
     *         el.title = '';
     *     }
     * });
     *
     * // Inline usage:
     * <div use:tooltip="Hello!">Hover me</div>
     *
     * // Or with explicit binding:
     * <div use:tooltip={[tooltip, "Hello!"]}>Hover me</div>
     * \`\`\`
     */
    /**
     * The binding object passed to directive hooks.
     */
    export interface DirectiveBinding<T = any> {
    	/** The current value passed to the directive */
    	value: T;
    	/** The previous value (available in \`updated\` hook) */
    	oldValue?: T;
    }
    /**
     * Extension interface for directive definitions.
     *
     * Other packages (e.g., \`@sigx/server-renderer\`) can augment this interface
     * to add hooks like \`getSSRProps\` via TypeScript module augmentation.
     *
     * @example
     * \`\`\`ts
     * // In @sigx/server-renderer
     * declare module '@sigx/runtime-core' {
     *     interface DirectiveDefinitionExtensions<T> {
     *         getSSRProps?(binding: DirectiveBinding<T>): Record<string, any> | void;
     *     }
     * }
     * \`\`\`
     */
    export interface DirectiveDefinitionExtensions<T = any> {
    }
    /**
     * A directive definition object with lifecycle hooks.
     *
     * All hooks are optional. Additional hooks (e.g., \`getSSRProps\`) may be
     * available when SSR packages augment \`DirectiveDefinitionExtensions\`.
     */
    export interface DirectiveDefinition<T = any, El = any> extends DirectiveDefinitionExtensions<T> {
    	/** Called after the element is created but before it is inserted into the DOM */
    	created?(el: El, binding: DirectiveBinding<T>): void;
    	/** Called after the element is inserted into the DOM */
    	mounted?(el: El, binding: DirectiveBinding<T>): void;
    	/** Called when the binding value changes */
    	updated?(el: El, binding: DirectiveBinding<T>): void;
    	/** Called before the element is removed from the DOM */
    	unmounted?(el: El, binding: DirectiveBinding<T>): void;
    }
    /**
     * A resolved directive binding stored on a VNode.
     * Tuple of [definition, value].
     */
    export type ResolvedDirective<T = any, El = any> = [
    	DirectiveDefinition<T, El>,
    	T
    ];
    /**
     * Define a directive. This is an identity function that marks the definition
     * for type inference and runtime identification.
     *
     * @example
     * \`\`\`ts
     * const highlight = defineDirective<string>({
     *     mounted(el, { value }) {
     *         el.style.backgroundColor = value;
     *     },
     *     updated(el, { value }) {
     *         el.style.backgroundColor = value;
     *     }
     * });
     * \`\`\`
     */
    export declare function defineDirective<T = any, El = any>(definition: DirectiveDefinition<T, El>): DirectiveDefinition<T, El>;
    /**
     * Check if a value is a directive definition.
     */
    export declare function isDirective(value: any): value is DirectiveDefinition;
    /**
     * Component instance info passed to lifecycle hooks.
     * This is renderer-agnostic - works with DOM, Terminal, or any platform.
     */
    export interface ComponentInstance {
    	/** Component name (if defined via component options) */
    	name?: string;
    	/** The component's setup context with props, slots, emit, etc. */
    	ctx: ComponentSetupContext;
    	/** The component's virtual node */
    	vnode: VNode;
    }
    /**
     * App-level configuration
     */
    export interface AppConfig {
    	/**
    	 * Global error handler for component errors.
    	 * Return true to suppress the error from propagating.
    	 */
    	errorHandler?: (err: Error, instance: ComponentInstance | null, info: string) => boolean | void;
    	/**
    	 * Global warning handler (dev mode).
    	 */
    	warnHandler?: (msg: string, instance: ComponentInstance | null, trace: string) => void;
    	/**
    	 * Performance tracking hook - called when a component renders
    	 */
    	performance?: boolean;
    }
    /**
     * App lifecycle hooks that plugins can use to observe all components
     */
    export interface AppLifecycleHooks {
    	/**
    	 * Called when a component's setup function completes
    	 */
    	onComponentCreated?: (instance: ComponentInstance) => void;
    	/**
    	 * Called after a component is mounted to the platform (DOM, terminal, etc.)
    	 */
    	onComponentMounted?: (instance: ComponentInstance) => void;
    	/**
    	 * Called before a component is unmounted
    	 */
    	onComponentUnmounted?: (instance: ComponentInstance) => void;
    	/**
    	 * Called when a component's render function runs (re-render)
    	 */
    	onComponentUpdated?: (instance: ComponentInstance) => void;
    	/**
    	 * Called when an error occurs in a component.
    	 * Return true to suppress the error from propagating.
    	 */
    	onComponentError?: (err: Error, instance: ComponentInstance, info: string) => boolean | void;
    }
    /**
     * App context that gets passed through the component tree.
     * Used internally by renderers to propagate app-level state.
     */
    export interface AppContext {
    	/** The app instance */
    	app: App;
    	/** App-level provides (available via inject in all components) */
    	provides: Map<symbol, unknown>;
    	/** App configuration */
    	config: AppConfig;
    	/** Lifecycle hooks from all plugins */
    	hooks: AppLifecycleHooks[];
    	/** Registered directives */
    	directives: Map<string, DirectiveDefinition>;
    }
    /**
     * Plugin interface - plugins implement install() to configure the app.
     *
     * @example
     * \`\`\`typescript
     * const useMyService = defineInjectable(() => new MyService());
     *
     * const myPlugin: Plugin<{ debug?: boolean }> = {
     *     name: 'my-plugin',
     *     install(app, options) {
     *         app.defineProvide(useMyService);
     *         app.hook({
     *             onComponentMounted: (instance) => {
     *                 if (options?.debug) console.log('Mounted:', instance.name);
     *             }
     *         });
     *     }
     * };
     * \`\`\`
     */
    interface Plugin\$1<Options = any> {
    	/**
    	 * Plugin name for debugging
    	 */
    	name?: string;
    	/**
    	 * Called when plugin is installed via app.use()
    	 */
    	install(app: App, options?: Options): void;
    }
    /**
     * Function-style plugin (simpler alternative to object plugins)
     *
     * @example
     * \`\`\`typescript
     * const useLogger = defineInjectable(() => createLogger());
     *
     * const simplePlugin: PluginInstallFn = (app) => {
     *     app.defineProvide(useLogger);
     * };
     * \`\`\`
     */
    export type PluginInstallFn<Options = any> = (app: App, options?: Options) => void;
    /**
     * Mount function signature - implemented by platform renderers.
     * Each platform (DOM, Terminal, etc.) provides their own mount function.
     *
     * @param element - The root component/element to render
     * @param container - Platform-specific container (HTMLElement, terminal options, etc.)
     * @param appContext - The app context for DI and lifecycle hooks
     * @returns Optional cleanup/unmount function
     *
     * @example
     * \`\`\`typescript
     * // DOM platform provides:
     * export const domMount: MountFn<HTMLElement> = (element, container, appContext) => {
     *     render(element, container, appContext);
     *     return () => { /* cleanup *\\/ };
     * };
     *
     * // Terminal platform provides:
     * export const terminalMount: MountFn<TerminalOptions> = (element, options, appContext) => {
     *     return renderTerminal(element, options, appContext);
     * };
     * \`\`\`
     */
    export type MountFn<TContainer = any> = (element: JSXElement, container: TContainer, appContext: AppContext) => (() => void) | void;
    /**
     * Unmount function signature - provided by platform renderers
     */
    export type UnmountFn<TContainer = any> = (container: TContainer) => void;
    /**
     * The App instance returned by defineApp().
     * Provides a chainable API for configuring and mounting the application.
     *
     * @example
     * \`\`\`tsx
     * const app = defineApp(<App />);
     *
     * // Using with defineInjectable tokens
     * const useConfig = defineInjectable(() => ({ apiUrl: 'https://...' }));
     * const config = app.defineProvide(useConfig);
     * config.apiUrl = 'https://custom.api.com';
     *
     * app.use(routerPlugin)
     *    .mount(document.getElementById('app')!);
     * \`\`\`
     */
    export interface App<TContainer = any> {
    	/**
    	 * App configuration (error handlers, etc.)
    	 */
    	config: AppConfig;
    	/**
    	 * Install a plugin. Plugins are only installed once.
    	 */
    	use<Options>(plugin: Plugin\$1<Options> | PluginInstallFn<Options>, options?: Options): App<TContainer>;
    	/**
    	 * Provide a new instance of an injectable at app level.
    	 * All components will receive this instance when calling the injectable function.
    	 *
    	 * @param useFn - An injectable function created by defineInjectable
    	 * @param factory - Optional custom factory. If not provided, uses the injectable's default factory.
    	 * @returns The created instance
    	 *
    	 * @example
    	 * \`\`\`typescript
    	 * const useApiConfig = defineInjectable(() => ({ baseUrl: 'https://api.example.com' }));
    	 *
    	 * const app = defineApp(<App />);
    	 *
    	 * // Use default factory
    	 * const config = app.defineProvide(useApiConfig);
    	 * config.baseUrl = 'https://custom.api.com';
    	 *
    	 * // Or provide custom factory
    	 * app.defineProvide(useApiConfig, () => ({ baseUrl: 'https://other.api.com' }));
    	 * \`\`\`
    	 */
    	defineProvide<T>(useFn: InjectableFunction<T>, factory?: () => T): T;
    	/**
    	 * Register lifecycle hooks to observe all components
    	 */
    	hook(hooks: AppLifecycleHooks): App<TContainer>;
    	/**
    	 * Register a global directive, or retrieve a registered one.
    	 *
    	 * @example
    	 * \`\`\`typescript
    	 * // Register
    	 * app.directive('tooltip', {
    	 *     mounted(el, { value }) { el.title = value; },
    	 *     updated(el, { value }) { el.title = value; }
    	 * });
    	 *
    	 * // Retrieve
    	 * const dir = app.directive('tooltip');
    	 * \`\`\`
    	 */
    	directive(name: string, definition: DirectiveDefinition): App<TContainer>;
    	directive(name: string): DirectiveDefinition | undefined;
    	/**
    	 * Mount the app to a container.
    	 *
    	 * If a mount function is not provided, the platform's default mount function
    	 * will be used (set via setDefaultMount by runtime-dom, runtime-terminal, etc.)
    	 *
    	 * @example
    	 * \`\`\`tsx
    	 * // Simple usage (uses platform default)
    	 * app.mount(document.getElementById('app')!);
    	 *
    	 * // Explicit mount function
    	 * import { domMount } from '@sigx/runtime-dom';
    	 * app.mount(document.getElementById('app')!, domMount);
    	 * \`\`\`
    	 */
    	mount(container: TContainer, mountFn?: MountFn<TContainer>): App<TContainer>;
    	/**
    	 * Unmount the app and clean up resources
    	 */
    	unmount(): void;
    	/**
    	 * Get the app context (for internal use by renderers)
    	 * @internal
    	 */
    	_context: AppContext;
    	/**
    	 * Check if the app is mounted
    	 * @internal
    	 */
    	_isMounted: boolean;
    	/**
    	 * The container where the app is mounted
    	 * @internal
    	 */
    	_container: TContainer | null;
    	/**
    	 * The root component passed to defineApp()
    	 * @internal
    	 */
    	_rootComponent: JSXElement;
    }
    /**
     * Create an application instance.
     *
     * @example
     * \`\`\`tsx
     * import { defineApp, defineInjectable } from '@sigx/runtime-core';
     *
     * // Define an injectable service
     * const useApiConfig = defineInjectable(() => ({ baseUrl: 'https://api.example.com' }));
     *
     * const app = defineApp(<App />);
     *
     * app.use(myPlugin, { option: 'value' });
     *
     * // Provide custom instance at app level
     * const config = app.defineProvide(useApiConfig);
     * config.baseUrl = 'https://custom.api.com';
     *
     * app.mount(document.getElementById('app')!);
     * \`\`\`
     */
    export declare function defineApp<TContainer = any>(rootComponent: JSXElement): App<TContainer>;
    /**
     * Creates a compound component by attaching sub-components as static properties.
     *
     * This enables the pattern of \`Parent.Child\` components (e.g., \`Menu.Item\`, \`Card.Body\`)
     * while preserving full TypeScript type inference for both the parent and children.
     *
     * @param main - The main/parent component factory
     * @param sub - An object containing sub-components to attach
     * @returns The main component with sub-components attached as static properties
     *
     * @example
     * \`\`\`tsx
     * // Define individual components
     * const _Menu = component<MenuProps>(ctx => { ... });
     * const _MenuItem = component<MenuItemProps>(ctx => { ... });
     * const _MenuTitle = component<MenuTitleProps>(ctx => { ... });
     *
     * // Create compound component
     * export const Menu = compound(_Menu, {
     *     Item: _MenuItem,
     *     Title: _MenuTitle,
     * });
     *
     * // Usage in JSX
     * <Menu>
     *     <Menu.Title>Navigation</Menu.Title>
     *     <Menu.Item value="home">Home</Menu.Item>
     *     <Menu.Item value="about">About</Menu.Item>
     * </Menu>
     * \`\`\`
     */
    export declare function compound<TMain extends AnyComponentFactory, TSub extends Record<string, AnyComponentFactory>>(main: TMain, sub: TSub): TMain & TSub;
    /**
     * Module with default export
     */
    export type ModuleWithDefault<T> = {
    	default: T;
    };
    /**
     * Loader function that returns a component or module with default export
     */
    export type ComponentLoader<T> = () => Promise<T | ModuleWithDefault<T>>;
    /**
     * Extended component factory with lazy loading methods
     */
    export type LazyComponentFactory<T extends AnyComponentFactory> = T & {
    	/** Preload the component without rendering */
    	preload: () => Promise<T>;
    	/** Check if the component is loaded */
    	isLoaded: () => boolean;
    	/** @internal Marker for lazy components */
    	__lazy: true;
    };
    /**
     * Props for the Suspense component
     */
    export type SuspenseProps = {
    	/** Fallback content to show while loading */
    	fallback?: JSXElement | (() => JSXElement);
    };
    /**
     * Create a lazy-loaded component wrapper.
     *
     * The component will be loaded on first render. Use with \`<Suspense>\` to show
     * a fallback while loading.
     *
     * @param loader - Function that returns a Promise resolving to the component
     * @returns A component factory that loads the real component on demand
     *
     * @example
     * \`\`\`tsx
     * import { lazy, Suspense } from 'sigx';
     *
     * // Component will be in a separate chunk
     * const HeavyChart = lazy(() => import('./components/HeavyChart'));
     *
     * // Usage
     * <Suspense fallback={<Spinner />}>
     *     <HeavyChart data={chartData} />
     * </Suspense>
     *
     * // Preload on hover
     * <button onMouseEnter={() => HeavyChart.preload()}>
     *     Show Chart
     * </button>
     * \`\`\`
     */
    export declare function lazy<T extends AnyComponentFactory>(loader: ComponentLoader<T>): LazyComponentFactory<T>;
    /**
     * Suspense boundary component for handling async loading states.
     *
     * Wraps lazy-loaded components and shows a fallback while they load.
     *
     * @example
     * \`\`\`tsx
     * import { lazy, Suspense } from 'sigx';
     *
     * const LazyDashboard = lazy(() => import('./Dashboard'));
     *
     * // Basic usage
     * <Suspense fallback={<div>Loading...</div>}>
     *     <LazyDashboard />
     * </Suspense>
     *
     * // With spinner component
     * <Suspense fallback={<Spinner size="large" />}>
     *     <LazyDashboard />
     *     <LazyCharts />
     * </Suspense>
     * \`\`\`
     */
    export declare const Suspense: ComponentFactory<SuspenseProps, void, {}>;
    /**
     * Check if a component is a lazy-loaded component
     */
    export declare function isLazyComponent(component: any): component is LazyComponentFactory<any>;
    /**
     * useAsync — composable for loading async dependencies in components.
     *
     * Wraps an async loader in a reactive signal with loading/error states.
     * No renderer changes required — works with sigx's existing effect system.
     *
     * @example
     * \`\`\`tsx
     * import { component, useAsync } from 'sigx';
     *
     * const CodeEditor = component(({ signal: s }) => {
     *     const libs = useAsync(async () => {
     *         const { EditorView } = await import('@codemirror/view');
     *         const { json } = await import('@codemirror/lang-json');
     *         return { EditorView, json };
     *     });
     *
     *     return () => {
     *         if (libs.loading) return <div class="skeleton" />;
     *         if (libs.error) return <div class="error">{libs.error.message}</div>;
     *         return <div ref={el => new libs.value!.EditorView({ parent: el })} />;
     *     };
     * });
     * \`\`\`
     */
    /**
     * Reactive state returned by useAsync.
     */
    export interface AsyncState<T> {
    	/** The resolved value, or null while loading / on error. */
    	readonly value: T | null;
    	/** True while the loader is in progress. */
    	readonly loading: boolean;
    	/** The error if the loader rejected, or null. */
    	readonly error: Error | null;
    }
    /**
     * Load an async resource inside a component's setup function.
     *
     * Returns a reactive object with \`value\`, \`loading\`, and \`error\` fields.
     * The component's render function re-runs automatically when the state changes.
     *
     * @param loader — async function that returns the resource
     * @returns reactive AsyncState
     */
    export declare function useAsync<T>(loader: () => Promise<T>): AsyncState<T>;
    /**
     * Props for the ErrorBoundary component
     */
    export type ErrorBoundaryProps = Define.Prop<"fallback", JSXElement | ((error: Error, retry: () => void) => JSXElement)> & Define.Slot<"default">;
    /**
     * ErrorBoundary component.
     *
     * Wraps children and catches errors thrown during rendering.
     * When an error occurs, displays the \`fallback\` UI.
     * Provides a \`retry\` function to reset and re-render children.
     */
    export declare const ErrorBoundary: ComponentFactory<ErrorBoundaryProps, void, {
    	default: () => JSXElement[] | JSXElement;
    }>;
    /**
     * Structured error system for SignalX runtime.
     *
     * Every runtime error has a unique code (SIGX001–SIGX999) so users can
     * programmatically handle errors and look them up in documentation.
     *
     * @example
     * \`\`\`ts
     * try {
     *     app.mount('#app');
     * } catch (e) {
     *     if (e instanceof SigxError && e.code === 'SIGX101') {
     *         // handle missing mount target
     *     }
     * }
     * \`\`\`
     */
    /**
     * Base error class for all SignalX runtime errors.
     */
    export declare class SigxError extends Error {
    	readonly code: string;
    	readonly suggestion?: string;
    	readonly cause?: Error;
    	constructor(message: string, options: {
    		code: string;
    		suggestion?: string;
    		cause?: Error;
    	});
    }
    /**
     * Error codes for the SignalX runtime.
     *
     * Ranges:
     * - SIGX001–SIGX099: App lifecycle
     * - SIGX100–SIGX199: Rendering / mounting
     * - SIGX200–SIGX299: Dependency injection
     */
    export declare const SigxErrorCode: {
    	readonly NO_MOUNT_FUNCTION: "SIGX001";
    	readonly RENDER_TARGET_NOT_FOUND: "SIGX100";
    	readonly MOUNT_TARGET_NOT_FOUND: "SIGX101";
    	readonly ASYNC_SETUP_CLIENT: "SIGX102";
    	readonly PROVIDE_OUTSIDE_SETUP: "SIGX200";
    	readonly PROVIDE_INVALID_INJECTABLE: "SIGX201";
    };
    export declare function noMountFunctionError(): SigxError;
    export declare function renderTargetNotFoundError(selector: string): SigxError;
    export declare function mountTargetNotFoundError(selector: string): SigxError;
    export declare function asyncSetupClientError(componentName: string): SigxError;
    export declare function provideOutsideSetupError(): SigxError;
    export declare function provideInvalidInjectableError(): SigxError;
    export declare class Utils {
    	static isPromise(value: any): boolean;
    }
    declare function guid(): string;
    type guid\$1 = string;
    declare const guid\$1: typeof guid;
    export declare enum InstanceLifetimes {
    	Transient = 0,
    	Scoped = 1,
    	Singleton = 2
    }
    export interface Subscription {
    	unsubscribe(): void;
    }
    export interface Topic<T> {
    	publish(data: T): void;
    	subscribe(handler: (data: T) => void): Subscription;
    	destroy(): void;
    }
    export declare function createTopic<T>(_options?: {
    	namespace?: string;
    	name?: string;
    }): Topic<T>;
    export declare function toSubscriber<T>(topic: Topic<T>): {
    	subscribe: (handler: (data: T) => void) => Subscription;
    };
    export declare class SubscriptionHandler {
    	private unsubs;
    	add(unsub: () => void): void;
    	unsubscribe(): void;
    }
    export interface SetupFactoryContext {
    	onDeactivated(fn: () => void): void;
    	subscriptions: SubscriptionHandler;
    	overrideDispose(onDispose: (fn: () => void) => void): void;
    }
    export declare function defineFactory<InferReturnSetup>(setup: (ctx: SetupFactoryContext, ...args: unknown[]) => InferReturnSetup, lifetime: InstanceLifetimes, typeIdentifier?: guid\$1): InjectableFunction<InferReturnSetup & {
    	dispose?: () => void;
    }>;
    export declare function defineFactory<InferReturnSetup, T1>(setup: (ctx: SetupFactoryContext, param1: T1) => InferReturnSetup, lifetime: InstanceLifetimes, typeIdentifier?: guid\$1): (param1: T1) => InferReturnSetup;
    export declare function defineFactory<InferReturnSetup, T1, T2>(setup: (ctx: SetupFactoryContext, param1: T1, param2: T2) => InferReturnSetup, lifetime: InstanceLifetimes, typeIdentifier?: string): (param1: T1, param2: T2) => InferReturnSetup;
    export declare function defineFactory<InferReturnSetup, T1, T2, T3>(setup: (ctx: SetupFactoryContext, param1: T1, param2: T2, param3: T3) => InferReturnSetup, lifetime: InstanceLifetimes, typeIdentifier?: guid\$1): (param1: T1, param2: T2, param3: T3) => InferReturnSetup;
    export declare function defineFactory<InferReturnSetup, T1, T2, T3, T4>(setup: (ctx: SetupFactoryContext, param1: T1, param2: T2, param3: T3, param4: T4) => InferReturnSetup, lifetime: InstanceLifetimes, typeIdentifier?: guid\$1): (param1: T1, param2: T2, param3: T3, param4: T4) => InferReturnSetup;
    export declare function defineFactory<InferReturnSetup, T1, T2, T3, T4, T5>(setup: (ctx: SetupFactoryContext, param1: T1, param2: T2, param3: T3, param4: T4, param5: T5) => InferReturnSetup, lifetime: InstanceLifetimes, typeIdentifier?: guid\$1): (param1: T1, param2: T2, param3: T3, param4: T4, param5: T5) => InferReturnSetup;
    /**
     * Component type checking utilities
     *
     * Separated to avoid circular dependencies between jsx-runtime and renderer.
     */
    /**
     * Minimal interface for component detection.
     * Full ComponentFactory type is generic and complex, so we use this minimal
     * interface for the type guard.
     */
    export interface ComponentLike {
    	__setup: Function;
    	__name?: string;
    }
    /**
     * Check if a value is a SignalX component (has __setup).
     *
     * SignalX components are created with component() and have a __setup
     * property containing the setup function.
     *
     * @example
     * \`\`\`ts
     * const MyComponent = component((ctx) => () => <div/>);
     * isComponent(MyComponent); // true
     * isComponent(() => <div/>); // false (plain function component)
     * isComponent('div'); // false
     * \`\`\`
     */
    export declare function isComponent(type: unknown): type is ComponentLike;
    /**
     * Hydration utilities for SSR
     *
     * These utilities are shared between server-side rendering (stream.ts)
     * and client-side hydration (hydrate.ts). They are placed in runtime-core
     * to allow any SSR implementation to use them.
     *
     * @module
     */
    /**
     * Client directive prefix used for selective hydration
     */
    export declare const CLIENT_DIRECTIVE_PREFIX = "client:";
    /**
     * Valid client directive names
     */
    export declare const CLIENT_DIRECTIVES: readonly [
    	"client:load",
    	"client:idle",
    	"client:visible",
    	"client:media",
    	"client:only"
    ];
    export type ClientDirective = typeof CLIENT_DIRECTIVES[number];
    /**
     * Hydration strategies for client directives
     */
    export type HydrationStrategy = "load" | "idle" | "visible" | "media" | "only";
    /**
     * Result of getHydrationDirective
     */
    export interface HydrationDirective {
    	strategy: HydrationStrategy;
    	media?: string;
    }
    /** DOM platform sets HTMLElement as the default element type */
    export interface PlatformTypes {
    	element: HTMLElement;
    }
    /**
     * Render a SignalX element to a DOM container.
     * Supports both Element references and CSS selectors.
     *
     * @example
     * \`\`\`tsx
     * import { render } from 'sigx';
     *
     * // Using CSS selector
     * render(<App />, "#app");
     *
     * // Using element reference
     * render(<App />, document.getElementById('app')!);
     * \`\`\`
     */
    export declare const render: (element: JSXElement, container: string | Element, appContext?: AppContext | undefined) => void;
    /**
     * A directive definition narrowed to DOM elements.
     * Use this type when defining directives for the DOM renderer.
     *
     * @example
     * \`\`\`ts
     * import { defineDirective, type DOMDirective } from 'sigx';
     *
     * const tooltip = defineDirective<string, HTMLElement>({
     *     mounted(el, { value }) {
     *         el.title = value; // el is HTMLElement, fully typed
     *     }
     * });
     * \`\`\`
     */
    export type DOMDirective<T = any> = DirectiveDefinition<T, HTMLElement>;
    /**
     * Check if the browser supports the moveBefore API.
     * moveBefore allows moving DOM nodes without losing state (iframes, videos, focus, etc.)
     */
    export declare function supportsMoveBefore(): boolean;
    /**
     * Move or insert a node into a parent, using moveBefore when available
     * for state-preserving moves.
     *
     * @param parent - The target parent element
     * @param node - The node to move/insert
     * @param anchor - Optional reference node to insert before
     */
    export declare function moveNode(parent: Element, node: Node, anchor?: Node | null): void;
    export type PortalProps = Define.Prop<"to", string | Element> & Define.Prop<"disabled", boolean>;
    /**
     * Portal component - renders children to a different DOM location.
     *
     * Props:
     * - \`to\` - Target container (Element or CSS selector string). Defaults to document.body.
     * - \`disabled\` - When true, renders children in place instead of portaling
     * - \`children\` - Content to render in the portal
     *
     * Features:
     * - Uses \`moveBefore\` API (Chrome 133+) for state-preserving DOM moves
     * - Preserves iframe content, video playback, focus, and CSS animations
     * - Falls back to \`insertBefore\` for older browsers
     */
    export declare const Portal: ComponentFactory<PortalProps, void, {}>;
    /**
     * Built-in \`show\` directive — toggles element visibility via \`display\` CSS property.
     *
     * Unlike conditional rendering (ternary in JSX), \`use:show\` keeps the element in the DOM
     * and only toggles its \`display\` style. This is useful when toggling is frequent and you
     * want to preserve element state (e.g., scroll position, input focus).
     *
     * @example
     * \`\`\`tsx
     * // Shorthand — directive resolved automatically:
     * <div use:show={isVisible}>Content</div>
     *
     * // Explicit tuple form:
     * import { show } from 'sigx';
     * <div use:show={[show, isVisible]}>Content</div>
     * \`\`\`
     */
    export declare const show: DirectiveDefinition<boolean, HTMLElement>;

    export {
    	Comment\$1 as Comment,
    	Plugin\$1 as Plugin,
    	Text\$1 as Text,
    	guid\$1 as guid,
    };


}`;

/** @sigx/router module types */
export const routerModuleTypes = `declare module "@sigx/router" {
    import { App, ComponentFactory, Define, Plugin as Plugin\$1 } from 'sigx';

    /**
     * Route parameters extracted from the URL path
     */
    export type RouteParams = Record<string, string>;
    /**
     * Query parameters from the URL search string
     */
    export type RouteQuery = Record<string, string | string[] | undefined>;
    /**
     * Navigation guard return types
     */
    export type NavigationGuardReturn = void | boolean | string | RouteLocationRaw | Promise<void | boolean | string | RouteLocationRaw>;
    /**
     * Navigation guard function signature
     */
    export type NavigationGuard = (to: RouteLocation, from: RouteLocation | null) => NavigationGuardReturn;
    /**
     * After navigation hook (no return value, just for side effects)
     */
    export type NavigationHookAfter = (to: RouteLocation, from: RouteLocation | null) => void;
    /**
     * Raw route location - what you pass to navigate()
     */
    export type RouteLocationRaw = string | {
    	path?: string;
    	name?: string;
    	params?: RouteParams;
    	query?: RouteQuery;
    	hash?: string;
    	replace?: boolean;
    };
    /**
     * Resolved route location - the current route state
     */
    export interface RouteLocation {
    	/** Full path including query and hash */
    	fullPath: string;
    	/** Path without query and hash */
    	path: string;
    	/** Route name (if matched) */
    	name: string | undefined;
    	/** Route parameters */
    	params: RouteParams;
    	/** Query parameters */
    	query: RouteQuery;
    	/** Hash (with #) */
    	hash: string;
    	/** Matched route records (for nested routes) */
    	matched: MatchedRouteRecord[];
    	/** Route meta fields */
    	meta: RouteMeta;
    	/** Whether this is a redirect */
    	redirectedFrom?: RouteLocation;
    }
    /**
     * Route meta fields - can be extended by users
     */
    export interface RouteMeta {
    	[key: string]: any;
    }
    /**
     * Route record definition - how routes are defined
     */
    export interface RouteRecordRaw {
    	/** Path pattern (e.g., '/blog/:slug') */
    	path: string;
    	/** Route name for named navigation */
    	name?: string;
    	/** Component to render */
    	component?: ComponentFactory<any, any, any> | (() => Promise<{
    		default: ComponentFactory<any, any, any>;
    	}>);
    	/** Child routes */
    	children?: RouteRecordRaw[];
    	/** Redirect target */
    	redirect?: RouteLocationRaw | ((to: RouteLocation) => RouteLocationRaw);
    	/** Route-specific meta fields */
    	meta?: RouteMeta;
    	/** Route-specific navigation guard */
    	beforeEnter?: NavigationGuard | NavigationGuard[];
    	/** Props passed to component */
    	props?: boolean | Record<string, any> | ((route: RouteLocation) => Record<string, any>);
    }
    /**
     * Matched route record - after matching
     */
    export interface MatchedRouteRecord {
    	/** Path pattern */
    	path: string;
    	/** Route name */
    	name: string | undefined;
    	/** Component to render */
    	component: ComponentFactory<any, any, any> | (() => Promise<{
    		default: ComponentFactory<any, any, any>;
    	}>) | undefined;
    	/** Route meta */
    	meta: RouteMeta;
    	/** Props config */
    	props?: boolean | Record<string, any> | ((route: RouteLocation) => Record<string, any>);
    }
    /**
     * Scroll position returned by the scrollBehavior handler
     */
    export interface ScrollPosition {
    	/** Pixels from the left */
    	left?: number;
    	/** Pixels from the top */
    	top?: number;
    	/** CSS selector or Element to scroll to */
    	el?: string | Element;
    	/** Scroll behavior ('auto' or 'smooth') */
    	behavior?: "auto" | "smooth";
    }
    /**
     * Scroll behavior handler called after every navigation.
     *
     * Return a ScrollPosition to scroll, \`false\` to skip scrolling,
     * or void/undefined to do nothing.
     *
     * @param to       - Target route
     * @param from     - Previous route (null on initial navigation)
     * @param savedPosition - Saved {left, top} for back/forward navigations, null for push/replace
     */
    export type ScrollBehaviorHandler = (to: RouteLocation, from: RouteLocation | null, savedPosition: {
    	left: number;
    	top: number;
    } | null) => ScrollPosition | false | void | Promise<ScrollPosition | false | void>;
    /**
     * Router options for creating a router instance
     */
    export interface RouterOptions {
    	/** Route definitions */
    	routes: RouteRecordRaw[];
    	/** History implementation (browser, memory, etc.) */
    	history: RouterHistory;
    	/** Base URL for the application */
    	base?: string;
    	/** Custom scroll behavior handler called after each navigation */
    	scrollBehavior?: ScrollBehaviorHandler;
    }
    /**
     * History state stored in the history API
     */
    export interface HistoryState {
    	/** Position in history for scroll restoration */
    	position?: number;
    	/** Route path */
    	path: string;
    	/** Custom state */
    	state?: Record<string, any>;
    }
    /**
     * Router history abstraction - allows different history implementations
     * (browser history, memory history for SSR, hash history, etc.)
     */
    export interface RouterHistory {
    	/** Current location */
    	readonly location: string;
    	/** Current state */
    	readonly state: HistoryState | null;
    	/** Base path */
    	readonly base: string;
    	/** Push a new entry to history */
    	push(to: string, state?: HistoryState): void;
    	/** Replace current entry in history */
    	replace(to: string, state?: HistoryState): void;
    	/** Go back/forward in history */
    	go(delta: number): void;
    	/** Listen for history changes */
    	listen(callback: (to: string, from: string, state: HistoryState | null) => void): () => void;
    	/** Create href for a path */
    	createHref(path: string): string;
    	/** Destroy the history instance (cleanup listeners) */
    	destroy(): void;
    }
    /**
     * Main Router interface
     */
    export interface Router {
    	/** Current route (reactive) */
    	readonly currentRoute: RouteLocation;
    	/** Router options */
    	readonly options: RouterOptions;
    	/** Navigate to a new location */
    	push(to: RouteLocationRaw): Promise<RouteLocation | void>;
    	/** Replace current location */
    	replace(to: RouteLocationRaw): Promise<RouteLocation | void>;
    	/** Go back in history */
    	back(): void;
    	/** Go forward in history */
    	forward(): void;
    	/** Go to specific position in history */
    	go(delta: number): void;
    	/** Register a global before guard */
    	beforeEach(guard: NavigationGuard): () => void;
    	/** Register a global before resolve guard */
    	beforeResolve(guard: NavigationGuard): () => void;
    	/** Register a global after hook */
    	afterEach(hook: NavigationHookAfter): () => void;
    	/** Check if a route exists */
    	hasRoute(name: string): boolean;
    	/** Get all registered routes */
    	getRoutes(): RouteRecordRaw[];
    	/** Add a route dynamically */
    	addRoute(route: RouteRecordRaw, parentName?: string): () => void;
    	/** Remove a route */
    	removeRoute(name: string): void;
    	/** Resolve a route location */
    	resolve(to: RouteLocationRaw): RouteLocation;
    	/**
    	 * Pattern matching helper for declarative route rendering
    	 *
    	 * @example
    	 * \`\`\`tsx
    	 * return () => router.match({
    	 *     home: () => <HomePage />,
    	 *     'blog-post': ({ slug }) => <BlogPost slug={slug} />,
    	 *     _: () => <NotFound />
    	 * });
    	 * \`\`\`
    	 */
    	match<T>(patterns: RouteMatchPatterns<T>): T | undefined;
    	/** Install router as plugin */
    	install(app: App): void;
    	/** Check if router is ready */
    	isReady(): Promise<void>;
    }
    /**
     * Route match patterns for declarative route matching
     * Each key is a route name, value is a render function that receives params
     * Use '_' as a catch-all/fallback pattern
     */
    export type RouteMatchPatterns<T> = {
    	[routeName: string]: ((params: RouteParams) => T) | T;
    } & {
    	/** Fallback/catch-all pattern */
    	_?: ((params: RouteParams) => T) | T;
    };
    /**
     * Injectable for accessing the router instance.
     * Must be installed via app.use(router) before use.
     */
    export declare const useRouter: import("sigx").InjectableFunction<Router>;
    /**
     * Injectable for accessing the current route (reactive).
     * Must be installed via app.use(router) before use.
     */
    export declare const useRoute: import("sigx").InjectableFunction<RouteLocation>;
    /**
     * Create a router instance
     *
     * @example
     * \`\`\`ts
     * import { createRouter } from '@sigx/router';
     * import { createWebHistory } from '@sigx/router/history';
     *
     * const router = createRouter({
     *     history: createWebHistory(),
     *     routes: [
     *         { path: '/', component: Home },
     *         { path: '/about', component: About },
     *         { path: '/blog/:slug', component: BlogPost }
     *     ]
     * });
     * \`\`\`
     */
    export declare function createRouter(options: RouterOptions): Router;
    export interface BrowserHistoryOptions {
    	/** Base path for the application */
    	base?: string;
    }
    /**
     * Create a browser history instance that uses the HTML5 History API
     */
    export declare function createWebHistory(options?: BrowserHistoryOptions): RouterHistory;
    export interface MemoryHistoryOptions {
    	/** Base path for the application */
    	base?: string;
    	/** Initial location */
    	initialLocation?: string;
    }
    /**
     * Create a memory history instance for SSR
     *
     * @example
     * \`\`\`ts
     * // Server-side
     * const history = createMemoryHistory({ initialLocation: req.url });
     * const router = createRouter({ routes, history });
     * \`\`\`
     */
    export declare function createMemoryHistory(options?: MemoryHistoryOptions): RouterHistory;
    export interface HashHistoryOptions {
    	/**
    	 * Base path prepended inside the hash.
    	 * With base '/app' the URL becomes /#/app/about instead of /#/about.
    	 */
    	base?: string;
    }
    /**
     * Create a hash-based history instance
     *
     * @example
     * \`\`\`ts
     * import { createRouter, createHashHistory } from '@sigx/router';
     *
     * const router = createRouter({
     *     history: createHashHistory(),
     *     routes: [...]
     * });
     * \`\`\`
     */
    export declare function createHashHistory(options?: HashHistoryOptions): RouterHistory;
    /**
     * Get route parameters (reactive)
     *
     * @example
     * \`\`\`tsx
     * const params = useParams();
     * console.log(params.id);
     * \`\`\`
     */
    export declare function useParams(): RouteParams;
    /**
     * Get query parameters (reactive)
     *
     * @example
     * \`\`\`tsx
     * const query = useQuery();
     * console.log(query.search);
     * \`\`\`
     */
    export declare function useQuery(): RouteQuery;
    /**
     * Get a navigate function for programmatic navigation
     *
     * @example
     * \`\`\`tsx
     * const navigate = useNavigate();
     * navigate('/about');
     * navigate({ path: '/blog', query: { page: '2' } });
     * \`\`\`
     */
    export declare function useNavigate(): (to: RouteLocationRaw) => Promise<void | RouteLocation>;
    /**
     * Guard type for route enter
     */
    export type RouteEnterGuard = (to: RouteLocation, from: RouteLocation | null, next: (to?: string | false | RouteLocation) => void) => void;
    /**
     * Guard type for route leave
     */
    export type RouteLeaveGuard = (to: RouteLocation, from: RouteLocation, next: (to?: string | false | RouteLocation) => void) => void;
    /**
     * Register a navigation guard that runs before leaving the current route
     *
     * @example
     * \`\`\`tsx
     * onBeforeRouteLeave((to, from, next) => {
     *     if (hasUnsavedChanges) {
     *         const answer = confirm('You have unsaved changes. Leave anyway?');
     *         if (!answer) {
     *             next(false);
     *             return;
     *         }
     *     }
     *     next();
     * });
     * \`\`\`
     */
    export declare function onBeforeRouteLeave(guard: RouteLeaveGuard): void;
    /**
     * Register a navigation guard that runs when entering the current route
     *
     * @example
     * \`\`\`tsx
     * onBeforeRouteUpdate((to, from, next) => {
     *     // Called when route params change but component is reused
     *     next();
     * });
     * \`\`\`
     */
    export declare function onBeforeRouteUpdate(guard: RouteEnterGuard): void;
    export type RouterViewProps = Define.Prop<"name", string> & Define.Prop<"pageProps", Record<string, unknown>>;
    export declare const RouterView: ComponentFactory<RouterViewProps, void, {}>;
    export type LinkProps = Define.Prop<"to", RouteLocationRaw, true> & Define.Prop<"replace", boolean> & Define.Prop<"activeClass", string> & Define.Prop<"exactActiveClass", string> & Define.Prop<"ariaCurrentValue", "page" | "step" | "location" | "date" | "time" | "true" | "false"> & Define.Event<"click", MouseEvent> & Define.Slot<"default">;
    export declare const Link: import("sigx").ComponentFactory<LinkProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    /**
     * Alias for Link component
     */
    export declare const RouterLink: import("sigx").ComponentFactory<LinkProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    /**
     * Router plugin options
     */
    export interface RouterPluginOptions {
    	/** Route definitions */
    	routes: RouteRecordRaw[];
    	/** History implementation */
    	history: RouterHistory;
    	/** Base URL */
    	base?: string;
    }
    /**
     * Create a router plugin for use with app.use()
     *
     * @example
     * \`\`\`tsx
     * import { defineApp } from '@sigx/runtime-core';
     * import { createRouterPlugin, createWebHistory } from '@sigx/router';
     *
     * const routerPlugin = createRouterPlugin({
     *     history: createWebHistory(),
     *     routes: [
     *         { path: '/', component: Home },
     *         { path: '/about', component: About }
     *     ]
     * });
     *
     * const app = defineApp(<App />);
     * app.use(routerPlugin);
     * app.mount('#app');
     * \`\`\`
     */
    export declare function createRouterPlugin(options: RouterPluginOptions): Plugin\$1 & {
    	router: Router;
    };
    /**
     * Parse query string into object
     */
    export declare function parseQuery(queryString: string): RouteQuery;
    /**
     * Stringify query object
     */
    export declare function stringifyQuery(query: RouteQuery): string;
    /**
     * Parse full URL into components
     */
    export declare function parseURL(url: string): {
    	path: string;
    	query: RouteQuery;
    	hash: string;
    };
    /**
     * Build a full path from components
     */
    export declare function buildPath(path: string, query?: RouteQuery, hash?: string): string;


}`;

/** @sigx/store module types */
export const storeModuleTypes = `declare module "@sigx/store" {
    import { InstanceLifetimes, SetupFactoryContext, Subscription, Topic, defineFactory, toSubscriber } from '@sigx/runtime-core';

    export type MutateFn<T> = (value: T | ((prev: T) => T)) => void;
    export type StoreEvents<TState extends object, TEvents extends Record<string, Topic<any>> = {}> = {
    	[K in keyof TState as \`onMutated\${Capitalize<string & K>}\`]: ReturnType<typeof toSubscriber<TState[K]>>;
    } & TEvents;
    export type MapActionOnDispatching<T extends Function> = T extends (...args: infer U) => any ? (...args: U) => void : never;
    export type MapActionOnDispatched<T extends Function> = T extends (...args: infer U) => Promise<infer Y> | infer Y ? (result: Y, ...args: U) => void : never;
    export type MapActionOnFailure<T extends Function> = T extends (...args: infer U) => any ? (failureReason: any, ...args: U) => void : never;
    export type StoreReturnDefineAction<TAction extends {
    	[key: string]: any;
    }> = {
    	onDispatching: {
    		[k in keyof TAction]: {
    			subscribe(fn: MapActionOnDispatching<TAction[k]>): Subscription;
    		};
    	};
    	onDispatched: {
    		[k in keyof TAction]: {
    			subscribe(fn: MapActionOnDispatched<TAction[k]>): Subscription;
    		};
    	};
    	onFailure: {
    		[k in keyof TAction]: {
    			subscribe(fn: MapActionOnFailure<TAction[k]>): Subscription;
    		};
    	};
    } & TAction;
    export interface SetupStoreContext extends SetupFactoryContext {
    	defineState<TState extends object, TEvents extends Record<string, Topic<any>> = Record<string, Topic<any>>>(state: TState): {
    		state: TState;
    		events: StoreEvents<TState, TEvents>;
    		mutate: {
    			[K in keyof TState]: MutateFn<TState[K]>;
    		};
    	};
    	defineActions<TActions extends {
    		[key: string]: any;
    	}>(actions: TActions): StoreReturnDefineAction<TActions>;
    }
    export interface IReturnSetupStore<TState, TGetters, TActions extends {
    	[key: string]: Function;
    }, TEvents> {
    	state?: TState;
    	get?: TGetters;
    	actions?: StoreReturnDefineAction<TActions>;
    	events?: TEvents;
    	name?: string;
    }
    export declare function defineStore<TState extends object, TGetters extends object, TActions extends {
    	[key: string]: any;
    }, TEvents extends Record<string, ReturnType<typeof toSubscriber<any>>>, InferReturnSetup extends IReturnSetupStore<TState, TGetters, TActions, TEvents>>(name: string, setup: (ctx: SetupStoreContext) => InferReturnSetup, lifetime?: InstanceLifetimes): ReturnType<typeof defineFactory<InferReturnSetup>>;
    export declare function defineStore<TState extends object, TGetters extends object, TActions extends {
    	[key: string]: any;
    }, TEvents extends Record<string, ReturnType<typeof toSubscriber<any>>>, InferReturnSetup extends IReturnSetupStore<TState, TGetters, TActions, TEvents>, T1>(name: string, setup: (ctx: SetupStoreContext, param1: T1) => InferReturnSetup, lifetime?: InstanceLifetimes): ReturnType<typeof defineFactory<InferReturnSetup, T1>>;
    export declare function defineStore<TState extends object, TGetters extends object, TActions extends {
    	[key: string]: any;
    }, TEvents extends Record<string, ReturnType<typeof toSubscriber<any>>>, InferReturnSetup extends IReturnSetupStore<TState, TGetters, TActions, TEvents>, T1, T2>(name: string, setup: (ctx: SetupStoreContext, param1: T1, param2: T2) => InferReturnSetup, lifetime?: InstanceLifetimes): ReturnType<typeof defineFactory<InferReturnSetup, T1, T2>>;
    export declare function defineStore<TState extends object, TGetters extends object, TActions extends {
    	[key: string]: any;
    }, TEvents extends Record<string, ReturnType<typeof toSubscriber<any>>>, InferReturnSetup extends IReturnSetupStore<TState, TGetters, TActions, TEvents>, T1, T2, T3>(name: string, setup: (ctx: SetupStoreContext, param1: T1, param2: T2, param3: T3, lifetime?: InstanceLifetimes) => InferReturnSetup): ReturnType<typeof defineFactory<InferReturnSetup, T1, T2, T3>>;
    export declare function defineStore<TState extends object, TGetters extends object, TActions extends {
    	[key: string]: any;
    }, TEvents extends Record<string, ReturnType<typeof toSubscriber<any>>>, InferReturnSetup extends IReturnSetupStore<TState, TGetters, TActions, TEvents>, T1, T2, T3, T4>(name: string, setup: (ctx: SetupStoreContext, param1: T1, param2: T2, param3: T3, param4: T4, lifetime?: InstanceLifetimes) => InferReturnSetup): ReturnType<typeof defineFactory<InferReturnSetup, T1, T2, T3, T4>>;
    export declare function defineStore<TState extends object, TGetters extends object, TActions extends {
    	[key: string]: any;
    }, TEvents extends Record<string, ReturnType<typeof toSubscriber<any>>>, InferReturnSetup extends IReturnSetupStore<TState, TGetters, TActions, TEvents>, T1, T2, T3, T4, T5>(name: string, setup: (ctx: SetupStoreContext, param1: T1, param2: T2, param3: T3, param4: T4, param5: T5) => InferReturnSetup, lifetime?: InstanceLifetimes): ReturnType<typeof defineFactory<InferReturnSetup, T1, T2, T3, T4, T5>>;


}`;

/** @sigx/daisyui module types */
export const daisyuiModuleTypes = `declare module "@sigx/daisyui" {
    import { Define, JSXElement } from 'sigx';

    /**
     * Built-in DaisyUI themes
     */
    export type DaisyTheme = "light" | "cupcake" | "bumblebee" | "emerald" | "corporate" | "retro" | "cyberpunk" | "valentine" | "garden" | "lofi" | "pastel" | "fantasy" | "wireframe" | "cmyk" | "autumn" | "acid" | "lemonade" | "winter" | "nord" | "dark" | "synthwave" | "halloween" | "forest" | "aqua" | "black" | "luxury" | "dracula" | "business" | "night" | "coffee" | "dim" | "sunset";
    /**
     * Theme configuration options
     */
    export interface ThemeConfig {
    	/** Default theme to use */
    	defaultTheme?: DaisyTheme | string;
    	/** List of themes to include (for custom CSS generation) */
    	themes?: (DaisyTheme | string)[];
    	/** Whether to enable dark mode detection */
    	darkMode?: boolean;
    	/** Custom theme definitions */
    	customThemes?: Record<string, Record<string, string>>;
    }
    /**
     * Get the current theme from the document
     */
    export declare function getCurrentTheme(): string | null;
    /**
     * Set the theme on the document
     */
    export declare function setTheme(theme: DaisyTheme | string): void;
    /**
     * Get the preferred theme from localStorage or system preference
     */
    export declare function getPreferredTheme(defaultTheme?: DaisyTheme | string): DaisyTheme | string;
    /**
     * Initialize theme based on user preference or default
     */
    export declare function initializeTheme(config?: ThemeConfig): void;
    /**
     * Toggle between light and dark themes
     */
    export declare function toggleDarkMode(lightTheme?: DaisyTheme, darkTheme?: DaisyTheme): void;
    export type ThemeProviderProps = Define.Prop<"theme", DaisyTheme | string, false> & Define.Prop<"defaultTheme", DaisyTheme | string, false> & Define.Prop<"darkMode", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * ThemeProvider component that wraps your app and manages theme state.
     *
     * @example
     * \`\`\`tsx
     * <ThemeProvider defaultTheme="cupcake" darkMode>
     *   <App />
     * </ThemeProvider>
     * \`\`\`
     */
    export declare const ThemeProvider: import("sigx").ComponentFactory<ThemeProviderProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type ThemeSelectorProps = Define.Prop<"themes", (DaisyTheme | string)[], false> & Define.Prop<"class", string, false>;
    /**
     * A dropdown selector for switching themes.
     *
     * @example
     * \`\`\`tsx
     * <ThemeSelector themes={['light', 'dark', 'cupcake', 'cyberpunk']} />
     * \`\`\`
     */
    export declare const ThemeSelector: import("sigx").ComponentFactory<ThemeSelectorProps, void, {}>;
    export type ThemeToggleProps = Define.Prop<"lightTheme", DaisyTheme | string, false> & Define.Prop<"darkTheme", DaisyTheme | string, false> & Define.Prop<"class", string, false>;
    /**
     * A toggle button for switching between light and dark themes.
     *
     * @example
     * \`\`\`tsx
     * <ThemeToggle lightTheme="light" darkTheme="dark" />
     * \`\`\`
     */
    export declare const ThemeToggle: import("sigx").ComponentFactory<ThemeToggleProps, void, {}>;
    /**
     * Theme configuration types, utilities, and preset values for DaisyUI v5.
     *
     * DaisyUI v5 uses oklch color space and CSS custom properties for theming.
     * This module provides the data model, color conversion, CSS generation,
     * and built-in theme presets for the ThemeConfigurator component.
     */
    /** All configurable theme colors (oklch format strings) */
    export interface ThemeColors {
    	base100: string;
    	base200: string;
    	base300: string;
    	baseContent: string;
    	primary: string;
    	primaryContent: string;
    	secondary: string;
    	secondaryContent: string;
    	accent: string;
    	accentContent: string;
    	neutral: string;
    	neutralContent: string;
    	info: string;
    	infoContent: string;
    	success: string;
    	successContent: string;
    	warning: string;
    	warningContent: string;
    	error: string;
    	errorContent: string;
    }
    /** Full theme configuration data */
    export interface ThemeConfigData {
    	/** Theme name */
    	name: string;
    	/** Color scheme: light or dark */
    	colorScheme: "light" | "dark";
    	/** All theme colors in oklch format */
    	colors: ThemeColors;
    	/** Border radius for cards, modals, alerts (rem) */
    	radiusBox: number;
    	/** Border radius for buttons, inputs, selects, tabs (rem) */
    	radiusField: number;
    	/** Border radius for checkboxes, toggles, badges (rem) */
    	radiusSelector: number;
    	/** 3D depth effect on fields & selectors (0 or 1) */
    	depth: number;
    	/** Noise pattern effect on fields & selectors (0 or 1) */
    	noise: number;
    	/** Base size for buttons, inputs, selects, tabs (rem) */
    	sizeField: number;
    	/** Base size for checkboxes, toggles, badges (rem) */
    	sizeSelector: number;
    	/** Border width for all components (px) */
    	border: number;
    }
    /** Color group definition for the configurator UI */
    export interface ColorGroup {
    	id: string;
    	label: string;
    	mainKey: keyof ThemeColors;
    	contentKey: keyof ThemeColors;
    }
    /** The 9 configurable color groups */
    export declare const COLOR_GROUPS: ColorGroup[];
    /**
     * Convert hex color to oklch string.
     * Goes hex -> sRGB -> linear sRGB -> XYZ D65 -> oklab -> oklch.
     */
    export declare function hexToOklch(hex: string): string;
    /**
     * Convert oklch string to hex color.
     * Goes oklch -> oklab -> XYZ D65 -> linear sRGB -> sRGB -> hex.
     */
    export declare function oklchToHex(oklch: string): string;
    /**
     * Apply theme config as CSS custom properties on a DOM element.
     * This enables live preview by scoping variables to a container.
     */
    export declare function applyThemeToElement(el: HTMLElement, config: ThemeConfigData): void;
    /**
     * Apply theme config to the document root (for global application).
     */
    export declare function applyThemeToDocument(config: ThemeConfigData): void;
    /**
     * Generate DaisyUI v5 CSS plugin code from config.
     * Output is ready to paste into an app.css file.
     */
    export declare function generateThemeCSS(config: ThemeConfigData): string;
    /**
     * Generate JSON representation of theme config.
     */
    export declare function generateThemeJSON(config: ThemeConfigData): string;
    /**
     * Parse JSON string back to ThemeConfigData.
     */
    export declare function parseThemeJSON(json: string): ThemeConfigData | null;
    /**
     * Save theme config to localStorage.
     */
    export declare function saveThemeConfig(key: string, config: ThemeConfigData): void;
    /**
     * Load theme config from localStorage.
     */
    export declare function loadThemeConfig(key: string): ThemeConfigData | null;
    /** Default theme config based on DaisyUI "light" theme */
    export declare const DEFAULT_THEME_CONFIG: ThemeConfigData;
    /** All available theme presets */
    export declare const THEME_PRESETS: Record<string, ThemeConfigData>;
    /**
     * Create a deep copy of a theme config.
     */
    export declare function cloneThemeConfig(config: ThemeConfigData): ThemeConfigData;
    /**
     * Generate a random harmonious theme config.
     * Picks a random hue and builds a full color palette around it.
     */
    export declare function generateRandomTheme(): ThemeConfigData;
    export type ThemeConfiguratorProps = Define.Model<ThemeConfigData> & Define.Prop<"config", ThemeConfigData, false> & Define.Prop<"baseTheme", string, false> & Define.Prop<"showPreview", boolean, false> & Define.Prop<"showExport", boolean, false> & Define.Prop<"persistKey", string, false> & Define.Prop<"class", string, false> & Define.Slot<"default"> & Define.Slot<"preview"> & Define.Event<"change", ThemeConfigData>;
    export type SidebarColorsProps = Define.Prop<"config", ThemeConfigData> & Define.Prop<"updateColor", (key: keyof ThemeColors, value: string) => void>;
    export type SidebarRadiusProps = Define.Prop<"config", ThemeConfigData> & Define.Prop<"updateField", (key: string, value: any) => void>;
    export type SidebarEffectsProps = Define.Prop<"config", ThemeConfigData> & Define.Prop<"updateField", (key: string, value: any) => void>;
    export type SidebarSizesProps = Define.Prop<"config", ThemeConfigData> & Define.Prop<"updateField", (key: string, value: any) => void>;
    export type SidebarBorderProps = Define.Prop<"config", ThemeConfigData> & Define.Prop<"updateField", (key: string, value: any) => void>;
    /**
     * Theme Configurator - a generic component for visually configuring DaisyUI v5 themes.
     *
     * Features a sidebar + live preview layout with compact color swatches,
     * visual radius previews, and a rich component showcase.
     *
     * @example
     * \`\`\`tsx
     * // Drop-in full configurator
     * <ThemeConfigurator />
     *
     * // With two-way model binding
     * const config = signal(DEFAULT_THEME_CONFIG);
     * <ThemeConfigurator model={config} onChange={(c) => console.log(c)} />
     *
     * // With persistence
     * <ThemeConfigurator persistKey="my-theme-config" />
     * \`\`\`
     */
    export declare const ThemeConfigurator: ((props: {
    	baseTheme?: string | undefined;
    	class?: string | undefined;
    	config?: ThemeConfigData | undefined;
    	persistKey?: string | undefined;
    	showExport?: boolean | undefined;
    	showPreview?: boolean | undefined;
    } & {
    	onChange?: ((detail: ThemeConfigData) => void) | undefined;
    	"onUpdate:modelValue"?: ((detail: ThemeConfigData) => void) | undefined;
    } & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	} & {
    		preview: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {
    	model?: import("sigx").Model<ThemeConfigData> | import("sigx").ModelBinding<ThemeConfigData> | (() => ThemeConfigData) | undefined;
    } & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		model?: import("sigx").Model<ThemeConfigData> | undefined;
    		baseTheme?: string | undefined;
    		change?: import("sigx").EventDefinition<ThemeConfigData> | undefined;
    		class?: string | undefined;
    		config?: ThemeConfigData | undefined;
    		persistKey?: string | undefined;
    		showExport?: boolean | undefined;
    		showPreview?: boolean | undefined;
    	}, ThemeConfiguratorProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	} & {
    		preview: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		model?: import("sigx").Model<ThemeConfigData> | undefined;
    		baseTheme?: string | undefined;
    		change?: import("sigx").EventDefinition<ThemeConfigData> | undefined;
    		class?: string | undefined;
    		config?: ThemeConfigData | undefined;
    		persistKey?: string | undefined;
    		showExport?: boolean | undefined;
    		showPreview?: boolean | undefined;
    	};
    	__events: ThemeConfiguratorProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	} & {
    		preview: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	Colors: import("sigx").ComponentFactory<SidebarColorsProps, void, {}>;
    	Radius: import("sigx").ComponentFactory<SidebarRadiusProps, void, {}>;
    	Effects: import("sigx").ComponentFactory<SidebarEffectsProps, void, {}>;
    	Sizes: import("sigx").ComponentFactory<SidebarSizesProps, void, {}>;
    	Border: import("sigx").ComponentFactory<SidebarBorderProps, void, {}>;
    	Preview: import("sigx").ComponentFactory<{}, void, unknown>;
    };
    export type ColorPickerProps = Define.Prop<"value", string> & Define.Prop<"label", string, false> & Define.Prop<"class", string, false> & Define.Event<"change", string>;
    /**
     * Color picker that works with oklch values.
     * Displays a native color input (hex) and converts to/from oklch.
     *
     * @example
     * \`\`\`tsx
     * <ColorPicker
     *     value={config.colors.primary}
     *     label="Primary"
     *     onChange={(oklch) => config.colors.primary = oklch}
     * />
     * \`\`\`
     */
    export declare const ColorPicker: import("sigx").ComponentFactory<ColorPickerProps, void, {}>;
    export type ButtonVariant = "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "ghost" | "link" | "neutral";
    export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
    export type ButtonProps = Define.Prop<"variant", ButtonVariant, false> & Define.Prop<"size", ButtonSize, false> & Define.Prop<"outline", boolean, false> & Define.Prop<"soft", boolean, false> & Define.Prop<"dash", boolean, false> & Define.Prop<"wide", boolean, false> & Define.Prop<"disabled", boolean, false> & Define.Prop<"loading", boolean, false> & Define.Prop<"block", boolean, false> & Define.Prop<"circle", boolean, false> & Define.Prop<"square", boolean, false> & Define.Prop<"active", boolean, false> & Define.Prop<"class", string, false> & Define.Prop<"type", "button" | "submit" | "reset", false> & Define.Prop<"title", string, false> & Define.Slot<"default"> & Define.Event<"click", MouseEvent>;
    /**
     * Button component with DaisyUI styling.
     *
     * @example
     * \`\`\`tsx
     * <Button variant="primary" size="lg" onClick={() => console.log('clicked')}>
     *   Click Me
     * </Button>
     * \`\`\`
     */
    export declare const Button: import("sigx").ComponentFactory<ButtonProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type ButtonGroupProps = Define.Prop<"vertical", boolean, false> & Define.Prop<"horizontal", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * ButtonGroup component for grouping buttons together.
     *
     * @example
     * \`\`\`tsx
     * <ButtonGroup>
     *   <Button>Left</Button>
     *   <Button>Center</Button>
     *   <Button>Right</Button>
     * </ButtonGroup>
     * \`\`\`
     */
    export declare const ButtonGroup: import("sigx").ComponentFactory<ButtonGroupProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type InputSize = "xs" | "sm" | "md" | "lg";
    export type InputVariant = "bordered" | "ghost";
    export type InputColor = "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    export type InputProps = Define.Model<string | number> & Define.Prop<"name", string, false> & Define.Prop<"placeholder", string, false> & Define.Prop<"type", "text" | "password" | "email" | "number" | "search" | "url", false> & Define.Prop<"size", InputSize, false> & Define.Prop<"variant", InputVariant, false> & Define.Prop<"color", InputColor, false> & Define.Prop<"disabled", boolean, false> & Define.Prop<"readOnly", boolean, false> & Define.Prop<"maxLength", number, false> & Define.Prop<"autoComplete", string, false> & Define.Prop<"class", string, false> & Define.Event<"input", InputEvent> & Define.Event<"change", Event> & Define.Event<"focus", FocusEvent> & Define.Event<"blur", FocusEvent>;
    /**
     * Input component with DaisyUI styling.
     *
     * Uses the new model binding architecture for efficient two-way binding.
     * The model tuple is forwarded directly to the native input element.
     *
     * @example
     * \`\`\`tsx
     * const form = signal({ name: "" });
     * <Input model={() => form.name} placeholder="Enter your name" variant="bordered" />
     * \`\`\`
     */
    export declare const Input: import("sigx").ComponentFactory<InputProps, void, {}>;
    export type TextareaProps = Define.Model<string> & Define.Prop<"name", string, false> & Define.Prop<"placeholder", string, false> & Define.Prop<"rows", number, false> & Define.Prop<"size", InputSize, false> & Define.Prop<"variant", InputVariant, false> & Define.Prop<"color", InputColor, false> & Define.Prop<"disabled", boolean, false> & Define.Prop<"autoComplete", string, false> & Define.Prop<"class", string, false> & Define.Event<"input", InputEvent> & Define.Event<"change", Event>;
    /**
     * Textarea component with DaisyUI styling.
     *
     * Uses the new model binding architecture for efficient two-way binding.
     * The model tuple is forwarded directly to the native textarea element.
     *
     * @example
     * \`\`\`tsx
     * const form = signal({ bio: "" });
     * <Textarea model={() => form.bio} placeholder="Tell us about yourself" rows={5} />
     * \`\`\`
     */
    export declare const Textarea: import("sigx").ComponentFactory<TextareaProps, void, {}>;
    export interface SelectOption {
    	value: string;
    	label: string;
    	disabled?: boolean;
    }
    export type SelectProps = Define.Model<string> & Define.Prop<"name", string, false> & Define.Prop<"options", SelectOption[], false> & Define.Prop<"placeholder", string, false> & Define.Prop<"size", InputSize, false> & Define.Prop<"variant", InputVariant, false> & Define.Prop<"color", InputColor, false> & Define.Prop<"disabled", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default"> & Define.Event<"change", string>;
    /**
     * Select component with DaisyUI styling and model binding support.
     *
     * Uses the new model binding architecture for efficient two-way binding.
     * The model tuple is forwarded directly to the native select element.
     *
     * @example
     * \`\`\`tsx
     * const form = signal({ choice: "" });
     * const options = [
     *   { value: "a", label: "Option A" },
     *   { value: "b", label: "Option B" }
     * ];
     * <Select model={() => form.choice} options={options} placeholder="Select an option" />
     * \`\`\`
     */
    export declare const Select: import("sigx").ComponentFactory<SelectProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type FormFieldProps = Define.Prop<"label", string, false> & Define.Prop<"error", string, false> & Define.Prop<"hint", string, false> & Define.Prop<"required", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * FormField wrapper component that provides label, hint, and validation support
     * using daisyUI v5 fieldset/legend/label/validator-hint classes.
     *
     * @example
     * \`\`\`tsx
     * <FormField label="Email" error={emailError} required>
     *   <Input model={() => form.email} type="email" />
     * </FormField>
     * \`\`\`
     */
    export declare const FormField: import("sigx").ComponentFactory<FormFieldProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type ToggleSize = "xs" | "sm" | "md" | "lg";
    export type ToggleColor = "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    export type ToggleProps = Define.Model<boolean> & Define.Prop<"name", string, false> & Define.Prop<"size", ToggleSize, false> & Define.Prop<"color", ToggleColor, false> & Define.Prop<"disabled", boolean, false> & Define.Prop<"class", string, false> & Define.Prop<"label", string, false> & Define.Event<"change", boolean>;
    /**
     * Toggle/switch component with DaisyUI styling.
     *
     * @example
     * \`\`\`tsx
     * const enabled = signal(false);
     * <Toggle model={enabled} label="Enable notifications" color="primary" />
     * \`\`\`
     */
    export declare const Toggle: import("sigx").ComponentFactory<ToggleProps, void, {}>;
    export type CheckboxSize = "xs" | "sm" | "md" | "lg" | "xl";
    export type CheckboxColor = "primary" | "secondary" | "accent" | "neutral" | "info" | "success" | "warning" | "error";
    export type CheckboxProps = Define.Model<boolean> & Define.Prop<"name", string, false> & Define.Prop<"size", CheckboxSize, false> & Define.Prop<"color", CheckboxColor, false> & Define.Prop<"disabled", boolean, false> & Define.Prop<"indeterminate", boolean, false> & Define.Prop<"class", string, false> & Define.Prop<"label", string, false> & Define.Event<"change", boolean>;
    /**
     * Checkbox component with DaisyUI styling.
     *
     * @example
     * \`\`\`tsx
     * const agreed = signal(false);
     * <Checkbox model={agreed} label="I agree to the terms" color="primary" />
     * \`\`\`
     */
    export declare const Checkbox: import("sigx").ComponentFactory<CheckboxProps, void, {}>;
    export type RadioSize = "xs" | "sm" | "md" | "lg";
    export type RadioColor = "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    export type RadioGroupProps = Define.Model<string> & Define.Prop<"name", string> & Define.Prop<"size", RadioSize, false> & Define.Prop<"color", RadioColor, false> & Define.Prop<"disabled", boolean, false> & Define.Prop<"class", string, false> & Define.Prop<"direction", "horizontal" | "vertical", false> & Define.Slot<"default"> & Define.Event<"change", string>;
    export type RadioItemProps = Define.Prop<"value", string> & Define.Prop<"label", string, false> & Define.Prop<"disabled", boolean, false> & Define.Prop<"class", string, false>;
    export type StandaloneRadioProps = Define.Prop<"checked", boolean, false> & Define.Prop<"name", string> & Define.Prop<"value", string> & Define.Prop<"size", RadioSize, false> & Define.Prop<"color", RadioColor, false> & Define.Prop<"disabled", boolean, false> & Define.Prop<"class", string, false> & Define.Prop<"label", string, false> & Define.Event<"change", string>;
    /**
     * Radio compound component with Item sub-component for grouped radio buttons.
     *
     * @example Using compound pattern (recommended):
     * \`\`\`tsx
     * const color = signal("red");
     * <Radio model={color} name="color">
     *   <Radio.Item value="red" label="Red" />
     *   <Radio.Item value="blue" label="Blue" />
     * </Radio>
     * \`\`\`
     *
     * @example Using standalone Radio buttons:
     * \`\`\`tsx
     * <Radio.Standalone name="color" value="red" label="Red" checked={color === "red"} onChange={setColor} />
     * <Radio.Standalone name="color" value="blue" label="Blue" checked={color === "blue"} onChange={setColor} />
     * \`\`\`
     */
    export declare const Radio: ((props: {
    	class?: string | undefined;
    	color?: RadioColor | undefined;
    	direction?: "horizontal" | "vertical" | undefined;
    	disabled?: boolean | undefined;
    	name?: string | undefined;
    	size?: RadioSize | undefined;
    } & {
    	onChange?: ((detail: string) => void) | undefined;
    	"onUpdate:modelValue"?: ((detail: string) => void) | undefined;
    } & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {
    	model?: import("sigx").Model<string> | import("sigx").ModelBinding<string> | (() => string) | undefined;
    } & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		model?: import("sigx").Model<string> | undefined;
    		change?: import("sigx").EventDefinition<string> | undefined;
    		class?: string | undefined;
    		color?: RadioColor | undefined;
    		direction?: "horizontal" | "vertical" | undefined;
    		disabled?: boolean | undefined;
    		name?: string | undefined;
    		size?: RadioSize | undefined;
    	}, RadioGroupProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		model?: import("sigx").Model<string> | undefined;
    		change?: import("sigx").EventDefinition<string> | undefined;
    		class?: string | undefined;
    		color?: RadioColor | undefined;
    		direction?: "horizontal" | "vertical" | undefined;
    		disabled?: boolean | undefined;
    		name?: string | undefined;
    		size?: RadioSize | undefined;
    	};
    	__events: RadioGroupProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	Item: import("sigx").ComponentFactory<RadioItemProps, void, {}>;
    	Standalone: import("sigx").ComponentFactory<StandaloneRadioProps, void, {}>;
    };
    export type RangeSize = "xs" | "sm" | "md" | "lg";
    export type RangeColor = "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    export type RangeProps = Define.Model<number> & Define.Prop<"name", string, false> & Define.Prop<"min", number, false> & Define.Prop<"max", number, false> & Define.Prop<"step", number, false> & Define.Prop<"size", RangeSize, false> & Define.Prop<"color", RangeColor, false> & Define.Prop<"disabled", boolean, false> & Define.Prop<"class", string, false> & Define.Event<"change", number>;
    /**
     * Range slider component with DaisyUI styling.
     *
     * @example
     * \`\`\`tsx
     * const volume = signal(50);
     * <Range model={volume} min={0} max={100} step={1} color="primary" />
     * \`\`\`
     */
    declare const Range\$1: import("sigx").ComponentFactory<RangeProps, void, {}>;
    export type FieldsetProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type FieldsetLegendProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export declare const Fieldset: ((props: {
    	class?: string | undefined;
    } & {} & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {} & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		class?: string | undefined;
    	}, FieldsetProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		class?: string | undefined;
    	};
    	__events: FieldsetProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	Legend: import("sigx").ComponentFactory<FieldsetLegendProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    };
    export type LabelProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export declare const Label: import("sigx").ComponentFactory<LabelProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
    export type ContainerProps = Define.Prop<"size", ContainerSize, false> & Define.Prop<"center", boolean, false> & Define.Prop<"padding", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Container component for constraining content width.
     *
     * @example
     * \`\`\`tsx
     * <Container size="lg" center padding>
     *   <p>Content goes here</p>
     * </Container>
     * \`\`\`
     */
    export declare const Container: import("sigx").ComponentFactory<ContainerProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type CardVariant = "normal" | "compact" | "side" | "bordered" | "image-full";
    export type CardProps = Define.Prop<"variant", CardVariant, false> & Define.Prop<"shadow", boolean | "sm" | "md" | "lg" | "xl", false> & Define.Prop<"bordered", boolean, false> & Define.Prop<"glass", boolean, false> & Define.Prop<"imageFull", boolean, false> & Define.Prop<"bgColor", string, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type CardBodyProps = Define.Prop<"center", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type CardTitleProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type CardActionsProps = Define.Prop<"justify", "start" | "center" | "end", false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type CardImageProps = Define.Prop<"src", string> & Define.Prop<"alt", string, false> & Define.Prop<"class", string, false>;
    /**
     * Card compound component with Body, Title, Actions, and Image sub-components.
     */
    export declare const Card: ((props: {
    	bgColor?: string | undefined;
    	bordered?: boolean | undefined;
    	class?: string | undefined;
    	glass?: boolean | undefined;
    	imageFull?: boolean | undefined;
    	shadow?: "lg" | "md" | "sm" | "xl" | boolean | undefined;
    	variant?: CardVariant | undefined;
    } & {} & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {} & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		bgColor?: string | undefined;
    		bordered?: boolean | undefined;
    		class?: string | undefined;
    		glass?: boolean | undefined;
    		imageFull?: boolean | undefined;
    		shadow?: "lg" | "md" | "sm" | "xl" | boolean | undefined;
    		variant?: CardVariant | undefined;
    	}, CardProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		bgColor?: string | undefined;
    		bordered?: boolean | undefined;
    		class?: string | undefined;
    		glass?: boolean | undefined;
    		imageFull?: boolean | undefined;
    		shadow?: "lg" | "md" | "sm" | "xl" | boolean | undefined;
    		variant?: CardVariant | undefined;
    	};
    	__events: CardProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	Body: import("sigx").ComponentFactory<CardBodyProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Title: import("sigx").ComponentFactory<CardTitleProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Actions: import("sigx").ComponentFactory<CardActionsProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Image: import("sigx").ComponentFactory<CardImageProps, void, {}>;
    };
    export type StackDirection = "top" | "bottom" | "start" | "end";
    export type StackProps = Define.Prop<"direction", StackDirection, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * DaisyUI Stack component - visually puts elements on top of each other.
     *
     * Stack uses CSS grid to layer elements, creating a stacked paper effect.
     * Use \`w-*\` and \`h-*\` classes on the Stack to set the size of all items.
     *
     * @example Basic stack
     * \`\`\`tsx
     * <Stack class="w-32 h-20">
     *   <div class="bg-primary text-primary-content grid place-content-center rounded-box">1</div>
     *   <div class="bg-accent text-accent-content grid place-content-center rounded-box">2</div>
     *   <div class="bg-secondary text-secondary-content grid place-content-center rounded-box">3</div>
     * </Stack>
     * \`\`\`
     *
     * @example Stack with cards
     * \`\`\`tsx
     * <Stack class="size-28">
     *   <Card class="border border-base-content bg-base-100 text-center">
     *     <Card.Body>A</Card.Body>
     *   </Card>
     *   <Card class="border border-base-content bg-base-100 text-center">
     *     <Card.Body>B</Card.Body>
     *   </Card>
     *   <Card class="border border-base-content bg-base-100 text-center">
     *     <Card.Body>C</Card.Body>
     *   </Card>
     * </Stack>
     * \`\`\`
     *
     * @example Stack directions
     * \`\`\`tsx
     * <Stack direction="top" class="size-28">...</Stack>
     * <Stack direction="bottom" class="size-28">...</Stack>
     * <Stack direction="start" class="size-28">...</Stack>
     * <Stack direction="end" class="size-28">...</Stack>
     * \`\`\`
     */
    export declare const Stack: import("sigx").ComponentFactory<StackProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    /** Spacing scale values (matches Tailwind spacing) */
    export type SpacingValue = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12";
    /** Directional spacing object */
    export type SpacingObject = {
    	/** All sides */
    	all?: SpacingValue;
    	/** Horizontal (left + right) */
    	x?: SpacingValue;
    	/** Vertical (top + bottom) */
    	y?: SpacingValue;
    	/** Top only */
    	top?: SpacingValue;
    	/** Right only */
    	right?: SpacingValue;
    	/** Bottom only */
    	bottom?: SpacingValue;
    	/** Left only */
    	left?: SpacingValue;
    };
    /** Flexible spacing - can be a single value or directional object */
    type Spacing = SpacingValue | SpacingObject;
    /** Border radius values */
    export type RadiusValue = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full" | "box";
    /** Predefined Tailwind size values */
    export type TailwindSizeValue = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "72" | "80" | "96" | "auto" | "full" | "screen" | "min" | "max" | "fit" | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "1/5" | "2/5" | "3/5" | "4/5" | "1/6" | "5/6";
    /**
     * Size value - can be a Tailwind preset or arbitrary CSS value.
     *
     * @example
     * // Tailwind presets
     * width="48"      // w-48 (12rem)
     * width="full"    // w-full (100%)
     * width="1/2"     // w-1/2 (50%)
     *
     * // Arbitrary CSS values (applied as inline styles)
     * width="400px"   // style="width: 400px"
     * width="70%"     // style="width: 70%"
     * width="calc(100% - 2rem)"  // style="width: calc(100% - 2rem)"
     */
    export type SizeValue = TailwindSizeValue | (string & {});
    /** DaisyUI semantic background colors */
    export type BackgroundColor = "base-100" | "base-200" | "base-300" | "primary" | "secondary" | "accent" | "neutral" | "info" | "success" | "warning" | "error";
    export type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";
    export type FlexJustify = "start" | "center" | "end" | "between" | "around" | "evenly";
    export type FlexDirection = "row" | "col" | "row-reverse" | "col-reverse";
    export type FlexProps = Define.Prop<"direction", FlexDirection, false> & Define.Prop<"gap", Spacing, false> & Define.Prop<"align", FlexAlign, false> & Define.Prop<"justify", FlexJustify, false> & Define.Prop<"wrap", boolean, false> & Define.Prop<"inline", boolean, false> & Define.Prop<"padding", Spacing, false> & Define.Prop<"margin", Spacing, false> & Define.Prop<"width", SizeValue, false> & Define.Prop<"height", SizeValue, false> & Define.Prop<"minWidth", SizeValue, false> & Define.Prop<"minHeight", SizeValue, false> & Define.Prop<"maxWidth", SizeValue, false> & Define.Prop<"maxHeight", SizeValue, false> & Define.Prop<"rounded", RadiusValue | boolean, false> & Define.Prop<"background", BackgroundColor, false> & Define.Prop<"grow", boolean, false> & Define.Prop<"shrink", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Flexible layout component using Tailwind CSS flex utilities.
     *
     * @example
     * \`\`\`tsx
     * // Simple usage
     * <Flex direction="row" gap="4" align="center">
     *   <div>Item 1</div>
     *   <div>Item 2</div>
     * </Flex>
     *
     * // With styling props
     * <Flex padding="4" background="base-200" rounded>
     *   <div>Styled flex</div>
     * </Flex>
     *
     * // With width/height (Tailwind presets or CSS values)
     * <Flex width="full" height="screen" padding="4">...</Flex>
     * <Flex width="400px" height="200px">...</Flex>
     * \`\`\`
     */
    export declare const Flex: import("sigx").ComponentFactory<FlexProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type RowProps = Omit<FlexProps, "direction"> & Define.Prop<"reverse", boolean, false>;
    /**
     * Horizontal flex container (row direction).
     *
     * @example
     * \`\`\`tsx
     * <Row gap="4" align="center" padding="4" background="base-200" rounded>
     *   <div>Left</div>
     *   <div>Right</div>
     * </Row>
     * \`\`\`
     */
    export declare const Row: import("sigx").ComponentFactory<RowProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type ColProps = Omit<FlexProps, "direction"> & Define.Prop<"reverse", boolean, false>;
    /**
     * Vertical flex container (column direction).
     *
     * @example
     * \`\`\`tsx
     * <Col gap="4" align="center" padding="4" background="base-200" rounded>
     *   <div>Top</div>
     *   <div>Bottom</div>
     * </Col>
     * \`\`\`
     */
    export declare const Col: import("sigx").ComponentFactory<ColProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type DividerProps = Define.Prop<"vertical", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Divider component with DaisyUI styling.
     *
     * Note: In DaisyUI, the naming is based on the flex container direction:
     * - Default 'divider' works in vertical flex containers (flex-col)
     * - 'divider-horizontal' works in horizontal flex containers (flex-row)
     *
     * When 'vertical' prop is true, this component uses 'divider-horizontal'
     * which renders a vertical dividing line in a horizontal flex container.
     *
     * @example
     * \`\`\`tsx
     * <Divider>OR</Divider>
     * <Divider vertical />
     * \`\`\`
     */
    export declare const Divider: import("sigx").ComponentFactory<DividerProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type HeroProps = Define.Prop<"overlay", boolean, false> & Define.Prop<"bgImage", string, false> & Define.Prop<"minHeight", string, false> & Define.Prop<"class", string, false> & Define.Slot<"default"> & Define.Slot<"overlay">;
    export type HeroContentProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Hero compound component with Content sub-component.
     */
    export declare const Hero: ((props: {
    	bgImage?: string | undefined;
    	class?: string | undefined;
    	minHeight?: string | undefined;
    	overlay?: boolean | undefined;
    } & {} & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	} & {
    		overlay: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {} & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		bgImage?: string | undefined;
    		class?: string | undefined;
    		minHeight?: string | undefined;
    		overlay?: boolean | undefined;
    	}, HeroProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	} & {
    		overlay: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		bgImage?: string | undefined;
    		class?: string | undefined;
    		minHeight?: string | undefined;
    		overlay?: boolean | undefined;
    	};
    	__events: HeroProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	} & {
    		overlay: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	Content: import("sigx").ComponentFactory<HeroContentProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    };
    export type FooterProps = Define.Prop<"center", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Footer component with DaisyUI styling.
     * Provides a styled footer area for website navigation and content.
     *
     * @example
     * \`\`\`tsx
     * <Footer center>
     *   <p>Copyright © 2025 - All rights reserved</p>
     * </Footer>
     *
     * <Footer>
     *   <nav>
     *     <h6 class="footer-title">Services</h6>
     *     <a class="link link-hover">Branding</a>
     *     <a class="link link-hover">Design</a>
     *   </nav>
     * </Footer>
     * \`\`\`
     */
    export declare const Footer: import("sigx").ComponentFactory<FooterProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type JoinProps = Define.Prop<"vertical", boolean, false> & Define.Prop<"horizontal", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type JoinItemProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Join compound component with Item sub-component.
     */
    export declare const Join: ((props: {
    	class?: string | undefined;
    	horizontal?: boolean | undefined;
    	vertical?: boolean | undefined;
    } & {} & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {} & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		class?: string | undefined;
    		horizontal?: boolean | undefined;
    		vertical?: boolean | undefined;
    	}, JoinProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		class?: string | undefined;
    		horizontal?: boolean | undefined;
    		vertical?: boolean | undefined;
    	};
    	__events: JoinProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	Item: import("sigx").ComponentFactory<JoinItemProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    };
    export type LinkColor = "primary" | "secondary" | "accent" | "neutral" | "info" | "success" | "warning" | "error";
    export type LinkProps = Define.Prop<"href", string, false> & Define.Prop<"color", LinkColor, false> & Define.Prop<"hover", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default"> & Define.Event<"click", MouseEvent>;
    /**
     * Link component with DaisyUI styling.
     * Provides styled anchor elements with color variants and hover effects.
     *
     * @example
     * \`\`\`tsx
     * <Link href="/about" color="primary" hover>About Us</Link>
     *
     * <Link href="/docs" color="secondary">Documentation</Link>
     *
     * <Link onClick={(e) => handleClick(e)}>Clickable Link</Link>
     * \`\`\`
     */
    export declare const Link: import("sigx").ComponentFactory<LinkProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type ChatProps = Define.Prop<"start", boolean, false> & Define.Prop<"end", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type ChatImageProps = Define.Prop<"src", string, false> & Define.Prop<"alt", string, false> & Define.Prop<"placeholder", string, false> & Define.Prop<"bgColor", string, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type ChatHeaderProps = Define.Prop<"name", string, false> & Define.Prop<"time", string, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type ChatBubbleColor = "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    export type ChatBubbleProps = Define.Prop<"color", ChatBubbleColor, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type ChatFooterProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Chat compound component with Image, Header, Bubble, and Footer sub-components.
     */
    export declare const Chat: ((props: {
    	class?: string | undefined;
    	end?: boolean | undefined;
    	start?: boolean | undefined;
    } & {} & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {} & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		class?: string | undefined;
    		end?: boolean | undefined;
    		start?: boolean | undefined;
    	}, ChatProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		class?: string | undefined;
    		end?: boolean | undefined;
    		start?: boolean | undefined;
    	};
    	__events: ChatProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	Image: import("sigx").ComponentFactory<ChatImageProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Header: import("sigx").ComponentFactory<ChatHeaderProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Bubble: import("sigx").ComponentFactory<ChatBubbleProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Footer: import("sigx").ComponentFactory<ChatFooterProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    };
    export type ArtboardSize = "1" | "2" | "3" | "4" | "5" | "6";
    export type ArtboardProps = Define.Prop<"size", ArtboardSize, false> & Define.Prop<"horizontal", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export interface CodeLine {
    	prefix?: string;
    	text: string;
    	color?: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    }
    export type MockupBrowserProps = Define.Prop<"url", string, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type MockupCodeProps = Define.Prop<"lines", CodeLine[], false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type MockupPhoneProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type MockupWindowProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Artboard component for phone mockup sizing.
     * Provides standardized phone screen sizes for demos.
     *
     * @example
     * \`\`\`tsx
     * <Artboard size="1">
     *   320×568 content
     * </Artboard>
     *
     * <Artboard size="4" horizontal>
     *   Landscape mode
     * </Artboard>
     * \`\`\`
     */
    export declare const Artboard: import("sigx").ComponentFactory<ArtboardProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    /**
     * Mockup.Browser component - Browser window mockup with URL bar.
     */
    export declare const MockupBrowser: import("sigx").ComponentFactory<MockupBrowserProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    /**
     * Mockup.Code component - Terminal/code mockup with line prefixes.
     */
    export declare const MockupCode: import("sigx").ComponentFactory<MockupCodeProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    /**
     * Mockup.Phone component - Realistic phone frame mockup.
     */
    export declare const MockupPhone: import("sigx").ComponentFactory<MockupPhoneProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    /**
     * Mockup.Window component - Desktop window mockup with title bar.
     */
    export declare const MockupWindow: import("sigx").ComponentFactory<MockupWindowProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    /**
     * Mockup namespace with Browser, Code, Phone, and Window components.
     *
     * @example
     * \`\`\`tsx
     * <Mockup.Browser url="https://sigx.dev">
     *   <div class="bg-base-200 p-8">Website content</div>
     * </Mockup.Browser>
     *
     * <Mockup.Code lines={[
     *   { prefix: '\$', text: 'npm install sigx' },
     *   { text: 'Installing...', color: 'warning' },
     *   { text: 'Done!', color: 'success' }
     * ]} />
     *
     * <Mockup.Phone>
     *   <img src="/app-screenshot.png" />
     * </Mockup.Phone>
     *
     * <Mockup.Window>
     *   <div class="p-8">Desktop app content</div>
     * </Mockup.Window>
     * \`\`\`
     */
    export declare const Mockup: {
    	Browser: import("sigx").ComponentFactory<MockupBrowserProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Code: import("sigx").ComponentFactory<MockupCodeProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Phone: import("sigx").ComponentFactory<MockupPhoneProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Window: import("sigx").ComponentFactory<MockupWindowProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    };
    export interface CarouselItemData {
    	id: string;
    	content: () => any;
    }
    export type CarouselProps = Define.Prop<"items", CarouselItemData[], false> & Define.Prop<"center", boolean, false> & Define.Prop<"vertical", boolean, false> & Define.Prop<"fullWidth", boolean, false> & Define.Prop<"snap", "start" | "center" | "end", false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type CarouselItemProps = Define.Prop<"id", string, false> & Define.Prop<"fullWidth", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default"> & Define.Event<"click", MouseEvent>;
    /**
     * Carousel compound component with Item sub-component.
     */
    export declare const Carousel: ((props: {
    	center?: boolean | undefined;
    	class?: string | undefined;
    	fullWidth?: boolean | undefined;
    	items?: CarouselItemData[] | undefined;
    	snap?: "center" | "end" | "start" | undefined;
    	vertical?: boolean | undefined;
    } & {} & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {} & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		center?: boolean | undefined;
    		class?: string | undefined;
    		fullWidth?: boolean | undefined;
    		items?: CarouselItemData[] | undefined;
    		snap?: "center" | "end" | "start" | undefined;
    		vertical?: boolean | undefined;
    	}, CarouselProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		center?: boolean | undefined;
    		class?: string | undefined;
    		fullWidth?: boolean | undefined;
    		items?: CarouselItemData[] | undefined;
    		snap?: "center" | "end" | "start" | undefined;
    		vertical?: boolean | undefined;
    	};
    	__events: CarouselProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	Item: import("sigx").ComponentFactory<CarouselItemProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    };
    export type MaskShape = "squircle" | "heart" | "hexagon" | "hexagon-2" | "decagon" | "pentagon" | "diamond" | "square" | "circle" | "parallelogram" | "parallelogram-2" | "parallelogram-3" | "parallelogram-4" | "star" | "star-2" | "triangle" | "triangle-2" | "triangle-3" | "triangle-4";
    export type MaskProps = Define.Prop<"shape", MaskShape> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Mask component for cropping content to various shapes.
     * Uses CSS clip-path for smooth, scalable shape masking.
     *
     * @example
     * \`\`\`tsx
     * <Mask shape="hexagon">
     *   <img src="/profile.jpg" alt="Profile" />
     * </Mask>
     *
     * <Mask shape="heart">
     *   <div class="bg-primary w-20 h-20" />
     * </Mask>
     *
     * <Mask shape="star">
     *   <img src="/award.png" />
     * </Mask>
     * \`\`\`
     */
    export declare const Mask: import("sigx").ComponentFactory<MaskProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export declare const HeroContent: import("sigx").ComponentFactory<HeroContentProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export declare const JoinItem: import("sigx").ComponentFactory<JoinItemProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export declare const ChatImage: import("sigx").ComponentFactory<ChatImageProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export declare const ChatHeader: import("sigx").ComponentFactory<ChatHeaderProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export declare const ChatBubble: import("sigx").ComponentFactory<ChatBubbleProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export declare const ChatFooter: import("sigx").ComponentFactory<ChatFooterProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export declare const CarouselItem: import("sigx").ComponentFactory<CarouselItemProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type ModalPosition = "top" | "middle" | "bottom";
    export type ModalAlign = "start" | "end";
    export type ModalProps = Define.Model<boolean> & Define.Prop<"class", string, false> & Define.Prop<"position", ModalPosition, false> & Define.Prop<"align", ModalAlign, false> & Define.Prop<"backdrop", boolean, false> & Define.Slot<"default">;
    export type ModalHeaderProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type ModalBodyProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type ModalActionsProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Modal compound component with Header, Body, and Actions sub-components.
     */
    export declare const Modal: ((props: {
    	align?: ModalAlign | undefined;
    	backdrop?: boolean | undefined;
    	class?: string | undefined;
    	position?: ModalPosition | undefined;
    } & {
    	"onUpdate:modelValue"?: ((detail: boolean) => void) | undefined;
    } & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {
    	model?: import("sigx").Model<boolean> | import("sigx").ModelBinding<boolean> | (() => boolean) | undefined;
    } & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		model?: import("sigx").Model<boolean> | undefined;
    		align?: ModalAlign | undefined;
    		backdrop?: boolean | undefined;
    		class?: string | undefined;
    		position?: ModalPosition | undefined;
    	}, ModalProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		model?: import("sigx").Model<boolean> | undefined;
    		align?: ModalAlign | undefined;
    		backdrop?: boolean | undefined;
    		class?: string | undefined;
    		position?: ModalPosition | undefined;
    	};
    	__events: ModalProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	Header: import("sigx").ComponentFactory<ModalHeaderProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Body: import("sigx").ComponentFactory<ModalBodyProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Actions: import("sigx").ComponentFactory<ModalActionsProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    };
    export type BadgeVariant = "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "ghost" | "neutral";
    export type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";
    export type BadgeStyle = "outline" | "soft" | "dash" | "ghost";
    export type BadgeProps = Define.Prop<"variant", BadgeVariant, false> & Define.Prop<"size", BadgeSize, false> & Define.Prop<"outline", boolean, false> & Define.Prop<"badgeStyle", BadgeStyle, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Badge component with DaisyUI styling.
     *
     * @example
     * \`\`\`tsx
     * <Badge variant="success">Active</Badge>
     * <Badge variant="error" size="lg" outline>Error</Badge>
     * \`\`\`
     */
    export declare const Badge: import("sigx").ComponentFactory<BadgeProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type LoadingSize = "xs" | "sm" | "md" | "lg" | "xl";
    export type LoadingType = "spinner" | "dots" | "ring" | "ball" | "bars" | "infinity";
    export type LoadingColor = "primary" | "secondary" | "accent" | "neutral" | "info" | "success" | "warning" | "error";
    export type LoadingProps = Define.Prop<"type", LoadingType, false> & Define.Prop<"size", LoadingSize, false> & Define.Prop<"color", LoadingColor, false> & Define.Prop<"class", string, false>;
    /**
     * Loading indicator component with DaisyUI styling.
     *
     * @example
     * \`\`\`tsx
     * <Loading type="spinner" size="lg" />
     * <Loading type="dots" />
     * \`\`\`
     */
    export declare const Loading: import("sigx").ComponentFactory<LoadingProps, void, {}>;
    export type AlertVariant = "info" | "success" | "warning" | "error";
    export type AlertStyle = "outline" | "dash" | "soft";
    export type AlertLayout = "vertical" | "horizontal";
    export type AlertProps = Define.Prop<"variant", AlertVariant, false> & Define.Prop<"alertStyle", AlertStyle, false> & Define.Prop<"layout", AlertLayout, false> & Define.Prop<"class", string, false> & Define.Slot<"default"> & Define.Slot<"icon">;
    /**
     * Alert component with DaisyUI styling.
     *
     * @example
     * \`\`\`tsx
     * <Alert variant="success">Operation completed successfully!</Alert>
     * <Alert variant="error" alertStyle="soft">An error occurred.</Alert>
     * \`\`\`
     */
    export declare const Alert: import("sigx").ComponentFactory<AlertProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    } & {
    	icon: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type ProgressColor = "primary" | "secondary" | "accent" | "neutral" | "info" | "success" | "warning" | "error";
    export type ProgressProps = Define.Prop<"value", number, false> & Define.Prop<"max", number, false> & Define.Prop<"color", ProgressColor, false> & Define.Prop<"class", string, false>;
    /**
     * Progress bar component with DaisyUI styling.
     *
     * @example
     * \`\`\`tsx
     * <Progress value={75} max={100} color="primary" />
     * \`\`\`
     */
    export declare const Progress: import("sigx").ComponentFactory<ProgressProps, void, {}>;
    export type TooltipPosition = "top" | "bottom" | "left" | "right";
    export type TooltipColor = "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    export type TooltipProps = Define.Prop<"tip", string, false> & Define.Prop<"position", TooltipPosition, false> & Define.Prop<"color", TooltipColor, false> & Define.Prop<"open", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type TooltipContentProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Tooltip component with DaisyUI styling.
     * Supports text tooltips via \`tip\` prop or custom content via \`Tooltip.Content\` sub-component.
     *
     * @example
     * \`\`\`tsx
     * <Tooltip tip="This is a tooltip" position="top">
     *   <Button>Hover me</Button>
     * </Tooltip>
     * \`\`\`
     */
    export declare const Tooltip: ((props: {
    	class?: string | undefined;
    	color?: TooltipColor | undefined;
    	open?: boolean | undefined;
    	position?: TooltipPosition | undefined;
    	tip?: string | undefined;
    } & {} & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {} & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		class?: string | undefined;
    		color?: TooltipColor | undefined;
    		open?: boolean | undefined;
    		position?: TooltipPosition | undefined;
    		tip?: string | undefined;
    	}, TooltipProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		class?: string | undefined;
    		color?: TooltipColor | undefined;
    		open?: boolean | undefined;
    		position?: TooltipPosition | undefined;
    		tip?: string | undefined;
    	};
    	__events: TooltipProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	Content: import("sigx").ComponentFactory<TooltipContentProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    };
    export interface AccordionItem {
    	id: string;
    	title: string;
    	content: string;
    }
    export type AccordionVariant = "arrow" | "plus" | "none";
    export type AccordionType = "radio" | "details";
    export type AccordionProps = Define.Prop<"items", AccordionItem[], false> & Define.Model<"activeId", string> & Define.Prop<"variant", AccordionVariant, false> & Define.Prop<"join", boolean, false> & Define.Prop<"type", AccordionType, false> & Define.Prop<"class", string, false> & Define.Slot<"default"> & Define.Event<"change", string>;
    export type AccordionItemType = "radio" | "details";
    export type AccordionItemProps = Define.Prop<"title", string> & Define.Prop<"name", string, false> & Define.Prop<"open", boolean, false> & Define.Prop<"forceOpen", boolean, false> & Define.Prop<"forceClose", boolean, false> & Define.Prop<"variant", AccordionVariant, false> & Define.Prop<"type", AccordionItemType, false> & Define.Prop<"class", string, false> & Define.Slot<"default"> & Define.Slot<"title"> & Define.Event<"toggle", boolean>;
    export type CollapseProps = Define.Model<boolean> & Define.Prop<"title", string> & Define.Prop<"variant", AccordionVariant, false> & Define.Prop<"forceOpen", boolean, false> & Define.Prop<"forceClose", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default"> & Define.Slot<"title"> & Define.Event<"toggle", boolean>;
    /**
     * Accordion with compound components for flexible usage.
     *
     * @example Using items array:
     * \`\`\`tsx
     * <Accordion items={items} model:activeId={activeId} variant="arrow" />
     * \`\`\`
     *
     * @example Using compound pattern:
     * \`\`\`tsx
     * <Accordion variant="arrow">
     *   <Accordion.Item title="Question 1">Answer 1</Accordion.Item>
     *   <Accordion.Item title="Question 2">Answer 2</Accordion.Item>
     * </Accordion>
     * \`\`\`
     */
    export declare const Accordion: ((props: {
    	class?: string | undefined;
    	items?: AccordionItem[] | undefined;
    	join?: boolean | undefined;
    	type?: AccordionType | undefined;
    	variant?: AccordionVariant | undefined;
    } & {
    	onChange?: ((detail: string) => void) | undefined;
    	"onUpdate:activeId"?: ((detail: string) => void) | undefined;
    } & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {
    	"model:activeId"?: import("sigx").Model<string> | import("sigx").ModelBinding<string> | (() => string) | undefined;
    } & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		activeId?: import("sigx").Model<string> | undefined;
    		change?: import("sigx").EventDefinition<string> | undefined;
    		class?: string | undefined;
    		items?: AccordionItem[] | undefined;
    		join?: boolean | undefined;
    		type?: AccordionType | undefined;
    		variant?: AccordionVariant | undefined;
    	}, AccordionProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		activeId?: import("sigx").Model<string> | undefined;
    		change?: import("sigx").EventDefinition<string> | undefined;
    		class?: string | undefined;
    		items?: AccordionItem[] | undefined;
    		join?: boolean | undefined;
    		type?: AccordionType | undefined;
    		variant?: AccordionVariant | undefined;
    	};
    	__events: AccordionProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	Item: import("sigx").ComponentFactory<AccordionItemProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	} & {
    		title: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Collapse: import("sigx").ComponentFactory<CollapseProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	} & {
    		title: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    };
    export type FileInputSize = "xs" | "sm" | "md" | "lg" | "xl";
    export type FileInputColor = "primary" | "secondary" | "accent" | "neutral" | "info" | "success" | "warning" | "error";
    export type FileInputProps = Define.Prop<"accept", string, false> & Define.Prop<"multiple", boolean, false> & Define.Prop<"size", FileInputSize, false> & Define.Prop<"color", FileInputColor, false> & Define.Prop<"ghost", boolean, false> & Define.Prop<"disabled", boolean, false> & Define.Prop<"class", string, false> & Define.Event<"change", FileList | null>;
    /**
     * File input component with DaisyUI styling.
     * Provides styled file upload controls with events for handling selected files.
     *
     * @example
     * \`\`\`tsx
     * <FileInput
     *   accept="image/*"
     *   onChange={(files) => handleFiles(files)}
     *   color="primary"
     * />
     * \`\`\`
     */
    export declare const FileInput: import("sigx").ComponentFactory<FileInputProps, void, {}>;
    export type RatingSize = "xs" | "sm" | "md" | "lg" | "xl";
    export type RatingMask = "star" | "star-2" | "heart" | "circle" | "diamond" | "hexagon" | "decagon" | "triangle";
    export type RatingColor = "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    export type RatingProps = Define.Model<number> & Define.Prop<"max", number, false> & Define.Prop<"size", RatingSize, false> & Define.Prop<"mask", RatingMask, false> & Define.Prop<"half", boolean, false> & Define.Prop<"readOnly", boolean, false> & Define.Prop<"color", RatingColor, false> & Define.Prop<"class", string, false> & Define.Event<"change", number>;
    /**
     * Rating component with DaisyUI styling and two-way model binding.
     * Supports different sizes, mask shapes, colors, and half-star ratings.
     *
     * @example
     * \`\`\`tsx
     * const rating = signal(3);
     *
     * // Basic rating with model binding
     * <Rating model={rating} max={5} mask="star" color="warning" />
     *
     * // Read-only rating
     * <Rating model={rating} readOnly />
     *
     * // Half-star rating
     * <Rating model={rating} half max={5} color="primary" />
     *
     * // Heart-shaped rating
     * <Rating model={rating} mask="heart" color="error" />
     *
     * // With change event
     * <Rating
     *   model={rating}
     *   onChange={(value) => console.log('New rating:', value)}
     * />
     * \`\`\`
     */
    export declare const Rating: import("sigx").ComponentFactory<RatingProps, void, {}>;
    export type SkeletonProps = Define.Prop<"text", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Skeleton loading placeholder component.
     * Displays animated loading placeholders for content.
     *
     * Use Tailwind utility classes via the \`class\` prop for sizing and shape:
     * - Width: \`w-full\`, \`w-32\`, \`w-52\`, etc.
     * - Height: \`h-4\`, \`h-16\`, \`h-32\`, etc.
     * - Circle: \`rounded-full\`
     *
     * Use the \`text\` prop for animated text placeholders (skeleton-text).
     *
     * @example
     * \`\`\`tsx
     * // Basic skeleton
     * <Skeleton class="h-32 w-32" />
     *
     * // Circle skeleton for avatar
     * <Skeleton class="h-16 w-16 rounded-full" />
     *
     * // Animated text
     * <Skeleton text>Loading text...</Skeleton>
     * \`\`\`
     */
    export declare const Skeleton: import("sigx").ComponentFactory<SkeletonProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export interface StepItem {
    	id: string;
    	label: string;
    	color?: StepColor;
    	content?: string;
    }
    export type StepColor = "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    export type StepsProps = Define.Prop<"items", StepItem[], false> & Define.Model<string> & Define.Prop<"vertical", boolean, false> & Define.Prop<"horizontal", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default"> & Define.Event<"change", string>;
    export type StepProps = Define.Prop<"color", StepColor, false> & Define.Prop<"content", string, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Steps compound component with Step sub-component.
     */
    export declare const Steps: ((props: {
    	class?: string | undefined;
    	horizontal?: boolean | undefined;
    	items?: StepItem[] | undefined;
    	vertical?: boolean | undefined;
    } & {
    	onChange?: ((detail: string) => void) | undefined;
    	"onUpdate:modelValue"?: ((detail: string) => void) | undefined;
    } & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {
    	model?: import("sigx").Model<string> | import("sigx").ModelBinding<string> | (() => string) | undefined;
    } & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		model?: import("sigx").Model<string> | undefined;
    		change?: import("sigx").EventDefinition<string> | undefined;
    		class?: string | undefined;
    		horizontal?: boolean | undefined;
    		items?: StepItem[] | undefined;
    		vertical?: boolean | undefined;
    	}, StepsProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		model?: import("sigx").Model<string> | undefined;
    		change?: import("sigx").EventDefinition<string> | undefined;
    		class?: string | undefined;
    		horizontal?: boolean | undefined;
    		items?: StepItem[] | undefined;
    		vertical?: boolean | undefined;
    	};
    	__events: StepsProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	Step: import("sigx").ComponentFactory<StepProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    };
    export type TimelineColor = "primary" | "secondary" | "accent" | "neutral" | "info" | "success" | "warning" | "error";
    export type TimelineProps = Define.Prop<"vertical", boolean, false> & Define.Prop<"horizontal", boolean, false> & Define.Prop<"snap", boolean, false> & Define.Prop<"compact", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type TimelineItemProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type TimelineStartProps = Define.Prop<"boxed", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type TimelineMiddleProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type TimelineEndProps = Define.Prop<"boxed", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type TimelineHrProps = Define.Prop<"color", TimelineColor, false> & Define.Prop<"class", string, false>;
    export declare const Timeline: ((props: {
    	class?: string | undefined;
    	compact?: boolean | undefined;
    	horizontal?: boolean | undefined;
    	snap?: boolean | undefined;
    	vertical?: boolean | undefined;
    } & {} & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {} & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		class?: string | undefined;
    		compact?: boolean | undefined;
    		horizontal?: boolean | undefined;
    		snap?: boolean | undefined;
    		vertical?: boolean | undefined;
    	}, TimelineProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		class?: string | undefined;
    		compact?: boolean | undefined;
    		horizontal?: boolean | undefined;
    		snap?: boolean | undefined;
    		vertical?: boolean | undefined;
    	};
    	__events: TimelineProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	Item: import("sigx").ComponentFactory<TimelineItemProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Start: import("sigx").ComponentFactory<TimelineStartProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Middle: import("sigx").ComponentFactory<TimelineMiddleProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	End: import("sigx").ComponentFactory<TimelineEndProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Hr: import("sigx").ComponentFactory<TimelineHrProps, void, {}>;
    };
    export type ToastPosition = "top-start" | "top-center" | "top-end" | "middle-start" | "middle-center" | "middle-end" | "bottom-start" | "bottom-center" | "bottom-end";
    export type ToastProps = Define.Prop<"position", ToastPosition, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Toast container component for positioning notifications.
     * Use with Alert components for styled notifications.
     *
     * @example
     * \`\`\`tsx
     * <Toast position="bottom-end">
     *   <Alert variant="success">Message sent!</Alert>
     * </Toast>
     *
     * <Toast position="top-center">
     *   <Alert variant="info">New notification</Alert>
     *   <Alert variant="success">Action completed</Alert>
     * </Toast>
     *
     * // Multiple toasts
     * <Toast position="bottom-start">
     *   {notifications.map(n => (
     *     <Alert variant={n.type}>{n.message}</Alert>
     *   ))}
     * </Toast>
     * \`\`\`
     */
    export declare const Toast: import("sigx").ComponentFactory<ToastProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type KbdSize = "xs" | "sm" | "md" | "lg" | "xl";
    export type KbdProps = Define.Prop<"size", KbdSize, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Keyboard key component for displaying keyboard shortcuts.
     * Renders styled keyboard key indicators.
     *
     * @example
     * \`\`\`tsx
     * // Single key
     * <Kbd>K</Kbd>
     *
     * // Key combination
     * <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
     *
     * // Different sizes
     * <Kbd size="xs">Ctrl</Kbd>
     * <Kbd size="lg">Enter</Kbd>
     *
     * // Full shortcut display
     * <div class="flex gap-1">
     *   <Kbd>Ctrl</Kbd>
     *   <Kbd>Shift</Kbd>
     *   <Kbd>P</Kbd>
     * </div>
     * \`\`\`
     */
    export declare const Kbd: import("sigx").ComponentFactory<KbdProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type RadialProgressColor = "primary" | "secondary" | "accent" | "neutral" | "info" | "success" | "warning" | "error";
    export type RadialProgressProps = Define.Prop<"value", number> & Define.Prop<"size", string, false> & Define.Prop<"thickness", string, false> & Define.Prop<"color", RadialProgressColor, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Radial/circular progress indicator component.
     * Displays progress as a circular arc with customizable size and color.
     * Uses CSS custom properties --value, --size, --thickness.
     */
    export declare const RadialProgress: import("sigx").ComponentFactory<RadialProgressProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type CountdownDigits = 2 | 3;
    export type CountdownProps = Define.Prop<"value", number> & Define.Prop<"digits", CountdownDigits, false> & Define.Prop<"class", string, false>;
    /**
     * Countdown component with animated number transitions.
     * Uses the daisyUI \`countdown\` class with \`--value\` CSS variable.
     * Value should be between 0 and 999.
     *
     * @example
     * \`\`\`tsx
     * <Countdown value={42} />
     * <Countdown value={5} digits={2} />
     * \`\`\`
     */
    export declare const Countdown: import("sigx").ComponentFactory<CountdownProps, void, {}>;
    export type DiffItem1Props = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type DiffItem2Props = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type DiffResizerProps = Define.Prop<"class", string, false>;
    export type DiffProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export declare const Diff: ((props: {
    	class?: string | undefined;
    } & {} & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {} & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		class?: string | undefined;
    	}, DiffProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		class?: string | undefined;
    	};
    	__events: DiffProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	Item1: import("sigx").ComponentFactory<DiffItem1Props, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Item2: import("sigx").ComponentFactory<DiffItem2Props, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Resizer: import("sigx").ComponentFactory<{
    		class?: string | undefined;
    	}, void, {}>;
    };
    export type SwapOnProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type SwapOffProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type SwapIndeterminateProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type SwapProps = Define.Model<boolean> & Define.Prop<"rotate", boolean, false> & Define.Prop<"flip", boolean, false> & Define.Prop<"active", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default"> & Define.Event<"change", boolean>;
    export declare const Swap: ((props: {
    	active?: boolean | undefined;
    	class?: string | undefined;
    	flip?: boolean | undefined;
    	rotate?: boolean | undefined;
    } & {
    	onChange?: ((detail: boolean) => void) | undefined;
    	"onUpdate:modelValue"?: ((detail: boolean) => void) | undefined;
    } & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {
    	model?: import("sigx").Model<boolean> | import("sigx").ModelBinding<boolean> | (() => boolean) | undefined;
    } & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		model?: import("sigx").Model<boolean> | undefined;
    		active?: boolean | undefined;
    		change?: import("sigx").EventDefinition<boolean> | undefined;
    		class?: string | undefined;
    		flip?: boolean | undefined;
    		rotate?: boolean | undefined;
    	}, SwapProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		model?: import("sigx").Model<boolean> | undefined;
    		active?: boolean | undefined;
    		change?: import("sigx").EventDefinition<boolean> | undefined;
    		class?: string | undefined;
    		flip?: boolean | undefined;
    		rotate?: boolean | undefined;
    	};
    	__events: SwapProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	On: import("sigx").ComponentFactory<SwapOnProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Off: import("sigx").ComponentFactory<SwapOffProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Indeterminate: import("sigx").ComponentFactory<SwapIndeterminateProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    };
    export type IndicatorHorizontal = "start" | "center" | "end";
    export type IndicatorVertical = "top" | "middle" | "bottom";
    export type IndicatorPosition = "top-start" | "top-center" | "top-end" | "middle-start" | "middle-center" | "middle-end" | "bottom-start" | "bottom-center" | "bottom-end";
    export type IndicatorItemProps = Define.Prop<"horizontal", IndicatorHorizontal, false> & Define.Prop<"vertical", IndicatorVertical, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type IndicatorProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export declare const Indicator: ((props: {
    	class?: string | undefined;
    } & {} & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {} & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		class?: string | undefined;
    	}, IndicatorProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		class?: string | undefined;
    	};
    	__events: IndicatorProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	Item: import("sigx").ComponentFactory<IndicatorItemProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    };
    export type StatusColor = "primary" | "secondary" | "accent" | "neutral" | "info" | "success" | "warning" | "error";
    export type StatusSize = "xs" | "sm" | "md" | "lg" | "xl";
    export type StatusProps = Define.Prop<"color", StatusColor, false> & Define.Prop<"size", StatusSize, false> & Define.Prop<"class", string, false>;
    /**
     * Status indicator component with DaisyUI styling.
     * A small icon to visually show the current status of an element.
     *
     * @example
     * \`\`\`tsx
     * <Status color="success" />
     * <Status color="error" size="lg" />
     * \`\`\`
     */
    export declare const Status: import("sigx").ComponentFactory<StatusProps, void, {}>;
    export interface Tab {
    	id: string;
    	label: string | JSXElement;
    	content?: string | JSXElement;
    	disabled?: boolean;
    }
    export type TabsVariant = "border" | "lift" | "box";
    export type TabsSize = "xs" | "sm" | "md" | "lg" | "xl";
    export type TabsPosition = "top" | "bottom";
    export type TabsProps = Define.Prop<"tabs", Tab[]> & Define.Prop<"activeTab", string> & Define.Prop<"variant", TabsVariant, false> & Define.Prop<"size", TabsSize, false> & Define.Prop<"position", TabsPosition, false> & Define.Prop<"name", string, false> & Define.Prop<"contentClass", string, false> & Define.Prop<"class", string, false> & Define.Event<"change", string>;
    /**
     * Tabs component with DaisyUI styling.
     * Uses radio inputs for native tab switching with content panels.
     *
     * @example Basic tabs without content
     * \`\`\`tsx
     * const tabs = [
     *   { id: 'tab1', label: 'Tab 1' },
     *   { id: 'tab2', label: 'Tab 2' }
     * ];
     * <Tabs tabs={tabs} activeTab={activeTab.value} onChange={(id) => activeTab.value = id} />
     * \`\`\`
     *
     * @example Tabs with content
     * \`\`\`tsx
     * const tabs = [
     *   { id: 'tab1', label: 'Tab 1', content: 'Content for tab 1' },
     *   { id: 'tab2', label: 'Tab 2', content: <div>Rich content for tab 2</div> }
     * ];
     * <Tabs tabs={tabs} activeTab={activeTab.value} onChange={(id) => activeTab.value = id} variant="lift" />
     * \`\`\`
     */
    export declare const Tabs: import("sigx").ComponentFactory<TabsProps, void, {}>;
    export type MenuSize = "xs" | "sm" | "md" | "lg";
    export type MenuProps = Define.Model<string> & Define.Prop<"size", MenuSize, false> & Define.Prop<"horizontal", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default"> & Define.Event<"update:modelValue", string>;
    export type MenuItemProps = Define.Prop<"value", string, false> & Define.Prop<"active", boolean, false> & Define.Prop<"disabled", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type MenuTitleProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Menu compound component with Item and Title sub-components.
     */
    export declare const Menu: ((props: {
    	class?: string | undefined;
    	horizontal?: boolean | undefined;
    	size?: MenuSize | undefined;
    } & {
    	"onUpdate:modelValue"?: ((detail: string) => void) | undefined;
    } & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {
    	model?: import("sigx").Model<string> | import("sigx").ModelBinding<string> | (() => string) | undefined;
    } & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		model?: import("sigx").Model<string> | undefined;
    		class?: string | undefined;
    		horizontal?: boolean | undefined;
    		size?: MenuSize | undefined;
    	}, MenuProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		model?: import("sigx").Model<string> | undefined;
    		class?: string | undefined;
    		horizontal?: boolean | undefined;
    		size?: MenuSize | undefined;
    	};
    	__events: MenuProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	Item: import("sigx").ComponentFactory<MenuItemProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Title: import("sigx").ComponentFactory<MenuTitleProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    };
    export type DropdownPosition = "end" | "top" | "bottom" | "left" | "right";
    export type DropdownProps = Define.Prop<"position", DropdownPosition, false> & Define.Prop<"hover", boolean, false> & Define.Prop<"class", string, false> & Define.Prop<"menuClass", string, false> & Define.Slot<"trigger"> & Define.Slot<"default">;
    /**
     * Dropdown component with DaisyUI styling.
     * Uses slots for maximum flexibility - any component can be the trigger.
     *
     * @example
     * \`\`\`tsx
     * <Dropdown
     *   slots={{
     *     trigger: () => <Button>Open Menu</Button>
     *   }}
     * >
     *   <a>Item 1</a>
     *   <a>Item 2</a>
     * </Dropdown>
     * \`\`\`
     *
     * @example With Menu component
     * \`\`\`tsx
     * <Dropdown
     *   position="end"
     *   slots={{
     *     trigger: () => <Button variant="primary">Actions</Button>
     *   }}
     * >
     *   <Menu class="w-52">
     *     <Menu.Item><a>Edit</a></Menu.Item>
     *     <Menu.Item><a>Delete</a></Menu.Item>
     *   </Menu>
     * </Dropdown>
     * \`\`\`
     */
    export declare const Dropdown: import("sigx").ComponentFactory<DropdownProps, void, {
    	trigger: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    } & {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type DrawerProps = Define.Model<boolean> & Define.Prop<"side", "left" | "right", false> & Define.Prop<"responsive", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default"> & Define.Slot<"side">;
    /**
     * Drawer component with DaisyUI styling.
     * Slide-out side panel for navigation, filters, and mobile menus.
     *
     * @example
     * \`\`\`tsx
     * const open = signal(false);
     * <Drawer
     *   model={open}
     *   slots={{
     *     side: () => <Menu items={navItems} />
     *   }}
     * >
     *   <main>Main content</main>
     * </Drawer>
     * \`\`\`
     */
    export declare const Drawer: import("sigx").ComponentFactory<DrawerProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    } & {
    	side: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export interface BreadcrumbItem {
    	id: string;
    	label: string;
    	href?: string;
    }
    export type BreadcrumbsProps = Define.Prop<"items", BreadcrumbItem[]> & Define.Prop<"class", string, false> & Define.Event<"navigate", string>;
    /**
     * Breadcrumbs component with DaisyUI styling.
     *
     * @example
     * \`\`\`tsx
     * const items = [
     *   { id: 'home', label: 'Home', href: '/' },
     *   { id: 'docs', label: 'Docs', href: '/docs' },
     *   { id: 'current', label: 'Current Page' }
     * ];
     * <Breadcrumbs items={items} onNavigate={(id) => navigate(id)} />
     * \`\`\`
     */
    export declare const Breadcrumbs: import("sigx").ComponentFactory<BreadcrumbsProps, void, {}>;
    export type NavbarProps = Define.Prop<"class", string, false> & Define.Slot<"start"> & Define.Slot<"center"> & Define.Slot<"end">;
    /**
     * Navbar component with DaisyUI styling.
     *
     * @example
     * \`\`\`tsx
     * <Navbar
     *   slots={{
     *     start: () => <a class="btn btn-ghost text-xl">Logo</a>,
     *     end: () => <Button>Login</Button>
     *   }}
     * />
     * \`\`\`
     */
    export declare const Navbar: import("sigx").ComponentFactory<NavbarProps, void, {
    	start: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    } & {
    	center: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    } & {
    	end: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type PaginationProps = Define.Prop<"currentPage", number> & Define.Prop<"totalPages", number> & Define.Prop<"class", string, false> & Define.Event<"change", number>;
    /**
     * Pagination component with DaisyUI styling.
     *
     * @example
     * \`\`\`tsx
     * <Pagination currentPage={1} totalPages={10} onChange={(page) => setPage(page)} />
     * \`\`\`
     */
    export declare const Pagination: import("sigx").ComponentFactory<PaginationProps, void, {}>;
    export type TableSize = "xs" | "sm" | "md" | "lg" | "xl";
    export type TableProps = Define.Prop<"zebra", boolean, false> & Define.Prop<"pinRows", boolean, false> & Define.Prop<"pinCols", boolean, false> & Define.Prop<"size", TableSize, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type TheadProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type TbodyProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type TrProps = Define.Prop<"hover", boolean, false> & Define.Prop<"active", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type ThProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type TdProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type TfootProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Table compound component with Head, Body, Foot, Row, Th, and Td sub-components.
     *
     * @example
     * \`\`\`tsx
     * <Table zebra>
     *   <Table.Head>
     *     <Table.Row><Table.Th>Name</Table.Th><Table.Th>Email</Table.Th></Table.Row>
     *   </Table.Head>
     *   <Table.Body>
     *     <Table.Row><Table.Td>Alice</Table.Td><Table.Td>alice@example.com</Table.Td></Table.Row>
     *   </Table.Body>
     *   <Table.Foot>
     *     <Table.Row><Table.Th>Name</Table.Th><Table.Th>Email</Table.Th></Table.Row>
     *   </Table.Foot>
     * </Table>
     * \`\`\`
     */
    export declare const Table: ((props: {
    	class?: string | undefined;
    	pinCols?: boolean | undefined;
    	pinRows?: boolean | undefined;
    	size?: TableSize | undefined;
    	zebra?: boolean | undefined;
    } & {} & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {} & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		class?: string | undefined;
    		pinCols?: boolean | undefined;
    		pinRows?: boolean | undefined;
    		size?: TableSize | undefined;
    		zebra?: boolean | undefined;
    	}, TableProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		class?: string | undefined;
    		pinCols?: boolean | undefined;
    		pinRows?: boolean | undefined;
    		size?: TableSize | undefined;
    		zebra?: boolean | undefined;
    	};
    	__events: TableProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	Head: import("sigx").ComponentFactory<TheadProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Body: import("sigx").ComponentFactory<TbodyProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Foot: import("sigx").ComponentFactory<TfootProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Row: import("sigx").ComponentFactory<TrProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Th: import("sigx").ComponentFactory<ThProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Td: import("sigx").ComponentFactory<TdProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    };
    export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
    export type AvatarShape = "circle" | "rounded" | "square" | "squircle" | "hexagon" | "heart";
    export type AvatarProps = Define.Prop<"src", string, false> & Define.Prop<"alt", string, false> & Define.Prop<"size", AvatarSize, false> & Define.Prop<"shape", AvatarShape, false> & Define.Prop<"online", boolean, false> & Define.Prop<"offline", boolean, false> & Define.Prop<"placeholder", string, false> & Define.Prop<"ring", boolean, false> & Define.Prop<"ringColor", "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "neutral", false> & Define.Prop<"class", string, false>;
    export type AvatarGroupProps = Define.Prop<"spacing", 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Avatar compound component with Group sub-component.
     */
    export declare const Avatar: ((props: {
    	alt?: string | undefined;
    	class?: string | undefined;
    	offline?: boolean | undefined;
    	online?: boolean | undefined;
    	placeholder?: string | undefined;
    	ring?: boolean | undefined;
    	ringColor?: "accent" | "error" | "info" | "neutral" | "primary" | "secondary" | "success" | "warning" | undefined;
    	shape?: AvatarShape | undefined;
    	size?: AvatarSize | undefined;
    	src?: string | undefined;
    } & {} & {
    	slots?: Partial<{}> | undefined;
    } & {} & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		alt?: string | undefined;
    		class?: string | undefined;
    		offline?: boolean | undefined;
    		online?: boolean | undefined;
    		placeholder?: string | undefined;
    		ring?: boolean | undefined;
    		ringColor?: "accent" | "error" | "info" | "neutral" | "primary" | "secondary" | "success" | "warning" | undefined;
    		shape?: AvatarShape | undefined;
    		size?: AvatarSize | undefined;
    		src?: string | undefined;
    	}, AvatarProps, void, {}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		alt?: string | undefined;
    		class?: string | undefined;
    		offline?: boolean | undefined;
    		online?: boolean | undefined;
    		placeholder?: string | undefined;
    		ring?: boolean | undefined;
    		ringColor?: "accent" | "error" | "info" | "neutral" | "primary" | "secondary" | "success" | "warning" | undefined;
    		shape?: AvatarShape | undefined;
    		size?: AvatarSize | undefined;
    		src?: string | undefined;
    	};
    	__events: AvatarProps;
    	__ref: void;
    	__slots: {};
    } & {
    	Group: import("sigx").ComponentFactory<AvatarGroupProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    };
    export type StatTitleProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type StatValueProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type StatDescProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type StatFigureProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type StatActionsProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type StatProps = Define.Prop<"class", string, false> & Define.Slot<"default">;
    export type StatsProps = Define.Prop<"vertical", boolean, false> & Define.Prop<"horizontal", boolean, false> & Define.Prop<"shadow", boolean, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    export declare const Stats: ((props: {
    	class?: string | undefined;
    	horizontal?: boolean | undefined;
    	shadow?: boolean | undefined;
    	vertical?: boolean | undefined;
    } & {} & {
    	slots?: Partial<{
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}> | undefined;
    } & {} & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    	ref?: import("sigx").Ref<void> | undefined;
    	children?: any;
    }) => import("sigx").JSXElement) & {
    	__setup: import("sigx").SetupFn<{
    		class?: string | undefined;
    		horizontal?: boolean | undefined;
    		shadow?: boolean | undefined;
    		vertical?: boolean | undefined;
    	}, StatsProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	__name?: string | undefined;
    	__islandId?: string | undefined;
    	__props: {
    		class?: string | undefined;
    		horizontal?: boolean | undefined;
    		shadow?: boolean | undefined;
    		vertical?: boolean | undefined;
    	};
    	__events: StatsProps;
    	__ref: void;
    	__slots: {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	};
    } & {
    	Item: ((props: {
    		class?: string | undefined;
    	} & {} & {
    		slots?: Partial<{
    			default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    		}> | undefined;
    	} & {} & JSX.IntrinsicAttributes & import("sigx").ComponentAttributeExtensions & {
    		ref?: import("sigx").Ref<void> | undefined;
    		children?: any;
    	}) => import("sigx").JSXElement) & {
    		__setup: import("sigx").SetupFn<{
    			class?: string | undefined;
    		}, StatProps, void, {
    			default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    		}>;
    		__name?: string | undefined;
    		__islandId?: string | undefined;
    		__props: {
    			class?: string | undefined;
    		};
    		__events: StatProps;
    		__ref: void;
    		__slots: {
    			default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    		};
    	} & {
    		Title: import("sigx").ComponentFactory<StatTitleProps, void, {
    			default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    		}>;
    		Value: import("sigx").ComponentFactory<StatValueProps, void, {
    			default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    		}>;
    		Desc: import("sigx").ComponentFactory<StatDescProps, void, {
    			default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    		}>;
    		Figure: import("sigx").ComponentFactory<StatFigureProps, void, {
    			default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    		}>;
    		Actions: import("sigx").ComponentFactory<StatActionsProps, void, {
    			default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    		}>;
    	};
    	Title: import("sigx").ComponentFactory<StatTitleProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Value: import("sigx").ComponentFactory<StatValueProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Desc: import("sigx").ComponentFactory<StatDescProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Figure: import("sigx").ComponentFactory<StatFigureProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    	Actions: import("sigx").ComponentFactory<StatActionsProps, void, {
    		default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    	}>;
    };
    export type TextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
    export type TextWeight = "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
    export type TextColor = "base" | "muted" | "faint" | "primary" | "secondary" | "accent" | "neutral" | "info" | "success" | "warning" | "error" | "primary-content" | "secondary-content" | "accent-content" | "neutral-content" | "info-content" | "success-content" | "warning-content" | "error-content";
    export type TextAlign = "left" | "center" | "right" | "justify";
    export type TextElement = "span" | "p" | "div" | "label" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    export type TextProps = Define.Prop<"as", TextElement, false> & Define.Prop<"size", TextSize, false> & Define.Prop<"weight", TextWeight, false> & Define.Prop<"color", TextColor, false> & Define.Prop<"align", TextAlign, false> & Define.Prop<"italic", boolean, false> & Define.Prop<"underline", boolean, false> & Define.Prop<"lineThrough", boolean, false> & Define.Prop<"uppercase", boolean, false> & Define.Prop<"lowercase", boolean, false> & Define.Prop<"capitalize", boolean, false> & Define.Prop<"truncate", boolean | number, false> & Define.Prop<"nowrap", boolean, false> & Define.Prop<"margin", Spacing, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Text component for typography with consistent styling.
     *
     * @example
     * \`\`\`tsx
     * // Basic usage
     * <Text>Default text</Text>
     *
     * // With size and weight
     * <Text size="lg" weight="bold">Large bold text</Text>
     *
     * // With color
     * <Text color="muted">Muted text</Text>
     * <Text color="primary">Primary colored text</Text>
     *
     * // As different elements
     * <Text as="h1" size="3xl" weight="bold">Heading</Text>
     * <Text as="p" margin={{ bottom: "4" }}>Paragraph with margin</Text>
     * \`\`\`
     */
    declare const Text\$1: import("sigx").ComponentFactory<TextProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
    export type HeadingProps = Define.Prop<"level", HeadingLevel, false> & Define.Prop<"size", TextSize, false> & Define.Prop<"weight", TextWeight, false> & Define.Prop<"color", TextColor, false> & Define.Prop<"align", TextAlign, false> & Define.Prop<"margin", Spacing, false> & Define.Prop<"class", string, false> & Define.Slot<"default">;
    /**
     * Heading component for semantic headings with default sizes.
     *
     * @example
     * \`\`\`tsx
     * <Heading level={1}>Page Title</Heading>
     * <Heading level={2}>Section Title</Heading>
     * <Heading level={3} size="xl">Custom sized heading</Heading>
     * \`\`\`
     */
    export declare const Heading: import("sigx").ComponentFactory<HeadingProps, void, {
    	default: () => import("sigx").JSXElement[] | import("sigx").JSXElement;
    }>;
    export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    export type IconProps = Define.Prop<"icon", string> & Define.Prop<"size", IconSize, false> & Define.Prop<"class", string, false>;
    /**
     * Generic icon component that renders an \`<i>\` tag with the given icon classes.
     *
     * @example
     * \`\`\`tsx
     * import { Icon } from '@sigx/daisyui';
     *
     * <Icon icon="fa-solid fa-check" />
     * <Icon icon="fa-solid fa-gear" size="lg" />
     * <Icon icon="fa-solid fa-bolt" size="xl" class="text-yellow-400" />
     * \`\`\`
     */
    export declare const Icon: import("sigx").ComponentFactory<IconProps, void, {}>;

    export {
    	Range\$1 as Range,
    	Spacing as FlexSpacing,
    	Text\$1 as Text,
    };


}`;

/** All types combined for Monaco */
export const allModuleTypes = [
    jsxRuntimeTypes,
    sigxTypes,
    sigxModuleTypes,
    routerModuleTypes,
    storeModuleTypes,
    daisyuiModuleTypes
].join('\n');

/** Module types map for selective registration */
export const moduleTypesMap: Record<string, string> = {
    'sigx/jsx-runtime': jsxRuntimeTypes,
    'sigx': sigxModuleTypes,
    '@sigx/router': routerModuleTypes,
    '@sigx/store': storeModuleTypes,
    '@sigx/daisyui': daisyuiModuleTypes,
};
