import { AxiosResponse } from "axios";
import { SizeForSelect } from "../types/sizeType";
import axiosInstance from "../../../services/axiosInstance";


class SizeApi {
    static getAllSizes= async (): Promise<SizeForSelect[]> => {
        const response: AxiosResponse<{message: string; sizes: SizeForSelect[]}> = await axiosInstance.get('/sizes')
        return response.data.sizes
    }
}

export default SizeApi