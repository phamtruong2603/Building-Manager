import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User';
import { Message } from './Message';
// import { ConversationUser } from './Conver-User';

@Entity({ name: 'conversation' })

export class Conversation {
    @PrimaryGeneratedColumn()
        conversationID!: number;
    
    @Column({
        nullable: true
    })
        nameConversation: string;
    
    @CreateDateColumn()
        createAt!: Date;

    @UpdateDateColumn()
        updateAt!: Date;

    @ManyToMany(() => User, (user) => user.conversations)
    @JoinTable()
        users: User[];
    
    @OneToMany(() => Message, (message) => message.conversation)
        messages: Promise<Message[]>;

}
