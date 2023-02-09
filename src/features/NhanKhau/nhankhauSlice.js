import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const nhankhauSlice = createSlice({
  name: 'nhanhkhau',
  initialState:
    [
      {
        "id": 1,
        "hoten": "Trần Văn Phúc",
        "ngaysinh": "2001-04-22",
        "gioitinh": 1,
        "quequan": "Hưng Yên",
        "dantoc": "Kinh",
        "tongiao": "Không",
        "sohokhau": 1,
        "quanhevoichuho": null,
        "cccd": "12345678910",
        "capngay": "2022-12-12",
        "noicap": "Bách Khoa Hà Nội",
        "nghenghiep": "Sinh viên",
        "ngaydangkythuongtru": "2022-12-12",
        "ngaythemnhankhau": "2022-12-12",
        "ghichu": "Okay babeêrere"
      },
      {
        "id": 4,
        "hoten": "Trịnh Đức Tiệp",
        "ngaysinh": "2001-11-11",
        "gioitinh": 1,
        "quequan": "Nam Định",
        "dantoc": "Becgie",
        "tongiao": "Tin lành",
        "sohokhau": 4,
        "quanhevoichuho": null,
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
        "hoten": "Trịnh Đức Tiệp",
        "ngaysinh": "2001-11-11",
        "gioitinh": 1,
        "quequan": "Nam Định",
        "dantoc": "Becgie",
        "tongiao": "Tin lành",
        "sohokhau": 4,
        "quanhevoichuho": "Là chủ hộ",
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
        "hoten": "Trịnh Đức Tiệp",
        "ngaysinh": "2001-11-11",
        "gioitinh": 1,
        "quequan": "Nam Định",
        "dantoc": "Becgie",
        "tongiao": "Tin lành",
        "sohokhau": null,
        "quanhevoichuho": null,
        "cccd": "12345678914",
        "capngay": "2022-12-20",
        "noicap": "Công an tỉnh Nam Định",
        "nghenghiep": null,
        "ngaydangkythuongtru": null,
        "ngaythemnhankhau": null,
        "ghichu": null
      },
      {
        "id": 7,
        "hoten": "Trịnh Đức Tiệp",
        "ngaysinh": "2001-11-11",
        "gioitinh": 1,
        "quequan": "Nam Định",
        "dantoc": "Becgie",
        "tongiao": "Tin lành",
        "sohokhau": null,
        "quanhevoichuho": "Là con",
        "cccd": "12345678915",
        "capngay": "2022-12-20",
        "noicap": "Công an tỉnh Nam Định",
        "nghenghiep": null,
        "ngaydangkythuongtru": null,
        "ngaythemnhankhau": null,
        "ghichu": null
      },
      {
        "id": 8,
        "hoten": "Trịnh Đức Tiệp",
        "ngaysinh": "2001-11-11",
        "gioitinh": 1,
        "quequan": "Nam Định",
        "dantoc": "Becgie",
        "tongiao": "Tin lành",
        "sohokhau": null,
        "quanhevoichuho": "Là con",
        "cccd": "12345678916",
        "capngay": "2022-12-20",
        "noicap": "Công an tỉnh Nam Định",
        "nghenghiep": null,
        "ngaydangkythuongtru": null,
        "ngaythemnhankhau": null,
        "ghichu": null
      },
      {
        "id": 9,
        "hoten": "Trịnh Đức Tiệp",
        "ngaysinh": "2001-11-11",
        "gioitinh": 1,
        "quequan": "Nam Định",
        "dantoc": "Becgie",
        "tongiao": "Tin lành",
        "sohokhau": null,
        "quanhevoichuho": "Là chủ hộ",
        "cccd": "12345678917",
        "capngay": "2022-12-20",
        "noicap": "Công an tỉnh Nam Định",
        "nghenghiep": null,
        "ngaydangkythuongtru": null,
        "ngaythemnhankhau": null,
        "ghichu": null
      },
      {
        "id": 15,
        "hoten": "Trịnh Đức Tiệp",
        "ngaysinh": "2001-11-11",
        "gioitinh": 1,
        "quequan": "Nam Định",
        "dantoc": "Becgie",
        "tongiao": "Tin lành",
        "sohokhau": null,
        "quanhevoichuho": null,
        "cccd": "12345678920",
        "capngay": "2022-12-20",
        "noicap": "Công an tỉnh Nam Định",
        "nghenghiep": null,
        "ngaydangkythuongtru": null,
        "ngaythemnhankhau": null,
        "ghichu": null
      }
    ],
  reducers: {
    addNhankhau: (state, action) => {
      state.push(action.payload);
    }
  },
})
const api = axios.create({
  baseURL: 'api'
})
export const fetchNhankhau = createAsyncThunk("nhankhau/fetchNhankhau", async () => {
  const data = await api.get('/nhankhau');
  return data.data
})
