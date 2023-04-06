import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { sideBarStore, changeSideBarState } from '../../Redux/Store';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactNode;
}

const DisplayModal: React.FC<ModalProps> = ({ open, onClose, title, body }) => {
  const dispatch = useDispatch()
  const handleJoin = () => {
    onClose();
    dispatch(changeSideBarState(true))
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick={() => handleJoin()} variant='contained'>  {body}</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
export default DisplayModal