export function cartReducer(state, action) {
  let newState, newItems, newTotal;
  const removeOne = (item, idToRemove) => {
    if (item.id === idToRemove) {item.quantity -= 1;}
    return item;
  }
  const keepPositiveQuantities = (item) => item.quantity > 0;
  const {add, remove} = action;

  switch(action.type) {
    case 'addItem': 
      const foundIndex = state.items.findIndex(x => x.id === add.item.id);
      if (foundIndex >= 0) {
        newItems = state.items.map(x => {if (x.id === add.item.id) { x.quantity += add.count;} return x;});
        newTotal = newItems.reduce((a, b) => a + b.price * b.quantity, 0);
      } else {
        const newItem = {...add.item, quantity: add.count};
        newItems = state.items.length > 0 ? [...state.items, newItem] : [newItem];
        newTotal = newItems.reduce((a, b) => a + b.price * b.quantity, 0);
      }
      newState = { items: newItems, total: newTotal };
      break;
    case 'removeItem':
      newItems = state.items.map(x => removeOne(x, remove.item.id)).filter(keepPositiveQuantities);
      newTotal = newItems.reduce((a, b) => a + b.price * b.quantity, 0);
      newState = { items: newItems, total: newTotal };
      break;
    case 'removeItemEntirely':
      newItems = state.items.filter(x => x.id !== remove.item.id);
      newTotal = newItems.reduce((a, b) => a + b.price * b.quantity, 0);
      newState = { items: newItems, total: newTotal };
      break;
    default: throw new Error();
  }
  return newState;
}