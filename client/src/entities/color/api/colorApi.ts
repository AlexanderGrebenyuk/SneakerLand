import { AxiosResponse } from 'axios';
import { ColorForForm, ColorForFormWithoutId } from '../types/colorType';
import axiosInstance from '../../../services/axiosInstance';

class ColorApi {
  static createColor = async (body: ColorForFormWithoutId): Promise<ColorForForm> => {
    const response: AxiosResponse<{ message: 'success'; color: ColorForForm }> =
      await axiosInstance.post('/colors', body);
    return response.data.color;
  };

  static getAllColor = async (): Promise<ColorForForm[]> => {
    const response: AxiosResponse<{ message: string; colors: ColorForForm[] }> =
      await axiosInstance.get('/colors');     
    return response.data.colors;
  };
}

export default ColorApi;
