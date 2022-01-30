import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EventLogState {
  requestLoading: boolean;
  requestMessage: null | string;
  events: any[];
}


const initialState: EventLogState = {
  requestLoading: false,
  requestMessage: null,
  events: [],
};


export const eventLogSlice = createSlice({
  name: 'EventLog',
  initialState,
  reducers: {
    setRequestLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.requestLoading = action.payload;
    },
    setRequestMessage: (state, action: PayloadAction<null | string>) => {
      state.requestMessage = action.payload;
    },
    setEvents: (state, action: PayloadAction<any[]>) => {
      state.events = action.payload;
    },
  },
});


export const {
  setRequestLoadingStatus,
  setRequestMessage,
  setEvents,
} = eventLogSlice.actions;

export const selectRequestStatus = (state: EventLogState) => state.requestLoading;
export const selectRequestMessage = (state: EventLogState) => state.requestMessage;
export const selectEvents = (state: EventLogState) => state.events;

export default eventLogSlice.reducer;
