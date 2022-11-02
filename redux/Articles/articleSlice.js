import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import articleService from "./articleService";

const initialState = {
  articles: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new article
export const getArticles = createAsyncThunk(
  "article/getArticles",
  async (_, thunkAPI) => {
    try {
      const response = await articleService.getArticles();

      return response;
    } catch (error) {
      const messageMB =
        (error.response &&
          error.response.data &&
          error.response.data.messageMB) ||
        error.messageMB ||
        error.toString();
      return thunkAPI.rejectWithValue(messageMB);
    }
  }
);

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    resetArticle: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.articles = action.payload;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = articleSlice.actions;
export default articleSlice.reducer;
