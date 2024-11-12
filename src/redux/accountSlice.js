import { createSlice } from '@reduxjs/toolkit'

const defaulftState = {

}

// khai bao
const initialState = {
  navbarId: localStorage.getItem('navbarId') || 0
}

// dang ky state de dung
const globalConfigSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    setNavbarId(state, { payload }) {
      localStorage.setItem('navbarId', payload)
      state.navbarId = payload
    }
  }
})

export const { setNavbarId } = globalConfigSlice.actions
export default globalConfigSlice.reducer