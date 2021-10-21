import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {

  }
}

export const userSlice = createSlice({
  name: "user", // 命名空间，在调用action的时候会默认的设置为action的前缀
  // 初始值
  initialState,
  // 这里的属性会自动的导出为actions，在组件中可以直接通过dispatch进行触发
  reducers: {
    increment(state, { payload }) {
      state.info = payload.info; // 内置了immutable
    }
  }
});

// 导出actions
export const { increment } = userSlice.actions;

export default userSlice.reducer;
