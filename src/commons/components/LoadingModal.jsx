import * as React from 'react';
import { Container, Dialog,Stack } from '@mui/material';
import NiceModal, { useModal, muiDialogV5 } from '@ebay/nice-modal-react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const LoadingModal = NiceModal.create(() => {
  const modal = useModal();
  const transparentStyle = { backgroundColor: 'rgba(255, 255, 255, 0.5)' };

  return (
    <Dialog {...muiDialogV5(modal)} style={transparentStyle} >
      <Container >
        <Stack height={140} width={120} alignItems={'center'} justifyContent={'center'} >
          <CircularProgress size={90} />
        </Stack>
      </Container>
    </Dialog>
  );
});

export default LoadingModal;
