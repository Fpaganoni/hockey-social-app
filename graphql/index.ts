// ============================================
// CENTRALIZED EXPORTS FOR ALL GRAPHQL OPERATIONS
// ============================================

// USER
export { GET_USERS, GET_USER, GET_USER_FOR_LOGIN } from "./user/queries";

export {
  LOGIN,
  REGISTER,
  UPDATE_USER,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "./user/mutations";

// POST
export { GET_POSTS, GET_POST } from "./post/queries";

export {
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  UNLIKE_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from "./post/mutations";

// CLUB
export { GET_CLUBS, GET_CLUB } from "./club/queries";

// OPPORTUNITY
export { GET_JOB_OPPORTUNITIES } from "./opportunity/queries";

// STORY
export { GET_ACTIVE_STORIES } from "./story/queries";
