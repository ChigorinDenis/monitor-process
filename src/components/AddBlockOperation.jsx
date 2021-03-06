import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import AttachmentIcon from '@mui/icons-material/Attachment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import apiRoutes from '../routes';
import { addBlock } from '../reducers/blockReducer';
import { updateFieldBlocks } from '../reducers/operationReducer'

function AddBlockOperation(props) {
  const dispatch = useDispatch()
  const { blocks } = useSelector(state => state.blocks);
  const { checkOperations } = useSelector(state => state.ui);
  const { onClose, open } = props;
  const [idBlock, setIdBlock] = React.useState('');
  const [mode, setMode] = React.useState(false);
  const handleChange = (event) => {
    setIdBlock(event.target.value);
  };

  const handleClose = () => {
    onClose();
  };

  const handleSubmit  = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const blockData = {
      name: data.get('name'),
      description: data.get('description'),
    };
    const blockOperations = {
      idBlock,
      idOperations: checkOperations.map((id) => ({ id })),
    }
    
    const url = mode ? apiRoutes('addNewBlock') : apiRoutes('addNewBlockOperations');
    const postData = mode ? blockData: blockOperations;
    try {
      const response = await axios.post(url, postData);
      mode ? dispatch(addBlock(postData)) : dispatch(updateFieldBlocks({
        block:
          {
            id: idBlock,
            ...blocks.find((block) => block.id === idBlock)
          },
        idOperations: checkOperations,
      }));
      alert('???????? ?????????????? ????????????????')
    } catch (err) {
      alert(err);
    }
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{mode ? '???????????????? ????????' : '???????????????? ???? ??????????'}</DialogTitle>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ pl: 2, pr:2, pb:2 }}> 
              <FormControlLabel
                control={
                  <Switch  color='info'/>
                }
                label="?????????? ????????"
                onChange={() => setMode(!mode)}
                sx={{mb: 2}}
              />
            {!mode ? (
                <FormControl fullWidth>
                  <InputLabel id="add-block-select-label">????????</InputLabel>
                  <Select
                    labelId="add-block-select-label"
                    id="add-block-select"
                    value={idBlock}
                    label="????????"
                    onChange={handleChange}
                  >
                    {blocks.map((block) => {
                      const { id, name } = block;
                      return (
                        <MenuItem value={id} key={id}>{name}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              ) :(
              <>
                <Grid item xs={12} sx={{mb: 3}}>
                  <TextField
                    required
                    fullWidth
                    label="????????????????"
                    name="name"
                    defaultValue={'????????'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    maxRows={4}
                    minRows={2}
                    defaultValue={'???????????????? ??  ??????????'}
                    label="????????????????"
                    name="description"
                  />
                </Grid>
              </>
              )}
            <Button
              type="submit"
              fullWidth
              startIcon={!mode ? <AttachmentIcon/> : <AddCircleOutlineIcon />}
              variant="contained"
              color={!mode? 'info' : 'secondary'}
              sx={{ mt: 3, mb: 2, color: '#fff', boxShadow: 'none' }} 
            >
              { mode ? '????????????????' : '??????????????' }
            </Button>
          </Box>
    </Dialog>
  );
}

export default AddBlockOperation;



