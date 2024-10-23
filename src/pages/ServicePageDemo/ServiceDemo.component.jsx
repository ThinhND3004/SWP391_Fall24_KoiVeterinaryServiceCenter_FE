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
import api from '~/config/axios';
import HomeApi from '~/api/HomeApi';

const SerivceComponent = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    //Call API
    const fetchServices = async () => {
        const data = await HomeApi.getServices();
        console.log("DATA: ",data)
        if(data){
            setServices(data);
            setLoading(false);
        }

    };

    useEffect( () => {
        fetchServices();
        console.log("SERVICES",services)
    }, []);

    // Kiểm tra trạng thái loading và error
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box
            alignItems={'center'}
            display={'flex'}
            flexDirection={'column'}
            gap={'100px'}
            px={'30px'}
            paddingBottom={'20px'}
        >

            {/* Introduction */}
            <Introduction />
            {/* Duyệt qua danh sách dịch vụ và truyền vào các component tương ứng */}

            {/* {services.map((service, index) => {
                <ServiceNo1 service={service} key={index}/>
                        
            })} */}

            {/* Duyệt qua danh sách dịch vụ và truyền vào các component tương ứng */}
            {services.length > 0 && (
                <>
                    {services.map((service, index) => {
                        if (service.name === 'Online Consultant') {
                            return <ServiceNo1 service={service} key={index} />;
                        } else if (service.name === 'Koi Treatment at center') {
                            return <ServiceNo2_1 service={service} key={index} />;
                        } else if (service.name === 'Koi Treatment at home') {
                            return <ServiceNo2_2 service={service} key={index} />;
                        } else if (service.name === 'Pond Quality') {
                            return <ServiceNo3 service={service} key={index} />;
                        }
                        return null;
                    })}
                </>
            )}

                {/* {services.length > 0 && (
                        <>
                            <ServiceNo2_1 service={services.find(service => service.name === 'Koi Treatment at center')} />
                            <ServiceNo2_2 service={services.find(service => service.name === 'Koi Treatment at home')} />
                            <ServiceNo3 service={services.find(service => service.name === 'Pond Quality')} />
                        </>
                    )} */}
        </Box>
    );
};

export default SerivceComponent;
