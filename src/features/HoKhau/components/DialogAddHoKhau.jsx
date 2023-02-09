import * as React from 'react';
import {
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

export default function DialogAddHoKhau(props) {

  const [dateAddHokhau, setDateAddHokhau] = React.useState(null);

  const closeDialog = () => {
    setTimeout(() => {
      props.handleCloseAddHoKhau();
    }, 1);
  };
  const handleSubmitAddHoKhau = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newHokhau = {
      cccd: data.get('cccd') ,
      sonha: data.get('sonha'),
      duong: data.get('duong'),
      phuong: data.get('phuong'),
      quan: data.get('quan'),
      ngaylamhokhau: dateAddHokhau.$d,
    }
    console.log(newHokhau);
  };

  return (
    <Stack width={600}>
      <Typography fontSize={28} py={1.5} align="center">
        Thêm hộ khẩu{' '}
      </Typography>
      <Divider/>
      <Stack>
        <Stack px={2} pt={1}>
          <Stack component="form" onSubmit={handleSubmitAddHoKhau} >
            <Stack direction="row" >
              <Stack pr={1} width='50%'>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Số CCCD chủ hộ"
                  name="cccd"
                />
              </Stack>
              <Stack mt={2} width='50%' >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Ngày đăng kí"
                    value={dateAddHokhau}
                    onChange={(newValue) => {
                      setDateAddHokhau(newValue);
                      console.log(dateAddHokhau.$d)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Stack pr={1} width='50%'>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Số nhà"
                  name="sonha"
                  autoFocus
                />
              </Stack>
              <Stack width='50%'>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="duong"
                  label="Đường"
                  id="duong"
                />
              </Stack>
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
