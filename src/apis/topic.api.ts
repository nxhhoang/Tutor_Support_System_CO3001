import type { Topic, Comment } from 'src/types/topic.type'
import http from 'src/utils/http';
import type { SuccessResponse } from 'src/types/utils.type'

const URL = 'topics';

export const topicApi = {
  getTopics() {
    return http.get<SuccessResponse<Topic[]>>(`${URL}/`);
  },

  getTopicById(id: string) {
    return http.get<SuccessResponse<Topic>>(`${URL}/${id}`);
  },

  addTopic(title: string, author: string) {
    return http.post<SuccessResponse<Topic>>(`${URL}/`, {
      title,
      author
    });
  },

  addComment(topicId: string, content: string, author: string, parentId?: string) {
    return http.post<SuccessResponse<Comment>>(`${URL}/${topicId}/comments`, {
      content,
      author,
      parentId
    });
  }
}