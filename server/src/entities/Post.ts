import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { Like } from './Like';
import { Comment } from './Comment';
import { Notification } from './Notification';


@Entity({ name: 'posts'})

export class Post {
    @PrimaryGeneratedColumn()
        postID!: number;

    @Column({
        nullable: true
    })
        title: string;

    @Column()
        content!: string;

    @Column()
        postImg?: string;

    @CreateDateColumn()
        createAt!: Date;

    @UpdateDateColumn()
        updateAt!: Date;

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({
        name: 'userID'
    })
        user!: User;

    @OneToMany(() => Comment, (comment) => comment.post)
        comments!: Comment[];

    @OneToMany(() => Like, (like) => like.post)
        likes!: Like[];

    @OneToMany(() => Like, (like) => like.post)
        notifications!: Notification[];
}