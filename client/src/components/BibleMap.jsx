import React, { useState } from 'react';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import '../styles/BibleMap.css';

const BibleMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const biblicalLocations = [
    {
      name: 'Jerusalem',
      coordinates: [31.7683, 35.2137],
      description: 'The holy city and capital of ancient Israel',
      verses: ['Psalm 122:6', '2 Samuel 5:5'],
      category: 'cities',
      events: ['David made Jerusalem the capital', 'Solomon built the Temple']
    },
    {
      name: 'Bethlehem',
      coordinates: [31.7054, 35.2042],
      description: 'Birthplace of Jesus Christ',
      verses: ['Micah 5:2', 'Matthew 2:1'],
      category: 'cities',
      events: ['Birth of Jesus', 'Birth of King David']
    },
    {
      name: 'Mount Sinai',
      coordinates: [28.5391, 33.9752],
      description: 'Where Moses received the Ten Commandments',
      verses: ['Exodus 19:20', 'Exodus 20:1-17'],
      category: 'mountains',
      events: ['Giving of the Ten Commandments', 'The Burning Bush']
    },
    {
      name: 'Sea of Galilee',
      coordinates: [32.8233, 35.5822],
      description: 'Where Jesus performed many miracles',
      verses: ['Matthew 14:22-33', 'Mark 4:35-41'],
      category: 'waters',
      events: ['Jesus walks on water', 'Calming the storm']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Locations' },
    { id: 'cities', label: 'Cities' },
    { id: 'mountains', label: 'Mountains' },
    { id: 'waters', label: 'Waters' }
  ];

  const filteredLocations = activeCategory === 'all' 
    ? biblicalLocations 
    : biblicalLocations.filter(location => location.category === activeCategory);

  const customMarker = (color) => `
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C7.58 0 4 3.58 4 8c0 5.5 8 16 8 16s8-10.5 8-16c0-4.42-3.58-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="${color}"/>
    </svg>
  `;

  return (
    <div className="bible-map-container">
      <div className="map-controls">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="map-wrapper">
        <Map
          height={500}
          defaultCenter={[31.7683, 35.2137]}
          defaultZoom={7}
          attribution={false}
        >
          <ZoomControl />
          {filteredLocations.map((location, index) => (
            <Marker
              key={index}
              width={50}
              anchor={location.coordinates}
              onClick={() => setSelectedLocation(location)}
              color="#00c6ff"
            />
          ))}
        </Map>
        
        {selectedLocation && (
          <div className="location-info">
            <h3>{selectedLocation.name}</h3>
            <p>{selectedLocation.description}</p>
            <div className="location-details">
              <div className="verses-section">
                <h4>Related Verses</h4>
                <ul>
                  {selectedLocation.verses.map((verse, index) => (
                    <li key={index}>{verse}</li>
                  ))}
                </ul>
              </div>
              <div className="events-section">
                <h4>Key Events</h4>
                <ul>
                  {selectedLocation.events.map((event, index) => (
                    <li key={index}>{event}</li>
                  ))}
                </ul>
              </div>
            </div>
            <button 
              className="close-button"
              onClick={() => setSelectedLocation(null)}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BibleMap; 