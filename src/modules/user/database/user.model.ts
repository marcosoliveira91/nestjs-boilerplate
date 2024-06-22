import {
    Column,
    CreateDateColumn,
    Entity, PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';


@Entity()
export class UserModel {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}