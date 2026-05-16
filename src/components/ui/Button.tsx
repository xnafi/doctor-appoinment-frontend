"use client";

import React from "react";
import Link from "next/link";
import scrollToElement from "scroll-to-element";

type ButtonVariant = "primary" | "secondary" | "outline-white" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
}

interface ButtonAsButton extends ButtonBaseProps {
  as?: "button";
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  as: "link";
  href: string;
  type?: never;
  onClick?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeMap: Record<ButtonSize, string> = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
  xl: "btn-xl",
};

const variantMap: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  "outline-white": "btn-outline-white",
  ghost: "btn-ghost",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  icon,
  iconPosition = "left",
  disabled = false,
  loading = false,
  ...rest
}: ButtonProps) {
  const classes = ["btn", variantMap[variant], sizeMap[size], className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading ? (
        <svg
          className="animate-spin"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25" />
          <path d="M21 12a9 9 0 01-9-9" />
        </svg>
      ) : (
        icon && iconPosition === "left" && icon
      )}
      {children}
      {!loading && icon && iconPosition === "right" && icon}
    </>
  );

  if (rest.as === "link") {
    if (rest.href.startsWith("#")) {
      const target = rest.href;

      return (
        <button
          type="button"
          className={classes}
          disabled={disabled || loading}
          onClick={() => {
            scrollToElement(target, {
              offset: -80,
              ease: "outQuad",
              duration: 600,
            });
          }}
          aria-disabled={disabled || loading}
        >
          {content}
        </button>
      );
    }

    return (
      <Link href={rest.href} className={classes} aria-disabled={disabled}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={(rest as ButtonAsButton).type ?? "button"}
      className={classes}
      disabled={disabled || loading}
      onClick={(rest as ButtonAsButton).onClick}
      aria-disabled={disabled || loading}
    >
      {content}
    </button>
  );
}
