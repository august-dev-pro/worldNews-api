export class Article {
  constructor(
    private readonly id: string,
    private title: string,
    private content: string,
    private url: string,
    private imageUrl?: string | null | undefined,
    private sourceId?: string | null | undefined,
    private categoryId?: string,
    private authorId?: string | null | undefined,
    private language?: string | null | undefined,
    private sentiment?: string | null | undefined,
    private createdAt?: Date,
    private updatedAt?: Date,
  ) {}

  // Getters
  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getContent(): string {
    return this.content;
  }

  getUrl(): string {
    return this.url;
  }

  getImageUrl(): string | null | undefined {
    return this.imageUrl;
  }

  // toJSON Method
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      url: this.url,
      imageUrl: this.imageUrl,
      sourceId: this.sourceId,
      categoryId: this.categoryId,
      authorId: this.authorId,
      language: this.language,
      sentiment: this.sentiment,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
