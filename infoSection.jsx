import { useEffect } from "react";
import Button from "../../components/ui/Button";
import { FaShareSquare } from "react-icons/fa";
import { GetPlaceDetails } from "../../service/GlobalApi";
function InfoSection({ trip }) {
  
useEffect(() => {
  if (trip?.userSelection?.location?.label) {
    getPlacePhoto();
  }
}, [trip]);

const getPlacePhoto = async () => {
  try {
    const locationLabel = trip?.userSelection?.location?.label;

    if (!locationLabel) {
      console.warn("No location label found in trip data.");
      return;
    }

    const data = {
      textQuery: locationLabel,
    };

    const response = await GetPlaceDetails(data);
    console.log(response.data); // You can update state here if needed
  } catch (error) {
    console.error("Failed to fetch place photo:", error);
  }
};

  return (
    <div>
      <img src="/image.png" className="h-[340px] w-full object-cover rounded-xl" />
      <div className="flex justify-between items-center">
        <div className="my-5 flex-col gap-3">
        <h2 className="font-bold text-2xl">
             {trip?.userSelection?.location?.label || trip?.userSelection?.location || "Unknown Location"}
        </h2>
        <div className="my-2.5 flex gap-5">
            <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md lg:text-lg">🗓️{trip?.userSelection?.days} Days</span>
            <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md lg:text-lg">💰{trip?.userSelection?.budget } Budget</span>
            <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md lg:text-lg">🧑🏻‍🤝‍🧑🏻No.Of travelers: {trip?.userSelection?.travelCompanions}</span>
        </div>
        </div>
        <Button><FaShareSquare /></Button>
      </div>
    </div>
  );
} 

export default InfoSection;

