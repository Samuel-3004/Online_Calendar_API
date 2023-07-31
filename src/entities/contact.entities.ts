import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import Client from "./client.entity";

@Entity("contacts")
class Contact {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar", length: 25 })
  telefone: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date | string;

  @ManyToOne(() => Client, (client) => client.contacts, { onDelete: "CASCADE"})
  client: Client;
}

export default Contact;
