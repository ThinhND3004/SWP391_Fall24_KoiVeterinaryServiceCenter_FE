/* eslint-disable indent */
import { Box } from '@mui/material'
import Introduction from './ServicePageDetails/Introduction'
import ServiceBlock from './ServicePageDetails/ServiceBlock'
import ServiceNo2 from './ServicePageDetails/ServiceNo2'
import ServiceNo3 from './ServicePageDetails/ServiceNo3'
import { useEffect, useState } from 'react'
import HomeApi from '~/api/HomeApi'
import ManagementApi from '~/api/ManagementApi'

const SerivceComponent = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    //Call API
    const fetchServices = async () => {
        const data = await HomeApi.getServices();
        console.log("DATA: ", data)
        if (data) {

            const serviceWithConvertedImg = await Promise.all(
                data.map(async service => {
                    service.serImageId = await ManagementApi.getImage(service.serImageId);
                    return service
                })
            )

            setServices(serviceWithConvertedImg);
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
    return (
        <div>
            <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'}>
                {/* Introduction */}
                <Introduction />
                {/* Service No.1 */}
                {services.map((service) => {
                    return <ServiceBlock service={service} key={service.id} />
                })}
                {/* Service No.2 */}
                <ServiceNo2 />
                {/* Service No.3 */}
                <ServiceNo3 />
            </Box>
        </div>
    )
}

export default SerivceComponent
