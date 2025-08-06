import React from 'react';

function PlaceCardItem({ place }) {
  const { coordinates } = place || {};

  const mapLink =
    coordinates?.lat && coordinates?.lng
      ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
      : '#';

  return (
    <a
      href={mapLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:bg-gray-100 hover:scale-[1.02] transition-transform duration-200 ease-in-out cursor-pointer">
        <img
          src="/image.png"
          alt={place.place}
          className="w-[80px] h-[80px] rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base">{place.place}</h3>
          <p className="text-gray-500 text-sm">{place.description}</p>

          {coordinates?.lat && coordinates?.lng && (
            <p className="text-xs text-gray-400 mt-1">
              📍 {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}

export default PlaceCardItem;
