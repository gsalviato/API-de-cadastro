import crypto from 'crypto';

export class Id {
  private readonly value: string;
  constructor(value?: string) {
    this.value = value || crypto.randomUUID();
  }
  public toString(): string { return this.value; }
}

export class Name {
  constructor(private readonly value: string) {
    this.validate(value);
  }
  private validate(value: string): void {
    if (!value || value.trim().length < 3) {
      throw new Error("Invalid name: must be at least 3 characters long.");
    }
  }
  public toString(): string { return this.value; }
}

export class Email {
  constructor(private readonly value: string) {
    this.validate(value);
  }
  private validate(value: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error("Invalid email format.");
    }
  }
  public toString(): string { return this.value; }
}

export class Phone {
  constructor(private readonly value: string) {
    this.validate(value);
  }
  private validate(value: string): void {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Padrão E.164 simplificado
    if (!phoneRegex.test(value)) {
      throw new Error("Invalid phone format.");
    }
  }
  public toString(): string { return this.value; }
}