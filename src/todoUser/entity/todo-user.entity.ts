import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


// @Entity()
// @ObjectType()
// export class UserLogin {

//     @PrimaryGeneratedColumn('uuid')
//     @Field(() => String, { description: 'id of the user' })
//     userId: string;

//     @Field(() => String)
//     @Column()
//     email: string

//     @Field(() => String)
//     @Column()
//     psw: string

// }


@Entity()
@ObjectType()
export class UserSignup {

    @PrimaryGeneratedColumn('uuid')
    @Field(() => String, { description: 'id of the user' })
    userId: string;

    @Field(() => String)
    @Column()
    userName: string

    @Field(() => String)
    @Column()
    email: string

    @Field(() => String)
    @Column()
    psw: string

    @Field(() => String)
    @Column()
    cnfpsw: string

}

@Entity()
@ObjectType()
export class TodoListEntity {

    @PrimaryGeneratedColumn('uuid')
    @Field(() => String, { description: 'id of todo list' })
    todoId: string;

    @Field(() => String)
    @Column()
    userId: string

    @Field(() => String)
    @Column()
    title: string

    @Field(() => String)
    @Column()
    description: string

    @Field(() => Boolean)
    @Column()
    checked: boolean

    @Field(() => String)
    @Column()
    imgList: string
}

@Entity()
@ObjectType()
export class TodoImageEntity {

    @PrimaryGeneratedColumn('uuid')
    @Field(() => String, { description: 'id of todo list' })
    todoimgId: string;

    @Field(() => String)
    @Column()
    todoId: string

    @Field(() => String)
    @Column()
    userId: string

    @Field(() => String)
    @Column()
    url: string

    @Field(() => String)
    @Column()
    public_id: string
}
