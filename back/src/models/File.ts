import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Group } from './Group';
import { Log } from './Log';
import { Permission } from './Permission';
import { User } from './User';

@Entity('files')
export class File {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'varchar', length: 200 })
    description: string;

    @Column({ type: 'varchar', length: 10 })
    extension: string;

    @Column({ type: 'varchar', length: 150 })
    path: string;

    @Column()
    encrypted: boolean;

    @Column()
    directory: boolean;

    @Column({ type: 'varchar', length: 10 })
    label: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updated: Date;

    @OneToMany(() => Permission, permission => permission.file)
    permissions: Permission[];

    @OneToMany(() => Log, log => log.file)
    logs: Log[];

    @OneToOne(() => File, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'parent_uuid' })
    parent: File;

    @ManyToOne(() => User, user => user.files, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'user_uuid' })
    user: User;

    @ManyToOne(() => Group, group => group.files, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'group_uuid' })
    group: Group;

}