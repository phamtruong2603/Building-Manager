import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Bill } from './Bill';
import { User } from './User';

@Entity({ name: 'rooms'})

export class Room {
    @PrimaryGeneratedColumn()
        roomID: number;

    @Column({
        unique: true
    })
        roomName!: string;

    @Column()
        rentPrice: number;

    @Column()
        isEmpty: boolean;

    @Column()
        haveWifi: boolean;

    @CreateDateColumn()
        createAt!: Date;

    @UpdateDateColumn()
        updateAt!: Date;

    @OneToMany(() => User, user => user.room)
        users: User[];

    @OneToMany(() => Bill, bill => bill.room)
        bills: Bill[];
}