import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const CustomDropdown = ({
  label,
  options,
  onSelect
}: {
  label: string;
  options: string[];
  onSelect?: (option: string) => void
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/20 px-5 py-2.5 text-sm font-medium text-background shadow-sm transition-all hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/10"
      >
        {selected === options[0] ? label : selected}
        <ChevronDown className={`h-4 w-4 text-background transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Menu Items (Dropdown) */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-xl border border-slate-100 bg-white p-1 shadow-xl z-50 animate-in fade-in zoom-in duration-100">
          <ul className="max-h-60 overflow-auto scrollbar-hide py-1">
            {options.map((option, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    setSelected(option);
                    setIsOpen(false);
                    onSelect?.(option);
                  }}
                  className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};