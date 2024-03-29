import {
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material';
import * as React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {fetchAddNhankhau, nhankhauSlice} from "src/features/NhanKhau/nhankhauSlice";
import {useEffect,useRef} from "react";

const validationSchema = yup.object({
  hoten: yup
    .string('Nhập đường')
    .required('Họ tên không được trống'),
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

export default function DialogAddNhanKhau(props) {
  const token = useSelector((state) => state.authen.accessToken)
  const dispatch = useDispatch();
  const data = useSelector((state) => state.nhankhau)

  const resetFormRef = useRef();
  const formik = useFormik({
    initialValues: {
      sohokhau: '',
      quanhevoichuho: '',
      hoten: '',
      cccd: '',
      ngaycap: '',
      noicap: '',
      ngaysinh: '',
      nghenghiep: '',
      gioitinh: 0,
      quequan: '',
      dantoc: '',
      tongiao: '',
      ngaythemnhankhau: '',
      ghichu: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      if (values.sohokhau.length === 0) {
        const dataFetch = {
          token: token,
          data: {
            quanhevoichuho: values.quanhevoichuho,
            hoten: values.hoten,
            cccd: values.cccd,
            ngaycap: values.ngaycap,
            noicap: values.noicap,
            ngaysinh: values.ngaysinh,
            nghenghiep: values.nghenghiep,
            gioitinh: values.gioitinh,
            quequan: values.quequan,
            dantoc: values.dantoc,
            tongiao: values.tongiao,
            ngaythemnhankhau: values.ngaythemnhankhau,
            ghichu: values.ghichu,
          }
        }
        dispatch(fetchAddNhankhau(dataFetch))
      } else {
        const dataFetch = {};
        dataFetch.token = token
        dataFetch.data = values
        console.log(dataFetch)
        dispatch(fetchAddNhankhau(dataFetch))
      }
      resetFormRef.current = resetForm
    }
  });

  useEffect(()=>{
    if (data.status === "Success"){
      props.onCloseOK()
      if (resetFormRef.current) {
        resetFormRef.current();
      }
      dispatch(nhankhauSlice.actions.resetStatus())
    }
  },[data])
  return (
    <Stack width={700} px={2}>
      <Typography fontSize={28} fontWeight={600} py={1} align="center">
        {' '}
        Thêm nhân khẩu{' '}
      </Typography>
      <Divider/>
      <form onSubmit={formik.handleSubmit}>
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
                      color={'red'}>{data.status === 'error' && data.message}</Typography>
        </Stack>
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

      </form>
    </Stack>
  )
}
