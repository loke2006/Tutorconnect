import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icon for tutors
const tutorIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icon for searched location
const searchedLocationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapUpdaterProps {
  center: [number, number];
  zoom: number;
}

function MapUpdater({ center, zoom }: MapUpdaterProps) {
  const map = useMap();
  
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.5
    });
  }, [center, zoom, map]);
  
  return null;
}

const Map = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([12.9716, 77.5946]); // Bangalore
  const [mapZoom, setMapZoom] = useState(12);
  const [searchedMarker, setSearchedMarker] = useState<[number, number] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Sample tutor locations
  const tutorLocations = [
    { lat: 12.9716, lng: 77.5946, name: 'Dr. Rajesh Kumar', subjects: 'Math, Physics', experience: '10 years', rating: 4.8 },
    { lat: 12.9745, lng: 77.6088, name: 'Priya Sharma', subjects: 'English, Literature', experience: '8 years', rating: 4.9 },
    { lat: 12.9698, lng: 77.5855, name: 'Amit Patel', subjects: 'Chemistry, Biology', experience: '12 years', rating: 4.7 },
    { lat: 12.9627, lng: 77.6101, name: 'Sarah Johnson', subjects: 'Computer Science', experience: '5 years', rating: 5.0 },
    { lat: 12.9606, lng: 77.5771, name: 'Prof. Venkatesh', subjects: 'Economics', experience: '15 years', rating: 4.6 },
  ];

  const handleSearch = async () => {
    if (!searchLocation.trim()) {
      toast({
        title: "Please enter a location",
        description: "Enter a city, area, or address to search",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);

    try {
      // Use Nominatim API for geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchLocation)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        
        setMapCenter([lat, lon]);
        setMapZoom(14);
        setSearchedMarker([lat, lon]);
        
        toast({
          title: "Location found",
          description: `Showing tutors near ${data[0].display_name}`,
        });
      } else {
        toast({
          title: "Location not found",
          description: "Please try a different search term",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      {/* Search Box */}
      <div className="absolute top-4 left-4 z-[1000] bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-64"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            disabled={isSearching}
          />
          <Button size="icon" onClick={handleSearch} disabled={isSearching}>
            {isSearching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="w-full h-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={mapCenter} zoom={mapZoom} />
        
        {/* Tutor Markers */}
        {tutorLocations.map((tutor, index) => (
          <Marker
            key={index}
            position={[tutor.lat, tutor.lng]}
            icon={tutorIcon}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-base mb-1">{tutor.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{tutor.subjects}</p>
                <p className="text-xs text-muted-foreground mb-2">Experience: {tutor.experience}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs">⭐ {tutor.rating}</span>
                  <Button size="sm" className="h-7 text-xs">
                    View Profile
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Searched Location Marker */}
        {searchedMarker && (
          <Marker position={searchedMarker} icon={searchedLocationIcon}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">Searched Location</h3>
                <p className="text-sm text-muted-foreground">Tutors nearby</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;