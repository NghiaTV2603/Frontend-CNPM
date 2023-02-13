import React, {useEffect, useRef} from 'react'
import {
  Button, colors,
  Dialog, Divider, Stack, Typography, IconButton, TextField
} from '@mui/material';
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SaveIcon from '@mui/icons-material/Save';
import DialogShowNhanKhau from "src/features/NhanKhau/components/DialogShowNhanKhau";
import {useFormik} from "formik";
import hokhauSlice, {fetchAddHokhau, fetchCurrentHokhau, fetchUpdateHokhau} from "src/features/HoKhau/hokhauSlice";
import * as yup from "yup";
import DialogCofirm from "src/features/HoKhau/components/DialogCofirm";
import {useDispatch, useSelector} from "react-redux";
import {tokenSelector} from "src/app/selector";
import {fetchCurrentListNhanKhau, nhankhauSlice} from "src/features/NhanKhau/nhankhauSlice";

const DialogShowHoKhau = NiceModal.create(({data,onAlert}) => {
  const modal = useModal();
  const [index, setIndex] = React.useState(0)
  const handleSetIndex = (index) => {
    setIndex(index);
  }
  const handleAlert = () => {
    onAlert()
  }
  return (
    <Dialog open={modal.visible} onClose={() => modal.hide()} maxWidth={false} >
      {index === 0 && <ShowHoKhau onAlert = {handleAlert} onSetIndex={handleSetIndex} data={data}/>}
      {index === 1 && <EditHoKhau onAlert = {handleAlert} onSetIndex={handleSetIndex} data={data}/>}
    </Dialog>
  );
});

