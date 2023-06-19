import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Button from '@mui/material/Button';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { Link } from "react-router-dom";

export default function NestedList() {
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };

    const [open1, setOpen1] = React.useState(true);
    const handleClick1 = () => {
        setOpen1(!open1);
    };

    const listsanpham = [
        { title: 'Cà phê đắng', year: 1994 },
        { title: 'Cà phê ngọt', year: 1972 },
        { title: 'Cà phê chồn', year: 1974 },
        { title: 'Ca cao', year: 2008 },
    ];

    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const { gilad, jason, antoine } = state;
    const error = [gilad, jason, antoine].filter((v) => v).length !== 2;


    return (
        <List
            sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    <h5>Kho sản phẩm</h5>
                </ListSubheader>
            }
        >
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={listsanpham}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Tìm kiếm" />}
            />
            <ListItemButton button component={Link} to="/khotong">
                <ListItemIcon>
                    <LocalAtmIcon />
                </ListItemIcon>
                <ListItemText primary="Bán hàng" />
            </ListItemButton>
            <ListItemButton button component={Link} to="/khothongke">
                <ListItemIcon>
                    <InsertChartIcon />
                </ListItemIcon>
                <ListItemText primary="Thống kê" />
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Loại hàng" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton sx={{ pl: 4 }}>
                        <RadioGroup
                            aria-label="gender"
                            defaultValue="1"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Tất cả" />
                            <FormControlLabel value="2" control={<Radio />} label="Rang " />
                            <FormControlLabel value="3" control={<Radio />} label="Xay" />
                            <FormControlLabel value="4" control={<Radio />} label="Đóng hộp" />
                        </RadioGroup>
                    </ListItemButton>


                </List>
            </Collapse>

            <ListItemButton onClick={handleClick1}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Tồn kho" />
                {open1 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="gender"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Tất cả" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                    </ListItemButton>
                </List>
            </Collapse>
            <Button variant="contained" disableElevation sx={{ width: '100%', }}>
                Xác nhận
            </Button>
        </List >
    );
}
