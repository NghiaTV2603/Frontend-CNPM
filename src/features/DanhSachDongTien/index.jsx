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
  Dialog, Snackbar, Typography,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DialogAddHoKhau from 'src/features/HoKhau/components/DialogAddHoKhau';
import AddHomeIcon from '@mui/icons-material/AddHome';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PropTypes from 'prop-types';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {useSelector} from "react-redux";
import NiceModal from "@ebay/nice-modal-react";
import DialogShowHoKhau from "src/features/HoKhau/components/DialogShowHoKhau";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {fetchListHokhau} from "src/features/HoKhau/hokhauSlice";
import khoanthuSlice, {fetchListKhoanthu, fetchListThuphi} from "src/features/DanhSachDongTien/khoanthuSlice";
import {tokenSelector} from "src/app/selector";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PaidIcon from '@mui/icons-material/Paid';
import DialogAddKhoanthu from "src/features/DanhSachDongTien/components/DialogAddKhoanthu";
import DialogDeleteKhoanThu from "src/features/DanhSachDongTien/components/DialogDeleteKhoanThu";
import DialogAddThuPhi from "src/features/DanhSachDongTien/components/DialogAddThuPhi";
import DialogDeleteThuPhi from "src/features/DanhSachDongTien/components/DialogDeleteThuPhi";

function TablePaginationActions(props) {
  const theme = useTheme();
  const {count, page, rowsPerPage, onPageChange} = props;
  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };
  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };
  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };
  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (
    <Box sx={{flexShrink: 0, ml: 2.5}}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight/>
        ) : (
          <KeyboardArrowLeft/>
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft/>
        ) : (
          <KeyboardArrowRight/>
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function DanhSachDongTien() {
  const [index, setIndex] = useState(0)
  const [idKhoanThu, setIdKhoanThu] = useState(null)
  const handleSetIndex = (index, id) => {
    setIndex(index)
    setIdKhoanThu(id)
  }
  return (
    <>
      {index === 0 && <ShowKhoanThu onSetIndex={handleSetIndex}/>}
      {index === 1 && <ShowDanhSach onSetIndex={handleSetIndex} id={idKhoanThu}/>}

    </>
  )
}


//================== show khoan thu ===================//
const ShowKhoanThu = (props) => {

  const khoanthu = useSelector((state) => state.khoanthu.listKhoanthu)

  const token = useSelector(tokenSelector)
  // thong bao
  const [openAlert, setOpenAlert] = React.useState(false)
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  const dispatch = useDispatch()
  const handleOpenAlert = () => {
    setOpenAlert(true);
  }
  useEffect(() => {
    dispatch(fetchListKhoanthu(token))
  }, [])

  // xu ly chuyen trang
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - khoanthu.length) : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Stack>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{width: '100%'}}>
           Cập nhật Thành công !
        </Alert>
      </Snackbar>
      <Stack direction="row" p={3}>
        <Input
          sx={{
            backgroundColor: colors.grey[300],
            borderRadius: 1,
            paddingX: 2,
            height: 42,
            width: '45%',
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          }
        />
        <Button
          variant="outlined"
          sx={{
            marginLeft: 3,
            color: colors.grey[900],
            borderColor: colors.grey[900],
          }}
          endIcon={<ManageSearchIcon/>}
        >
          Tìm Kiếm
        </Button>
        <Button
          variant="contained"
          sx={{marginLeft: 3}}
          endIcon={<PaidIcon/>}
          onClick={() => {
            NiceModal.show(DialogAddKhoanthu,{onAlert : handleOpenAlert})
          }}
        >
          Thêm khoản thu
        </Button>
      </Stack>
      <Paper style={{height: 470, overflow: 'auto'}}>
        <TableContainer sx={{paddingX: 3}} component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Số khoản thu</StyledTableCell>
                <StyledTableCell>Tên Khoản thu</StyledTableCell>
                <StyledTableCell>Bắt buộc</StyledTableCell>
                <StyledTableCell>Ngày bắt đầu</StyledTableCell>
                <StyledTableCell>Ngày kết thúc</StyledTableCell>
                <StyledTableCell>Tổng số tiền</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                  ? khoanthu.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : khoanthu
              ).map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{row.id}</StyledTableCell>
                  <StyledTableCell>{row.tenkhoanthu}</StyledTableCell>
                  <StyledTableCell>{row.batbuoc === 1 ? "Có" : "Không"}</StyledTableCell>
                  <StyledTableCell>{row.ngaytao}</StyledTableCell>
                  <StyledTableCell>{row.thoihan}</StyledTableCell>
                  <StyledTableCell>30000000 VND</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => {
                      props.onSetIndex(1, row.id)
                    }} variant="outlined" sx={{marginRight:1}}>Xem danh sách</Button>
                    <Button onClick={()=>{
                      NiceModal.show(DialogDeleteKhoanThu,{id : row.id,onAlert : handleOpenAlert})
                    }} variant='contained' color={'error'}>Xóa</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{height: 53 * emptyRows}}>
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[6, 10, 25, {label: 'All', value: -1}]}
        count={khoanthu.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Stack>
  )
}


