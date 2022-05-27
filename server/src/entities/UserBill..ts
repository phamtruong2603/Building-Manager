import { Column, Entity, JoinColumn, JoinTable, ManyToOne , PrimaryGeneratedColumn } from 'typeorm';
import { Bill } from './Bill';
import { User } from './User';

@Entity({ name: 'userbill'})

export class UserBill {
    @PrimaryGeneratedColumn()
        userBillID!: number;

    @Column()
        seen: boolean;

        @ManyToOne(() => User, (user: User) => user.userBills, {primary: true})
        @JoinTable({
            name: 'user'
        })
        @JoinColumn({name: 'userID', referencedColumnName: 'userID'})
            user: User;

        @ManyToOne(() => Bill, (bill: Bill) => bill.userBills, { primary: true})
        @JoinTable({
            name: 'bill'
        })
        @JoinColumn({name: 'billID', referencedColumnName: 'billID'})
            bill: Bill;
}