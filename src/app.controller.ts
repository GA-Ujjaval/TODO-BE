import { BadRequestException, Body, Controller, Delete, Get, Post, Put, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { CloudinaryService } from './img/uploadImg.service';
import { CreateLogin, CreateSignup, TodoImageInput, TodoListInput } from './todoUser/dto/todo-user.input';
import { TodoDataUserResolver, TodoImageResolver, TodoUserResolver } from './todoUser/todo-user.resolver';
import * as dotenv from 'dotenv';
import { JwtAuthGuard } from './auth/jwt.auth-guard';
import { TodoListEntity } from './todoUser/entity/todo-user.entity';
dotenv.config();

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService,
    private userRes: TodoUserResolver,
    private todoDataResolver: TodoDataUserResolver,
    private todoImgResolver: TodoImageResolver,
    private imgUp: CloudinaryService) { }

  @UseGuards(JwtAuthGuard)
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  login(@Body() loginDto: CreateLogin) {
    console.log('login caleed', loginDto.email, loginDto.psw)
    return this.userRes.checkLogin(loginDto.email, loginDto.psw)
  }

  @Post('signup')
  signup(@Body() signupDto: CreateSignup): string {
    console.log('signupDto called', signupDto.email, signupDto.psw)
    this.userRes.createSingup(signupDto)
    return `Successfull Signup into TODO APK`
  }

  // @UseGuards(JwtAuthGuard)
  @Post('img')
  @UseInterceptors(FileInterceptor('file'))
  img(@UploadedFile() file) {
    console.log('img called', file)

    return this.imgUp.uploadImageToCloudinary(file);

    // this.imgUp.uploadImage(file).then(res => {
    //   console.log('img resut', res.secure_url)
    // })
    //   .catch(() => {
    //     throw new BadRequestException('Invalid file type.');
    //   });
    // return `Successfull img uploaded`
  }

  //get images by userid and todoid
  @Get('getImg')
  getImg(@Body() data: any) {
    console.log('getImg called', data.public_id)
    return this.todoImgResolver.getImages(data.userId, data.todoId);
  }

  @Post('imgRemove')
  removeImg(@Body() data: any) {
    console.log('rm img called', data.public_id)
    return this.imgUp.removeImgCloudinary(data.public_id);
  }

  @Get('todoAllList')
  todoAllList(@Body() data: any) {
    console.log('todoAllList called', data.userId)
    return this.todoDataResolver.todoAllList(data.userId);
  }

  @Post('insertTodoData') /// '/todoData'
  todoDataList(@Body() data: TodoListInput) {
    console.log('todoDataList called', data)
    return this.todoDataResolver.todoList(data);
  }

  // insert todo img data
  @Post('insertTodoImg') /// '/todoData img data'
  insertTodoImg(@Body() data: TodoImageInput) {
    console.log('insertTodoImg called', data)
    return this.todoImgResolver.insertTodoImg(data);
  }

  @Put('updateTodo') /// '/todoData'
  todoAllData(@Body() data: any) {
    console.log('todoAllData udpate called', data)
    return this.todoDataResolver.updateTodoList(data.todoId, data);
  }

  @Delete('deleteTodoById') /// '/todoData'
  deleteTodoById(@Body() data: any) {
    console.log('todoAllData udpate called', data)
    return this.todoDataResolver.deleteTodoDataById(data.todoId);
  }

  @Get('**')
  wildcard(): string {
    return 'Route not found'
  }
}


