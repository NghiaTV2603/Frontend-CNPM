import React from 'react'
import {Button, colors, Divider, Stack, Typography} from "@mui/material";

const UserAuth = {
  username: 'Admin',
  email: 'admin@gmail.com',
  password: 'admin'

}
export default function SettingUser() {
  return (
    <Stack p={4} width={700}>
      <Divider sx={{height: 1.2, backgroundColor: colors.grey[800]}}/>
      <Stack height={40} alignItems='center' m={1} direction='row' justifyContent='space-between'>
        <Stack direction='row'>
          <Typography fontSize={18} color={colors.grey[700]} width={200}>Tên người dùng</Typography>
          <Typography fontSize={18} fontWeight={500} color={colors.grey[800]}>{UserAuth.username}</Typography>
        </Stack>
        <Button variant='contained'>Chỉnh sửa</Button>
      </Stack>
      <Divider/>
      <Stack height={40} alignItems='center' m={1} direction='row' justifyContent='space-between'>
        <Stack direction='row'>
          <Typography fontSize={18} color={colors.grey[700]} width={200}>Emai</Typography>
          <Typography fontSize={18} fontWeight={500} color={colors.grey[800]}>{UserAuth.email}</Typography>
        </Stack>
        <Button variant='contained'>Chỉnh sửa</Button>
      </Stack>
      <Divider/>
      <Stack height={40} alignItems='center' m={1} direction='row' justifyContent='space-between'>
        <Stack direction='row'>
          <Typography fontSize={18} color={colors.grey[700]} width={200}>Mật khẩu</Typography>
        </Stack>
        <Button variant='contained'>Chỉnh sửa</Button>
      </Stack>
      <Divider sx={{height: 1, backgroundColor: colors.grey[800]}}/>
    </Stack>
  )
}

