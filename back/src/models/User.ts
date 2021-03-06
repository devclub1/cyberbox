import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { File } from './File';
import { Log } from './Log';
import { Membership } from './Membership';
import { Permission } from './Permission';
import { Setting } from './Setting';
import { Token } from './Token';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 50 })
    firstName: string;

    @Column({ type: 'varchar', length: 25 })
    lastName: string;

    @Column({ type: 'text', nullable: true })
    vault: string;

    @OneToMany(() => Setting, setting => setting.user)
    settings: Setting[];

    @OneToMany(() => File, file => file.user)
    files: File[];

    @OneToMany(() => Token, token => token.user)
    tokens: Token[];

    @OneToMany(() => Log, log => log.user)
    logs: Log[];

    @OneToMany(() => Permission, permission => permission.owner)
    owners: Permission[];

    @OneToMany(() => Permission, permission => permission.guest)
    guests: Permission[];

    @OneToMany(() => Membership, membership => membership.user)
    memberships: Membership[];

    constructor(firstName: string, lastName: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

}