import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';


@Injectable()
export class UsersService {


  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>
  ){}

  getAllUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile('./src/users/users.json', 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }

  getUsers() {
    return this.userRepository.find({
      relations: ['posts', 'profile']
    });
  }

  async createUser(user: CreateUserDto) {

    const userFound = await this.userRepository.findOne({
      where: {
        username: user.username
      }
    })

    if(userFound){
      return new HttpException('User already exist', HttpStatus.CONFLICT)
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser)
  }

  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id
      },
      relations: ['posts', 'profilegit']
    })

    if(!userFound){
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return userFound;

  }

  async deleteUser(id: number) {

    // const userFound = await this.userRepository.findOne({
    //   where: {
    //     id
    //   }
    // })

    // if(!userFound)
    // {
    //   return new HttpException('User not found', HttpStatus.NOT_FOUND)
    // }

    // return this.userRepository.delete({ id }) Puede ser reemplazado por lo de abajo

    const result = await this.userRepository.delete({ id });

    if(result.affected === 0){
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return result;

  }

  async updateUser(id:number, user: UpdateUserDto) {

    const userFound = await this.userRepository.findOne({
      where: ({
        id
      })
    })

    if(!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = Object.assign(userFound, user);

    return this.userRepository.save(updateUser);

    // return this.userRepository.update(updateUser, user);

  }

  async createProfile(id: number, profile: CreateProfileDto) {
    const userFound = await this.userRepository.findOne({ //Buscar el usuario
      where: {
        id
      }
    })

    if(!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newProfile = this.profileRepository.create(profile); // Crear nuevo objeto

    const saveProfile = await this.profileRepository.save(newProfile); // Guardar perfil

    userFound.profile = saveProfile; // Relacionar tablas por su atributo de profile en User

    return this.userRepository.save(userFound); // Guardar la info

  }



}
