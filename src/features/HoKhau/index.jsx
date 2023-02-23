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
  Snackbar, TextField,
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
import {useSelector} from 'react-redux';
import NiceModal from '@ebay/nice-modal-react';
import DialogShowHoKhau from 'src/features/HoKhau/components/DialogShowHoKhau';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {fetchListHokhau, fetchSearchHokhau} from 'src/features/HoKhau/hokhauSlice';
import Skeleton from '@mui/material/Skeleton';

export function TablePaginationActions(props) {
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

export default function HoKhau() {
  const isLogin = useSelector(state => state.authen.isLogin)
  const status = useSelector((state) => state.hokhau.status);
  const dataHokhau = useSelector((state) => state.hokhau);
  const hokhau = dataHokhau.listHokhau;
  const token1 = useSelector((state) => state.authen.accessToken);
  const dispatch = useDispatch();

    useEffect(() => {
      if(isLogin){
      dispatch(fetchListHokhau(token1));
      }
    }, [isLogin]);


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

  // xu ly dialog them ho khau
  const [openAddHokhau, setOpenAddHokhau] = React.useState(false);
  const handleClickOpenAddHoKhau = () => {
    setOpenAddHokhau(true);
  };
  const handleCloseAddHoKhau = () => {
    setOpenAddHokhau(false);
  };
  const handleCloseSuccess = () => {
    setOpenAddHokhau(false);
    setOpenAlert(true);
  };

  // xu ly chuyen trang
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - hokhau.length) : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ====== search =======//

  const [cccdchoho, setCccdchuho] = useState('')
  const [hotenchuho, setHotenchuho] = useState('')
  const dataFetch = {
    token: token1,
    data: {
      cccdchuho:cccdchoho,
      hotenchuho:hotenchuho,
    }
  }
  const handeSearch = () => {
    dispatch(fetchSearchHokhau(dataFetch))
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
          sx={{width: '100%'}}
        >
          Cập nhật thành công 1 !
        </Alert>
      </Snackbar>
      <Stack direction="row" p={3} alignItems='center'>
        <Stack direction={'row'} width={670} alignItems={'center'}>
          <TextField
            margin="normal"
            fullWidth
            label="Số CCCD Chủ hộ"
            name="sohokhau"
            value={cccdchoho}
            onChange={(e) => {
              setCccdchuho(e.target.value)
            }}
            sx={{marginRight: 1}}
            size="small"
          />

          <TextField
            margin="normal"
            fullWidth
            label="Tên Chủ hộ"
            name="tenchuho"
            value={hotenchuho}
            onChange={(e) => {
              setHotenchuho(e.target.value)
            }}
            sx={{marginRight: 1}}
            size="small"
          />
        </Stack>
        <Button
          variant="outlined"
          sx={{
            marginLeft: 3,
            color: colors.grey[900],
            borderColor: colors.grey[900],
            height: 40,
            marginTop: 1
          }}
          endIcon={<ManageSearchIcon/>}
          onClick={handeSearch}
        >
          Tìm Kiếm
        </Button>
        <Button
          variant="contained"
          sx={{
            marginLeft: 3, height: 40,
            marginTop: 1
          }}
          onClick={handleClickOpenAddHoKhau}
          endIcon={<AddHomeIcon/>}
        >
          Thêm hộ khẩu
        </Button>
      </Stack>
      <Dialog
        open={openAddHokhau}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAddHoKhau}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogAddHoKhau
          handleCloseAddHoKhau={handleCloseAddHoKhau}
          onCloseSuccess={handleCloseSuccess}
        />
      </Dialog>

      <Paper style={{height: 470, overflow: 'auto'}}>
        <TableContainer sx={{paddingX: 3}} component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Số</StyledTableCell>
                <StyledTableCell>Chủ hộ</StyledTableCell>
                <StyledTableCell>Số CCCD</StyledTableCell>
                <StyledTableCell>Số nhà</StyledTableCell>
                <StyledTableCell>Đường</StyledTableCell>
                <StyledTableCell>Quận</StyledTableCell>
                <StyledTableCell>Ngày làm </StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLogin && (rowsPerPage > 0
                  ? hokhau.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : hokhau
              ).map((row) => (
                <StyledTableRow key={row.sohokhau}>
                  <StyledTableCell>{row.sohokhau}</StyledTableCell>
                  <StyledTableCell sx={{width: 170}}>
                    {row.hotenchuho}
                  </StyledTableCell>
                  <StyledTableCell>{row.cccdchuho}</StyledTableCell>
                  <StyledTableCell sx={{width: 80}}>
                    {row.sonha}
                  </StyledTableCell>
                  <StyledTableCell sx={{width: 210}}>
                    {row.duong}
                  </StyledTableCell>
                  <StyledTableCell sx={{width: 210}}>
                    {row.quan}
                  </StyledTableCell>
                  <StyledTableCell sx={{width: 210}}>
                    {row.ngaylamhokhau}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      onClick={() => {
                        NiceModal.show(DialogShowHoKhau, {
                          data: row,
                          onAlert: handleAlert,
                        });
                      }}
                      variant="outlined"
                    >
                      {' '}
                      Chi Tiết
                    </Button>
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
        {hokhau.length === 0 && status === "loading" && (
          <Stack pl={3} sx={{width: 1240, height: 500}}>
            <Skeleton height={80}/>
            <Skeleton height={80}/>
            <Skeleton height={80}/>
            <Skeleton height={80}/>
            <Skeleton height={80} animation="wave"/>
          </Stack>
        )}
      </Paper>

      <TablePagination
        rowsPerPageOptions={[6, 10, 25, {label: 'All', value: -1}]}
        count={hokhau.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Stack>
  );
}
