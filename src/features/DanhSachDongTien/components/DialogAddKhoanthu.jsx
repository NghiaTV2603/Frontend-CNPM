import React, {useEffect, useRef} from 'react'
import {
  Button, colors,
  Dialog, Divider, Stack, Typography, IconButton, TextField, InputLabel, Select, MenuItem, FormControl
} from '@mui/material';
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SaveIcon from '@mui/icons-material/Save';
import DialogShowNhanKhau from "src/features/NhanKhau/components/DialogShowNhanKhau";
import {useFormik} from "formik";
import {fetchAddHokhau} from "src/features/HoKhau/hokhauSlice";
import * as yup from "yup";
import DialogCofirm from "src/features/HoKhau/components/DialogCofirm";
import {useDispatch, useSelector} from "react-redux";
import {tokenSelector} from "src/app/selector";
import {fetchAddKhoanthu} from "src/features/DanhSachDongTien/khoanthuSlice";

const validationSchema = yup.object({
  tenkhoanthu: yup
    .string('Nhập số nhà')
    .required('Tên khoản thu không được trống'),
  thoihan: yup
    .string('Nhập đường')
    .required('thời hạn không được trống'),
});


const DialogAddKhoanthu = NiceModal.create(({onAlert}) => {
  const token = useSelector(tokenSelector)
  const data = useSelector((state) => state.khoanthu)
  const modal = useModal();
  const resetFormRef = useRef();
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      tenkhoanthu: '',
      thoihan: '',
      batbuoc: 0,
      ghichu: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      const dataFetch = {
          token: token,
          data: values
      }
      resetFormRef.current = resetForm
      dispatch(fetchAddKhoanthu(dataFetch))
    },
  });

  useEffect(() => {
    if (data.status === "ok") {
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
            <TextField
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
            <FormControl fullWidth>
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
            <Typography fontSize={16} fontWeight={410} color={'red'}>{data.status === "error" && "Lỗi thời gian hết hạn"}</Typography>
            <Stack pt={1} pb={2} direction="row-reverse" spacing={2}>
              <Button type="submit" variant="contained">
                Thêm khoản thu
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

export default DialogAddKhoanthu
