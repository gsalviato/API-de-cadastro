import { Database } from 'sqlite';
import { Customer } from '../domain/Customer';

export class CustomerRepository {
  constructor(private readonly db: Database) {}

  public async save(customer: Customer): Promise<void> {
    const data = customer.toJSON();
    
    await this.db.run('BEGIN TRANSACTION');
    try {
      await this.insertCustomer(data);
      await this.insertPhones(data.id, data.phones);
      await this.db.run('COMMIT');
    } catch (error) {
      await this.db.run('ROLLBACK');
      throw error;
    }
  }

  public async update(customer: Customer): Promise<void> {
    const data = customer.toJSON();
    
    await this.db.run('BEGIN TRANSACTION');
    try {
      await this.updateCustomerData(data);
      await this.db.run('DELETE FROM phones WHERE customer_id = ?', [data.id]);
      await this.insertPhones(data.id, data.phones);
      await this.db.run('COMMIT');
    } catch (error) {
      await this.db.run('ROLLBACK');
      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    await this.db.run('DELETE FROM customers WHERE id = ?', [id]);
    // O ON DELETE CASCADE na tabela resolverá os telefones
  }

  private async insertCustomer(data: any): Promise<void> {
    await this.db.run(
      'INSERT INTO customers (id, name, email) VALUES (?, ?, ?)',
      [data.id, data.name, data.email]
    );
  }

  private async updateCustomerData(data: any): Promise<void> {
    await this.db.run(
      'UPDATE customers SET name = ?, email = ? WHERE id = ?',
      [data.name, data.email, data.id]
    );
  }

  private async insertPhones(customerId: string, phones: any[]): Promise<void> {
    for (const phone of phones) {
      await this.db.run(
        'INSERT INTO phones (id, customer_id, number) VALUES (?, ?, ?)',
        [phone.id, customerId, phone.number]
      );
    }
  }
}