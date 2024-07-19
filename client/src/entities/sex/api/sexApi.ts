import { AxiosResponse } from 'axios';
import axiosInstance from '../../../services/axiosInstance';
import { SexForForm, SexForFormWithoutId } from '../types/sexType';

class SexApi {
  static createSex = async (body: SexForFormWithoutId): Promise<SexForForm> => {
    const response: AxiosResponse<{ message: 'success'; sex: SexForForm }> =
      await axiosInstance.post('/sexes', body);
    return response.data.sex;
  };

  static getAllSex = async (): Promise<SexForForm[]> => {
    const response: AxiosResponse<{ message: string; sexes: SexForForm[] }> =
      await axiosInstance.get('/sexes');     
    return response.data.sexes;
  };
}

export default SexApi;
