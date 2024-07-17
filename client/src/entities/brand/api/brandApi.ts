import { AxiosResponse } from 'axios';
import { BrandForForm, BrandForFormWithoutId } from '../types/brandType';
import axiosInstance from '../../../services/axiosInstance';

class BrandApi {
  static createBrand = async (body: BrandForFormWithoutId): Promise<BrandForForm> => {
    const response: AxiosResponse<{ message: 'success'; brand: BrandForForm }> =
      await axiosInstance.post('/brands', body);
    return response.data.brand;
  };

  static getAllBrand = async (): Promise<BrandForForm[]> => {
    const response: AxiosResponse<{ message: string; brands: BrandForForm[] }> =
      await axiosInstance.get('/brands');
    return response.data.brands;
  };
}

export default BrandApi;
