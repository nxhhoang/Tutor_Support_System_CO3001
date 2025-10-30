export interface Comment {
  id: string
  author: string
  content: string
  createdAt: string
  level: number // 0 = bình luận gốc, >0 = reply
  parentId?: string // nếu là reply thì trỏ tới id comment cha
}

export interface Topic {
  id: string
  title: string
  author: string
  comments: Comment[]
  createdAt: string
}
