import React, {useEffect} from 'react'
import {
  Button, colors,
  Dialog, Divider, Stack, Typography, IconButton, TextField
} from '@mui/material';
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import ReportIcon from '@mui/icons-material/Report';
import WarningIcon from '@mui/icons-material/Warning';
import {useSelector, useDispatch} from "react-redux";
import {tokenSelector} from "src/app/selector";
import {fetchDeleteHokhau} from "src/features/HoKhau/hokhauSlice";
import {fetchDeleteNhankhau, nhankhauSlice} from "src/features/NhanKhau/nhankhauSlice";


const DialogCofirm = NiceModal.create(({id, onClose}) => {
  const modal = useModal();
  const token = useSelector(tokenSelector)
  const data = useSelector((state)=> state.nhankhau)
  const dispatch = useDispatch()
  const handleDelete = () => {
    const data = {
      token,
      id
    }
    dispatch(fetchDeleteNhankhau(data))
  }
  useEffect(() => {
    if(data.message === "Xóa nhân khẩu thành công"){
      modal.hide()
      onClose();
      dispatch(nhankhauSlice.actions.resetStatus())
    }
  }, [data])
  return (
    <Dialog open={modal.visible} onClose={() => modal.hide()}>
      <Stack alignItems='center' p={0.7}>
        <Typography fontSize={28} fontWeight={500}>Thông báo</Typography>
      </Stack>
      <Divider sx={{backgroundColor: colors.grey[500]}}/>
      <Stack height={80} width={400} p={2} direction='row' alignItems="center" spacing={1}>
        <WarningIcon sx={{color: colors.orange[500]}} fontSize="large"/>
        <Typography fontWeight={410}>Bạn có chắc chắn muốn xóa nhân khẩu ?</Typography>
      </Stack>
      {/*<Divider sx={{backgroundColor:colors.grey[500]}}/>*/}
      <Stack direction='row-reverse' spacing={1} p={1}>
        <Button variant='contained' onClick={handleDelete}>Xóa</Button>
        <Button variant='outlined' onClick={() => modal.hide()}>Hủy</Button>
      </Stack>

    </Dialog>
  );
})

export default DialogCofirm
