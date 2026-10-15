import { Caption } from 'react-native-paper';
import {METHODS} from '../utils/constants';
import client from './client';

export const api = {
  USERS: {
    register: ({data, ...config}) =>
      client({method: METHODS.POST, url: '/users/register', data, ...config}),
    login: ({data, ...config}) =>
      client({method: METHODS.POST, url: '/users/login', data, ...config}),
    profile: ({data, ...config}) =>
      client({url: '/users/profile', data, ...config}),
    update_profile: ({data, ...config}) =>
      client({method: METHODS.PUT, url: '/users/profile', data, ...config}),
    search_user: ({query, data, ...config}) =>
      client({url: `/users/search?name=${query}`, data, ...config}),
    user_profile: ({userName, data, ...config}) =>
      client({url: `/users/${userName}`, data, ...config}),
    forgot_password: ({data, ...config}) =>
      client({
        method: METHODS.POST,
        url: '/users/forgot-password',
        data,
        ...config,
      }),
  },
  POSTS: {
    all_posts: ({data, ...config}) => client({url: '/posts', data, ...config}),
    users_posts: ({userName, data, ...config}) =>
      client({url: `/posts/user/${userName}`, data, ...config}),
    create_post: ({data, ...config}) =>
      client({method: METHODS.POST, url: '/posts/', data, ...config}),
    edit_post: ({post_id, data, ...config}) =>     
       client({method: METHODS.PUT, url: `/posts/${post_id}`, data, ...config}),
    delete_post: ({post_id, data, ...config}) =>
      client({
        method: METHODS.DELETE,
        url: `/posts/${post_id}`,
        data,
        ...config,
      }),
    LIKE: {
      like: ({post_id, data, ...config}) =>
        client({
          method: METHODS.POST,
          url: `/posts/${post_id}/like`,
          data,
          ...config,
        }),
      unlike: ({post_id, data, ...config}) =>
        client({
          method: METHODS.DELETE,
          url: `/posts/${post_id}/unlike`,
          data,
          ...config,
        }),
      likes_count: ({post_id, data, ...config}) =>
        client({
          url: `/posts/${post_id}/likes`,
          data,
          ...config,
        }),
    },
    COMMENT: {
      comments_of_post: ({post_id, data, ...config}) =>
        client({
          url: `/posts/${post_id}/comments`,
          data,
          ...config,
        }),
      comment_add: ({post_id, data, ...config}) =>
        client({
          method: METHODS.POST,
          url: `/posts/${post_id}/comment`,
          data,
          ...config,
        }),
      comment_delete: ({comment_id, data, ...config}) =>
        client({
          method: METHODS.DELETE,
          url: `/posts/comments/${comment_id}`,
          data,
          ...config,
        }),
    },
  },
  USER_CONNECTIONS: {
    follow: ({user_id, data, ...config}) =>
      client({
        method: METHODS.POST,
        url: `/users/${user_id}/follow`,
        data,
        ...config,
      }),
    unfollow: ({user_id, data, ...config}) =>
      client({
        method: METHODS.DELETE,
        url: `/users/${user_id}/unfollow`,
        data,
        ...config,
      }),
    followers: ({user_id, data, ...config}) =>
      client({
        url: `/users/${user_id}/followers`,
        data,
        ...config,
      }),
    following: ({user_id, data, ...config}) =>
      client({
        url: `/users/${user_id}/following`,
        data,
        ...config,
      }),
    remove_follower: ({user_id, data, ...config}) =>
      client({
        method: METHODS.DELETE,
        url: `/users/${user_id}/followers`,
        data,
        ...config,
      }),
  },
};
