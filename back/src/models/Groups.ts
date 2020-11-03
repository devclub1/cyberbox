import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { File } from './Files';
import { Membership } from './Memberships';

@Entity('groups')
export class Group {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'varchar', length: 100 })
    description: string;

    @Column({ type: 'longtext' })
    vault: string;

    @OneToMany(type => File, file => file.group)
    files: File[];

    @OneToMany(type => Membership, membership => membership.group)
    memberships: Membership[];
}
