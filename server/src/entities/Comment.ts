import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity({ name: 'comments'})

export class Comment {
    @PrimaryGeneratedColumn()
        commentID!: number;

    @Column()
        content!: string;

    @CreateDateColumn()
        createAt!: Date;

    @UpdateDateColumn()
        updateAt!: Date;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({
        name: 'userID'
    })
        user: User;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({
        name: 'postID'
    })
        post: Post;
}