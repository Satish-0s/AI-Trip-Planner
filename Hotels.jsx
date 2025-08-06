import React from 'react';

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
        {trip?.tripData?.hotels?.map((hotel, index) => {
          const mapLink = hotel.coordinates
            ? `https://www.google.com/maps?q=${hotel.coordinates.lat},${hotel.coordinates.lng}`
            : '#';

          return (
            <a
              key={index}
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="bg-white rounded-xl shadow p-3 transition-transform transform hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                <img
                  src={hotel.image || "/image.png"}
                  alt={hotel.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/image.png";
                  }}
                  className="rounded-xl w-full h-40 object-cover"
                />

                <div className="my-2 flex flex-col gap-2">
                  <h2 className="font-medium">{hotel.name}</h2>
                  <p className="text-sm">{hotel.description}</p>
                  <p className="text-sm">{hotel.pricePerNight}</p>

                  {hotel.coordinates && (
                    <p className="text-xs text-gray-500">
                      📍 {hotel.coordinates.lat.toFixed(4)}, {hotel.coordinates.lng.toFixed(4)}
                    </p>
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
