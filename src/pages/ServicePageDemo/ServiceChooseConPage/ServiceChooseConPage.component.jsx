import { Box } from '@mui/material'
import Introduction from './Introduction'
import SerivceChooseCon from './ServiceChooseConPageDetail'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '~/config/axios';
import { set } from 'date-fns';

const ServiceChooseConPageComponent = () => {
    // const location = useLocation(); // Nhận dữ liệu từ state
    // const { service } = location.state || {};
    // console.log("SERVICE STATE: ", service)
    const [vets, setVets] = useState([]);

    const handleGetVet = async () => {
        const serviceId = localStorage.getItem("serviceId");
        console.log("Service id: ", serviceId);

        // Ensure serviceId is defined before proceeding
        if (!serviceId) {
            console.error("No serviceId found in localStorage.");
            return; // Early return if no serviceId
        }

        try {
            const response = await api.get(`/accounts/veterian-with-time-slot/${serviceId}`);
            console.log("RESPONSE GET VET TO CHOOSE: ", response.data.data);

            // Check if the response data is an array before setting the state
            if (Array.isArray(response.data.data)) {
                setVets(response.data.data);
            } else {
                console.error("Expected an array from response, but got:", response.data.data);
                setVets([]); // Set to an empty array if data is not valid
            }

        } catch (err) {
            console.log("ERROR GET VET: ", err);
        }
    };

    // Optional: useEffect to log the updated state
    useEffect(() => {
        console.log('AFTER SET VETS: ', vets);
    }, [vets]); // Log when vets state updates


    useEffect(() => {
        handleGetVet();
    }, [])

    return (
        <div>
            <Box alignItems={'center'} display={'flex'} flexDirection={'column'} gap={'10px'} px={'30px'}>
                {/* Introduction */}
                <Introduction />

                {vets.length > 0 ? (
                    vets.map((vet) => (
                        <SerivceChooseCon key={vet.id} vet={vet} />
                    ))
                ) : (
                    <p>No veterinarians available</p> // Fallback if no vets are available
                )}




            </Box>
        </div>
    )
}

export default ServiceChooseConPageComponent