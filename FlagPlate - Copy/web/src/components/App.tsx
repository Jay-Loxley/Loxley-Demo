import React, {useState, createRef} from 'react';
import './App.css'
import {useNuiEvent} from "../hooks/useNuiEvent";
import {debugData} from "../utils/debugData";
import {fetchNui} from "../utils/fetchNui";
import {useExitListener} from "../hooks/useExitListener";
// Button Shit
import { createTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple, red, blue } from '@material-ui/core/colors';
// Accordion Shit
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Dialog shit
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';;
const { v4: uuidv4 } = require('uuid')

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: 'setData',
    data: true,
  }
])

const ColorButtonSubmmit = withStyles((theme) => ({
	root: {
	  color: theme.palette.getContrastText(purple[500]),
	  backgroundColor: green[500],
	  '&:hover': {
		backgroundColor: green[700],
	  },
	},
  })
)(Button);

const ColorButtonCreate = withStyles((theme) => ({
	root: {
	  color: theme.palette.getContrastText(purple[500]),
	  backgroundColor: blue[500],
	  '&:hover': {
		backgroundColor: blue[700],
	  },
	},
  })
)(Button);

const theme = createTheme({
	palette: {
	  type: 'dark',
	},
});

const ColorButtonRemove = withStyles((theme) => ({
	root: {
	  color: theme.palette.getContrastText(purple[500]),
	  backgroundColor: red[700],
	  '&:hover': {
		backgroundColor: red[800],
	  },
	},
  })
)(Button);
var vehicleToRemove : number 

const App: React.FC = () => {
  // const exampleID = uuidv4()
	
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("Unknown");
	const [openRemove, setOpenRemove] = useState(false);
  const [exampleID, setexampleID] = useState(uuidv4());

  const initalVehicles = [
		{
			id: exampleID,
			Model: "Sultan",
			Plate: "3XAMPL3",
			Owner: "Example",
			By: "Example",
			Reason: '1x Kidnapping & 1x Robbery of Paffic Bank',
		}]
  const [vehicles, setVehicles] = useState(initalVehicles)

	let mRef:any = createRef();
	let vpRef:any  = createRef();
	let oRef:any  = createRef();
	let rRef:any  = createRef();
	
	function HandleRemove(id: number){
		if(id === exampleID) {
			return console.log("You can't remove the example")
		}
		vehicleToRemove = id
		setOpenRemove(true)
	}

	function RemoveVehicle(){
		setOpenRemove(false)
		const newVehicles = vehicles.filter((vehicle) => vehicle.id !== vehicleToRemove);
		setVehicles(newVehicles);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://FlagPlate/vehicleAdded", true);                                                                                                                                                                                                                                                                                                                                      
    xhr.send(JSON.stringify(newVehicles));
	}

	const openDialog = () => {
	  setOpen(true);
	};
  
	const closeDialog = () => {
	  setOpen(false);
	};
  
	const closeDialogRemove = () => {
	  setOpenRemove(false);
	};

	type Flag = {
		id: number;
		Model: any;
		Plate: any;
		Owner: any;
		Reason: any;
		By: any;
	}
  var sent = false;
	const AddPlate = () => {
		setOpen(false);
		const data:Flag = {
			id: uuidv4(),
			Model: mRef.current.value,
			Plate: vpRef.current.value,
			Owner: oRef.current.value,
			Reason: rRef.current.value,
      By: name
		}
    if (data.Reason && data.Owner && data.Plate && data.Model && sent != true){
      vehicles.push(data);
      sent = true
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://FlagPlate/vehicleAdded", true);                                                                                                                                                                                                                                                                                                                                      
      xhr.send(JSON.stringify(data));
      setTimeout(function(){ 
        sent = false
      }, 2000);
    }
	};

  const [isVisible, setIsVisible] = useState(false)
  const [data, setData] = useState(false)

  useExitListener(setIsVisible)

  useNuiEvent<any>('setData', (data) => {
    if (data.show){
      const vehlist = initalVehicles
      for (var i = 0; i < Object.keys(data.vehicles).length; i++) {
        const vehdata:Flag = {
          id: uuidv4(),
          Model: data.vehicles[i]["Model"],
          Plate: data.vehicles[i]["Plate"],
          Owner: data.vehicles[i]["Owner"],
          Reason: data.vehicles[i]["Reason"],
          By: data.vehicles[i]["By"],
        }
        vehlist.push(vehdata);
        setVehicles(vehlist)
      }
    setName(data.name)
    }
    // This is our handler for the setVisible and SetVehicle action.
    setIsVisible(data.show)
  })

  return (
    <ThemeProvider theme={theme}>
      <div className = "Main" style = {{ visibility: isVisible ? 'visible' : 'hidden' }}>
        <h1> Flagged Vehicle List</h1>
        <ColorButtonCreate variant="contained" color="primary" id="create" onClick={openDialog}>Flag Plate</ColorButtonCreate>
        <div className = "LineBreakOne"></div>
        <img src="https://i.imgur.com/k2TXjZ7.png" alt="" id="badge"/>
        <div className = "Accordion-Container">
        {vehicles.map((vehicle, index) =>(
          <Accordion id = "Accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            <Typography className='AccordionText'>Model: {vehicle.Model} Plate: {vehicle.Plate} Owner: {vehicle.Owner} </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <ColorButtonRemove variant="contained" color="primary" id="remove" onClick={() => HandleRemove(vehicle.id)}>Remove</ColorButtonRemove>
            <Typography id = "Reason">{vehicle.Reason} - {vehicle.By}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        </div>
        <Dialog open={open} onClose={closeDialog} aria-labelledby="DialogMenu" >
        <DialogTitle>Flag Vehicle Plate</DialogTitle>
        <DialogContent>
        <DialogContentText>
          Please enter details of the vehicle you wish to flag
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="vehicleModel"
          label="Vehicle Model"
          inputRef={mRef}
        />
        <TextField
          margin="dense"
          id="VehiclePlate"
          label="Vehicle Plate"
          inputRef={vpRef}
        />
          <TextField
          margin="dense"
          id="VehicleOwner"
          label="Vehicle Owner"
          inputRef={oRef}
        />
        <TextField
          margin="dense"
          id="ReasonInput"
          label="Reason"
          fullWidth
          inputRef={rRef}
        />
        </DialogContent>
        <DialogActions>
        <ColorButtonRemove variant="contained" color="primary" id="Cancel" onClick={closeDialog}>Cancel</ColorButtonRemove>
        <ColorButtonSubmmit variant="contained" color="primary" id="AddPlate" onClick={AddPlate}>Add Plate</ColorButtonSubmmit>
          
        </DialogActions>
        </Dialog>
        <Dialog open={openRemove} onClose={closeDialogRemove} aria-labelledby="alert-dialog-title" >
        <DialogTitle id="aert-dialog-tlitle">{"Are you sure you wish to remove this vehicle"}</DialogTitle>
          <DialogActions>
            <ColorButtonRemove variant="contained" color="primary" id="No" onClick={closeDialogRemove}>No</ColorButtonRemove>
            <ColorButtonSubmmit variant="contained" color="primary" id="Yes" onClick={RemoveVehicle}>Submit</ColorButtonSubmmit>
          </DialogActions>
      </Dialog>
        {/* <ColorButtonSubmmit variant="contained" color="primary" id="submit" onClick={clickEvent}>Submit</ColorButtonSubmmit> */}
        {/* <ColorButtonRemove variant="contained" color="primary" id="remove" onClick={clickEvent}>Remove</ColorButtonRemove> */}
      </div>
    </ThemeProvider>
  );


  
}

export default App;
