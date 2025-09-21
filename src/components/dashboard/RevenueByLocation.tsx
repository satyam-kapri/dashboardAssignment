import { MapPin } from 'lucide-react';

interface LocationData {
  city: string;
  value: string;
  percentage?: number;
}

const locationData: LocationData[] = [
  { city: 'New York', value: '72K' },
  { city: 'San Francisco', value: '39K' },
  { city: 'Sydney', value: '25K' },
  { city: 'Singapore', value: '61K' },
];

export function RevenueByLocation() {
  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Revenue by Location</h3>
      </div>

      <div className="space-y-4 mb-6">
        {/* World Map Placeholder */}
        <div className="relative h-48 bg-muted/20 rounded-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">World Map</p>
            <p className="text-xs">Revenue Distribution</p>
          </div>
          
          {/* Location markers */}
          <div className="absolute top-4 left-8 w-2 h-2 bg-primary rounded-full animate-pulse" />
          <div className="absolute top-8 right-12 w-2 h-2 bg-chart-3 rounded-full animate-pulse" />
          <div className="absolute bottom-8 left-16 w-2 h-2 bg-chart-4 rounded-full animate-pulse" />
          <div className="absolute bottom-4 right-8 w-2 h-2 bg-chart-5 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="space-y-3">
        {locationData.map((location, index) => (
          <div key={location.city} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                index === 0 ? 'bg-primary' :
                index === 1 ? 'bg-chart-3' :
                index === 2 ? 'bg-chart-4' : 'bg-chart-5'
              }`} />
              <span className="text-sm font-medium">{location.city}</span>
            </div>
            <span className="text-sm font-semibold">{location.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}