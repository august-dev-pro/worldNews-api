export class Comment {
  constructor(
    private readonly id: string,
    private content: string,
    private userId: string,
    private articleId: string,
    private createdAt?: Date,
    private updatedAt?: Date,
  ) {}

  // Getters
  getId(): string {
    return this.id;
  }

  getContent(): string {
    return this.content;
  }

  getUserId(): string {
    return this.userId;
  }

  getArticleId(): string {
    return this.articleId;
  }

  // toJSON Method
  toJSON() {
    return {
      id: this.id,
      content: this.content,
      userId: this.userId,
      articleId: this.articleId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
