export default function locationReducer(state = "Seattle, WA", action) {
  if (action.type === "SET_LOC") {
    return action.payload;
  }
  return state;
}
