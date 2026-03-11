import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholders?: string[];
  animationInterval?: number;
  fadeDirection?: "fade" | "slide" | "scale";
  className?: string;
  inputClassName?: string;
  onFocus?: () => void;
}

const COLORS = {
  primary: "var(--color-primary)",
  vivid: "var(--color-vivid)",
  text: "var(--color-text)",
  surface: "var(--color-surface)",
  secondary: "var(--color-secondary)",
  background: "var(--color-background)",
};

export const SearchBar = ({
  value,
  onChangeText,
  placeholders = [
    "Search for events",
    "Search for artists",
    "Search for venues",
    "Live concerts",
    "Music shows",
    "Comedy nights",
  ],
  animationInterval = 2500,
  fadeDirection = "slide",
  className = "",
  inputClassName = "",
  onFocus,
}: SearchBarProps) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderOpacity, setPlaceholderOpacity] = useState(1);
  const [placeholderTransform, setPlaceholderTransform] = useState({
    translateY: 0,
    scale: 1,
  });
  const [containerScale, setContainerScale] = useState(1);
  const [borderColor, setBorderColor] = useState("rgba(0,0,0,0.1)");

  const placeholderTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const animateOut = () => {
    return new Promise<void>((resolve) => {
      const duration = 300;
      const steps = 20;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        switch (fadeDirection) {
          case "slide":
            setPlaceholderOpacity(1 - progress);
            setPlaceholderTransform((prev) => ({
              ...prev,
              translateY: -20 * progress,
            }));
            break;
          case "scale":
            setPlaceholderOpacity(1 - progress);
            setPlaceholderTransform((prev) => ({
              ...prev,
              scale: 1 - 0.2 * progress,
            }));
            break;
          default:
            setPlaceholderOpacity(1 - progress);
        }

        if (currentStep === steps) {
          clearInterval(interval);
          resolve();
        }
      }, duration / steps);
    });
  };

  const animateIn = () => {
    return new Promise<void>((resolve) => {
      const duration = 300;
      const steps = 20;
      let currentStep = 0;

      // Reset initial state based on direction
      switch (fadeDirection) {
        case "slide":
          setPlaceholderTransform({ translateY: 20, scale: 1 });
          break;
        case "scale":
          setPlaceholderTransform({ translateY: 0, scale: 1.2 });
          break;
        default:
          break;
      }

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        switch (fadeDirection) {
          case "slide":
            setPlaceholderOpacity(progress);
            setPlaceholderTransform((prev) => ({
              ...prev,
              translateY: 20 - 20 * progress,
            }));
            break;
          case "scale":
            setPlaceholderOpacity(progress);
            setPlaceholderTransform((prev) => ({
              ...prev,
              scale: 1.2 - 0.2 * progress,
            }));
            break;
          default:
            setPlaceholderOpacity(progress);
        }

        if (currentStep === steps) {
          clearInterval(interval);
          resolve();
        }
      }, duration / steps);
    });
  };

  const startPlaceholderAnimation = () => {
    if (placeholderTimer.current) {
      clearInterval(placeholderTimer.current);
    }

    placeholderTimer.current = setInterval(async () => {
      await animateOut();
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
      await animateIn();
    }, animationInterval);
  };

  const stopPlaceholderAnimation = () => {
    if (placeholderTimer.current) {
      clearInterval(placeholderTimer.current);
      placeholderTimer.current = null;
    }
  };

  useEffect(() => {
    if (value === "") {
      startPlaceholderAnimation();
    } else {
      stopPlaceholderAnimation();
    }

    return () => stopPlaceholderAnimation();
  }, [value, placeholders.length, animationInterval]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeText(e.target.value);
  };

  const handlePressIn = () => {
    setContainerScale(0.98);
    setBorderColor(COLORS.vivid);
  };

  const handlePressOut = () => {
    if (!isFocused) {
      setContainerScale(1);
      setBorderColor(COLORS.primary);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setBorderColor(COLORS.primary);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    setContainerScale(1);
    setBorderColor(COLORS.primary);
  };

  const handleClear = () => {
    onChangeText("");
    inputRef.current?.focus();
  };

  return (
    <div
      className={`relative ${className}`}
      ref={containerRef}
      style={{
        transform: `scale(${containerScale})`,
        transition: "transform 0.15s ease-out",
      }}
    >
      <div
        onMouseDown={handlePressIn}
        onMouseUp={handlePressOut}
        onMouseLeave={handlePressOut}
        className="relative"
      >
        <div
          className="relative flex h-12 items-center rounded-3xl border overflow-hidden bg-black/15 shadow-lg backdrop-blur-sm"
          style={{
            borderColor: borderColor,
            transition: "border-color 0.15s ease-out",
            backgroundColor: "rgba(28, 28, 30, 0.15)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Blur Effect Background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
            }}
          />

          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <Search
              size={20}
              color={
                COLORS.background
              }
              strokeWidth={2}
              style={{
                transition: "color 0.2s ease-out",
              }}
            />
          </div>

          {/* Text Input */}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleTextChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder=""
            className={`relative z-20 flex-1 bg-transparent px-4 pl-12 pr-10 text-base text-white outline-none ${inputClassName}`}
            style={{
              color: COLORS.background,
            }}
          />

          {/* Animated Placeholder */}
          {value === "" && (
            <div
              className="absolute left-12 top-1/2 -translate-y-1/2 z-10 pointer-events-none whitespace-nowrap"
              style={{
                opacity: placeholderOpacity,
                transform: `translateY(${placeholderTransform.translateY}px) scale(${placeholderTransform.scale})`,
                transition: "all 0.3s ease-out",
              }}
            >
              <span
                className="text-base font-normal"
                style={{
                  color: COLORS.surface,
                }}
              >
                {placeholders[currentPlaceholder]}
              </span>
            </div>
          )}

          {/* Clear Button */}
          {value !== "" && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-1 text-white/60 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X size={18} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
