import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

interface LocationData {
  city: string;
  value: string;
  percentage: number;
  coordinates: [number, number]; // [longitude, latitude]
}

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const locationData: LocationData[] = [
  {
    city: "New York",
    value: "72K",
    percentage: 72,
    coordinates: [-74.006, 40.7128],
  },
  {
    city: "San Francisco",
    value: "39K",
    percentage: 39,
    coordinates: [-122.4194, 37.7749],
  },
  {
    city: "Sydney",
    value: "25K",
    percentage: 25,
    coordinates: [151.2093, -33.8688],
  },
  {
    city: "Singapore",
    value: "61K",
    percentage: 61,
    coordinates: [103.8198, 1.3521],
  },
];

export function RevenueByLocation() {
  const { theme } = useTheme();

  const mapFillColor = theme === "dark" ? "#374151" : "#b6c6db";
  const mapStrokeColor = theme === "dark" ? "#1F2937" : "#ffffff";
  const markerFillColor = theme === "dark" ? "#60A5FA" : "#000000";
  const markerStrokeColor = theme === "dark" ? "#3B82F6" : "#ffffff";
  const listTextColor = theme === "dark" ? "text-gray-200" : "text-slate-800";
  const progressBarBg = theme === "dark" ? "bg-gray-700" : "bg-slate-100";
  const progressBarFill = theme === "dark" ? "bg-blue-500" : "bg-blue-200";

  return (
    <div className="max-w-sm bg-slate-100 rounded-2xl p-6 font-sans dark:bg-gray-800">
      <h3 className="text-md font-semibold ">Revenue by Location</h3>

      {/* Map */}
      <div className="relative h-48 mb-1 -mt-7">
        <ComposableMap
          projectionConfig={{ scale: 100 }}
          width={400}
          height={200}
          className="w-full h-full"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  className="outline-none"
                  style={{
                    default: {
                      fill: mapFillColor,
                      stroke: mapStrokeColor,
                      strokeWidth: 0.5,
                    },
                    hover: { fill: theme === "dark" ? "#4B5563" : "#cbd5e1" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Markers */}
          {locationData.map((loc) => (
            <Marker key={loc.city} coordinates={loc.coordinates}>
              <circle
                r={5}
                fill={markerFillColor}
                stroke={markerStrokeColor}
                strokeWidth={2}
              />
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* List with bars */}
      <div className="space-y-1">
        {locationData.map((loc) => (
          <div key={loc.city}>
            <div className="flex items-center justify-between mb-2">
              <span className={cn("text-sm font-medium", listTextColor)}>
                {loc.city}
              </span>
              <span className={cn("text-sm font-semibold", listTextColor)}>
                {loc.value}
              </span>
            </div>
            <div
              className={cn(
                "w-full h-1.5 rounded overflow-hidden",
                progressBarBg
              )}
            >
              <div
                className={cn("h-1 rounded", progressBarFill)}
                style={{ width: `${loc.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
