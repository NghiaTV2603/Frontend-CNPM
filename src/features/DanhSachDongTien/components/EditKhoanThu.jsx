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
import {fetchAddKhoanthu, fetchUpdateKhoanthu} from "src/features/DanhSachDongTien/khoanthuSlice";

const validationSchema = yup.object({
  tenkhoanthu: yup
    .string('Nhập số nhà')
    .required('Tên khoản thu không được trống'),
  thoihan: yup
    .string('Nhập đường')
    .required('thời hạn không được trống'),
});

const EditKhoanThu = NiceModal.create(({dataKhoanthu, onAlert}) => {
  const token = useSelector(tokenSelector)
  const data = useSelector((state) => state.khoanthu)
  const modal = useModal();
  const resetFormRef = useRef();
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      tenkhoanthu: dataKhoanthu.tenkhoanthu,
      thoihan: dataKhoanthu.thoihan,
      batbuoc: dataKhoanthu.batbuoc,
      ghichu: dataKhoanthu.ghichu,
      ngaytao: dataKhoanthu.ngaytao
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      const dataFetch = {
        token: token,
        id: dataKhoanthu.id,
        data: values
      }
      resetFormRef.current = resetForm
      dispatch(fetchUpdateKhoanthu(dataFetch))
    },
  });

  useEffect(() => {
    if (data.status === "success updateKhoanthu") {
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
         Chỉnh sửa thêm khoản thu{' '}
        </Typography>
        <Divider/>
        <form onSubmit={formik.handleSubmit}>
          <Stack px={2} pt={1}>
            <TextField
              margin="normal"
              fullWidth
              label="Tên Khoản thu"
              name="tenkhoanthu"
              value={formik.values.tenkhoanthu}
              onChange={formik.handleChange}
              error={formik.touched.tenkhoanthu && Boolean(formik.errors.tenkhoanthu)}
              helperText={formik.touched.tenkhoanthu && formik.errors.tenkhoanthu}
            />
            <Stack direction='row'>
              <TextField
                sx={{marginRight:1}}
                margin="normal"
                fullWidth
                type='date'
                label="Ngày thu"
                name="ngaytao"
                value={formik.values.ngaytao}
                onChange={formik.handleChange}
                error={formik.touched.ngaytao && Boolean(formik.errors.ngaytao)}
                helperText={formik.touched.ngaytao && formik.errors.ngaytao}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                sx={{marginRight:1}}
                margin="normal"
                fullWidth
                type='date'
                label="Thời hạn"
                name="thoihan"
                value={formik.values.thoihan}
                onChange={formik.handleChange}
                error={formik.touched.thoihan && Boolean(formik.errors.thoihan)}
                helperText={formik.touched.thoihan && formik.errors.thoihan}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl fullWidth sx={{marginTop:2}}>
                <InputLabel id="demo-simple-select-label">Bắt Buộc</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Bắt buộc"
                  value={formik.values.batbuoc}
                  onChange={formik.handleChange}
                  name='batbuoc'
                >
                  <MenuItem value={0}>Không</MenuItem>
                  <MenuItem value={1}>Có</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <TextField
              margin="normal"
              fullWidth
              multiline
              label="Ghi chú"
              name="ghichu"
              value={formik.values.ghichu}
              onChange={formik.handleChange}
              error={formik.touched.ghichu && Boolean(formik.errors.ghichu)}
              helperText={formik.touched.ghichu && formik.errors.ghichu}
            />
            <Typography fontSize={16} fontWeight={410}
                        color={'red'}>{data.status === "error" && "Lỗi thời gian hết hạn"}</Typography>
            <Stack pt={1} pb={2} direction="row-reverse" spacing={2}>
              <Button type="submit" variant="contained">
                Lưu
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


export default EditKhoanThu
