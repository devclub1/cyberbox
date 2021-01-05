import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity('tokens')
export class Token {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', length: 256})
    token: string;

    @Column()
    active: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    activeUntil: Date;

    @ManyToOne(() => User, user => user.tokens, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'user_uuid' })
    user: User;
}