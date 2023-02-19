import React from 'react'
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import {Stack, Dialog, Typography, Divider} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useSelector,useDispatch} from "react-redux";
import {useEffect} from "react";
import {tokenSelector} from "src/app/selector";
import {fetchChuadong} from "src/features/DanhSachDongTien/khoanthuSlice";



const ShowChuaDong = NiceModal.create(({id}) => {
  const modal = useModal();
  const token = useSelector(tokenSelector)
  const dispatch = useDispatch()
  const dataFetch = {
    token,
    id
  }
  useEffect(()=>{
    dispatch(fetchChuadong(dataFetch))
  },[])

  const dataHokhau = useSelector(state => state.khoanthu.chuadong)

  return (
    <Dialog open={modal.visible} onClose={() => modal.hide()} maxWidth={false}>
      <Stack width={800} alignItems='center'>
        <Typography py={2} fontWeight={600} fontSize={24}>DANH SÁCH CÁC HỘ KHẨU CHƯA ĐÓNG TIỀN</Typography>
      </Stack>
      <Divider/>
      <Stack p={2}>
        <Paper style={{height: 500, overflow: 'auto'}}>
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Số hộ khẩu</TableCell>
                  <TableCell>Tên chủ hộ</TableCell>
                  <TableCell>Số CCCD</TableCell>
                  <TableCell>Quận</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataHokhau.map((row) => (
                  <TableRow
                    key={row.sohokhau}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                  >
                    <TableCell>
                      {row.sohokhau}
                    </TableCell>
                    <TableCell>{row.hotenchuho}</TableCell>
                    <TableCell>{row.cccdchuho}</TableCell>
                    <TableCell>{row.quan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Stack>
    </Dialog>
  )
})

export default ShowChuaDong
