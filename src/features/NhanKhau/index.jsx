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
  Snackbar,
} from '@mui/material';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PropTypes from 'prop-types';
import TablePagination from '@mui/material/TablePagination';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DialogAddNhanKhau from "src/features/NhanKhau/components/DialogAddNhanKhau";
import {useDispatch, useSelector} from "react-redux";
import {fetchNhankhau} from "src/features/NhanKhau/nhankhauSlice";
import {nhankhauSelector} from "src/app/selector";
import NiceModal from "@ebay/nice-modal-react";
import DialogShowNhanKhau from "src/features/NhanKhau/components/DialogShowNhanKhau";
import {useEffect} from "react";
import MuiAlert from '@mui/material/Alert';
import Skeleton from "@mui/material/Skeleton";
import {TablePaginationActions} from "src/features/HoKhau";

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



// ============== handle nhan khau ================ //
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NhanKhau() {
  const status = useSelector(state => state.nhankhau.status)
  const nhankhau = useSelector(nhankhauSelector);
  const [openAddNhanKhau, setOpenAddNhankhau] = React.useState(false);

  const handleClickOpenAddNhanKhau = () => {
    setOpenAddNhankhau(true);
  };

  const handleCloseAddNhanKhau = () => {
    setOpenAddNhankhau(false);
  };
  const handleCloseAddNhanKhauOK = () => {
    setOpenAddNhankhau(false);
    setOpenAlert(true)
  }


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - nhankhau.length) : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const token = useSelector((state) => state.authen.accessToken)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNhankhau(token));
  }, [dispatch]);

  // ==== handle thong bao ===== //

  const [openAler, setOpenAlert] = React.useState(false);

  const handleAlert = () => {
    setOpenAlert(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <Stack>
      <Snackbar open={openAler} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
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
          onClick={handleClickOpenAddNhanKhau}
          endIcon={<GroupAddIcon/>}
        >
          Thêm nhân khẩu
        </Button>
      </Stack>
      <Dialog
        open={openAddNhanKhau}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAddNhanKhau}
        aria-describedby="alert-dialog-slide-description"
        maxWidth='md'
      >
        <DialogAddNhanKhau
          handleCloseAddNhanKhau={handleCloseAddNhanKhau}
          onCloseOK = {handleCloseAddNhanKhauOK}
        />
      </Dialog>

      <Paper style={{maxHeight: 520, overflow: 'auto'}}>
        <TableContainer sx={{paddingX: 3}} component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Số hộ khẩu</StyledTableCell>
                <StyledTableCell>Họ và tên</StyledTableCell>
                <StyledTableCell>Quan hệ chủ hộ</StyledTableCell>
                <StyledTableCell>Căn cước công dân</StyledTableCell>
                <StyledTableCell>Ngày sinh</StyledTableCell>
                <StyledTableCell>Quê quán</StyledTableCell>
                <StyledTableCell>Giới tính</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                  ? nhankhau.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : nhankhau
              ).map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell >{row.sohokhau}</StyledTableCell>
                  <StyledTableCell sx={{width:200}}>{row.hoten}</StyledTableCell>
                  <StyledTableCell >{row.quanhevoichuho}</StyledTableCell>
                  <StyledTableCell >{row.cccd}</StyledTableCell>
                  <StyledTableCell >{row.ngaysinh}</StyledTableCell>
                  <StyledTableCell >{row.quequan}</StyledTableCell>
                  <StyledTableCell >{row.gioitinh === 0 ? 'Nữ' : "Nam"}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={()=>{NiceModal.show(DialogShowNhanKhau,{ data: row, onAlert : handleAlert })}} variant="outlined"> Chi Tiết</Button>
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
        {nhankhau.length === 0 && <Stack pl={3} sx={{width: 1240, height: 500}}>
          <Skeleton height={80}/>
          <Skeleton height={80}/>
          <Skeleton height={80}/>
          <Skeleton height={80}/>
          <Skeleton height={80} animation="wave"/>
        </Stack>
        }
      </Paper>
      <TablePagination
        rowsPerPageOptions={[6, 10, 25, {label: 'All', value: -1}]}
        count={nhankhau.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Stack>
  );
}

