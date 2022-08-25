import React from "react";
import { DistributiveOmit } from "./helpers";

interface RefObject<T> {
  // immutable
  readonly current: T | null;
}

export type StandardProps<
  C,
  Removals extends keyof C = never
> = DistributiveOmit<C, Removals> & {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  children?: React.ReactNode;
};

export type BaseTextStyleProps = {
  color?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: "inherit" | "left" | "center" | "right" | "justify";
  textDecoration?: string;
  textIndent?: string;
  textTransform?: string;
  textOverflow?: string;
  overflow?: string;
  whiteSpace?: string;
};

export type BaseFontStyleProps = {
  font?: string;
  fontFamily?: string;
  fontSize?: string;
  fontStyle?: string;
  fontVariant?: string;
  fontWeight?: string | number;
};

export type BaseLayoutStyleProps = {
  padding?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  paddingTop?: string | number;
  margin?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  marginTop?: string | number;
};

export type BaseDisplayStyleProps = {
  display?: string;
  position?: string;
  flex?: string | number;
  flexBasis?: string;
  flexDirection?: string;
  flexFlow?: string;
  flexGrow?: string | number;
  flexShrink?: string;
  flexWrap?: string;
  gap?: string | number;
  alignContent?: string;
  alignItems?: string;
  alignSelf?: string;
};

export type BaseDivStyleProps = {
  overflow?: string;
  overflowX?: string;
  overflowY?: string;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
  width?: string;
  height?: string;
  alignContent?: string;
  alignItems?: string;
  alignSelf?: string;
  background?: string;
  backgroundColor?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  backgroundSize?: string;
  border?: string;
  cursor?: string;
  direction?: string;
};

export type BaseDOMStyleProps = {
  alignContent?: string;
  alignItems?: string;
  alignSelf?: string;
  animation?: string;
  animationDelay?: string;
  animationDirection?: string;
  animationDuration?: string;
  animationFillMode?: string;
  animationIterationCount?: string;
  animationName?: string;
  animationTimingFunction?: string;
  animationPlayState?: string;
  background?: string;
  backgroundAttachment?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  backgroundClip?: string;
  backgroundOrigin?: string;
  backgroundSize?: string;
  backfaceVisibility?: string;
  border?: string;
  borderBottom?: string;
  borderBottomColor?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
  borderBottomStyle?: string;
  borderBottomWidth?: string;
  borderCollapse?: string;
  borderColor?: string;
  borderImage?: string;
  borderImageOutset?: string;
  borderImageRepeat?: string;
  borderImageSlice?: string;
  borderImageSource?: string;
  borderImageWidth?: string;
  borderLeft?: string;
  borderLeftColor?: string;
  borderLeftStyle?: string;
  borderLeftWidth?: string;
  borderRadius?: string;
  borderRight?: string;
  borderRightColor?: string;
  borderRightStyle?: string;
  borderRightWidth?: string;
  borderSpacing?: string;
  borderStyle?: string;
  borderTop?: string;
  borderTopColor?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderTopStyle?: string;
  borderTopWidth?: string;
  borderWidth?: string;
  bottom?: string;
  boxDecorationBreak?: string;
  boxShadow?: string;
  boxSizing?: string;
  captionSide?: string;
  caretColor?: string;
  clear?: string;
  clip?: string;
  color?: string;
  columnCount?: string;
  columnFill?: string;
  columnGap?: string;
  columnRule?: string;
  columnRuleColor?: string;
  columnRuleStyle?: string;
  columnRuleWidth?: string;
  columns?: string;
  columnSpan?: string;
  columnWidth?: string;
  content?: string;
  counterIncrement?: string;
  counterReset?: string;
  cursor?: string;
  direction?: string;
  display?: string;
  emptyCells?: string;
  filter?: string;
  flex?: string;
  flexBasis?: string;
  flexDirection?: string;
  flexFlow?: string;
  flexGrow?: string;
  flexShrink?: string;
  flexWrap?: string;
  cssFloat?: string;
  font?: string;
  fontFamily?: string;
  fontSize?: string;
  fontStyle?: string;
  fontVariant?: string;
  fontWeight?: string;
  fontSizeAdjust?: string;
  fontStretch?: string;
  hangingPunctuation?: string;
  height?: string;
  hyphens?: string;
  icon?: string;
  imageOrientation?: string;
  isolation?: string;
  justifyContent?: string;
  left?: string;
  letterSpacing?: string;
  lineHeight?: string;
  listStyle?: string;
  listStyleImage?: string;
  listStylePosition?: string;
  listStyleType?: string;
  margin?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  marginTop?: string;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
  navDown?: string;
  navIndex?: string;
  navLeft?: string;
  navRight?: string;
  navUp?: string;
  objectFit?: string;
  objectPosition?: string;
  opacity?: string;
  order?: string;
  orphans?: string;
  outline?: string;
  outlineColor?: string;
  outlineOffset?: string;
  outlineStyle?: string;
  outlineWidth?: string;
  overflow?: string;
  overflowX?: string;
  overflowY?: string;
  padding?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingTop?: string;
  pageBreakAfter?: string;
  pageBreakBefore?: string;
  pageBreakInside?: string;
  perspective?: string;
  perspectiveOrigin?: string;
  position?: string;
  quotes?: string;
  resize?: string;
  right?: string;
  scrollBehavior?: string;
  tableLayout?: string;
  tabSize?: string;
  textAlign?: string;
  textAlignLast?: string;
  textDecoration?: string;
  textDecorationColor?: string;
  textDecorationLine?: string;
  textDecorationStyle?: string;
  textIndent?: string;
  textJustify?: string;
  textOverflow?: string;
  textShadow?: string;
  textTransform?: string;
  top?: string;
  transform?: string;
  transformOrigin?: string;
  transformStyle?: string;
  transition?: string;
  transitionProperty?: string;
  transitionDuration?: string;
  transitionTimingFunction?: string;
  transitionDelay?: string;
  unicodeBidi?: string;
  userSelect?: string;
  verticalAlign?: string;
  visibility?: string;
  whiteSpace?: string;
  width?: string;
  wordBreak?: string;
  wordSpacing?: string;
  wordWrap?: string;
  widows?: string;
  zIndex?: string;
};
