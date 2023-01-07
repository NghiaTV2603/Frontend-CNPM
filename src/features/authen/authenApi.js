import { axiosMethod, axiosRequest } from 'src/helpers/axios.helper';

const API_ENDPOINT = process.env.API_ENDPOINT;

const authenEndPoint = API_ENDPOINT + '/authen';

const authenApi = {
  login: (data) => {
    return axiosRequest(
      authenEndPoint + '/login',
      axiosMethod.POST,
      null,
      null,
      data
    );
  },

  register: (data) => {
    return axiosRequest(
      authenEndPoint + '/register',
      axiosMethod.POST,
      null,
      null,
      data
    );
  },

  getInfor: ({ accessToken }) => {
    return axiosRequest(
      authenEndPoint + '/user-info',
      axiosMethod.GET,
      accessToken
    );
  },
};

export default authenApi;
