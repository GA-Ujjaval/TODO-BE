import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateLogin, CreateSignup, TodoImageInput, TodoListInput } from './dto/todo-user.input';
import { TodoImageEntity, TodoListEntity, UserSignup } from './entity/todo-user.entity';

@Injectable()
export class TodoUserService {
    constructor(
        // @InjectRepository(UserLogin)
        // private readonly userLoginRepo: Repository<UserLogin>,
        @InjectRepository(UserSignup)
        private readonly userSignupRepo: Repository<UserSignup>,
        @InjectRepository(TodoListEntity)
        private readonly todolistRepo: Repository<TodoListEntity>,
        @InjectRepository(TodoImageEntity)
        private readonly todoImg: Repository<TodoImageEntity>,
        private authService: AuthService,
    ) { }

    async createLogin(createLogin: CreateLogin): Promise<any> {
        this.authService.generateJwtToken(createLogin)
        // const user = this.userLoginRepo.create(createLogin);
        // return await this.userLoginRepo.save(user);
    }

    //insert singup data
    async createSignup(createSignup: CreateSignup): Promise<UserSignup> {
        const user = this.userSignupRepo.create(createSignup);
        return await this.userSignupRepo.save(user);
    }

    //verify login credentials
    async findLogin(email: string, psw: string) {
        console.log('findlogin', email)
        const user = await this.userSignupRepo.findOne({
            where: {
                email: email,
                psw: psw
            }
        });
        if (!user) {
            console.log('user not found')
            throw new NotFoundException(`User #${email} not found`);
        }
        console.log('user found', user)
        if (user) {
            let token = this.authService.generateJwtToken({ email, psw })
            return {
                access_token: token.access_token,
                userId: user.userId,
                userName: user.userName,
                email: user.email
            };
        }
    }

    //insert todo list data
    async insertTodoListData(todoList: TodoListInput): Promise<TodoListEntity> {
        const user = this.todolistRepo.create(todoList);
        let res = await this.todolistRepo.save(user);
        // if (res) {
        //     console.log('inserted response todo', res);
        //     var data = {
        //         todoId: res.todoId,
        //         userId: res.userId,
        //         imgList: res.imgList
        //     }
        //     this.todolistFilter(data)
        // }
        return res;
    }

    //fetch all todo list
    async fetchAllTodoList(userId: string): Promise<any> {
        console.log('fetch todo called', userId)
        const todoList = await this.todolistRepo.find({
            where: {
                userId: userId
            }
        });
        if (!todoList) {
            return `No data available`
        }
        if (todoList) {
            return todoList
        }
    }

    async fetchImgData(userId: string, todoId: string) {
        console.log('fetch todo for img called', userId)
        const imgList = this.todoImg.find({
            where: {
                userId: userId,
                todoId: todoId
            }
        });
        if (!imgList) {
            return (`No imgList data available`)
        }
        if (imgList) {
            return (imgList)
        }

    }

    //update todo data
    async updateTodoData(todoId: string, data: TodoListInput): Promise<any> {
        console.log('update todo ', data)
        const todoUpdate = await this.todolistRepo.preload({
            todoId: todoId,
            ...data
        });
        if (!todoUpdate) {
            console.log('todo update error')
            throw new NotFoundException(`not found`);
        }
        return this.todolistRepo.save(todoUpdate);
    }

    // delete todo row
    async deleteTodoDataById(todoId: string): Promise<any> {
        const todoData = await this.todolistRepo.findOne({
            where: {
                todoId: todoId
            }
        });
        if (todoData)
            await this.todolistRepo.remove(todoData);
        else return 'No data found'

        return 'successfully removed'
    }

    async todolistFilter(todolistData: any) {
        let imgdata: any = todolistData.imgList
        let userId = todolistData.userId
        let todoId = todolistData.todoId
        imgdata.forEach((element: TodoImageInput) => {
            var data = {
                todoId: todoId,
                url: element.url,
                public_id: element.public_id,
                userId: userId
            }
            let img = this.todoImg.create(data);
            let imgRes = this.todoImg.save(img);

        });
        return 'done';
    }
}
