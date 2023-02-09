import React from 'react'
import {
  Button, colors,
  Dialog, Divider, Stack, Typography,IconButton
} from '@mui/material';
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SaveIcon from '@mui/icons-material/Save';
import DialogShowNhanKhau from "src/features/NhanKhau/components/DialogShowNhanKhau";

const dataNhankhau = [
  {
    "id": 4,
    "hoten": "Trịnh Đức Tiệp",
    "ngaysinh": "2001-11-11",
    "gioitinh": 1,
    "quequan": "Nam Định",
    "dantoc": "Becgie",
    "tongiao": "Tin lành",
    "sohokhau": 4,
    "quanhevoichuho": 'chủ hộ',
    "cccd": "12345678912",
    "capngay": "2022-12-20",
    "noicap": "Công an tỉnh Nam Định",
    "nghenghiep": null,
    "ngaydangkythuongtru": null,
    "ngaythemnhankhau": null,
    "ghichu": null
  },
  {
    "id": 5,
    "hoten": "Nguyen van A",
    "ngaysinh": "2001-11-11",
    "gioitinh": 1,
    "quequan": "Nam Định",
    "dantoc": "Becgie",
    "tongiao": "Tin lành",
    "sohokhau": 4,
    "quanhevoichuho": "Em chủ hộ",
    "cccd": "12345678913",
    "capngay": "2022-12-20",
    "noicap": "Công an tỉnh Nam Định",
    "nghenghiep": null,
    "ngaydangkythuongtru": null,
    "ngaythemnhankhau": null,
    "ghichu": null
  },
  {
    "id": 6,
    "hoten": "Nguyen van A",
    "ngaysinh": "2001-11-11",
    "gioitinh": 1,
    "quequan": "Nam Định",
    "dantoc": "Becgie",
    "tongiao": "Tin lành",
    "sohokhau": 4,
    "quanhevoichuho": "Em chủ hộ",
    "cccd": "12345678913",
    "capngay": "2022-12-20",
    "noicap": "Công an tỉnh Nam Định",
    "nghenghiep": null,
    "ngaydangkythuongtru": null,
    "ngaythemnhankhau": null,
    "ghichu": null
  }
]

const ShowHoKhau = (props) => {
  const data = props.data
  const modal = useModal();
  return(
    <Stack>
      <Stack position='absolute' sx={{right:6,top:6}}>
        <IconButton onClick={()=>{modal.hide()}} aria-label="delete">
          <ClearIcon sx={{color:colors.grey[900]}} />
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
          <Typography fontSize={20} fontWeight={410} pl={1}>{data.tenchuho}</Typography>
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
          <Stack direction='row' flexWrap='wrap' pt={1} pl={2} alignItems='center' >
            {
              dataNhankhau.map((nhankhau) => (
                <Stack key={nhankhau.id}>
                  <Stack onClick={()=>{NiceModal.show(DialogShowNhanKhau,{data:nhankhau})}} border={1.7} m={1} width={250} borderRadius={3} sx={{borderColor: colors.blue[800],paddingX:1.5 , cursor:'pointer'}} p={1}>
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
          <Button onClick={()=>props.onSetIndex(1)} variant='outlined' color="warning" startIcon={<EditIcon />}>Chỉnh sửa</Button>
          <Button variant='outlined' color="error" startIcon={<DeleteIcon />}>Xóa</Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

const EditHoKhau = (props) => {
  const modal = useModal();
  return(
    <>
      <Stack position='absolute' sx={{right:6,top:6}}>
        <IconButton onClick={()=>{modal.hide()}} aria-label="delete">
          <ClearIcon sx={{color:colors.grey[900]}} />
        </IconButton>
      </Stack>
      <Stack width={600}>
        <Stack textAlign='center' pt={1}>
          <Typography fontWeight={700} fontSize={28}>CHỈNH SỬA HỘ KHẨU</Typography>
        </Stack>
        <Divider/>
        <Stack px={2} py={1} justifyContent='space-between' direction='row'>
          <Button onClick={()=>props.onSetIndex(0)} variant="outlined" sx={{color:colors.grey[600]}} startIcon={<KeyboardReturnIcon/>}>Quay Lại</Button>
          <Button variant="contained" endIcon={<SaveIcon/>} >Lưu</Button>
        </Stack>
      </Stack>
    </>
  )
}

const DialogShowHoKhau = NiceModal.create(({ data }) => {
  const modal = useModal();
  const [index,setIndex] = React.useState(0)
  const handleSetIndex = (index) => {
    setIndex(index) ;
  }
  return (
    <Dialog open={modal.visible} onClose={() => modal.hide()}>
      { index === 0 && <ShowHoKhau onSetIndex = {handleSetIndex} data={data} />}
      { index ===1 && <EditHoKhau onSetIndex = {handleSetIndex} data={data}/>}
    </Dialog>
  );
});

export default DialogShowHoKhau;

