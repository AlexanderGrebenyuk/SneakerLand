import { AxiosResponse } from "axios";
import axiosInstance from "../../../services/axiosInstance";
import { SexForSelect } from "../sexSlice";

class SexApi {
    static getAllSexes = async (): Promise<SexForSelect[]> => {
        const response: AxiosResponse<{message: string; sexes: SexForSelect[]}> = await axiosInstance.get('/sexes')
        return response.data.sexes
    }
}

export default SexApi