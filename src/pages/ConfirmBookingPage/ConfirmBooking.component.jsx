import { Box } from "@mui/material";
import ConfirmBookingDetails from "./ConfirmBookingDetails/ConfirmBookingDetails";
import PaymentResult from "./PaymentResult/PaymentResult";
// import { cwd } from "process";

const ConfirmBookingComponent = () => {
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'}>
        {/* DETAILS */}
        <ConfirmBookingDetails/>
      </Box>
    </div>
  );
};

export default ConfirmBookingComponent;
