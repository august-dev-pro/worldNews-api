export class Favorite {
  constructor(
    private userId: string,
    private articleId: string,
  ) {}

  // Getters
  getUserId(): string {
    return this.userId;
  }

  getArticleId(): string {
    return this.articleId;
  }

  // toJSON Method
  toJSON() {
    return {
      userId: this.userId,
      articleId: this.articleId,
    };
  }
}
