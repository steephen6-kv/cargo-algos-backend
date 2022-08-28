import {
  DeepPartial,
  DeleteResult,
  getManager,
  getRepository,
  Repository,
} from "typeorm";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { ErrorCodes } from "../util/errorCode";
import SearchResult from "../util/rest/searchresult";
import { EmployeeDto } from "../dto/EmployeeDto";
import { RegisterUserDto } from "../dto/RegisterUserDto";
import { User } from "../entity/user";

/**
 * Handles CRUD operations
 */
export class UserDao {

  public register = async (
    userRegistrationData: RegisterUserDto
  ): Promise<User> => {
    const userRepo: Repository<User> = getRepository(User);
    const userDetail: User = await userRepo.save(userRegistrationData);
    return userDetail;
  }

  public getById = async (userId: string): Promise<User> => {
    const userRepo: Repository<User> = getManager().getRepository(User);
    const userData = await userRepo.findOne(userId);
    return userData;
  }

  public getByPhoneNumber = async (phoneNumber: string): Promise<User> => {
    const userRepo: Repository<User> = getManager().getRepository(User);
    const userData = await userRepo.findOne({ phoneNumber });
    return userData;
  }

  public updateUserStatus = async (userId: string): Promise<boolean> => {
    const userRepo: Repository<User> = getRepository(User);
    await userRepo.update(userId, {
      status: "verified"
    });
    return true;
  }

}
