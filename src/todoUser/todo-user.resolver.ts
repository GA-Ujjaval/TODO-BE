import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLogin, CreateSignup, TodoImageInput, TodoListInput } from './dto/todo-user.input';
import { TodoImageEntity, TodoListEntity, UserSignup } from './entity/todo-user.entity';
import { TodoUserService } from './todo-user.service';

@Resolver(() => UserSignup)
export class TodoUserResolver {
    constructor(private readonly usersService: TodoUserService) { }

    @Mutation(() => UserSignup)
    createLogin(@Args('createLogin') createLogin: CreateLogin) {
        console.log('todo resolver login called', createLogin)
        return this.usersService.createLogin(createLogin);
    }

    @Mutation(() => UserSignup)
    createSingup(@Args('createSignup') createSignup: CreateSignup) {
        console.log('todo resolver signup called', createSignup)
        return this.usersService.createSignup(createSignup);
    }

    @Query(() => UserSignup)
    checkLogin(@Args('user') email: string, psw: string) {
        return this.usersService.findLogin(email, psw);
    }

    @Mutation(() => TodoListEntity)
    todoList(@Args('todoListData') todoListData: TodoListInput) {
        console.log('todo resolver todoListData', todoListData)
        return this.usersService.insertTodoListData(todoListData);
    }

    // @Query(() => UserLogin)
    // checkLogin(@Args('email') email: any) {
    //     return this.usersService.findLogin(email);
    // }

    //todo list


}

@Resolver(() => TodoListEntity)
export class TodoDataUserResolver {
    constructor(private readonly usersService: TodoUserService) { }

    //todo data
    @Mutation(() => TodoListEntity)
    todoList(@Args('todoListData') todoListData: TodoListInput) {
        return this.usersService.insertTodoListData(todoListData);
    }

    @Query(() => TodoListEntity)
    todoAllList(@Args('userId') userId: string) {
        return this.usersService.fetchAllTodoList(userId);
    }

    //todo update data
    @Mutation(() => TodoListEntity)
    updateTodoList(@Args('todoListData') todoId: string, todoListData: TodoListInput) {
        console.log('todo resolver todoListData update', todoListData)
        return this.usersService.updateTodoData(todoId, todoListData);
    }

    //todo update data
    @Mutation(() => TodoListEntity)
    deleteTodoDataById(@Args('todoId') todoId: string) {
        console.log('todo resolver deleteTodoDataById ', todoId)
        return this.usersService.deleteTodoDataById(todoId);
    }

}

@Resolver(() => TodoImageEntity)
export class TodoImageResolver {
    constructor(private readonly usersService: TodoUserService) { }

    @Mutation(() => TodoImageEntity)
    insertTodoImg(@Args('todoListData') todoListData: TodoImageInput) {
        return this.usersService.todolistFilter(todoListData)
    }

    @Query(() => TodoImageEntity)
    getImages(@Args('imgdata') userId: string, todoId: string) {
        return this.usersService.fetchImgData(userId, todoId)
    }
}


