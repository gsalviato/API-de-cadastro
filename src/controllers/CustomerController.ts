import { CustomerRepository } from '../infrastructure/CustomerRepository';
import { Customer } from '../domain/Customer';

type CustomerPayload = {
  name: string;
  email: string;
  phones?: Array<string | { id?: string; number: string }>;
};

export class CustomerController {
  constructor(private readonly repository: CustomerRepository) {}

  public async create(payload: CustomerPayload): Promise<any> {
    const customer = Customer.create(payload.name, payload.email);
    this.applyPhones(customer, payload.phones);
    await this.repository.save(customer);
    return customer.toJSON();
  }

  public async update(id: string, payload: CustomerPayload): Promise<void> {
    const customer = Customer.fromData(id, payload.name, payload.email);
    this.applyPhones(customer, payload.phones);
    await this.repository.update(customer);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private applyPhones(customer: Customer, phones?: CustomerPayload['phones']): void {
    if (!phones) return;

    for (const phone of phones) {
      const phoneNumber = typeof phone === 'string' ? phone : phone.number;
      customer.addPhone(phoneNumber);
    }
  }
}
