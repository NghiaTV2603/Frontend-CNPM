import * as React from 'react';
import { Container, Dialog } from '@mui/material';
import LoadingSvg from 'src/assets/images/loading.svg';
import NiceModal, { useModal, muiDialogV5 } from '@ebay/nice-modal-react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const LoadingModal = NiceModal.create(() => {
  const modal = useModal();

  return (
    <Dialog {...muiDialogV5(modal)} BackdropProps={{
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: 0.5,
      },
    }}>
      <Container >
        <Box>
          <CircularProgress />
        </Box>
      </Container>
    </Dialog>
  );
});

export default LoadingModal;
