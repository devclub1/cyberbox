import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { File } from './Files';
import { User } from './User';

@Entity('logs')
export class Log {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', length: 10 })
    action: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created: Date;

    @ManyToOne(type => User, user => user.logs)
    @JoinColumn({ name: 'user_uuid' })
    user: User;

    @ManyToOne(type => File, file => file.logs)
    @JoinColumn({ name: 'file_uuid' })
    file: File;
}