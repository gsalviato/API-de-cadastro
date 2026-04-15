import { Id, Name, Email, Phone } from './ValueObjects';

export class Customer {
  private readonly phones: Map<string, Phone> = new Map();

  constructor(
    private readonly id: Id,
    private name: Name,
    private email: Email
  ) {}

  public static create(nameStr: string, emailStr: string): Customer {
    return new Customer(new Id(), new Name(nameStr), new Email(emailStr));
  }

  public static fromData(id: string, nameStr: string, emailStr: string): Customer {
    return new Customer(new Id(id), new Name(nameStr), new Email(emailStr));
  }

  public update(nameStr: string, emailStr: string): void {
    this.name = new Name(nameStr);
    this.email = new Email(emailStr);
  }

  public addPhone(phoneStr: string): void {
    const phoneId = new Id().toString();
    this.phones.set(phoneId, new Phone(phoneStr));
  }

  // DTO Method to avoid getters/setters and expose state safely
  public toJSON() {
    return {
      id: this.id.toString(),
      name: this.name.toString(),
      email: this.email.toString(),
      phones: Array.from(this.phones.entries()).map(([id, phone]) => ({
        id,
        number: phone.toString()
      }))
    };
  }
}