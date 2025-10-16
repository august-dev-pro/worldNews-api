export class Category {
  constructor(
    private readonly id: string,
    private name: string,
    private description?: string | null,
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

  getDescription(): string | null | undefined {
    return this.description;
  }

  // toJSON Method
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
