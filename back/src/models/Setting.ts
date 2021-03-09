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

    @ManyToOne(() => User, user => user.settings, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'user_uuid' })
    user: User;

}