import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      zoom: 12,
      center: [77.5946, 12.9716], // Bangalore as default
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add sample tutor markers
    const tutorLocations = [
      { lng: 77.5946, lat: 12.9716, name: 'Dr. Rajesh Kumar', subjects: 'Math, Physics' },
      { lng: 77.6088, lat: 12.9745, name: 'Priya Sharma', subjects: 'English, Literature' },
      { lng: 77.5855, lat: 12.9698, name: 'Amit Patel', subjects: 'Chemistry, Biology' },
      { lng: 77.6101, lat: 12.9627, name: 'Sarah Johnson', subjects: 'Computer Science' },
      { lng: 77.5771, lat: 12.9606, name: 'Prof. Venkatesh', subjects: 'Economics' },
    ];

    tutorLocations.forEach((tutor) => {
      const marker = new mapboxgl.Marker({
        color: 'hsl(var(--primary))',
      })
        .setLngLat([tutor.lng, tutor.lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <div class="p-2">
              <h3 class="font-bold">${tutor.name}</h3>
              <p class="text-sm">${tutor.subjects}</p>
              <button class="mt-2 text-sm bg-primary text-white px-2 py-1 rounded">View Profile</button>
            </div>
          `)
        )
        .addTo(map.current!);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  const handleSearch = async () => {
    if (!searchLocation || !map.current) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchLocation
        )}.json?access_token=${mapboxToken}`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        map.current.flyTo({
          center: [lng, lat],
          zoom: 14,
          essential: true,
        });
        
        // Add marker for searched location
        new mapboxgl.Marker({
          color: 'hsl(var(--secondary))',
        })
          .setLngLat([lng, lat])
          .addTo(map.current);
          
        toast({
          title: "Location found",
          description: `Showing tutors near ${searchLocation}`,
        });
      }
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Please try again with a different location",
        variant: "destructive",
      });
    }
  };

  if (!mapboxToken) {
    return (
      <div className="p-6 bg-muted/30 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Enable Map View</h3>
        <p className="text-sm text-muted-foreground mb-4">
          To view tutors on map, please enter your Mapbox public token. 
          Get it from <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
        </p>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter Mapbox public token"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="max-w-md"
          />
          <Button onClick={() => mapboxToken && toast({ title: "Token saved" })}>
            Save Token
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      <div className="absolute top-4 left-4 z-10 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-64"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button size="icon" onClick={handleSearch}>
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;