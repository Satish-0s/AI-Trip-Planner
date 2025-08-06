import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  const days = trip?.tripData?.days;

  if (!Array.isArray(days)) {
    return <p className="text-red-500">No trip itinerary available.</p>;
  }

  return (
    <div className="space-y-8 mt-0"> {/* mt-0 removes top gap */}
      <h2 className="font-bold text-xl text-gray-800">📍 Places to Visit</h2>
      {days.map((dayItem, index) => (
        <div key={index}>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Day {dayItem.day}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.isArray(dayItem.itinerary) &&
              dayItem.itinerary.map((place, idx) => (
                <div key={idx}>
                  <span className="text-sm font-medium text-orange-600 block mb-1">
                    {place.time}
                  </span>
                  <PlaceCardItem place={place} />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlacesToVisit;
