import {
  START_LOADING,
  END_LOADING,
  ADD_CARD,
  DELETE_CARD,
  UPDATE_CARD,
  UPDATE_BUCKET,
} from "../actionTypes";

const initialState = [
  {
    id: 1,
    value: "Action",
    cards: [
      {
        id: 12345,
        name: "Starlight Show",
        link: "https://www.youtube.com/embed/ao6miTzR44c",
        clicked: 0,
      },
      {
        id: 23456,
        name: "Funny Cats",
        link: "https://www.youtube.com/embed/ao6miTzR44c",
        clicked: 0,
      },
    ],
  },
  {
    id: 2,
    value: "Comedy",
    cards: [
      {
        id: 34567,
        name: "Action Rampage",
        link: "https://www.youtube.com/embed/ao6miTzR44c",
        clicked: 0,
      },
    ],
  },
];

export const buckets = (state = { isLoading: false, buckets: initialState }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case ADD_CARD:
      return {
        ...state,
        buckets: state.buckets.map((bucket) => {
          if (bucket.id === action.payload.category) {
            bucket.cards.push(action.payload.data);
          }
          return bucket;
        }),
      };

    case DELETE_CARD:
      return {
        ...state,
        buckets: state.buckets.map((bucket) => {
          if (bucket.id === action.payload?.category) {
            bucket.cards = bucket.cards.filter((card) => card.id !== action.payload.data?.id);
          }
          return bucket;
        }),
      };

    case UPDATE_CARD:
      return {
        ...state,
        buckets: state.buckets.map((bucket) => {
          if (bucket.id === action.payload.category) {
            bucket.cards = bucket.cards.map((card) => {
              if (card.id === action.payload.data?.id) {
                card = action.payload.data;
              }
              return card;
            });
          }
          return bucket;
        }),
      };

    case UPDATE_BUCKET:
      //update bucket value
      if (action?.payload?.id === 1) {
        state.buckets[0].value = action.payload.value;
      } else if (action?.payload?.id === 2) {
        state.buckets[1].value = action.payload.value;
      }
      return state;

    default:
      return state;
  }
};
