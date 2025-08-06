import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { db } from '../../service/firebaseConfig.jsx'; // Adjust the path as needed to your firebase config
import InfoSection from "../components/infoSection.jsx";
//import Coordinates from "../components/Coordinates.jsx";
import Hotels from "../components/Hotels.jsx";
import PlacesToVisit from "../components/PlacesToVisit.jsx";
import Footer from "../components/Footer.jsx";


function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState({});

    useEffect(() => {
        tripId && GetTripData();
    }, [tripId]);

    const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTrip(docSnap.data());
    }else{
        console.log("No such document!");
        toast("No trip found with this ID");
    }
}
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56"> 
        {/*information section */}
        <InfoSection trip={trip} />

        {/*Hotels section */}
        <Hotels trip={trip} />

        {/*placesToVisit */}
        <PlacesToVisit trip ={trip} />
         
        {/* Footer */}
         <Footer trip ={trip} />
          
    </div>
  )
}

export default Viewtrip