import api from "./axios";

export const getContentList = async (page: number) => {
  return api.get(`/api/contents/${page}/20`);
}

export const createArticle = async (articleReq: any) => {
  return api.post('/api/article', articleReq)
}

export const createQuote = async (quoteReq: any) => {
  return api.post('/api/quote', quoteReq)
}

export const createQuizz = async (quizzReq: any) => {
  return api.post('/api/quizz', quizzReq)
}

export const likeContent = async (contentId: number) => {
  return api.post(`/api/contents/${contentId}/like`)
}

export const unlikeContent = async (likeId: number) => {
  return api.post(`/api/contents/${likeId}/unlike`)
}

export const createComment = async (contentId: number, comment: string) => {
  return api.post('/api/contents/comment', {
    contentId,
    value: comment
  })
}

export const getContentComments = async (contentId: number) => {
  return api.get(`/api/comments/content/${contentId}`);
}

export const answerQuizz = async (contentId: number, answer: string) => {
  return api.post('/api/quizz/answer', {
    quizzOption: answer,
    quizzId: contentId
  })
}

export const getQuizzById = async (quizzId: number) => {
  return api.get(`/api/quizz/${quizzId}`);
}

export const getArticleById = async (articleId: number) => {
  return api.get(`/api/article/${articleId}`);
}

export const getQuoteById = async (quoteId: number) => {
  return api.get(`/api/quote/${quoteId}`);
}

export const deleteContent = async (contentId: number, type: string) => {
  if (type === "quizz") {
    return api.delete(`/api/quizz/${contentId}`);
  } else if (type === "article") {
    return api.delete(`/api/article/${contentId}`);
  } else {
    return api.delete(`/api/quote/${contentId}`);
  }
}