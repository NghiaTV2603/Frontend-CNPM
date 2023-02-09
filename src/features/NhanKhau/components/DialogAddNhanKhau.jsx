import {Button, Divider, Stack, TextField, Typography,Box,InputLabel,MenuItem,FormControl,Select} from '@mui/material';
import * as React from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

export default function DialogAddNhanKhau(props) {

  const [ngaySinh,setNgaySinh] = React.useState(null)
  const [ngayCapCCCD,setNgayCapCCCD] = React.useState(null)
  const [gioiTinh,setGioiTinh] = React.useState(0)

  const closeDialog = () => {
    setTimeout(() => {
      props.handleCloseAddNhanKhau();
    }, 1);
  };
  const handleSubmitAddNhanKhau = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataNhanKhau = {
      sohokhau: data.get('sohokhau'),
      quanhechuho: data.get('quanhechuho'),
      hoten: data.get('hoten'),
      cccd: data.get('cccd'),
      ngaycap: ngayCapCCCD.$d,
      noicap: data.get('noicap'),
      ngaysinh: ngaySinh.$d,
      nghenghiep: data.get('nghenghiep'),
      gioitinh: gioiTinh,
      quequan: data.get('quequan'),
      dantoc: data.get('dantoc'),
      tongiao: data.get('tongiao'),
      ngaythemnhankhau: data.get('ngaythemnhankhau'),
      ghichu: data.get('ghichu'),
    }
    console.log(dataNhanKhau)
  };

  return (
    <Stack width={700}>
      <Typography variant="h5" py={1} align="center">
        {' '}
        Thêm nhân khẩu{' '}
      </Typography>
      <Divider/>
      <Stack pt={1}>
        <Stack px={2}>
          <Stack component="form" onSubmit={handleSubmitAddNhanKhau} noValidate>
            <Stack direction="row">
              <TextField
                margin="normal"
                fullWidth
                required
                id="hoten"
                label="Họ và tên"
                name="hoten"
                autoFocus
                sx={{paddingRight: 1}}
              />
              <TextField
                margin="normal"
                fullWidth
                required
                id="sohokhau"
                label="Số Hộ khẩu"
                name="sohokhau"
                autoFocus
                sx={{paddingRight: 1}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="quanhechuho"
                label="Quan hệ chủ hộ"
                id="quanhechuho"
              />
            </Stack>
            <Stack direction="row">
              <TextField
                margin="normal"
                required
                fullWidth
                name="cccd"
                label="Căn cước công dân"
                id="cccd"
                sx={{paddingRight: 1}}
              />
              <Stack  mt={2} width={670} pr={1} >
                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Ngày cấp CCCD"
                    value={ngayCapCCCD}
                    onChange={(newValue) => {
                      setNgayCapCCCD(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Stack>
              <TextField
                margin="normal"
                required
                fullWidth
                name="noicap"
                label="Nơi cấp"
                id="noicap"
              />
            </Stack>
            <Stack direction="row" >
              <Stack  mt={2} width={670} pr={1} >
                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Ngày sinh"
                    value={ngaySinh}
                    onChange={(newValue) => {
                      setNgaySinh(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Stack>
              <TextField
                margin="normal"
                fullWidth
                required
                id="nghenghiep"
                label="Nghề nghiệp"
                name="nghenghiep"
                autoFocus
                sx={{paddingRight:1}}
              />
              <Stack pt={2} width={670} >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gioiTinh}
                    label="Giới Tính"
                    onChange={(e) => setGioiTinh(e.target.value)}
                  >
                    <MenuItem value={0}>Nữ</MenuItem>
                    <MenuItem value={1}>Nam</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
            <TextField
              margin="normal"
              required
              fullWidth
              name="quequan"
              label="Quê quán"
              id="quequan"
            />
            <Stack direction="row" alignItems="center">
              <Stack pr={1} width={450}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="dantoc"
                  label="Dân tộc"
                  name="dantoc"
                  autoFocus
                />
              </Stack>
              <Stack pr={1} width={450}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="tongiao"
                  label="Tôn giáo"
                  id="tongiao"
                />
              </Stack>
              <TextField
                margin="normal"
                required
                fullWidth
                name="ngaythemnhankhau"
                label="Ngày thêm nhân khẩu"
                id="ngaythemnhankhau"
              />
            </Stack>
            <TextField
              margin="normal"
              fullWidth
              name="ghichu"
              label="Ghi chú"
              id="ghichu"
            />
            <Stack pt={1} pb={2} direction="row-reverse" spacing={2}>
              <Button type="submit" variant="contained" onClick={closeDialog}>
                Thêm hộ khẩu
              </Button>
              <Button
                onClick={() => props.handleCloseAddNhanKhau()}
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
