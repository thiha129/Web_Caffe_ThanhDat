import { INIT_STATE } from "../../contant";
import {
  getPosts,
  getType,
  createPosts,
  updatePosts,
  delPosts,
} from "../actions";

export default function postsReducers(state = INIT_STATE.posts, action) {
  switch (action.type) {
    case getType(getPosts.getPostsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getPosts.getPostSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getPosts.getPostFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(createPosts.createPostsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(createPosts.createPostsSuccess):
      return {
        ...state,
        isLoading: true,
        isChecking: action.payload,
      };
    case getType(updatePosts.updatePostsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(updatePosts.updatePostsSuccess):
      return {
        ...state,
        isLoading: true,
        isChecking: action.payload,
      };
    case getType(delPosts.delPostsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(delPosts.delPostsSuccess):
      return {
        ...state,
        isLoading: true,
        isChecking: action.payload,
      };

    default:
      return state;
  }
}
