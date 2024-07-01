import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("admin") 
export class AdminEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    gender: string;

    @Column()
    phoneNumber: string;

    @Column()
    address: string;
}