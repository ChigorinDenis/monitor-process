import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';
import { Button, Box } from "@mui/material";
import { removeOperation } from '../../reducers/operationReducer';
import AddOperationForm from '../AddOperationForm';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import BlockSpace from '../BlockSpace';
import Checkbox from '@mui/material/Checkbox';
import ToolbarTable from '../ToolbarTable';
import { addOperations } from '../../reducers/operationReducer';
import { addCheckOperations } from "../../reducers/uiReducer";
import AddErrorGuiides from '../AddErrorGuides';
import { openDialog } from '../../reducers/uiReducer';
import apiRoutes from '../../routes'


export default function BasicTable() {
  const rows = useSelector((state) => state.operation);
  const { dialogs } = useSelector((state) => state.ui);
  const operationDialog = dialogs.operation;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {   
        const response = await axios.get(apiRoutes('getOperations'));
        dispatch(addOperations(response.data));
      } catch(err) {    
        console.log(err);
      }
    }
   fetchData();
  }, []);
  const handleRemove = (id) => (e) => {
    e.stopPropagation();
    dispatch(removeOperation({id}));
  }
  const [open, setOpen] = React.useState(false);
  const [showBlocks, setStateBlocks] = React.useState(false);
  const [isCheckAll, setIsCheckAll] = React.useState(false);
  const [isCheck, setIsCheck] = React.useState([]);

  const handleAllCheckboxes = () => {
    if (isCheckAll) {
      setIsCheck([]);
      setIsCheckAll(false);
      dispatch(addCheckOperations([]));
      return;
    }
    const newIsCheck = rows.map((row) => row.id )
    setIsCheck(newIsCheck);
    dispatch(addCheckOperations(newIsCheck));
    setIsCheckAll(true);
  }

  const handleToggle = (id) => () => {
    let newIsCheck;
    if (isCheck.includes(id)) {
      newIsCheck = isCheck.filter(item => item !== id)
      setIsCheck(newIsCheck);
      dispatch(addCheckOperations(newIsCheck));
      return;
    }
    newIsCheck = [...isCheck, id]
    setIsCheck(newIsCheck);
    dispatch(addCheckOperations(newIsCheck));  
  };

  const handleClickOpen = () => {
    dispatch(openDialog({dialogName: 'operation', mode: 'add'}))
    // setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2,
          mb: 5,
        }}
      >
        <Typography
          variant='h5'
          sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
        >
          Технологический график
        </Typography>
        <div>
          <Button
            variant='outlined'
            startIcon={<EventAvailableIcon />}
            size='small'
            color='info'
            sx={{mr:1}}
            onClick={() => {setStateBlocks(!showBlocks)}}
          >
            Запланировать
          </Button>
          <Button
            variant='contained'
            startIcon={<AddCircleOutlineIcon />}
            size='small'
            color='secondary'
            sx={{color: '#fff', boxShadow: 'none'}}
            onClick={handleClickOpen}
          >
            Добавить
          </Button>
        </div>
      </Box>
      <Box
        sx={{display: 'flex'}}
      >
        <BlockSpace show={showBlocks}/>
        <Box  sx={{ width: '100%' }}>
          <ToolbarTable  numSelected={isCheck.length} />
          <TableContainer component={Paper} sx={{maxHeight:'80vh', overflowY: 'scroll'}} >
            <Table stickyHeader sx={{ minWidth: 650, width: '100%' }}>
              <TableHead>
                <TableRow onClick={handleAllCheckboxes}>
                  <TableCell>
                    <Checkbox
                      edge="start"
                      color='info'
                      checked={isCheckAll}
                      tabIndex={-1}
                      disableRipple
                      onClick={handleAllCheckboxes}
                    />
                  </TableCell>
                  <TableCell>Номер</TableCell>
                  <TableCell>Описание</TableCell>
                  <TableCell>Время Начала</TableCell>
                  <TableCell>Длительность</TableCell>
                  <TableCell>Блоки</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={handleToggle(row.id)}
                  > 
                    <TableCell>
                      <Checkbox
                        edge="start"
                        color='info'
                        checked={isCheck.includes(row.id)}
                        tabIndex={-1}
                        disableRipple
                        
                      />
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.timeStart}</TableCell>
                    <TableCell>{row.duration}</TableCell>
                    <TableCell>
                    <Stack direction="row" spacing={1}>
                      {row.blocks.map(({ name }) => (
                        <Chip label={name} sx={{color: '#0288d1', borderColor: '#0288d1'}} variant="outlined" />
                      ))}
                    </Stack>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size='small'
                        sx={{ '&:hover': {color: '#10B981'}}}
                        onClick={
                          (e) => {
                            e.stopPropagation();
                            dispatch(openDialog({
                            dialogName: 'operation',
                            mode: 'edit',
                            data: row
                          }))
                        }
                        }
                        title="Редактирование"
                      >
                        <EditIcon />
                      </IconButton>
                      {/* <IconButton
                        size='small'
                        sx={{ '&:hover': {color: '#f44336'}}}
                        onClick={handleRemove(row.id)}
                      >
                        <DeleteIcon />
                      </IconButton> */}
                      <IconButton
                        size='small'
                        sx={{ '&:hover': {color: '#1de9b6'}}}
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(openDialog({dialogName: 'errorGuides', data: {id_operation: row.id}}))
                        }}
                        title="Руководство неисправностей"
  
                      >
                        <HelpCenterIcon />
                      </IconButton>
                      
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <AddOperationForm 
        open={operationDialog.open}
        onClose={handleClose} 
      />
      <AddErrorGuiides onClose={handleClose} />
    </>
  );
}
