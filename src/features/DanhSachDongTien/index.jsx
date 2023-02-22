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
  Snackbar,
  Typography, TextField,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PropTypes from 'prop-types';
import TablePagination from '@mui/material/TablePagination';
import { useSelector } from 'react-redux';
import NiceModal from '@ebay/nice-modal-react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import khoanthuSlice, {
  fetchListKhoanthu,
  fetchListThuphi, fetchSearch,
} from 'src/features/DanhSachDongTien/khoanthuSlice';
import { tokenSelector } from 'src/app/selector';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PaidIcon from '@mui/icons-material/Paid';
import DialogAddKhoanthu from 'src/features/DanhSachDongTien/components/DialogAddKhoanthu';
import DialogDeleteKhoanThu from 'src/features/DanhSachDongTien/components/DialogDeleteKhoanThu';
import DialogAddThuPhi from 'src/features/DanhSachDongTien/components/DialogAddThuPhi';
import DialogDeleteThuPhi from 'src/features/DanhSachDongTien/components/DialogDeleteThuPhi';
import EditKhoanThu from 'src/features/DanhSachDongTien/components/EditKhoanThu';
import EditThuPhi from 'src/features/DanhSachDongTien/components/EditThuPhi';
import Skeleton from '@mui/material/Skeleton';
import {TablePaginationActions} from "src/features/HoKhau";
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import ShowChuaDong from "src/features/DanhSachDongTien/components/ShowChuaDong";

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.grey[900],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
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
  const [index, setIndex] = useState(0);
  const [idKhoanThu, setIdKhoanThu] = useState(null);
  const [thoihan,setThoihan] = useState(null);
  const [currentKhoanthu,setCurrentKhoanthu] = useState(null)
  const handleSetIndex = (index, id) => {
    setIndex(index);
    setIdKhoanThu(id);
  };
  const handeSetThoihan = (thoihan) => {
    setThoihan(thoihan)
  }
  const handeSetCurrentKhoanthu = (data) => {
    setCurrentKhoanthu(data)
  }

  return (
    <>
      {index === 0 && <ShowKhoanThu onSetIndex={handleSetIndex} onSetThoiHan = {handeSetThoihan} onSetCurrentKhoanthu = {handeSetCurrentKhoanthu} />}
      {index === 1 && (
        <ShowDanhSach onSetIndex={handleSetIndex} id={idKhoanThu} thoihan ={thoihan} currentKhoanthu={currentKhoanthu} />
      )}
    </>
  );
}

//================== show khoan thu ===================//
const ShowKhoanThu = (props) => {
  const khoanthu = useSelector((state) => state.khoanthu.listKhoanthu);
  const status = useSelector((state) => state.khoanthu.status);
  const token = useSelector(tokenSelector);
  // thong bao
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  const dispatch = useDispatch();
  const handleOpenAlert = () => {
    setOpenAlert(true);
  };
  useEffect(() => {
    dispatch(fetchListKhoanthu(token));
  }, []);

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

  // search khoan thu

  const [tenKhoanThu , setTenKhoanThu] = useState('')
  const dataFetch = {
    token : token,
    tenkhoanthu:tenKhoanThu
  }
  const handleSearch = () => {
    dispatch(fetchSearch(dataFetch))
  }

  return (
    <Stack>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: '100%' }}
        >
          Cập nhật Thành công !
        </Alert>
      </Snackbar>
      <Stack direction="row" p={3} alignItems={'center'}>
        <TextField
          margin="normal"
          fullWidth
          label="Tên khoản thu"
          name="tenkhoanthu"
          value={tenKhoanThu}
          onChange={(e) => {
            setTenKhoanThu(e.target.value)
          }}
          sx={{marginRight: 1,width:600}}
          size="small"
        />
        <Button
          variant="outlined"
          sx={{
            marginLeft: 3,
            color: colors.grey[900],
            borderColor: colors.grey[900],
            height:40,
            marginTop:1
          }}
          onClick={handleSearch}
          endIcon={<ManageSearchIcon />}
        >
          Tìm Kiếm
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: 3,height:40,
            marginTop:1 }}
          endIcon={<PaidIcon />}
          onClick={() => {
            NiceModal.show(DialogAddKhoanthu, { onAlert: handleOpenAlert });
          }}
        >
          Thêm khoản thu
        </Button>
      </Stack>
      <Paper style={{ height: 470, overflow: 'auto' }}>
        <TableContainer sx={{ paddingX: 3 }} component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Số </StyledTableCell>
                <StyledTableCell sx={{ width: 250 }}>
                  Tên Khoản thu
                </StyledTableCell>
                <StyledTableCell>Bắt buộc</StyledTableCell>
                <StyledTableCell>Ngày bắt đầu</StyledTableCell>
                <StyledTableCell>Ngày kết thúc</StyledTableCell>
                <StyledTableCell>Tiền cần đóng</StyledTableCell>
                <StyledTableCell align="center">Tổng số tiền</StyledTableCell>
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
                  <StyledTableCell sx={{ width: 100 }}>
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell>{row.tenkhoanthu}</StyledTableCell>
                  <StyledTableCell sx={{ width: 100 }}>
                    {row.batbuoc === '1' ? 'Có' : 'Không'}
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: 200 }}>
                    {row.ngaytao}
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: 200 }}>
                    {row.thoihan}
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: 200 }}>
                    {row.money}
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: 100 }} align="center">
                    {row.sum_money}
                  </StyledTableCell>
                  <StyledTableCell align="right" sx={{ width: 400 }}>
                    <Button
                      onClick={() => {
                        props.onSetIndex(1, row.id);
                        props.onSetThoiHan(row.thoihan)
                        props.onSetCurrentKhoanthu(row)
                      }}
                      variant="outlined"
                      sx={{ marginRight: 1 }}
                    >
                      Xem
                    </Button>
                    <Button
                      sx={{ marginRight: 1 }}
                      onClick={() => {
                        NiceModal.show(EditKhoanThu, {
                          dataKhoanthu: row,
                          onAlert: handleOpenAlert,
                        });
                      }}
                      variant="contained"
                      color={'warning'}
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      onClick={() => {
                        NiceModal.show(DialogDeleteKhoanThu, {
                          id: row.id,
                          onAlert: handleOpenAlert,
                        });
                      }}
                      variant="contained"
                      color={'error'}
                    >
                      Xóa
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {khoanthu.length === 0 && (
          <Stack pl={3} sx={{ width: 1240, height: 500 }}>
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} animation="wave" />
          </Stack>
        )}
      </Paper>
      <TablePagination
        rowsPerPageOptions={[6, 10, 25, { label: 'All', value: -1 }]}
        count={khoanthu.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Stack>
  );
};

