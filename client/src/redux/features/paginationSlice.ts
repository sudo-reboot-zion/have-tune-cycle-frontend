import { PaginationStateProps } from "@/types/global.dt";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:PaginationStateProps={
    currentPage:0,
    itemsPerPage:3,
    totalItems:0
}

const paginationSlice=createSlice({
    name:'pagination',
    initialState,
    reducers: {
        setTotalItems:(state, action:PayloadAction<number>)=>{
            state.totalItems = action.payload;
        },
        setItemsPerpage:(state, action:PayloadAction<number>)=>{
            state.itemsPerPage = action.payload
        },
        goToPage:(state, action:PayloadAction<number>)=>{
            state.currentPage = action.payload
        },
        goToNextPage:(state)=>{
            const totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
            if(state.currentPage < totalPages -1){
                state.currentPage +=1;
            }
        },
        goToPrevPage:(state)=>{
            if(state.currentPage > 0){
                state.currentPage -= 1;
            }
        }
    }
});

export const {setTotalItems,goToPage, goToNextPage, goToPrevPage, setItemsPerpage} = paginationSlice.actions;
export default paginationSlice.reducer
