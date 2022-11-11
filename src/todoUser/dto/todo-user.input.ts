import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLogin {

    @Field(() => String, { description: 'email of the user' })
    email: string;

    @Field(() => String, { description: 'psw of the user' })
    psw: string;
}

@InputType()
export class CreateSignup {

    @Field(() => String, { description: 'email of the user' })
    email: string;

    @Field(() => String, { description: 'psw of the user' })
    psw: string;


    @Field(() => String, { description: 'confirm psw of the user' })
    cnfpsw: string;
}




@InputType()
export class TodoListInput {
    @Field(() => String)
    userId: string

    @Field(() => String)
    title: string

    @Field(() => String)
    description: string

    @Field(() => Boolean)
    checked: boolean

    @Field(() => String)
    imgList: string
}

@InputType()
export class TodoImageInput {

    @Field(() => String)
    todoId: string

    @Field(() => String)
    userId: string

    @Field(() => String)
    url: string

    @Field(() => String)
    public_id: string


}



