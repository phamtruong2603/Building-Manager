import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinTable } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity({ name: 'notification' })
export class Notification {
    @PrimaryGeneratedColumn()
        notificationID!: number;
    
    @Column({
        nullable: true
    })
        seen : boolean;
    
    @Column()
        interactive! : string;

    @Column()
        interactiveUser! : number;

    @CreateDateColumn()
        createAt!: Date;

    @UpdateDateColumn()
        updateAt!: Date;
 
    @ManyToOne(() => Post, (post: Post) => post.notifications, {primary: true})
        @JoinTable({
            name: 'post'
        })
        @JoinColumn({name: 'postID', referencedColumnName: 'postID'})
        post: Post;
    
    @ManyToOne(() => User, (user) => user.notifications, {primary: true})
        @JoinTable({
            name: 'user'
        })
        @JoinColumn({
            name : 'userID'
        })
        user : User;
}
