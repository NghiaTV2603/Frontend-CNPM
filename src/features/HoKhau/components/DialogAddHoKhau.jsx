import * as React from 'react';
import {
  Button,
  Dialog,
  Divider,
  Slide,
  Stack,
  TextField,
  Typography,
  colors,
  Chip, Box,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DialogAddNhanKhau from 'src/features/HoKhau/components/DialogAddNhanKhau';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from "@mui/material/IconButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogAddHoKhau(props) {
  const [openAddNhanKhau, setOpenAddNhankhau] = React.useState(false);
  const [openAddChuHo, SetOpenAddChuHo] = React.useState(false)
  const [isAddNhankhau, setIsAddNhankhau] = React.useState(false)

  const handleClickOpenAddNhanKhau = () => {
    setOpenAddNhankhau(true);
  };

  const handleCloseAddNhanKhau = () => {
    setOpenAddNhankhau(false);
  };

  const handleClickAddChuHo = () => {
    SetOpenAddChuHo(true)
  }

  const handleCloseAddChuho = () => {
    SetOpenAddChuHo(false)
  }
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

  const [chuho, setChuho] = React.useState({})
  const handleAddChuho = (data) => {
    setChuho(data)
  }
  const handleDeleteChuho = () => {
    setChuho({})
  }
  const [nhankhau, setNhankhau] = React.useState([])
  const handleAddNhanKhau = (data) => {
    setNhankhau([...nhankhau, data])
    setIsAddNhankhau(true)
  }
  return (
    <Stack width={600}>
      <Typography fontSize={28} py={1.5} align="center">
        {' '}
        Thêm hộ khẩu{' '}
      </Typography>
      <Divider/>
      <Stack pt={3}>
        <Stack direction="row" px={2}>
          <Button
            sx={{height: 42}}
            variant="outlined"
            onClick={handleClickAddChuHo}
            endIcon={<PersonAddIcon/>}
          >
            {' '}
            Thêm chủ hộ{' '}
          </Button>
          <Dialog
            open={openAddChuHo}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseAddChuho}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogAddNhanKhau
              handleCloseAddNhanKhau={handleCloseAddChuho}
              handleAddChuho={handleAddChuho}
            />
          </Dialog>
          {Object.keys(chuho).length !== 0 &&
            <Stack sx={{
              '&:hover': {
                backgroundColor: colors.blue[900]
              },
              cursor: 'pointer'
            }} borderRadius={1} ml={2} direction='row' bgcolor={colors.blue[800]} color={colors.grey[50]}>
              <Stack py={1} pl={2}>
                <Typography>Tên chủ hộ: {chuho.hoten} </Typography>
                <Typography>Căn cước công dân: {chuho.cccd} </Typography>
              </Stack>
              <Box onClick={handleDeleteChuho}>
                <IconButton aria-label="delete" size="small" sx={{color: colors.grey[100]}}>
                  <HighlightOffIcon/>
                </IconButton>
              </Box>
            </Stack>
          }
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
              sx={{height: 42, width: 190, mb:1}}
              variant="outlined"
              onClick={handleClickOpenAddNhanKhau}
              endIcon={<GroupAddIcon/>}
            >
              Thêm nhân khẩu
            </Button>
            <Dialog
              open={openAddNhanKhau}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClickAddChuHo}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogAddNhanKhau
                handleCloseAddNhanKhau={handleCloseAddNhanKhau}
                handleAddChuho={handleAddNhanKhau}
              />
            </Dialog>
            {nhankhau.length !== 0 &&
              <Stack direction='row' flexWrap='wrap'>
                {nhankhau.map(nk => (
                  <Stack sx={{
                    '&:hover': {
                      backgroundColor: colors.blue[900]
                    },
                    cursor: 'pointer'
                  }} borderRadius={1} mr={1} direction='row' mb={1} bgcolor={colors.blue[800]} color={colors.grey[50]}>
                    <Stack py={1} pl={2}>
                      <Typography>Tên chủ hộ: {nk.hoten} </Typography>
                      <Typography>Căn cước công dân: {nk.cccd} </Typography>
                    </Stack>
                    <Box>
                      <IconButton aria-label="delete" size="small" sx={{color: colors.grey[100]}}>
                        <HighlightOffIcon/>
                      </IconButton>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            }
            <Stack py={2} direction="row-reverse" spacing={2}>
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
