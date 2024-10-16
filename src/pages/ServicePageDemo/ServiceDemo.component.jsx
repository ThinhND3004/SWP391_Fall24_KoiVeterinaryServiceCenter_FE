/* eslint-disable indent */
// import { Box } from '@mui/material'
// import Introduction from './ServicePageDetails/Introduction'
// import ServiceNo1 from './ServicePageDetails/ServiceNo1'
// import ServiceNo2 from './ServicePageDetails/ServiceNo2'
// import ServiceNo3 from './ServicePageDetails/ServiceNo3'

// const SerivceComponent = () => {
//     return (
//         <div>
//             <Box alignItems={'center'} display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'}>
//                 {/* Introduction */}
//                 <Introduction />
//                 {/* Service No.1 */}
//                 <ServiceNo1 />
//                 {/* Service No.2 */}
//                 <ServiceNo2 />
//                 {/* Service No.3 */}
//                 <ServiceNo3 />
//             </Box>
//         </div>
//     )
// }

// export default SerivceComponent

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Introduction from './ServicePageDetails/Introduction'
import ServiceNo1 from './ServicePageDetails/ServiceNo1'
import ServiceNo2_1 from './ServicePageDetails/ServiceNo2_1'
import ServiceNo2_2 from './ServicePageDetails/ServiceNo2_2'
import ServiceNo3 from './ServicePageDetails/ServiceNo3'

const SerivceComponent = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Call API
    const fetchServices = async () => {
        try {
            const response = await fetch(`http://localhost:8080/services`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setServices(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    // Kiểm tra trạng thái loading và error
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Box 
            alignItems={'center'} 
            display={'flex'} 
            flexDirection={'column'} 
            gap={'100px'} 
            px={'30px'}>
                
                {/* Introduction */}
                <Introduction />
                {/* Duyệt qua danh sách dịch vụ và truyền vào các component tương ứng */}
                {services.length > 0 && (
                    <>
                        <ServiceNo1 service={services.find(service => service.name === 'Online Consultant')} />
                        <ServiceNo2_1 service={services.find(service => service.name === 'Koi Treatment at center')} />
                        <ServiceNo2_2 service={services.find(service => service.name === 'Koi Treatment at home')} />
                        <ServiceNo3 service={services.find(service => service.name === 'Pond Quality')} />
                    </>
                )}
            </Box>
        </div>
    );
};

export default SerivceComponent;
