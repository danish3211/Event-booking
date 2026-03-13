import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onPress?: () => void; // Replaces onPress with native onClick support
  variant?: "primary" | "secondary" | "normal" | "float";
  icon?: React.ReactNode;
  loading?: boolean;
}

const Button = ({
  title,
  onClick,
  onPress,
  className = "",
  variant = "primary",
  icon,
  disabled = false,
  loading = false,
  ...props
}: ButtonProps) => {
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Web Haptics (supported on some mobile browsers)
    if (typeof window !== 'undefined' && window.navigator.vibrate) {
      window.navigator.vibrate(20); 
    }

    if (onClick) onClick(e);
    if (onPress) onPress();
  };

  const variantStyles = variant === "primary" 
    ? "bg-primary text-white text-lg px-6 py-3 rounded-xl" 
    : variant === "normal"
    ? "w-13 h-13 bg-background border border-surface/30 hover:bg-background/10 hover:text-white text-text rounded-xl"
    : variant === "float"
    ? "p-3 rounded-full bg-primary/30 backdrop-blur-md border border-primary/50 hover:bg-primary/50 transition"
    : "bg-background hover:bg-background/10 text-text! hover:text-white! text-lg px-6 py-3 rounded-xl";

  const disabledStyles = (disabled || loading) ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 active:scale-95";

  return (
    <button
      {...props}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        flex flex-row gap-2 items-center justify-center transition-all
        font-bold
        ${variantStyles} 
        ${disabledStyles} 
        ${className}
      `}
    >
      {icon && (
        <span className={`${variant === 'normal' ? 'w-full h-full' : 'w-6 h-6'} flex items-center justify-center`}>
          {icon}
        </span>
      )}
      
      {variant !== 'normal' && <span>{title}</span>}

      {loading && (
        <svg 
          className="animate-spin h-5 w-5 text-white" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
    </button>
  );
};

export default Button;