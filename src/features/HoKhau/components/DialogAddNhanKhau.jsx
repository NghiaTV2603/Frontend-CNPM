import { Button, Divider, Stack, TextField, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import * as React from 'react';

export default function DialogAddNhanKhau(props) {
  return (
    <Stack width={500}>
      <Typography variant="h5" py={2} align="center">
        {' '}
        Thêm nhân khẩu{' '}
      </Typography>
      <Divider />
      <Stack pt={1}>
        <Stack px={2}>
          <Stack component="form" noValidate>
            <Stack direction="row" alignItems="center">
              <Stack pr={1}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="sohokhau"
                  label="Số Hộ khẩu"
                  name="sohokhau"
                  autoFocus
                />
              </Stack>
              <TextField
                margin="normal"
                required
                fullWidth
                name="quanhechuho"
                label="Quan hệ chủ hộ"
                id="quanhechuho"
              />
            </Stack>
            <Stack direction="row" alignItems="center">
              <Stack pr={1} width={450}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="hoten"
                  label="Họ và tên"
                  name="hoten"
                  autoFocus
                />
              </Stack>
              <TextField
                margin="normal"
                required
                fullWidth
                name="cccd"
                label="Căn cước công dân"
                id="cccd"
              />
            </Stack>
            <Stack direction="row" alignItems="center">
              <Stack pr={1} width={450}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="ngaycap"
                  label="Ngày cấp"
                  name="ngaycap"
                  autoFocus
                />
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
            <Stack direction="row" alignItems="center">
              <Stack pr={1} width={400}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="ngaysinh"
                  label="Ngày sinh"
                  name="ngaysinh"
                  autoFocus
                />
              </Stack>
              <Stack pr={1} width={400}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="nghenghiep"
                  label="Nghề nghiệp"
                  name="nghenghiep"
                  autoFocus
                />
              </Stack>
              <TextField
                margin="normal"
                required
                fullWidth
                name="gioitinh"
                label="Giới tính"
                id="gioitinh"
              />
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
              <Button type="submit" variant="contained">
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
