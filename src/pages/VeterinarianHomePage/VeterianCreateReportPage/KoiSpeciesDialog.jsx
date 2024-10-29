/* eslint-disable indent */
/* eslint-disable semi */
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, styled, InputBase, alpha } from '@mui/material';
import { useEffect, useState } from "react";
import { BLUE_COLOR, GRAY_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme';
import SearchIcon from '@mui/icons-material/Search'
import ManagementApi from '~/api/ManagementApi';
import AddIcon from '@mui/icons-material/Add';
import { BlurLinear } from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: INPUT_FIELD_COLOR,
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
function KoiSpeciesDialog({ addKoiSpecies, onAddClick }) {
    const KoiSpeciesBlock = ({ koiSpecies }) => {
        const handleAdd = (event) => {
            console.log("HANDLE ADD ", koiSpecies);
            onAddClick(koiSpecies);
            setOpen(false);
        }
        return (
            <Box
                sx={{
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%'
                }}
            >
                {/* Picture on the left */}
                <Box
                    component="img"
                    src="https://cdn11.bigcommerce.com/s-upcqwyrrdy/product_images/uploaded_images/koi-closeup-front-view.jpg"
                    alt="Profile Picture"
                    sx={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '14px',
                        objectFit: 'cover',
                        marginRight: '30px'
                    }}
                />

                {/* Name and Info on the right */}
                <Box>
                    <Typography sx={{ fontWeight: 500, fontSize: 30, fontFamily: 'SVN-Konga Pro', color: BLUE_COLOR }}>
                        {koiSpecies.name}
                    </Typography>
                    <Typography sx={{ fontWeight: 400, fontSize: '17px', mt: 1 }}>
                        {koiSpecies.description || 'Empty description'}
                    </Typography>
                    <Button variant="contained"
                        onClick={handleAdd}
                        sx={{
                            // margin: '5px 0px',
                            backgroundColor: ORANGE_COLOR,
                            color: 'whitesmoke',
                            borderRadius: '14px',
                            mt: 1,
                            boxShadow: 'none',
                            width: '60px'
                        }}>
                        Add
                    </Button>
                </Box>
            </Box>
        );
    };


    const [open, setOpen] = useState(false);
    const [koiSpecies, setKoiSpecies] = useState([]);
    const [tempKoiSpecies, setTempKoiSpecies] = useState([]);

    const [searchValue, setSearchValue] = useState("");

    const handleClickOpen = async () => {
        const data = await ManagementApi.getKoiSpecies();
        const idExclude = addKoiSpecies.map((item) => item.id);
        const filterData = data.filter(item => !idExclude.includes(item.id));
        setKoiSpecies(filterData);
        setTempKoiSpecies(filterData);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSearching = (event) => {
        const searchValue = event.target.value || "";

        let returnData;
        if (searchValue === "") returnData = koiSpecies;
        else {
            returnData = koiSpecies.filter((item) => {
                console.log(item.name.toLowerCase().includes(searchValue.toLowerCase()))
                return item.name.toLowerCase().includes(searchValue.toLowerCase());
            });
        }

        setSearchValue(searchValue);
        setTempKoiSpecies(returnData.length > 0 ? returnData : []);
    }



    return (
        <Box>
            <Button variant="contained" sx={{ padding: '6px', minWidth: 'auto', boxShadow: 'none', bgcolor: BLUE_COLOR, borderRadius: '14px', color: '#fff', width: '150px', height: '40px' }}
                onClick={handleClickOpen}
            >
                {/* <AddIcon sx={{ fontSize: '14px' }} /> */}
                <Typography sx={{}}>
                    Select koi fish
                </Typography>
            </Button>

            <Dialog open={open}
                onClose={handleClose}
                aria-labelledby="booking-dialog-title"
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        width: '800px',
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
                    <Typography sx={{ fontWeight: 600, fontSize: 30, textAlign: 'center' }}>
                        Choose Koi Species
                    </Typography>
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
                        {tempKoiSpecies.length > 0 ?
                            tempKoiSpecies.map((item) => {
                                return <KoiSpeciesBlock koiSpecies={item} />
                            }) :
                            <Typography sx={{ color: ORANGE_COLOR, fontWeight: 500 }}>No data available</Typography>
                            // <div>No data available</div>
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

export default KoiSpeciesDialog;