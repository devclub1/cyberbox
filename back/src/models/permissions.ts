import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users';

@Entity('permissions')
export class Permission {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    created: string;

    @OneToOne(type => User, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'owner_id'
    })
    owner: User;

    @OneToOne(type => User, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'friend_id'
    })
    friend: User;
}