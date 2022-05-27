import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity({ name: 'likes'})

export class Like {
    @PrimaryGeneratedColumn()
        likeID!: number;

    @Column()
        isLike: boolean;

    @CreateDateColumn()
        createAt!: Date;

    @UpdateDateColumn()
        updateAt!: Date;

    @ManyToOne(() => User, (user) => user.likes)
    @JoinColumn({
        name: 'userID'
    })
        user: User;

    @ManyToOne(() => Post, (post) => post.likes)
    @JoinColumn({
        name: 'postID'
    })
        post: Post;
}