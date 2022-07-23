import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Conversation } from './Conversation';
import { User } from './User';

@Entity({ name: 'message' })

export class Message {
    @PrimaryGeneratedColumn()
        messageID!: number;
    
    @Column()
        message: string;
    
    @CreateDateColumn()
        createAt!: Date;

    @UpdateDateColumn()
        updateAt!: Date;

    @ManyToOne(() => User, (user) => user.messages)
    @JoinColumn({ name: 'userID' })
        users: User;
    
    @ManyToOne(() => Conversation, (conversation) => conversation.messages)
    @JoinColumn({ name: 'conversationID' })
        conversation: Conversation;
    
}
