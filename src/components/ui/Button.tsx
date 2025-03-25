"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "medium",
  disabled = false,
  type = "button",
  icon,
  iconPosition = "left",
}) => {
  const baseStyles = "flex items-center justify-center rounded-lg transition-colors focus:outline-none";

  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
  };

  const sizeStyles = {
    small: "py-1 px-3 text-sm",
    medium: "py-2 px-4 text-base",
    large: "py-3 px-6 text-lg",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
        disabled ? disabledStyles : ""
      } ${className}`}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}

      {children}

      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;