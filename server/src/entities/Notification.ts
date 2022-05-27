import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity({ name: 'notification' })
export class Notification {
    @PrimaryGeneratedColumn()
        notificationID!: number;
    
    @Column()
        seen! : boolean; 

    @CreateDateColumn()
        createAt!: Date;

    @UpdateDateColumn()
        updateAt!: Date;
 
    @ManyToOne(() => Post, (post) => post.notifications)
        post : Post;
    
    @ManyToOne(() => User, (user) => user.notifications)
        user : User;
}
