import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Comment } from './Comment';
import { Like } from './Like';
import { Post } from './Post';
import { Room } from './Room';
import { UserBill } from './UserBill.';
import { Notification } from './Notification';

@Entity({name: 'users'})

export class User {
    @PrimaryGeneratedColumn()
        userID!: number;

    @Column({
        nullable: true
    })
        fullName: string;

    @Column({
        unique: true
    })
        phoneNumber!: string;
    
    @Column()
        password!: string;
        
    @Column({
        nullable: true
    })
        avatar: string;
        
    @Column({
        nullable: true
    })
        sex: string;

    @Column({
        nullable: true
    }
    )
        cardNumber: number;
    
    @Column({
        nullable: true
    })
        dateOfBirth: Date;

    @Column({
        nullable: true
    })
        address: string;
    
    @Column()
        isAdmin!: boolean;

    @Column({
        nullable: true
    })
        haveMotorbike: boolean;

    @CreateDateColumn()
        createAt!: Date;

    @UpdateDateColumn()
        updateAt!: Date;

    @ManyToOne(() => Room, room => room.users)
    @JoinColumn({ name: 'roomID' })
        room: Room;

    @OneToMany(() => Comment, (comment) => comment.user)
        comments: Comment[];

    @OneToMany(() => Like, (like) => like.user)
        likes: Like[];

    @OneToMany(() => Post, (post) => post.user)
        posts: Post[];

    @OneToMany(() => UserBill, (userBill) => userBill.user)
        userBills: UserBill[];

    @OneToMany(() => Notification, (notification) => notification.user)
        notifications : Notification;
}