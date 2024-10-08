import { Box } from '@mui/material'
import Introduction from './Introduction'
import SerivceChooseCon from './ServiceChooseConPageDetail'

const ServiceChooseConPageComponent = () => {
    return (
        <div>
            <Box alignItems={'center'} display={'flex'} flexDirection={'column'} gap={'10px'} px={'30px'}>
                {/* Introduction */}
                <Introduction />

                <SerivceChooseCon />
                <SerivceChooseCon />
                <SerivceChooseCon />
                <SerivceChooseCon />
                <SerivceChooseCon />

                
            </Box>
        </div>
    )
}

export default ServiceChooseConPageComponent