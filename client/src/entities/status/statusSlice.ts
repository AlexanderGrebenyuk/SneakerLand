import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Status } from "./types/statusType"
import StatusApi from "./api/statusApi"


type StateStatus = {
    statuses : Status[]
}

const initialState: StateStatus = {
    statuses: []
}

export const getStatusThunk = createAsyncThunk('load/statuses', ()=>
    StatusApi.getAllStatus()
)


const statusSlice = createSlice({
name:'statuses',
initialState,
reducers: {},

extraReducers: (builder) => {
  builder
        .addCase(getStatusThunk.fulfilled, (state, action)=>{
            state.statuses = action.payload
        })
}
})

export default statusSlice