const ShowHoKhau = (props) => {
  const dataNhankhau = useSelector(state => state.nhankhau.currentListNhankhau);
  const data = props.data
  const modal = useModal();
  const dispatch = useDispatch()
  const token = useSelector(tokenSelector)
  const handleAlert = () => {
    props.onAlert()
  }
  const dataFetch = {
    token : token,
    id : data.sohokhau
  }
  const handleCloseDialogShow = () => {
    modal.hide()
  }
  useEffect(()=>{
    dispatch(fetchCurrentListNhanKhau(dataFetch))
  },[])
  return (
    <Stack>
      <Stack position='absolute' sx={{right: 6, top: 6}}>
        <IconButton onClick={()=>{
          handleCloseDialogShow()
          dispatch(nhankhauSlice.actions.resetCurrentListNhankhau())
        }} aria-label="delete">
          <ClearIcon sx={{color: colors.grey[900]}}/>
        </IconButton>
      </Stack>
      <Stack width={600}>
        <Stack textAlign='center' pt={1}>
          <Typography fontWeight={700} fontSize={28}>SỔ HỘ KHẨU</Typography>
          <Typography fontWeight={500} fontSize={16}>Số : {data.sohokhau}</Typography>
        </Stack>
        <Divider/>
        <Stack px={2} pt={1} direction='row' alignItems='end'>
          <Typography fontSize={16} fontWeight={400}>Họ và tên chủ hộ :</Typography>
          <Typography fontSize={20} fontWeight={410} pl={1}>{data.hotenchuho}</Typography>
        </Stack>
        <Stack px={2} pt={1} direction='row' alignItems='end'>
          <Typography fontSize={16} fontWeight={400}>Ngày làm hộ khẩu :</Typography>
          <Typography fontSize={18} fontWeight={410} pl={1}>{data.ngaylamhokhau}</Typography>
        </Stack>
        <Stack px={2} pt={1} direction='row'>
          <Stack direction='row' alignItems='end' width={220}>
            <Typography fontSize={16} fontWeight={400}>Số nhà :</Typography>
            <Typography fontSize={18} fontWeight={410} pl={1}>{data.sonha}</Typography>
          </Stack>
          <Stack direction='row' alignItems='end'>
            <Typography fontSize={16} fontWeight={400}>Đường :</Typography>
            <Typography fontSize={18} fontWeight={410} pl={1}>{data.duong}</Typography>
          </Stack>
        </Stack>
        <Stack px={2} pb={1} pt={1} direction='row' alignItems='end'>
          <Stack direction='row' alignItems='end' width={220}>
            <Typography fontSize={16} fontWeight={400}>Phường :</Typography>
            <Typography fontSize={18} fontWeight={410} pl={1}>{data.phuong}</Typography>
          </Stack>
          <Stack direction='row' alignItems='end'>
            <Typography fontSize={16} fontWeight={400}>Quận :</Typography>
            <Typography fontSize={18} fontWeight={410} pl={1}>{data.quan}</Typography>
          </Stack>
        </Stack>
        <Divider/>
        <Stack p={1} px={2}>
          <Typography fontWeight={450} fontSize={18}>Danh sách nhân khẩu</Typography>
          <Stack direction='row' flexWrap='wrap' pt={1} pl={2} alignItems='center'>
            {
              dataNhankhau.map((nhankhau) => (
                <Stack key={nhankhau.id}>
                  <Stack onClick={() => {
                    NiceModal.show(DialogShowNhanKhau, {data: nhankhau,onAlert:handleAlert})
                  }} border={1.7} m={1} width={250} borderRadius={3}
                         sx={{borderColor: colors.blue[800], paddingX: 1.5, cursor: 'pointer'}} p={1}>
                    <Stack direction='row' alignItems='end'>
                      <Typography fontSize={16} fontWeight={400}>Họ tên :</Typography>
                      <Typography fontSize={16} fontWeight={410} pl={0.5}>{nhankhau.hoten}</Typography>
                    </Stack>
                    <Stack direction='row' alignItems='end'>
                      <Typography fontSize={16} fontWeight={400}>CCCD :</Typography>
                      <Typography fontSize={16} fontWeight={410} pl={0.5}>{nhankhau.cccd}</Typography>
                    </Stack>
                    <Stack direction='row' alignItems='end'>
                      <Typography fontSize={16} fontWeight={400}>Quan hệ chủ hộ : </Typography>
                      <Typography fontSize={16} fontWeight={410} pl={0.5}>{nhankhau.quanhevoichuho}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              ))
            }
          </Stack>
        </Stack>
        <Divider/>
        <Stack direction='row-reverse' px={2} py={1} spacing={1}>
          <Button onClick={() => props.onSetIndex(1)} variant='outlined' color="warning" startIcon={<EditIcon/>}>Chỉnh
            sửa</Button>
          <Button onClick={()=>{NiceModal.show(DialogCofirm,{ cccd:data.cccdchuho ,onClose: handleCloseDialogShow})}}  variant='outlined' color="error" startIcon={<DeleteIcon/>}>Xóa</Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

const validationSchema = yup.object({
  cccd: yup
    .string('Nhập số CCCD')
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'CCCD phải là các số')
    .required('Số CCCD không được trống'),
  sonha: yup
    .string('Nhập số nhà')
    .required('Số nhà không được trống'),
  duong: yup
    .string('Nhập đường')
    .required('Đường không được trống'),
  phuong: yup
    .string('Nhập Phường')
    .required('Phường không được trống'),
  quan: yup
    .string('Nhập Quận')
    .required('Quận không được trống'),
  ngaylamhokhau: yup
    .string('Nhập Quận')
    .required('Ngày làm hộ khẩu không được trống'),
});

const EditHoKhau = (props) => {
  const data = props.data
  const dataHokhau = useSelector(state => state.hokhau)
  const modal = useModal();
  const token = useSelector(tokenSelector)
  const dispatch = useDispatch()
  const resetFormRef = useRef();
  const formik = useFormik({
    initialValues: {
      cccd: data.cccdchuho,
      sonha: data.sonha,
      duong: data.duong,
      phuong: data.phuong,
      quan: data.quan,
      ngaylamhokhau: data.ngaylamhokhau,
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      const dataFetch = {
        token : token,
        data: {
          cccd: values.cccd,
          sonha: values.sonha,
          duong: values.duong,
          phuong: values.phuong,
          quan: values.quan,
          ngaylamhokhau: values.ngaylamhokhau
        },
      }
      dispatch(fetchUpdateHokhau(dataFetch))
      resetFormRef.current = resetForm
    },
  });
  useEffect(() => {
    if (dataHokhau.status === "success updatehokhau") {
      modal.hide();
      props.onAlert();
      if (resetFormRef.current) {
        resetFormRef.current();
      }
    }
  }, [dataHokhau])
  return (
    <>
      <Stack position='absolute' sx={{right: 6, top: 6}}>
        <IconButton onClick={() => {
          modal.hide()
        }} aria-label="delete">
          <ClearIcon sx={{color: colors.grey[900]}}/>
        </IconButton>
      </Stack>
      <Stack width={600}>
        <Stack textAlign='center' pt={1}>
          <Typography fontWeight={700} fontSize={28}>CHỈNH SỬA HỘ KHẨU</Typography>
        </Stack>
        <Divider/>
        <form onSubmit={formik.handleSubmit}>
          <Stack px={2} pt={1}>
            <Stack direction="row">
              <Stack pr={1} width='50%'>
                <TextField
                  disabled
                  margin="normal"
                  fullWidth
                  label="Số CCCD chủ hộ"
                  name="cccd"
                  value={formik.values.cccd}
                  onChange={formik.handleChange}
                  error={formik.touched.cccd && Boolean(formik.errors.cccd)}
                  helperText={formik.touched.cccd && formik.errors.cccd}
                />
              </Stack>
              <Stack width='50%'>
                <TextField
                  margin="normal"
                  fullWidth
                  type='date'
                  label="Ngày làm hộ khẩu"
                  name="ngaylamhokhau"
                  value={formik.values.ngaylamhokhau}
                  onChange={formik.handleChange}
                  error={formik.touched.ngaylamhokhau && Boolean(formik.errors.ngaylamhokhau)}
                  helperText={formik.touched.ngaylamhokhau && formik.errors.ngaylamhokhau}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Stack pr={1} width='50%'>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Số nhà"
                  name="sonha"
                  value={formik.values.sonha}
                  onChange={formik.handleChange}
                  error={formik.touched.sonha && Boolean(formik.errors.sonha)}
                  helperText={formik.touched.sonha && formik.errors.sonha}
                />
              </Stack>
              <Stack width='50%'>
                <TextField
                  margin="normal"
                  fullWidth
                  name="duong"
                  label="Đường"
                  id="duong"
                  value={formik.values.duong}
                  onChange={formik.handleChange}
                  error={formik.touched.duong && Boolean(formik.errors.duong)}
                  helperText={formik.touched.duong && formik.errors.duong}
                />

              </Stack>
            </Stack>
            <TextField
              margin="normal"
              fullWidth
              name="phuong"
              label="Phường"
              id="phuong"
              value={formik.values.phuong}
              onChange={formik.handleChange}
              error={formik.touched.phuong && Boolean(formik.errors.phuong)}
              helperText={formik.touched.phuong && formik.errors.phuong}
            />
            <TextField
              margin="normal"
              fullWidth
              name="quan"
              label="Quận"
              id="quan"
              value={formik.values.quan}
              onChange={formik.handleChange}
              error={formik.touched.quan && Boolean(formik.errors.quan)}
              helperText={formik.touched.quan && formik.errors.quan}
            />
            <Stack pl={1}>
            </Stack>
            <Divider/>
            <Stack px={2} py={1} justifyContent='space-between' direction='row'>
              <Button onClick={() => props.onSetIndex(0)} variant="outlined" sx={{color: colors.grey[600]}}
                      startIcon={<KeyboardReturnIcon/>}>Quay Lại</Button>
              <Button type="submit" variant="contained" endIcon={<SaveIcon/>}>Lưu</Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </>
  )
}



export default DialogShowHoKhau;

