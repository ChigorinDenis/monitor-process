import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const valueToName = {
  ADMIN: 'админ',
  CONSTRUCTOR: 'главный конструктор',
  MANAGER: 'руководитель',
  ENGINEER: 'инженер',
};



export default function MultipleSelectChip({ item, setItem, data }) {
 
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setItem(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="multiple-chip-label">Роли</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={item}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Роли" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={valueToName[value]} variant='outlined'/>
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.map(({id, name}) => (
            <MenuItem
              key={`${id}${name}`}
              value={name}
            >
              {valueToName[name]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
