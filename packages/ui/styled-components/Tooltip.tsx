/*
 * Usage:
 *
 * A text tooltip is easy, just wrap the element you would like to have a tooltip
 * displayed for and set the content to a string message!
 * <Tooltip content='Hello World!'>
 *   <h1>Stuff and things</h1>
 * </Tooltip>
 *
 * Tooltips can also be jsx elements!
 * <Tooltip content={<img src='https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg' />}>
 *   <h1>Hover for a cat picture!</h1>
 * </Tooltip>
 *
 */

import * as React from "react";
import styled from "styled-components";

export enum WindowRegion {
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
}

export interface TooltipProps {
  content: any;
  children?: React.ReactNode;
  tooltipClassName?: string;
  offsetLeft?: number;
  offsetRight?: number;
  offsetTop?: number;
  offsetBottom?: number;
}

export interface TooltipState {
  x: number;
  y: number;
  wndRegion: WindowRegion;
  hidden: boolean;
  ttClassName: string;
  offsetLeft: number;
  offsetRight: number;
  offsetTop: number;
  offsetBottom: number;
}

const StyledTooltip = styled("div")`
  background: ${(props) => props.theme.palette.primary.default};
  color: ${(props) => props.theme.palette.primary.opposite};
  max-width: 15rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  z-index: 200;
`;

function windowRegion(mouseX: number, mouseY: number) {
  const halfHeight = window.window.innerHeight * 0.5;
  if (mouseX <= window.window.innerWidth * 0.5) {
    return mouseY <= halfHeight
      ? WindowRegion.TopLeft
      : WindowRegion.BottomLeft;
  }
  return mouseY <= halfHeight
    ? WindowRegion.TopRight
    : WindowRegion.BottomRight;
}

export class Tooltip extends React.Component<TooltipProps, TooltipState> {
  constructor(props: TooltipProps) {
    super(props);
    const {
      tooltipClassName,
      offsetLeft,
      offsetTop,
      offsetRight,
      offsetBottom,
    } = this.props;
    this.state = {
      x: 0,
      y: 0,
      wndRegion: WindowRegion.TopLeft,
      hidden: true,
      ttClassName: tooltipClassName || "Tooltip",
      offsetLeft: offsetLeft || 10,
      offsetTop: offsetTop || 10,
      offsetRight: offsetRight || 5,
      offsetBottom: offsetBottom || 5,
    };
  }

  onMouseMove = (e: React.MouseEvent) => {
    const { hidden } = this.state;
    if (hidden === true) return;
    this.setState({
      x: e.clientX,
      y: e.clientY,
    } as any);
  };

  onMouseEnter = (e: React.MouseEvent) => {
    this.setState({
      hidden: false,
      wndRegion: windowRegion(e.clientX, e.clientY),
    } as any);
  };

  onMouseleave = () => {
    this.setState({ hidden: true } as any);
  };

  computeStyle = (): React.CSSProperties => {
    const {
      wndRegion,
      x,
      y,
      offsetBottom,
      offsetLeft,
      offsetRight,
      offsetTop,
    } = this.state;
    switch (wndRegion) {
      case WindowRegion.TopLeft:
        return {
          position: "fixed",
          left: `${x + offsetLeft}px`,
          top: `${y + offsetTop}px`,
        };
      case WindowRegion.TopRight:
        return {
          position: "fixed",
          zIndex: 200000,
          right: `${window.window.innerWidth - x + offsetRight}px`,
          top: `${y + offsetTop}px`,
        };
      case WindowRegion.BottomLeft:
        return {
          position: "fixed",
          zIndex: 200000,
          left: `${x + offsetLeft}px`,
          bottom: `${window.window.innerHeight - y + offsetBottom}px`,
        };
      case WindowRegion.BottomRight:
        return {
          position: "fixed",
          zIndex: 200000,
          right: `${window.window.innerWidth - x + offsetRight}px`,
          bottom: `${window.window.innerHeight - y + offsetBottom}px`,
        };
      default:
        return {
          position: "fixed",
          zIndex: 200000,
          right: `${window.window.innerWidth - x + offsetRight}px`,
          bottom: `${window.window.innerHeight - y + offsetBottom}px`,
        };
    }
  };

  render() {
    const { hidden, ttClassName } = this.state;
    const { children, content } = this.props;

    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseleave}
        onMouseMove={this.onMouseMove}
      >
        {children}
        {hidden ? null : (
          <StyledTooltip className={ttClassName} style={this.computeStyle()}>
            {content}
          </StyledTooltip>
        )}
      </div>
    );
  }
}
