import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, styled, InputBase, alpha } from '@mui/material';
import { useEffect, useState } from "react";
import { BLUE_COLOR, GRAY_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme';
import SearchIcon from '@mui/icons-material/Search'
import ManagementApi from '~/api/ManagementApi';
import AddIcon from '@mui/icons-material/Add';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: INPUT_FIELD_COLOR
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
    }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    }
}))


function PrescriptionsDialog({ addMedicines, handleMedicineAdd }) {
    const MedicineBlock = ({ medicine }) => {
        const handleAdd = () => {
            handleMedicineAdd(medicine);
            setOpen(false);
        }
        return (
            <Box
                sx={{
                    // border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: '600px',
                    margin: '0 auto',
                }}
            >
                {/* Name and Info on the right */}
                <Box>
                    <Box>
                        <Typography variant="h5" component="h2">
                            {medicine.name}
                        </Typography>
                        <Typography>
                            Manufacturer: <span>{medicine.manufacturer}</span>
                        </Typography>
                        <Typography>
                            Price: <span>{medicine.price.toLocaleString()}</span> VND
                        </Typography>
                    </Box>

                    <Typography variant="body1" color="textSecondary">
                        {medicine.description || 'Empty description'}
                    </Typography>
                    <Button variant="contained"
                        onClick={handleAdd}
                        sx={{
                            margin: '5px 0px',
                            backgroundColor: ORANGE_COLOR,
                            color: 'whitesmoke',
                            borderRadius: '10px',
                            boxShadow: 'none'
                        }}>
                        Add
                    </Button>
                </Box>
            </Box>
        );
    };


    const [open, setOpen] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [tempMedicines, setTempMedicines] = useState([]);

    const [searchValue, setSearchValue] = useState("");

    const handleClickOpen = async () => {
        const data = await ManagementApi.getMedicine();
        const idExclude = addMedicines.map((item) => item.id);
        const filterData = data.filter(item => !idExclude.includes(item.id));
        setMedicines(filterData);
        setTempMedicines(filterData);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSearching = (event) => {
        const searchValue = event.target.value || "";

        let returnData;
        if (searchValue === "") returnData = medicines;
        else {
            returnData = medicines.filter((item) => {
                return item.name.toLowerCase().includes(searchValue.toLowerCase());
            });
        }

        setSearchValue(searchValue);
        setTempMedicines(returnData.length > 0 ? returnData : []);
    }



    return (
        <Box>
            <Button variant="contained" sx={{ padding: '6px', minWidth: 'auto', boxShadow: 'none', bgcolor: BLUE_COLOR, borderRadius: '10px', color: '#fff', width: '150px', height: '40px' }}
                onClick={handleClickOpen}
            >
                <Typography>Add Medicine</Typography>
                {/* <AddIcon sx={{ fontSize: '14px' }} /> */}
            </Button>

            <Dialog open={open}
                onClose={handleClose}
                aria-labelledby="booking-dialog-title"
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        width: '700px',
                        maxWidth: '90%',
                        bgcolor: INPUT_FIELD_COLOR,
                        borderRadius: '30px'
                    }
                }}
            >
                <DialogTitle sx={{
                    marginTop: 4,
                    mb: 2
                }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 30, textAlign: 'center' }}>Choose Medicine</Typography>
                </DialogTitle>

                <DialogContent >
                    <Search sx={{
                        borderRadius: '14px',
                        bgcolor: INPUT_FIELD_COLOR,
                        border: `1px solid ${GRAY_COLOR}`,
                        height: '50px',
                        display: 'flex',
                        mb: 2
                    }}>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: GRAY_COLOR, fontSize: '16px' }} />
                        </SearchIconWrapper>
                        <StyledInputBase sx={{ fontSize: '16px' }}
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleSearching}
                        />
                    </Search>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {tempMedicines.length > 0 ?
                            tempMedicines.map((item) => {
                                return <MedicineBlock medicine={item} />
                            }) :
                            <Typography sx={{ color: ORANGE_COLOR, fontWeight: 500 }}>No data available</Typography>
                        }
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} sx={{ bgcolor: BLUE_COLOR, borderRadius: '14px', color: 'white', width: '100px', height: '40px', mr: 6, mb: 3 }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog >
        </Box >
    )
}

export default PrescriptionsDialog;