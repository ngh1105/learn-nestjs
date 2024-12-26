import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';
@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  
  gethashPassword = (password: string) => {

    var salt = genSaltSync(10);
    var hash = hashSync(password, salt);
    return hash;

  }

   async create(createUserDto: CreateUserDto) {
    // async create(email: string, password: string, name: string){
    const hashPassword = this.gethashPassword(createUserDto.password);
    let user = await this.userModel.create({
      email: createUserDto.email,
      password: hashPassword,
      name: createUserDto.name,
    })
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id))
      return ' Not found id';
      return this.userModel.findOne({
        _id: id,
      });
  
    
  }

  update( updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({_id: updateUserDto._id}, {...updateUserDto});
  }

  remove(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id))
      return ' Not found id';
  }
}
