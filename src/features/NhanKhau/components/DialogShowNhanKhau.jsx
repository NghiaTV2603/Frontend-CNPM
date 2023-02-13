import React, {useEffect, useRef} from 'react'
import {
  Button, colors,
  Dialog, Divider, Stack, Typography, IconButton, TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import SaveIcon from "@mui/icons-material/Save";
import DialogShowHoKhau from "src/features/HoKhau/components/DialogShowHoKhau";
import DialogCofirm from "src/features/NhanKhau/components/DialogConfirm";
import * as yup from "yup";
import {useFormik} from "formik";
import {fetchAddNhankhau, fetchUpdateNhankhau, nhankhauSlice} from "src/features/NhanKhau/nhankhauSlice";
import {useDispatch, useSelector} from "react-redux";
import {tokenSelector} from "src/app/selector";

const DialogShowNhanKhau = NiceModal.create(({data,onAlert}) => {
  const handleAlert = () => {
    onAlert()
  }
  const modal = useModal();
  const [index, setIndex] = React.useState(0)
  const handleSetIndex = (index) => {
    setIndex(index);
  }
  return (
    <Dialog open={modal.visible} onClose={() => modal.hide()} maxWidth="md">
      {index === 0 && <ShowNhanKhau onOpenAlert={handleAlert} onSetIndex={handleSetIndex} data={data}/>}
      {index === 1 && <EditNhanKhau onOpenAlert={handleAlert} onSetIndex={handleSetIndex} data={data}/>}
    </Dialog>
  );
})

const ShowNhanKhau = (props) => {
  const modal = useModal();
  const data = props.data;
  const handleCloseDialogShow = () => {
    modal.hide()
    props.onOpenAlert()
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
        <Button onClick={() => {
          NiceModal.show(DialogCofirm, {id: data.id, onClose: handleCloseDialogShow})
        }} disabled={data.quanhevoichuho === "Là chủ hộ"} variant='outlined' color="error"
                startIcon={<DeleteIcon/>}>Xóa</Button>
      </Stack>
    </Stack>
  )
}


// ==================== handle edit nhan khau ==================== //

const validationSchema = yup.object({
  hoten: yup
    .string('Nhập đường')
    .required('Họ tên không được trống'),
  cccd: yup
    .string('Nhập số CCCD')
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'CCCD phải là các số')
    .required('Số CCCD không được trống'),
  ngaycap: yup
    .string('Nhập đường')
    .required('Ngày cấp không được trống'),
  noicap: yup
    .string('Nhập đường')
    .required('Nơi cấp không được trống'),
  ngaysinh: yup
    .string('Nhập đường')
    .required('Ngày sinh không được trống'),
  quequan: yup
    .string('Nhập đường')
    .required('Quê quán không được trống'),
  dantoc: yup
    .string('Nhập đường')
    .required('Dân tộc không được trống'),
  ngaythemnhankhau: yup
    .string('Nhập đường')
    .required('Ngày thêm nhân khẩu không được trống'),

});


