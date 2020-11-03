import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('settings')
export class Setting {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', length: 10 })
    theme: string;

    @Column()
    limit: number;

    @ManyToOne(type => User, user => user.settings)
    @JoinColumn({
        name: 'user_uuid'
    })
    user: User;

}