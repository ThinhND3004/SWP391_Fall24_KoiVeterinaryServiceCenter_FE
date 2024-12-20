import { Box, Typography } from '@mui/material'
import Introduction from './PondInspectDetail/Introduction'
import Content from './PondInspectDetail/Content'
import ChooseOption from './PondInspectDetail/ChooseOption'
import { useLocation } from 'react-router-dom';

const PondInspectComponent = () => {
  const location = useLocation(); // Nhận dữ liệu từ state
  const { service, serviceAddress } = location.state || {};
  console.log(service)

  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'}>

        {/* INTRODUCTION */}
        <Introduction service={service} serviceAddress={serviceAddress}/>
        {/* CONTENT  */}
        <Content service={service} />
        {/* CHOOSE OPTION  */}
        <ChooseOption service={service} serviceAddress={serviceAddress} />
      </Box>
    </div>
  )
}

export default PondInspectComponent