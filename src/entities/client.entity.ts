import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import Contact from "./contact.entities";
import { getRounds, hashSync } from "bcryptjs";

@Entity("clients")
class Client {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar", length: 150 })
  password: string;

  @Column({ type: "varchar", length: 25 })
  telefone: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date | string;

  @OneToMany(() => Contact, (contacts) => contacts.client, {
    nullable: true,
  })
  contacts: Contact[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const hashPassword = getRounds(this.password);
    if (!hashPassword) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export default Client;
