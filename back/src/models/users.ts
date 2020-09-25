import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { File } from './files';
import { Note } from './notes';
import { Reminder } from './reminders';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    token: string;

    @Column()
    isAdmin: boolean;

    @OneToMany(type => File, file => file.user)
    files: File[];

    @OneToMany(type => Reminder, reminder => reminder.user)
    reminders: Reminder[];

    @OneToMany(type => Note, note => note.user)
    notes: Note[];

}