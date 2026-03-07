import { MapPin } from "lucide-react";

export type City = {
  name: string;
  events: number;
};

type CityGridProps = {
  cities: City[];
  onSelect?: (city: City) => void;
  className?: string;
};

export default function CityGrid({
  cities,
  onSelect,
  className = "",
}: CityGridProps) {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${className}`}
    >
      {cities.map((city) => (
        <button
          key={city.name}
          onClick={() => onSelect?.(city)}
          className="flex items-center gap-3 p-4 group"
        >
          <div className="bg-surface/20 group-hover:bg-primary/20 transition-colors p-3 rounded-md text-primary">
            <MapPin size={30} />
          </div>

          <div className="text-left">
            <p className="font-medium text-text">{city.name}</p>
            <p className="text-sm text-text/60">
              {city.events}+ Events
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
