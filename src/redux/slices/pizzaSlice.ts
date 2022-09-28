import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  pizzas: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  pizzas: [],
  status: Status.LOADING, // loading, success, error
};

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: number;
};

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async ({
    sortBy,
    order,
    category,
    search,
    currentPage,
  }: SearchPizzaParams) => {
    const res = await axios.get<Pizza[]>(
      `https://6322b272a624bced307cb4d9.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return res.data as Pizza[];
  }
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<Pizza[]>) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
  },

  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = "loading";
  //     state.pizzas = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.pizzas = action.payload;
  //     state.status = "success";
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.status = "error";
  //     state.pizzas = [];
  //   },
  // },
});

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
