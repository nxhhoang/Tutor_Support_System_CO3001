// src/apis/topic.api.ts
import type { Topic, Comment } from 'src/types/topic.type'

// Fake data khởi tạo
let topics: Topic[] = [
  {
    id: 't1',
    title: 'Hỏi về đề thực hành hệ điều hành',
    author: 'An',
    createdAt: '2025-10-20',
    comments: [
      {
        id: 'c1',
        author: 'Bình',
        content: 'Bạn có thể xem slide tuần 6, phần semaphore nhé!',
        createdAt: '2025-10-21',
        level: 0
      },
      {
        id: 'c2',
        author: 'An',
        content: 'Cảm ơn bạn nhiều nha!',
        createdAt: '2025-10-21',
        level: 1,
        parentId: 'c1'
      }
    ]
  },
  {
    id: 't2',
    title: 'Tài liệu C++ nâng cao',
    author: 'Bình',
    createdAt: '2025-10-21',
    comments: []
  }
]

export const topicApi = {
  getTopics(): Topic[] {
    return topics
  },

  getTopicById(id: string): Topic | undefined {
    return topics.find((t) => t.id === id)
  },

  addTopic(title: string, author: string): Topic {
    const newTopic: Topic = {
      id: Date.now().toString(),
      title,
      author,
      createdAt: new Date().toISOString().slice(0, 10),
      comments: []
    }
    topics = [newTopic, ...topics]
    return newTopic
  },

  addComment(topicId: string, content: string, author: string, parentId?: string): Comment | null {
    const topic = topics.find((t) => t.id === topicId)
    if (!topic) return null

    const parent = topic.comments.find((c) => c.id === parentId)
    console.log('parent', parent?.level)
    const newComment: Comment = {
      id: 'c' + Date.now(),
      author,
      content,
      createdAt: new Date().toISOString().slice(0, 10),
      level: parent ? parent.level + 1 : 0,
      parentId
    }

    topic.comments.push(newComment)
    return newComment
  }
}