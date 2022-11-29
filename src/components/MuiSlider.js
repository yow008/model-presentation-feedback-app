/* referece: https://mui.com/material-ui/react-slider/ */
import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { AiOutlineQuestionCircle } from "react-icons/ai";

const Input = styled(MuiInput)`
  width: 42px;
`;

const marks1 = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 5,
      label: '5',
    },
  ];

  const marks2 = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 1,
      label: '1',
    },
  ];

export default function MuiSlider({param, val, handleValChange}) {
  const [value, setValue] = React.useState(val);
  const [willShowMore, showMore] = useState(new Array(6).fill(false)); // Set number of parameters.
  const [pIndex, setIndex] = useState(-1);

  useEffect(() => {
    if(param==="QED") {
      setIndex(0);
    }
    else if(param==="SA") {
      setIndex(1);
    }
    else if(param==="N") {
      setIndex(2);
    }
    else if(param==="O") {
      setIndex(3);
    }
    else if(param==="AutoDock affinity") {
      setIndex(4);
    }
    else if(param==="Hydrogen bonds") {
      setIndex(5);
    }
    else {
      setIndex(-1);
    }
  })

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    handleValChange(newValue);
  };

  const handleInputChange = (event) => {
    if (event.target.value === '') {
      setValue("");
    } else {
      setValue(Number(event.target.value));
      handleValChange(event.target.value);
    }
  };
  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 1) {
      setValue(1);
    }
  };

  function changeVisibility(ind) {
    const showMoreArr = willShowMore.map((value, index) => 
        index === ind ? !value : false
    );
    showMore(showMoreArr);
}

  return (
    <Box sx={{ width: 305, marginRight:2}}>
      <Grid container columnSpacing={2} rowSpacing={5} alignItems="">
        <Grid item sx={{ width: 130, height: 100}}>
          {willShowMore[0] ?
            <div className='all-tooltip'>Quantitative estimate of druglikeness</div>:""
          }
          {willShowMore[1] ?
            <div className='all-tooltip' style={{marginLeft:'45px'}}>Synthetic accessibility</div>:""
          }
          {willShowMore[2] ?
            <div className='all-tooltip'>Number of nitrogens</div>:""
          }
          {willShowMore[3] ?
            <div className='all-tooltip'>Number of oxygens</div>:""
          }
          {willShowMore[4] ?
            <div className='all-tooltip'>Binding affinity as predicted by AutoDock-GPU</div>:""
          }
          {willShowMore[5] ?
            <div className='all-tooltip' style={{width:'260px'}}>Ligand must have at least this number of hydrogen bonding interactions 
            with the protein.</div>:""
          }
          <span className='param'>{param}
          <AiOutlineQuestionCircle style={{color:'#999'}}
          onMouseEnter={()=>changeVisibility(pIndex)} onMouseLeave={()=>changeVisibility(pIndex)}/>
          </span>
        </Grid>
        <Grid item xs>
          { param==="Hydrogen bonds" ? 
            <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-label="Always visible"
            min={0}
            max={5}
            step={1}
            marks={marks1}
            valueLabelDisplay="auto"
            style={{color:"#00C6D7"}}
            />
            :
            <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-label="Always visible"
            min={0}
            max={1}
            step={0.1}
            marks={marks2}
            valueLabelDisplay="auto"
            style={{color:"#00C6D7"}}
            />
          }
        </Grid>
        {/* <Grid item>
          <Input
            value={value}
            size="medium"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 0.1,
              min: 0,
              max: 1,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid> */}
      </Grid>
    </Box>
  );
}
