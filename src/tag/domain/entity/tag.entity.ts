export class Tag {
  constructor(
    private readonly id: string,
    private name: string,
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

  // toJSON Method
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