// ================== show danh sach =================== //


const ShowDanhSach = (props) => {
  const thuphi = useSelector((state) => state.khoanthu.currentKhoanThu)
  const token = useSelector(tokenSelector)
  const id = props.id
  const data = {
    token,
    id
  }

  // thong bao
  const [openAlert, setOpenAlert] = React.useState(false)
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  const handleAlert = () => {
    setOpenAlert(true)
  }


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchListThuphi(data))
  }, [])

  // xu ly chuyen trang
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - thuphi.length) : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Stack>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{width: '100%'}}>
          Cập nhật Thành công !
        </Alert>
      </Snackbar>
      <Typography fontSize={28} fontWeight={500} px={3} py={1}>Danh sách khoản thu số : {id}</Typography>
      <Stack direction="row" px={3} pb={3} spacing={2}>
        <Button onClick={() => {
          props.onSetIndex(0, null)
          dispatch(khoanthuSlice.actions.resetThuphi())
        }} variant='outlined' startIcon={<KeyboardReturnIcon/>}> Quay lại</Button>
        <Input
          sx={{
            backgroundColor: colors.grey[300],
            borderRadius: 1,
            height: 42,
            width: '45%',
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          }
        />
        <Button
          variant="outlined"
          sx={{
            marginLeft: 3,
            color: colors.grey[900],
            borderColor: colors.grey[900],
          }}
          endIcon={<ManageSearchIcon/>}
        >
          Tìm Kiếm
        </Button>
        <Button
          variant="contained"
          sx={{marginLeft: 3}}
          endIcon={<PaidIcon/>}
          onClick={()=>{
            NiceModal.show(DialogAddThuPhi,{onAlert : handleAlert})
          }}
        >
          Thêm thu phí
        </Button>
      </Stack>

      <Paper style={{height: 430, overflow: 'auto'}}>
        <TableContainer sx={{paddingX: 3}} component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>số hộ khẩu</StyledTableCell>
                <StyledTableCell>Người đóng</StyledTableCell>
                <StyledTableCell>số tiền</StyledTableCell>
                <StyledTableCell>Ngày nộp</StyledTableCell>
                <StyledTableCell>ghi chú</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                  ? thuphi.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : thuphi
              ).map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{row.sohokhau}</StyledTableCell>
                  <StyledTableCell>{row.nguoinop}</StyledTableCell>
                  <StyledTableCell>{row.sotien}</StyledTableCell>
                  <StyledTableCell>{row.ngaynop}</StyledTableCell>
                  <StyledTableCell>{row.ghichu}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="contained" sx={{marginRight: 1}} onClick={()=>{
                      NiceModal.show(DialogDeleteThuPhi,{id : row.id , onAlert : handleAlert })
                    }} color='error'>xóa</Button>
                    <Button variant="contained" color='info'>chỉnh sửa</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{height: 53 * emptyRows}}>
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
        count={thuphi.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Stack>
  )

}

