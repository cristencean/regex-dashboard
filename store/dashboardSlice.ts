import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getFromLocalStorage } from "@/utils/localStorage";
import { getMatches } from "@/utils/regexValidation";

export interface RegexItem {
    value: string;
    matches: string[];
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
        resetState(_, action: PayloadAction<DashboardState>) {
            return action.payload;
        },
        setMode(state, action: PayloadAction<'edit' | 'approval'>) {
            state.mode = action.payload;
        },
        setContent(state, action: PayloadAction<string>) {
            state.content = action.payload;
            state.regexList = state.regexList.map((regex) => {
                const allMatches = getMatches(state.content, regex.value);
                return {
                    ...regex,
                    matches: allMatches
                };
            });
        },
        addRegex(state, action: PayloadAction<string>) {
            state.regexList.push({
                value: action.payload,
                isApproved: false,
                matches: getMatches(state.content, action.payload)
            });
        },
        removeRegex(state, action: PayloadAction<number>) {
            state.regexList.splice(action.payload, 1);
        },
        updateRegex(state, action: PayloadAction<{ index: number, value: string }>) {
            if (action.payload.value.trim() === '') {
                state.regexList.splice(action.payload.index, 1);
                return;
            }

            const selectedRegex = state.regexList[action.payload.index];
            selectedRegex.value = action.payload.value;
            selectedRegex.matches = getMatches(state.content, action.payload.value);
            selectedRegex.isApproved = false;
        },
        approveRegex(state, action: PayloadAction<number>) {
            state.regexList[action.payload].isApproved = true;
        },
        getLocalData(state) {
            const data = getFromLocalStorage();
            if (data) {
                state.regexList = data.regexList;
                state.content = data.content;
                state.mode = data.mode;
            }
        },
    },
});

export const {
    resetState,
    setMode,
    setContent,
    addRegex,
    removeRegex,
    updateRegex,
    approveRegex
} = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;