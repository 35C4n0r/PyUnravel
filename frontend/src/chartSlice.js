import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    nodes: [],
    edges: []
}
export const chartSlice = createSlice({
    name: 'chart',
    initialState: initialState,

    reducers: {
      setLoading: (state) => {
          state.isLoading = !state.isLoading;
      },

      setData: (state, action) => {
          // console.log(action.payload)
          state.nodes = action.payload.nodes;
          state.edges = action.payload.edges;
      }
    }

});

export const { setLoading, setData } = chartSlice.actions;

export default chartSlice.reducer;