// ================== show danh sach thu phi =================== //

const ShowDanhSach = (props) => {
  const status = useSelector((state) => state.khoanthu.status);
  const thuphi = useSelector((state) => state.khoanthu.currentKhoanThu);
  const token = useSelector(tokenSelector);
  const id = props.id;
  const currentKhoanthu = props.currentKhoanthu
  const data = {
    token,
    id,
  };

  // thong bao
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  const handleAlert = () => {
    setOpenAlert(true);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListThuphi(data));
  }, []);

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
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: '100%' }}
        >
          Cập nhật Thành công !
        </Alert>
      </Snackbar>
      <Typography fontSize={28} fontWeight={500} px={3} py={1}>
        Danh sách khoản thu số : {id}
      </Typography>
      <Stack direction="row" px={3} pb={3} spacing={2}>
        <Button
          onClick={() => {
            props.onSetIndex(0, null);
            dispatch(khoanthuSlice.actions.resetThuphi());
          }}
          variant="outlined"
          startIcon={<KeyboardReturnIcon />}
        >
          {' '}
          Quay lại
        </Button>
        <Button
          disabled={new Date(props.thoihan.replace(/-/g, '/')) < new Date()}
          variant="contained"
          sx={{ marginLeft: 3 }}
          endIcon={<PaidIcon />}
          onClick={() => {
            NiceModal.show(DialogAddThuPhi, { onAlert: handleAlert});
          }}
        >
          Thêm thu phí
        </Button>
        {currentKhoanthu.batbuoc ===1 && <Button
          variant="contained"
          sx={{marginLeft: 3}}
          endIcon={<CreditCardOffIcon/>}
          color={'warning'}
          onClick={() => {
            NiceModal.show(ShowChuaDong, {id: id})
          }}
        >
          Danh sách chưa đóng
        </Button>}
      </Stack>

      <Paper style={{ height: 430, overflow: 'auto' }}>
        <TableContainer sx={{ paddingX: 3 }} component={Paper}>
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
                    <Button
                      variant="contained"
                      sx={{ marginRight: 1 }}
                      onClick={() => {
                        NiceModal.show(DialogDeleteThuPhi, {
                          id: row.id,
                          onAlert: handleAlert,
                        });
                      }}
                      color="error"
                    >
                      xóa
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => {
                        NiceModal.show(EditThuPhi, {
                          dataThuphi: row,
                          onAlert: handleAlert,
                        });
                      }}
                    >
                      chỉnh sửa
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {status === 'loading thu phi' && (
          <Stack pl={3} sx={{ width: 1240, height: 500 }}>
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} animation="wave" />
          </Stack>
        )}
      </Paper>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        count={thuphi.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Stack>
  );
};
