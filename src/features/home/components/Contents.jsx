import React from 'react';
import {
  colors,
  Stack,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';
import HoKhau from 'src/features/HoKhau';
import NhanKhau from 'src/features/NhanKhau';
import DanhSachDongTien from 'src/features/DanhSachDongTien';
import SettingUser from 'src/features/SettingUser';

export default function Contents(props) {
  const indexTab = props.index;
  return (
    <Stack>
      <AppBar
        position="static"
        sx={{ backgroundColor: colors.grey[100], height: 75 }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              fontSize={32}
              noWrap
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: colors.grey[900],
                textDecoration: 'none',
              }}
            >
              {(() => {
                switch (indexTab) {
                  case 0:
                    return 'Danh sách hộ khẩu';
                  case 1:
                    return 'Danh sach nhân khẩu';
                  case 2:
                    return 'Danh sách đóng tiền';
                  case 3:
                    return 'Cài đặt tài khoản';
                }
              })()}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Stack>
        {(() => {
          switch (indexTab) {
            case 0:
              return <HoKhau />;
            case 1:
              return <NhanKhau />;
            case 2:
              return <DanhSachDongTien />;
            case 3:
              return <SettingUser />;
          }
        })()}
      </Stack>
    </Stack>
  );
}
