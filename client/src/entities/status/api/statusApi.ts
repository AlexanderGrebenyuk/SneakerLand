import { AxiosResponse } from "axios";
import axiosInstance from "../../../services/axiosInstance"
import { Status } from "../types/statusType";



class StatusApi {
     
    static getAllStatus = async (): Promise<Status[]>=> {
        const response: AxiosResponse<{ message: string; statuses: Status[] }> = await axiosInstance.get('/statuses')
        return response.data.statuses
    }


}

export default StatusApi