const EditNhanKhau = (props) => {
  const token = useSelector(tokenSelector)
  const dispatch = useDispatch()
  const data = useSelector(state => state.nhankhau)
  const dataNhanKhau = props.data

  const resetFormRef = useRef();
  const formik = useFormik({
    initialValues: {
      sohokhau: dataNhanKhau.sohokhau,
      quanhevoichuho: dataNhanKhau.quanhevoichuho,
      hoten: dataNhanKhau.hoten,
      cccd: dataNhanKhau.cccd,
      ngaycap: dataNhanKhau.ngaycap,
      noicap: dataNhanKhau.noicap,
      ngaysinh: dataNhanKhau.ngaysinh,
      nghenghiep: dataNhanKhau.nghenghiep,
      gioitinh: dataNhanKhau.gioitinh,
      quequan: dataNhanKhau.quequan,
      dantoc: dataNhanKhau.dantoc,
      tongiao: dataNhanKhau.tongiao,
      ngaythemnhankhau: dataNhanKhau.ngaythemnhankhau,
      ghichu: dataNhanKhau.ghichu,
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      const dataFetch = {};
      dataFetch.token = token
      dataFetch.idnhankhau = dataNhanKhau.id
      dataFetch.data = values
      console.log(dataFetch)
      dispatch(fetchUpdateNhankhau(dataFetch))
      resetFormRef.current = resetForm
    }
  });

  useEffect(() => {
    if (data.status === "success update") {
      modal.hide()
      props.onOpenAlert()
      if (resetFormRef.current) {
        resetFormRef.current();
      }
      dispatch(nhankhauSlice.actions.resetStatus())
    }
  }, [data])


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

      <form onSubmit={formik.handleSubmit}>
        <Stack py={1} px={2}>
          <Stack direction="row">
            <TextField
              margin="normal"
              fullWidth
              id="hoten"
              label="Họ và tên"
              name="hoten"
              autoFocus
              sx={{paddingRight: 1}}
              value={formik.values.hoten}
              onChange={formik.handleChange}
              error={formik.touched.hoten && Boolean(formik.errors.hoten)}
              helperText={formik.touched.hoten && formik.errors.hoten}
            />
            <TextField
              margin="normal"
              fullWidth
              id="sohokhau"
              label="Số Hộ khẩu"
              name="sohokhau"
              autoFocus
              sx={{paddingRight: 1}}
              value={formik.values.sohokhau}
              onChange={formik.handleChange}
              error={formik.touched.sohokhau && Boolean(formik.errors.sohokhau)}
              helperText={formik.touched.sohokhau && formik.errors.sohokhau}
            />
            <TextField
              disabled={dataNhanKhau.quanhevoichuho === "Là chủ hộ"}
              margin="normal"
              fullWidth
              name="quanhevoichuho"
              label="Quan hệ chủ hộ"
              id="quanhechuho"
              value={formik.values.quanhevoichuho}
              onChange={formik.handleChange}
              error={formik.touched.quanhevoichuho && Boolean(formik.errors.quanhevoichuho)}
              helperText={formik.touched.quanhevoichuho && formik.errors.quanhevoichuho}
            />
          </Stack>
          <Stack direction="row">
            <TextField
              margin="normal"
              fullWidth
              name="cccd"
              label="Căn cước công dân"
              id="cccd"
              sx={{paddingRight: 1}}
              value={formik.values.cccd}
              onChange={formik.handleChange}
              error={formik.touched.cccd && Boolean(formik.errors.cccd)}
              helperText={formik.touched.cccd && formik.errors.cccd}
            />
            <Stack width={670} pr={1}>
              <TextField
                margin="normal"
                fullWidth
                type='date'
                label="Ngày Cấp CCCD"
                name="ngaycap"
                value={formik.values.ngaycap}
                onChange={formik.handleChange}
                error={formik.touched.ngaycap && Boolean(formik.errors.ngaycap)}
                helperText={formik.touched.ngaycap && formik.errors.ngaycap}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>
            <TextField
              margin="normal"
              fullWidth
              name="noicap"
              label="Nơi cấp"
              id="noicap"
              value={formik.values.noicap}
              onChange={formik.handleChange}
              error={formik.touched.noicap && Boolean(formik.errors.noicap)}
              helperText={formik.touched.noicap && formik.errors.noicap}
            />
          </Stack>
          <Stack direction="row">
            <Stack width={670} pr={1}>
              <TextField
                margin="normal"
                fullWidth
                type='date'
                label="Ngày Sinh"
                name="ngaysinh"
                value={formik.values.ngaysinh}
                onChange={formik.handleChange}
                error={formik.touched.ngaysinh && Boolean(formik.errors.ngaysinh)}
                helperText={formik.touched.ngaysinh && formik.errors.ngaysinh}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>
            <TextField
              margin="normal"
              fullWidth
              id="nghenghiep"
              label="Nghề nghiệp"
              name="nghenghiep"
              autoFocus
              sx={{paddingRight: 1}}
              value={formik.values.nghenghiep}
              onChange={formik.handleChange}
              error={formik.touched.nghenghiep && Boolean(formik.errors.nghenghiep)}
              helperText={formik.touched.nghenghiep && formik.errors.nghenghiep}
            />
            <Stack pt={2} width={670}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Giới Tính"
                  value={formik.values.gioitinh}
                  onChange={formik.handleChange}
                  name='gioitinh'
                >
                  <MenuItem value={0}>Nữ</MenuItem>
                  <MenuItem value={1}>Nam</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          <TextField
            margin="normal"
            fullWidth
            name="quequan"
            label="Quê quán"
            id="quequan"
            value={formik.values.quequan}
            onChange={formik.handleChange}
            error={formik.touched.quequan && Boolean(formik.errors.quequan)}
            helperText={formik.touched.quequan && formik.errors.quequan}
          />
          <Stack direction="row" alignItems="center">
            <Stack pr={1} width={450}>
              <TextField
                margin="normal"
                fullWidth
                id="dantoc"
                label="Dân tộc"
                name="dantoc"
                value={formik.values.dantoc}
                onChange={formik.handleChange}
                error={formik.touched.dantoc && Boolean(formik.errors.dantoc)}
                helperText={formik.touched.dantoc && formik.errors.dantoc}
              />
            </Stack>
            <Stack pr={1} width={450}>
              <TextField
                margin="normal"
                fullWidth
                name="tongiao"
                label="Tôn giáo"
                id="tongiao"
                value={formik.values.tongiao}
                onChange={formik.handleChange}
                error={formik.touched.tongiao && Boolean(formik.errors.tongiao)}
                helperText={formik.touched.tongiao && formik.errors.tongiao}/>
            </Stack>
            <TextField
              margin="normal"
              fullWidth
              type='date'
              label="Ngày thêm nhân khẩu"
              name="ngaythemnhankhau"
              value={formik.values.ngaythemnhankhau}
              onChange={formik.handleChange}
              error={formik.touched.ngaythemnhankhau && Boolean(formik.errors.ngaythemnhankhau)}
              helperText={formik.touched.ngaythemnhankhau && formik.errors.ngaythemnhankhau}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
          <TextField
            margin="normal"
            fullWidth
            name="ghichu"
            label="Ghi chú"
            id="ghichu"
            value={formik.values.ghichu}
            onChange={formik.handleChange}
            error={formik.touched.ghichu && Boolean(formik.errors.ghichu)}
            helperText={formik.touched.ghichu && formik.errors.ghichu}
          />
          <Stack pl={1}>
            <Typography fontSize={16} fontWeight={450}
                        color={'red'}>{data.status === "error update" && "Không tồn tại hộ khẩu"}</Typography>
          </Stack>
          <Stack py={1} pt={2} justifyContent='space-between' direction='row'>
            <Button onClick={() => props.onSetIndex(0)} variant="outlined" sx={{color: colors.grey[600]}}
                    startIcon={<KeyboardReturnIcon/>}>Quay Lại</Button>
            <Button type="submit" variant="contained" endIcon={<SaveIcon/>}>Lưu</Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  )
}


export default DialogShowNhanKhau
