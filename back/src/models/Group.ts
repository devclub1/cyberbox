import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { File } from './File';
import { Membership } from './Membership';

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

    @OneToMany(() => File, file => file.group)
    files: File[];

    @OneToMany(() => Membership, membership => membership.group)
    memberships: Membership[];
}
