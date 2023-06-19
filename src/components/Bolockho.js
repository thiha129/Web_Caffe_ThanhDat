import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Button from '@mui/material/Button';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { Link } from "react-router-dom";
import { Container, Grid, MenuItem } from '@mui/material';
import { InputLabel, lighten, Select } from '@material-ui/core';
export default function NestedList() {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (

        <Container maxWidth="sm" style={{
            border: '1px solid',
            borderColor: lighten('#000000', 0.9),
            borderRadius: 10,
            padding: 20
        }}>

            <Grid container spacing={3}>
                {/* <Grid item xs="auto">
                    <Box component="form"
                        style={{ width: 'max-content' }}
                        noValidate
                        autoComplete="off">
                        <TextField
                            id="standard-basic"
                            label="Tìm kiếm"
                            variant="standard"
                        />
                    </Box>
                </Grid> */}
                <Grid item xs="12">
                    <ListItemButton button component={Link} to="/donhang" style={{ width: '-webkit-fill-available', padding: '8px 16px' }}>
                        <ListItemText primary="Đơn hàng" />
                    </ListItemButton>
                    <ListItemButton button component={Link} to="/cuahang" style={{ width: '-webkit-fill-available', padding: '8px 16px' }}>
                        <ListItemText primary="Cửa hàng" />
                    </ListItemButton>
                    <ListItemButton button component={Link} to="/khotong" style={{ width: '-webkit-fill-available', padding: '8px 16px' }}>
                        <ListItemText primary="Kho" />
                    </ListItemButton>
                    <ListItemButton button component={Link} to="/khotong" style={{ width: '-webkit-fill-available', padding: '8px 16px' }}>
                        <ListItemText primary="Nhập/Xuất hàng" />
                    </ListItemButton>
                    {/* <ListItemButton button component={Link} to="/khothongke" style={{ width: '-webkit-fill-available', padding: '8px 16px' }}>
                        <ListItemIcon>
                            <InsertChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Doanh số" />
                    </ListItemButton> */}
                    {/* <ListItemButton onClick={handleClick} style={{ width: '-webkit-fill-available', padding: '8px 16px' }}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Loại SP" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton
                                style={{
                                    width: '-webkit-fill-available',
                                    margin: '0px 0px 0px 8px',
                                    padding: '8px 16px',
                                }}>
                                <FormControl component="fieldset" style={{ width: '-webkit-fill-available' }}>
                                    <RadioGroup
                                        defaultValue="1"
                                        name="radio-buttons-group"
                                        style={{ width: '-webkit-fill-available' }}
                                    >
                                        <FormControlLabel style={{ alignItems: 'center' }}
                                            value="1" control={<Radio style={{ padding: '10px 10px', color: 'rgba(0, 0, 0, 0.6)' }} />} label="Tất cả" />
                                        <FormControlLabel style={{ alignItems: 'center' }}
                                            value="2" control={<Radio style={{ padding: '10px 10px', color: 'rgba(0, 0, 0, 0.6)' }} />} label="Rang " />
                                        <FormControlLabel style={{ alignItems: 'center' }}
                                            value="3" control={<Radio style={{ padding: '10px 10px', color: 'rgba(0, 0, 0, 0.6)' }} />} label="Xay" />
                                        <FormControlLabel style={{ alignItems: 'center' }}
                                            value="4" control={<Radio style={{ padding: '10px 10px', color: 'rgba(0, 0, 0, 0.6)' }} />} label="Đóng hộp" />
                                    </RadioGroup>
                                </FormControl>
                            </ListItemButton>
                        </List>
                    </Collapse> */}
                </Grid>
                {/* <Grid item xs="12">
                    <Button variant="contained" disableElevation style={{
                        backgroundColor: '#1976d2',
                        padding: '6px 16px',
                        borderRadius: '4px',
                        color: 'white',
                        width: '-webkit-fill-available'
                    }}>
                        Xác nhận
                    </Button>
                </Grid> */}

            </Grid>
        </Container>


    );
}
