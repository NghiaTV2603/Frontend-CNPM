import {
  Button,
  colors,
  Input,
  InputAdornment,
  Stack,
  styled,
  Table,
  TableBody,
  Slide,
  Dialog,
} from "@mui/material";
import * as React from 'react';
import SearchIcon from "@mui/icons-material/Search";
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DialogAddHoKhau from "src/features/HoKhau/components/DialogAddHoKhau";

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.grey[900],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function HoKhau() {
  const hokhau = [
    {
      sohokhau: 1,
      idchuho: 1,
      sonha: 1,
      duong: 'Nguyen Tuan',
      phuong: 'Trung Quan',
      quan: 'Ha Son',
      ngaylamhokhau: '14-12-12',
    },
    {
      sohokhau: 2,
      idchuho: 2,
      sonha: 2,
      duong: 'Nguyen An Ninh',
      phuong: 'Nguyen An Ninh',
      quan: 'Tuong mai',
      ngaylamhokhau: '12-32-12',
    },
    {
      sohokhau: 2,
      idchuho: 2,
      sonha: 2,
      duong: 'Nguyen An Ninh',
      phuong: 'Nguyen An Ninh',
      quan: 'Tuong mai',
      ngaylamhokhau: '12-32-12',
    },
    {
      sohokhau: 2,
      idchuho: 2,
      sonha: 2,
      duong: 'Nguyen An Ninh',
      phuong: 'Nguyen An Ninh',
      quan: 'Tuong mai',
      ngaylamhokhau: '12-32-12',
    },
  ]
  const [openAddHokhau, setOpenAddHokhau] = React.useState(false);

  const handleClickOpenAddHoKhau = () => {
    setOpenAddHokhau(true);
  };

  const handleCloseAddHoKhau = () => {
    setOpenAddHokhau(false);
  };
  return (
    <Stack>
      <Stack direction='row' p={3}>
        <Input sx={{backgroundColor: colors.grey[300], borderRadius: 1, paddingX: 2, height: 42, width: '45%'}}
               startAdornment={
                 <InputAdornment position="start">
                   <SearchIcon/>
                 </InputAdornment>
               }/>
        <Button variant="outlined" sx={{marginLeft: 3, color: colors.grey[900], borderColor: colors.grey[900]}}>Tìm
          Kiếm</Button>
        <Button variant="contained" sx={{marginLeft: 3}} onClick={handleClickOpenAddHoKhau}>Thêm hộ khẩu</Button>
      </Stack>
      <Dialog

        open={openAddHokhau}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAddHoKhau}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogAddHoKhau handleCloseAddHoKhau={handleCloseAddHoKhau} />
      </Dialog>

      <TableContainer sx={{paddingX: 3}} component={Paper}>
        <Table sx={{minWidth: 700}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Số</StyledTableCell>
              <StyledTableCell>Chủ hộ</StyledTableCell>
              <StyledTableCell>Số nhà</StyledTableCell>
              <StyledTableCell>Đường</StyledTableCell>
              <StyledTableCell>Quận</StyledTableCell>
              <StyledTableCell>Ngày làm </StyledTableCell>
              <StyledTableCell ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hokhau.map((row) => (
              <StyledTableRow>
                <StyledTableCell>
                  {row.sohokhau}
                </StyledTableCell>
                <StyledTableCell>{row.idchuho}</StyledTableCell>
                <StyledTableCell>{row.sonha}</StyledTableCell>
                <StyledTableCell>{row.duong}</StyledTableCell>
                <StyledTableCell>{row.quan}</StyledTableCell>
                <StyledTableCell>{row.ngaylamhokhau}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button variant='outlined'> Chi Tiết</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}
