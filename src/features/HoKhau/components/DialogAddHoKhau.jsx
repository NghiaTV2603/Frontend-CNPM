import * as React from 'react';
import {
  Button,
  Dialog,
  Divider,
  Slide,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DialogAddNhanKhau from 'src/features/HoKhau/components/DialogAddNhanKhau';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function DialogAddHoKhau(props) {
  const [openAddNhanKhau, setOpenAddNhankhau] = React.useState(false);

  const handleClickOpenAddNhanKhau = () => {
    setOpenAddNhankhau(true);
  };

  const handleCloseAddNhanKhau = () => {
    setOpenAddNhankhau(false);
  };
  const closeDialog = () => {
    setTimeout(() => {
      props.handleCloseAddHoKhau();
    }, 1);
  };
  const handleSubmitAddHoKhau = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      sonha: data.get('sonha'),
      duong: data.get('duong'),
      phuong: data.get('phuong'),
      quan: data.get('quan'),
    });
  };

  return (
    <Stack width={600}>
      <Typography fontSize={28} py={1.5} align="center">
        {' '}
        Thêm hộ khẩu{' '}
      </Typography>
      <Divider />
      <Stack pt={3}>
        <Stack direction="row" px={2}>
          <Button
            sx={{ height: 42 }}
            variant="outlined"
            onClick={handleClickOpenAddNhanKhau}
            endIcon={<PersonAddIcon />}
          >
            {' '}
            Thêm chủ hộ{' '}
          </Button>
          <Dialog
            open={openAddNhanKhau}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseAddNhanKhau}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogAddNhanKhau
              handleCloseAddNhanKhau={handleCloseAddNhanKhau}
            />
          </Dialog>
        </Stack>
        <Stack px={2}>
          <Stack component="form" onSubmit={handleSubmitAddHoKhau} noValidate>
            <Stack direction="row" alignItems="center">
              <Stack pr={2}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Số nhà"
                  name="sonha"
                  autoFocus
                />
              </Stack>
              <TextField
                margin="normal"
                fullWidth
                name="duong"
                label="Đường"
                id="duong"
              />
            </Stack>
            <TextField
              margin="normal"
              required
              fullWidth
              name="phuong"
              label="Phường"
              id="phuong"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="quan"
              label="Quận"
              id="quan"
            />
            <Button
              sx={{ height: 42, width: 190, m: 1 }}
              variant="outlined"
              onClick={handleClickOpenAddNhanKhau}
              endIcon={<GroupAddIcon />}
            >
              Thêm nhân khẩu
            </Button>
            <Stack pb={2} direction="row-reverse" spacing={2}>
              <Button type="submit" variant="contained" onClick={closeDialog}>
                Thêm hộ khẩu
              </Button>
              <Button
                onClick={() => props.handleCloseAddHoKhau()}
                variant="outlined"
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
