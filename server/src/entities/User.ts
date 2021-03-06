import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, ManyToMany } from 'typeorm';
import { Message } from './Message';
import { Comment } from './Comment';
import { Like } from './Like';
import { Post } from './Post';
import { Room } from './Room';
import { Notification } from './Notification';
import { Conversation } from './Conversation';

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


    @OneToMany(() => Notification, (notification) => notification.user)
        notifications : Notification[];

    @OneToMany(() => Message, (message) => message.users)
        messages: Message[];

    @ManyToMany(() => Conversation, (conversation) => conversation.users)
        conversations: Promise<Conversation[]>;
}