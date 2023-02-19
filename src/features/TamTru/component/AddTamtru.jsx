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
import {fetchAddKhoanthu} from "src/features/DanhSachDongTien/khoanthuSlice";
import {fetchAddTamtru} from "src/features/TamTru/tamtrucSlice";

const validationSchema = yup.object({
  cccd: yup
    .string('Nhập số CCCD')
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'CCCD phải là các số')
    .required('Số khoản thu không được trống'),
  diachitamtrutamvang: yup
    .string('Nhập đường')
    .required('Địa chỉ không được trống'),
  thoigian: yup
    .string('Nhập đường')
    .required('Địa chỉ không được trống'),
});


const AddTamtru = NiceModal.create(({onAlert}) => {
  const token = useSelector(tokenSelector)
  const data = useSelector((state) => state.tamtru)
  const modal = useModal();
  const resetFormRef = useRef();
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      cccd: '',
      trangthai: 0,
      diachitamtrutamvang: '',
      noidungdenghi: '',
      thoigian : null ,
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      const dataFetch = {
        token: token,
        data: values
      }
      resetFormRef.current = resetForm
      dispatch(fetchAddTamtru(dataFetch))
      console.log(dataFetch)
    },
  });

  useEffect(() => {
    if (data.status === "success add") {
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
          Thêm Tạm trú / Tạm vắng{' '}
        </Typography>
        <Divider/>
        <form onSubmit={formik.handleSubmit}>
          <Stack px={2} pt={1}>
            <TextField
              margin="normal"
              fullWidth
              label="Căn cước công dân"
              name="cccd"
              value={formik.values.cccd}
              onChange={formik.handleChange}
              error={formik.touched.cccd && Boolean(formik.errors.cccd)}
              helperText={formik.touched.cccd && formik.errors.cccd}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Trạng thái"
                value={formik.values.trangthai}
                onChange={formik.handleChange}
                name='trangthai'
              >
                <MenuItem value={0}>Tạm trú</MenuItem>
                <MenuItem value={1}>Tạm vắng</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              fullWidth
              type='date'
              label="Thời gian"
              name="thoigian"
              value={formik.values.thoigian}
              onChange={formik.handleChange}
              error={formik.touched.thoigian && Boolean(formik.errors.thoigian)}
              helperText={formik.touched.thoigian && formik.errors.thoigian}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Địa chỉ"
              name="diachitamtrutamvang"
              value={formik.values.diachitamtrutamvang}
              onChange={formik.handleChange}
              error={formik.touched.diachitamtrutamvang && Boolean(formik.errors.diachitamtrutamvang)}
              helperText={formik.touched.diachitamtrutamvang && formik.errors.diachitamtrutamvang}
            />
            <Typography fontSize={16} fontWeight={410} color={'red'}>{data.status === "error" && data.message}</Typography>
            <Stack pt={1} pb={2} direction="row-reverse" spacing={2}>
              <Button type="submit" variant="contained">
                Thêm Tạm trú / Tạm vắng
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


export default AddTamtru
