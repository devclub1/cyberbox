import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users';

@Entity('files')
export class File {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    isPublic: boolean;

    @Column()
    idParent: number;

    @Column()
    isFolder: boolean;

    @Column()
    path: string;

    @ManyToOne(type => User, user => user.files)
    @JoinColumn({
        name: 'user_id'
    })
    user: User;
}