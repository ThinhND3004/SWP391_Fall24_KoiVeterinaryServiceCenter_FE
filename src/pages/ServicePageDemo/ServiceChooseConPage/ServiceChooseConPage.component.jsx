import { Box } from '@mui/material'
import Introduction from './Introduction'
import SerivceChooseCon from './serviceChooseConPageDetail'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '~/config/axios';
import { set } from 'date-fns';

const ServiceChooseConPageComponent = () => {
    // const location = useLocation(); // Nhận dữ liệu từ state
    // const { service } = location.state || {};
    // console.log("SERVICE STATE: ", service)
    const [veterians, setVeterians] = useState([]);

    const handleGetVet = async () => {
        const serviceId = localStorage.getItem("serviceId");
        try {
            const response = await api.get(`/accounts/veterian-with-time-slot/${serviceId}`);
            if (response.data && Array.isArray(response.data.data)) {
                setVeterians(response.data.data); // Đảm bảo dữ liệu trả về là mảng
            } else {
                console.log("Unexpected data format: ", response.data);
            }
        } catch (err) {
            console.log("ERROR GET VET: ", err);
        }
    };
    // Optional: useEffect to log the updated state
    useEffect(() => {
        console.log('AFTER SET VETS: ', veterians);
    }, [veterians]); // Log when vets state updates


    useEffect(() => {
        handleGetVet();
    }, [])

    return (
        <div>
            <Box alignItems={'center'} display={'flex'} flexDirection={'column'} gap={'10px'} px={'30px'}>
                {/* Introduction */}
                <Introduction />


                {veterians.length > 0 ? (
                    veterians.map((veterian) => (
                        <SerivceChooseCon key={veterian.email} veterian={veterian} />
                    ))
                ) : (
                    <p>No veterinarians available</p> // Fallback if no vets are available
                )}

            </Box>
        </div>
    )
}

export default ServiceChooseConPageComponent