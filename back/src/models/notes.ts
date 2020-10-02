import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('notes')
export class Note {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({
        type: 'mediumtext'
    })
    content: string;

    @Column()
    isPublic: boolean;

    @Column()
    isFolder: boolean;

    @Column()
    idParent: number;

    @ManyToOne(type => User, user => user.notes)
    @JoinColumn({
        name: 'user_id'
    })
    user: User;

}