export function UserIdSlice(state="aa", action) {
  const USERID = "userId";
  if (action.type === USERID) {
    return action.payload.userId;
  }
  return state;
}
