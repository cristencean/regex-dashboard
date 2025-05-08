import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegexItem {
    regex: string;
    isApproved: boolean;
};

interface DashboardState {
    mode: 'edit' | 'approval';
    content: string;
    regexList: RegexItem[];
};

const initialState: DashboardState = {
    mode: 'edit',
    content: '',
    regexList: [],
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<'edit' | 'approval'>) {
      state.mode = action.payload;
    },
    setContent(state, action: PayloadAction<string>) {
      state.content = action.payload;
    },
    addRegex(state, action: PayloadAction<string>) {
        state.regexList.push({ regex: action.payload, isApproved: false });
    },
    removeRegex(state, action: PayloadAction<number>) {
        state.regexList.splice(action.payload, 1);
    },
    updateRegex(state, action: PayloadAction<{index: number, value: string}>) {
        state.regexList[action.payload.index].regex = action.payload.value;
    },
    approveRegex(state, action: PayloadAction<number>) {
        state.regexList[action.payload].isApproved = true;
    }
  },
});

export const { 
    setMode, 
    setContent, 
    addRegex, 
    removeRegex, 
    updateRegex, 
    approveRegex 
} = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
