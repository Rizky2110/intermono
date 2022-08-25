import React from "react";

export type PropInjector<InjectedProps, AdditionalProps = unknown> = <
  C extends React.JSXElementConstructor<
    ConsistentWith<React.ComponentProps<C>, InjectedProps>
  >
>(
  component: C
) => React.JSXElementConstructor<
  DistributiveOmit<
    JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>,
    keyof InjectedProps
  > &
    AdditionalProps
>;

export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;
