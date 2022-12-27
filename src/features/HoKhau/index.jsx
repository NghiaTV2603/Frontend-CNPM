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
} from '@mui/material';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DialogAddHoKhau from 'src/features/HoKhau/components/DialogAddHoKhau';
import AddHomeIcon from '@mui/icons-material/AddHome';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { hokhauSlice } from "src/features/HoKhau/hokhauSlice";
import {useDispatch,useSelector} from "react-redux";
import {hokhauSelector} from "src/app/selector";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;
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
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
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
export default function HoKhau() {
  const hokhau = useSelector(hokhauSelector);
  const [openAddHokhau, setOpenAddHokhau] = React.useState(false);

  const handleClickOpenAddHoKhau = () => {
    setOpenAddHokhau(true);
  };
  const handleCloseAddHoKhau = () => {
    setOpenAddHokhau(false);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - hokhau.length) : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Stack>
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
              <SearchIcon />
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
          endIcon={<ManageSearchIcon />}
        >
          Tìm Kiếm
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: 3 }}
          onClick={handleClickOpenAddHoKhau}
          endIcon={<AddHomeIcon />}
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
        <DialogAddHoKhau handleCloseAddHoKhau={handleCloseAddHoKhau} />
      </Dialog>

      <Paper style={{ maxHeight:500,  overflow: 'auto' }}>
        <TableContainer sx={{ paddingX: 3 }} component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Số</StyledTableCell>
                <StyledTableCell>Chủ hộ</StyledTableCell>
                <StyledTableCell>Số nhà</StyledTableCell>
                <StyledTableCell>Đường</StyledTableCell>
                <StyledTableCell>Quận</StyledTableCell>
                <StyledTableCell>Ngày làm </StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? hokhau.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : hokhau
              ).map((row) => (
                <StyledTableRow key={row.sohokhau}>
                  <StyledTableCell>{row.sohokhau}</StyledTableCell>
                  <StyledTableCell>{row.idchuho}</StyledTableCell>
                  <StyledTableCell>{row.sonha}</StyledTableCell>
                  <StyledTableCell>{row.duong}</StyledTableCell>
                  <StyledTableCell>{row.quan}</StyledTableCell>
                  <StyledTableCell>{row.ngaylamhokhau}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="outlined"> Chi Tiết</Button>
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
      </Paper>
      <TablePagination
        rowsPerPageOptions={[6, 10, 25, { label: 'All', value: -1 }]}
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
