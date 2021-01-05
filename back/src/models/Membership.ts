import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Group } from './Group';
import { User } from './User';

@Entity('memberships')
export class Membership {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    owner: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    availableUntil: Date;

    @ManyToOne(() => User, user => user.memberships, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'user_uuid' })
    user: User;

    @ManyToOne(() => Group, group => group.memberships, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'group_uuid' })
    group: Group;

}