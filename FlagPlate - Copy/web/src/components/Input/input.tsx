import React, {useState} from 'react';
import './Slider.css'
import {useNuiEvent} from "../../hooks/useNuiEvent";
import {debugData} from "../../utils/debugData";
import {fetchNui} from "../../utils/fetchNui";
import {useExitListener} from "../../hooks/useExitListener";
// Theme
import { createTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';

type Flag = {
  curValue: number;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  label: string;
}

// This will set the NUI to visible if we are developing in browser
debugData([
  {
    action: 'setDataI',
    data: true,
  }
])

const theme = createTheme({
	palette: {
	  type: 'dark',
	},
});

const Slider: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const testData = [
		{
      curValue: 5,
			min: 1,
			max: 20,
			step: 4,
			defaultValue: 2,
      label: true
		},
		{
			min: 1,
			max: 10,
			step: 2,
			defaultValue: 2,
		},
		{
			min: 1,
			max: 10,
			step: 2,
			defaultValue: 2,
		}
  ]
  const [sliderData, setSliderData] = useState(testData)
  // setSliderData(testData)
  const [vehicles, setVehicles] = useState(testData)

  useExitListener(setIsVisible)

  useNuiEvent<any>('setDataI', (data) => {
    setIsVisible(data);
    if (data.show){
        setIsVisible(data.show);
      }
    }
    // This is our handler for the setVisible and SetVehicle action.
  )
  return (
    <ThemeProvider theme={theme}>
      <div className = "container" style = {{ visibility: isVisible ? 'visible' : 'hidden' }}>

      </div>
    </ThemeProvider>
  );
}

export default Slider;
