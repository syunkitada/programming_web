import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const { children, ...rest } = props;
    return (
      <button ref={ref} {...rest}>
        {children}
      </button>
    );
  },
);
