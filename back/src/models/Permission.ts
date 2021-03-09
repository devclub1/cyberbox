import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { File } from './File';
import { User } from './User';

@Entity('permissions')
export class Permission {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    activeUntil: Date;

    @ManyToOne(() => User, user => user.owners, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'owner_uuid'})
    owner: User;

    @OneToOne(() => User, user => user.guests)
    @JoinColumn({ name: 'guest_uuid' })
    guest: User;

    @ManyToOne(() => File, file => file.permissions, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'file_uuid' })
    file: File;

}