import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0, 
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);

        if (existingItem) {
          existingItem.quantity++;
          state.totalQuantity++;
        } else {
          state.items.push({ name, image, cost, quantity: 1 });
          state.totalQuantity++;
        }
    },
    removeItem: (state, action) => { 
      const nameToRemove = action.payload;
      const itemToRemove = state.items.find(item => item.name === nameToRemove);

      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity; 
        state.items = state.items.filter(item => item.name !== nameToRemove); 
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);

      if (itemToUpdate) {
        const quantityDifference = quantity - itemToUpdate.quantity;
        state.totalQuantity += quantityDifference;

        if (quantity === 0) {
          state.items = state.items.filter(item => item.name !== name);
        } else {
          itemToUpdate.quantity = quantity;
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
