const initialState = {
  categories: [
    { name: "soaps", id: 1 },
    { name: "Shampoo", id: 2 },
    { name: "Creams", id: 3 },
    { name: "fragrances", id: 4 },
    { name: "body care", id: 5 },
  ],
};

export default function categoryReducer(state = [], action) {
  switch (action.type) {
    case "FETCH_CATEGORIES":
      return {
        ...state, 
        categories: action.payload
      };
    default:
      return state;
  }
}
