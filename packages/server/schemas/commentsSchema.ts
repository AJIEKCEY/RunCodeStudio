export const getCommentsSchema = {
  type: 'object',
  properties: {
    postId: { type: 'number' },
  },
  required: ['postId'],
}

export const createCommentSchema = {
  type: 'object',
  properties: {
    text: { type: 'string', minLength: 1 },
    postId: { type: 'number' },
    rootCommentId: { type: 'number', nullable: true },
  },
  required: ['text', 'postId'],
}

export const updateCommentSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    text: { type: 'string', minLength: 1 },
  },
  required: ['id', 'text'],
}

export const deleteCommentSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
  },
  required: ['id'],
}
