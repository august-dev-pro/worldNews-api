export class Source {
  constructor(
    private readonly id: string,
    private name: string,
    private url: string | null | undefined,
    private logoUrl?: string | null | undefined,
    private createdAt?: Date,
    private updatedAt?: Date,
  ) {}

  // Getters
  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getUrl(): string | null | undefined {
    return this.url;
  }

  getLogoUrl(): string | null | undefined {
    return this.logoUrl;
  }

  // toJSON Method
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      url: this.url,
      logoUrl: this.logoUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
