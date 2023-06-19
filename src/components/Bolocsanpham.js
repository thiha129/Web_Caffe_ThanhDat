import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Box from '@material-ui/core/Box';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

const topsanpham = [
  { title: 'Cà phê đắng', year: 1994 },
  { title: 'Cà phê ngọt', year: 1972 },
  { title: 'Cà phê chồn', year: 1974 },
  { title: 'Ca cao', year: 2008 },


];
const labels = {
  1: '1s',
  2: '2s',
  3: '3s',
  4: '4s',
  5: '5s',
};


const useStyles = makeStyles((theme) => ({
  root2: {
    width: '70%',
    display: 'flex',
    alignItems: 'center',
  },
  root1: {
    '& > *': {
      margin: theme.spacing(1),
      width: '42%',
    },
  },
  root: {
    display: 'flex',
    width: '100%', maxWidth: 230,
  },
  paper: {
    width: '100%',
  },
  input: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
  button: {
    width: '70%',
    margin: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
  },
}));


export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [value, setValue] = React.useState(30);
  const [value1, setValue1] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);
  const [state, setState] = React.useState({
    gilad: false,
    jason: false,
    antoine: false,
    bon: false,
    nam: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });

    console.log('[gilad]', state.gilad);
    console.log('[jason]', state.jason);
    console.log('[antoine]', state.antoine);
    // if (event.target.checked == true) {
    //   const dataChecked = [];
    //   const cheked = [event.target.name];
    //   dataChecked.push.apply(dataChecked, cheked);
    //   console.log(dataChecked);
    //   return dataChecked
    // }
  };
  // state.filter(checkbox => this.state[checkbox]).forEach(checkbox => {
  //   console.log(checkbox, "is selected.");
  // });

  const { gilad, jason, antoine, bon, nam } = state;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <MenuList>
          <h3>Lọc sản phẩm</h3>
          <h5>Bạn muốn tìm</h5>
          <Autocomplete
            id="combo-box-demo"
            options={topsanpham}
            getOptionLabel={(option) => option.title}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Sản phẩm..." variant="outlined" color="secondary" />}
          />

          <h5>Theo danh mục</h5>
          <FormControl component="fieldset" className={classes.formControl}>
            <MenuItem>CA CAO</MenuItem>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
                label="gilad"
              />
              <FormControlLabel
                control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
                label="jason"
              />
              <FormControlLabel
                control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                label="antoine"
              />
            </FormGroup>
            <MenuItem>CÀ PHÊ</MenuItem>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={bon} onChange={handleChange} name="bon" />}
                label="bon"
              />
              <FormControlLabel
                control={<Checkbox checked={nam} onChange={handleChange} name="nam" />}
                label="nam "
              />
            </FormGroup>
          </FormControl>

          <h5>Theo giá</h5>
          <Grid container spacing={2} alignItems="center">
          </Grid>
          <form className={classes.root1} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Giá từ" />
            <TextField id="standard-basic" label="Cho đến" />
          </form>
          {/* <MenuItem>zxc</MenuItem> */}


          <div>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            // startIcon={<SearchIcon />}
            >
              Áp dụng
            </Button>

          </div>

        </MenuList>
      </Paper>





    </div>

  );
}

