export const getCommentsSchema = {
  type: 'object',
  properties: {
    postId: { type: 'number' },
  },
  required: ['postId'],
}
