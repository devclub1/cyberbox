import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { File } from './Files';
import { Log } from './Logs';
import { Membership } from './Memberships';
import { Permission } from './Permissions';
import { Setting } from './Settings';
import { Token } from './Tokens';

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

    @OneToMany(type => Setting, setting => setting.user)
    settings: Setting[];

    @OneToMany(type => File, file => file.user)
    files: File[];

    @OneToMany(type => Token, token => token.user)
    tokens: Token[];

    @OneToMany(type => Log, log => log.user)
    logs: Log[];

    @OneToMany(type => Permission, permission => permission.owner)
    owners: Permission[]

    @OneToMany(type => Permission, permission => permission.guest)
    guests: Permission[]

    @OneToMany(type => Membership, membership => membership.user)
    memberships: Membership[];

    constructor(firstName: string, lastName: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

}