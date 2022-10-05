import * as React from 'react';
import cx from 'classnames';
import { Tooltip } from '@showdex/components/ui';
import { useColorScheme } from '@showdex/redux/store';
import type { TooltipProps } from '@showdex/components/ui';
import type { BaseButtonProps, ButtonElement, ButtonElementType } from './BaseButton';
import { BaseButton } from './BaseButton';
import styles from './Button.module.scss';

export interface ButtonProps<
  T extends ButtonElementType = 'button',
> extends BaseButtonProps<T> {
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  label?: string;
  tooltip?: React.ReactNode;
  tooltipTrigger?: TooltipProps['trigger'];
  tooltipTouch?: TooltipProps['touch'];
  highlight?: boolean;
  absoluteHover?: boolean;
}

/* eslint-disable @typescript-eslint/indent -- this rule is broken af. see Issue #1824 in the typescript-eslint GitHub repo. */
/* eslint-disable react/prop-types */

export const Button = React.forwardRef<ButtonElement, ButtonProps>(<
  T extends ButtonElementType = 'button',
>({
  className,
  labelClassName,
  labelStyle,
  label,
  tooltip,
  tooltipTrigger = 'mouseenter',
  tooltipTouch = 'hold',
  highlight,
  absoluteHover,
  disabled,
  children,
  ...props
}: ButtonProps<T>, forwardedRef: React.ForwardedRef<ButtonElement>): JSX.Element => {
  const ref = React.useRef<ButtonElement>(null);
  const colorScheme = useColorScheme();

  React.useImperativeHandle(
    forwardedRef,
    () => ref.current,
  );

  return (
    <>
      <BaseButton
        ref={ref}
        {...props}
        className={cx(
          styles.container,
          !!colorScheme && styles[colorScheme],
          highlight && styles.highlight,
          absoluteHover && styles.absoluteHover,
          disabled && styles.disabled,
          className,
        )}
        aria-label={label}
        disabled={disabled}
      >
        <label
          className={cx(styles.label, labelClassName)}
          style={labelStyle}
        >
          {label}
        </label>

        {children}
      </BaseButton>

      <Tooltip
        reference={ref}
        content={tooltip}
        offset={[0, 10]}
        delay={[1000, 150]}
        trigger={tooltipTrigger}
        touch={tooltipTouch}
        disabled={!tooltip || disabled}
      />
    </>
  );
});

/* eslint-enable react/prop-types */
/* eslint-enable @typescript-eslint/indent */
