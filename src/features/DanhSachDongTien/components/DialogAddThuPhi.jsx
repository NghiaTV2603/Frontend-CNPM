import React, {useEffect, useRef} from 'react'
import {
  Button,
  Dialog, Divider, Stack, Typography, TextField, InputLabel, Select, MenuItem, FormControl
} from '@mui/material';
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {tokenSelector} from "src/app/selector";
import {fetchAddKhoanthu, fetchAddThuphi} from "src/features/DanhSachDongTien/khoanthuSlice";


const validationSchema = yup.object({
  idkhoanthu: yup
    .string('Nhập số CCCD')
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'số khoản thu phải là các số')
    .required('Số khoản thu không được trống'),
  sohokhau: yup
    .string('Nhập đường')
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'số hộ khẩu phải là các số')
    .required('Số hộ khẩu không được trống'),
  sotien: yup
    .string('Nhập đường')
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'số tiền phải là các số')
    .required('Số tiền không được trống'),
  nguoinop: yup
    .string('Nhập đường')
    .required('Tên Người nộp không được trống'),
});

const DialogAddThuPhi = NiceModal.create(({onAlert}) => {
  const token = useSelector(tokenSelector)
  const data = useSelector((state) => state.khoanthu)
  const modal = useModal();
  const resetFormRef = useRef();
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      idkhoanthu: '',
      sohokhau: '',
      sotien: '',
      nguoinop: '',
      ghichu: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      const dataFetch = {
        token: token,
        data: values
      }
      resetFormRef.current = resetForm
      dispatch(fetchAddThuphi(dataFetch))
    },
  });

  useEffect(() => {
    if (data.status === "Success thuphi") {
      modal.hide();
      onAlert();
      if (resetFormRef.current) {
        resetFormRef.current();
      }
    }
  }, [data])
  return (
    <Dialog open={modal.visible} onClose={() => modal.hide()}>
      <Stack width={600}>
        <Typography fontSize={28} fontWeight={600} py={1.5} align="center">
          Thêm khoản thu{' '}
        </Typography>
        <Divider/>
        <form onSubmit={formik.handleSubmit}>
          <Stack px={2} pt={1}>
            <Stack direction={'row'}  alignItems={'center'}>
              <TextField
                sx={{marginRight:1}}
                margin="normal"
                fullWidth
                label="Số khoản thu"
                name="idkhoanthu"
                value={formik.values.idkhoanthu}
                onChange={formik.handleChange}
                error={formik.touched.idkhoanthu && Boolean(formik.errors.idkhoanthu)}
                helperText={formik.touched.idkhoanthu && formik.errors.idkhoanthu}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Số hộ khẩu"
                name="sohokhau"
                value={formik.values.sohokhau}
                onChange={formik.handleChange}
                error={formik.touched.sohokhau && Boolean(formik.errors.sohokhau)}
                helperText={formik.touched.sohokhau && formik.errors.sohokhau}
              />
            </Stack>
            <Stack direction={'row'}  alignItems={'center'}>
              <TextField
                sx={{marginRight:1}}
                margin="normal"
                fullWidth
                label=" Nhập số tiền"
                name="sotien"
                value={formik.values.sotien}
                onChange={formik.handleChange}
                error={formik.touched.sotien && Boolean(formik.errors.sotien)}
                helperText={formik.touched.sotien && formik.errors.sotien}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Người nộp"
                name="nguoinop"
                value={formik.values.nguoinop}
                onChange={formik.handleChange}
                error={formik.touched.nguoinop && Boolean(formik.errors.nguoinop)}
                helperText={formik.touched.nguoinop && formik.errors.nguoinop}
              />
            </Stack>
            <TextField
              margin="normal"
              fullWidth
              label="Ghi chú"
              name="ghichu"
              value={formik.values.ghichu}
              onChange={formik.handleChange}
              error={formik.touched.ghichu && Boolean(formik.errors.ghichu)}
              helperText={formik.touched.ghichu && formik.errors.ghichu}
            />
            <Typography fontSize={16} fontWeight={410}
                        color={'red'}>{data.status === "error add thuphi" && data.message}</Typography>
            <Stack pt={1} pb={2} direction="row-reverse" spacing={2}>
              <Button type="submit" variant="contained">
                Thêm Thu Phí
              </Button>
              <Button
                onClick={() => modal.hide()}
                variant="outlined"
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Dialog>
  )
})

export default DialogAddThuPhi
