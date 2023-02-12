import React from 'react'
import {
  Button, colors,
  Dialog, Divider, Stack, Typography, IconButton
} from '@mui/material';
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import SaveIcon from "@mui/icons-material/Save";
import DialogShowHoKhau from "src/features/HoKhau/components/DialogShowHoKhau";
import DialogCofirm from "src/features/NhanKhau/components/DialogConfirm";


const ShowNhanKhau = (props) => {
  const modal = useModal();
  const data = props.data;
  const handleCloseDialogShow = () => {
    modal.hide()
  }
  return (
    <Stack width={750}>
      <Stack position='absolute' sx={{right: 6, top: 6}}>
        <IconButton onClick={() => {
          modal.hide()
        }} aria-label="delete">
          <ClearIcon sx={{color: colors.grey[900]}}/>
        </IconButton>
      </Stack>
      <Stack textAlign='center' p={1}>
        <Typography fontWeight={700} fontSize={28}>THÔNG TIN NHÂN KHẨU</Typography>
      </Stack>
      <Divider/>
      <Stack px={2} spacing={1} py={1}>
        <Stack pt={1} direction='row' alignItems='end'>
          <Typography fontSize={16} fontWeight={400}>Họ và tên:</Typography>
          <Typography fontSize={20} fontWeight={410} pl={1}>{data.hoten}</Typography>
        </Stack>
        <Stack direction='row'>
          <Stack width={230} direction='row' alignItems='end'>
            <Typography fontSize={16} fontWeight={400}>Sổ hộ khẩu :</Typography>
            <Typography fontSize={18} fontWeight={410} pl={1}>{data.sohokhau}</Typography>
          </Stack>
          <Stack direction='row' alignItems='end'>
            <Typography fontSize={16} fontWeight={400}>Quan hệ với chủ hộ :</Typography>
            <Typography fontSize={18} fontWeight={410} pl={1}>{data.quanhevoichuho}</Typography>
          </Stack>
        </Stack>
        <Stack direction='row' alignItems='end'>
          <Stack direction='row' alignItems='end' width={230}>
            <Typography fontSize={16} fontWeight={400}>Ngày Sinh:</Typography>
            <Typography fontSize={18} fontWeight={410} pl={1}>{data.ngaysinh}</Typography>
          </Stack>
          <Typography fontSize={16} fontWeight={400}>Giới tính:</Typography>
          <Typography fontSize={18} fontWeight={410} pl={1}>{data.gioitinh === 0 ? 'Nữ' : 'Nam'}</Typography>
        </Stack>
        <Stack direction='row'>
          <Stack width={230} direction='row' alignItems='end'>
            <Typography fontSize={16} fontWeight={400}>CCCD:</Typography>
            <Typography fontSize={18} fontWeight={410} pl={1}>{data.cccd}</Typography>
          </Stack>
          <Stack width={230} direction='row' alignItems='end'>
            <Typography fontSize={16} fontWeight={400}>Ngày cấp:</Typography>
            <Typography fontSize={18} fontWeight={410} pl={1}>{data.capngay}</Typography>
          </Stack>
          <Typography fontSize={16} fontWeight={400}>Nơi cấp:</Typography>
          <Typography fontSize={18} fontWeight={410} pl={1}>{data.noicap}</Typography>
        </Stack>
        <Stack direction='row' alignItems='end'>
          <Stack width={230} direction='row' alignItems='end'>
            <Typography fontSize={16} fontWeight={400}>Dân tộc:</Typography>
            <Typography fontSize={18} fontWeight={410} pl={1}>{data.dantoc}</Typography>
          </Stack>
          <Stack width={230} direction='row' alignItems='end'>
            <Typography fontSize={16} fontWeight={400}>Tôn giáo:</Typography>
            <Typography fontSize={18} fontWeight={410} pl={1}>{data.tongiao}</Typography>
          </Stack>
          <Typography fontSize={16} fontWeight={400}>Quê quán:</Typography>
          <Typography fontSize={18} fontWeight={410} pl={1}>{data.quequan}</Typography>
        </Stack>
      </Stack>
      <Divider/>
      <Stack direction='row-reverse' px={2} py={1} spacing={1}>
        <Button onClick={() => props.onSetIndex(1)} variant='outlined' color="warning" startIcon={<EditIcon/>}>Chỉnh
          sửa</Button>
        <Button onClick={()=>{NiceModal.show(DialogCofirm,{ id:data.id ,onClose: handleCloseDialogShow})}}   variant='outlined' color="error" startIcon={<DeleteIcon/>}>Xóa</Button>
      </Stack>
    </Stack>
  )
}
const EditNhanKhau = (props) => {
  const modal = useModal();
  return (
    <Stack width={750}>
      <Stack position='absolute' sx={{right: 6, top: 6}}>
        <IconButton onClick={() => {
          modal.hide()
        }} aria-label="delete">
          <ClearIcon sx={{color: colors.grey[900]}}/>
        </IconButton>
      </Stack>
      <Stack textAlign='center' p={1}>
        <Typography fontWeight={700} fontSize={28}>CHỈNH SỬA NHÂN KHẨU</Typography>
      </Stack>
      <Divider/>
      <Stack px={2} py={1} justifyContent='space-between' direction='row'>
        <Button onClick={()=>props.onSetIndex(0)} variant="outlined" sx={{color:colors.grey[600]}} startIcon={<KeyboardReturnIcon/>}>Quay Lại</Button>
        <Button variant="contained" endIcon={<SaveIcon/>} >Lưu</Button>
      </Stack>
    </Stack>
  )
}

const DialogShowNhanKhau = NiceModal.create(({data}) => {
  const modal = useModal();
  const [index, setIndex] = React.useState(0)
  const handleSetIndex = (index) => {
    setIndex(index);
  }
  return (
    <Dialog open={modal.visible} onClose={() => modal.hide()} maxWidth="md">
      {index === 0 && <ShowNhanKhau onSetIndex={handleSetIndex} data={data}/>}
      {index === 1 && <EditNhanKhau onSetIndex={handleSetIndex}/>}
    </Dialog>
  );
})

export default DialogShowNhanKhau
