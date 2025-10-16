export class Author {
  constructor(
    private readonly id: string,
    private name: string,
    private email?: string | null | undefined,
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

  getEmail(): string | null | undefined {
    return this.email;
  }

  // toJSON Method
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
