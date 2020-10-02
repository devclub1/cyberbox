import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('reminders')
export class Reminder {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    expiration: string;

    @Column()
    isDone: boolean;

    @ManyToOne(type => User, user => user.reminders)
    @JoinColumn({
        name: 'user_id'
    })
    user: User;
}