import * as React from 'react';
import {
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {useFormik} from 'formik';
import * as yup from 'yup';


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
});

export default function DialogAddHoKhau() {

  const formik = useFormik({
    initialValues: {
      cccd: '',
      sonha: '',
      duong: '',
      phuong: '',
      quan: '',
      ngaylamhokhau: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Stack width={600}>
      <Typography fontSize={28} py={1.5} align="center">
        Thêm hộ khẩu{' '}
      </Typography>
      <Divider/>
      <form onSubmit={formik.handleSubmit}>
        <Stack px={2} pt={1}>
          <Stack direction="row">
            <Stack pr={1} width='50%'>
              <TextField
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
            <Stack  width='50%'>

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
          <Stack py={2} direction="row-reverse" spacing={2}>
            <Button type="submit" variant="contained">
              Thêm hộ khẩu
            </Button>
            <Button
              variant="outlined"
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  )
}
