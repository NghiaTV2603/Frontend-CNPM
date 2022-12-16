import React from 'react';
import {
  Button,
  colors,
  Stack,
  Avatar,
  Typography,
  Divider,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Sidebar(props) {
  const user = {
    name: 'Nghia Tran Van',
    avatar:
      'https://vcdn1-thethao.vnecdn.net/2022/12/10/messi-3-jpeg-1670629980-167062-7567-4192-1670631569.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=KhxAvzMM7Em5ke2KWF77wA',
    level: 'admin',
  };

  const contentsSidebar = [
    { title: 'Danh sách hộ khẩu', icon: <HomeIcon /> },
    { title: 'Danh sách nhân khẩu', icon: <PeopleAltIcon /> },
    { title: 'Danh sách đóng tiền', icon: <LocalAtmIcon /> },
    { title: 'Cài Đặt tài khoản', icon: <SettingsIcon /> },
  ];

  const StyleTab = {
    height: 46,
    mr: 0.5,
    mt: 0.3,
    borderRadius: 1,
    color: colors.grey[500],
    '&:hover': {
      backgroundColor: colors.grey[800],
      color: colors.grey[200],
    },
    cursor: 'pointer',
  };
  const [numTab, setNumTab] = React.useState(0);
  return (
    <Stack>
      <Stack height="100%" color={colors.grey[200]}>
        <Stack className="tag-name" p={2}>
          <Stack
            direction="row"
            alignItems="center"
            p={2}
            bgcolor={colors.grey[800]}
            borderRadius={4}
            height={80}
          >
            <Avatar sx={{ height: 48, width: 48 }} src={user.avatar} />
            <Stack ml={1.5}>
              <Typography fontSize={16} color={colors.grey[100]}>
                {user.name}
              </Typography>
              <Typography fontSize={13}> Chức vụ : {user.level}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Divider sx={{ backgroundColor: colors.grey[500] }} />
        <Stack py={2}>
          {contentsSidebar.map((content, index) => (
            <Stack
              direction="row"
              pl={1}
              alignItems="center"
              key={index}
              sx={StyleTab}
              bgcolor={numTab === index ? colors.grey[800] : ''}
              color={colors.grey[300]}
              onClick={() => {
                setNumTab(index);
                props.handleIndexTab(index);
              }}
            >
              <Stack color={numTab === index ? colors.grey[100] : ''}>
                {content.icon}
              </Stack>
              <Typography
                color={numTab === index ? colors.grey[100] : ''}
                px={2}
                fontSize={17}
              >
                {content.title}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Divider sx={{ backgroundColor: colors.grey[500] }} />
        <Button sx={StyleTab} startIcon={<LoginIcon />}>
          Logout
        </Button>
      </Stack>
    </Stack>
  );
}
