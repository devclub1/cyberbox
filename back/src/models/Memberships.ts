import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Group } from './Groups';
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

    @ManyToOne(type => User, user => user.memberships)
    @JoinColumn({ name: 'user_uuid' })
    user: User;

    @ManyToOne(type => Group, group => group.memberships)
    @JoinColumn({ name: 'group_uuid' })
    group: Group;

}