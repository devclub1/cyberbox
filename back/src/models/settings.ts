import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users';

@Entity('settings')
export class Setting {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    push: boolean;

    @Column()
    mail: boolean;

    @OneToOne(type => User, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'user_id'
    })
    user: User;

}