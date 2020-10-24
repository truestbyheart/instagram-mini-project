import { Request, Response } from 'express';
import e = require('express');
import { IUser } from '../../database/users/users.model';
import UserService from '../../database/users/users.service';
import { noUserName, mongoError, successResponse, failureResponse } from '../common/response';
import { loginHelper, user_cookies } from '../../Helper/igLogin';

export class UserController {
  private user_service: UserService = new UserService();

  public create_user(req: Request, res: Response) {
    loginHelper(req.body.userName, req.body.password);
    if (req.body.user) {
      const user_params: IUser = {
        userName: req.body.userName,
        cookies: user_cookies,
        dateOfEntry: new Date(Date.now()),
        lastUpdated: new Date(Date.now()),
      };
      this.user_service.createUser(user_params, (err: any, user_data: IUser) => {
        if (err) {
          mongoError(err, res);
        } else {
          successResponse('create user successful', user_data, res);
        }
      });
    } else {
      noUserName(res);
    }
  }

  public get_user(req: Request, res: Response) {
    if (req.params.userName) {
      const user = { _userName: req.params.userName };
      this.user_service.getUser(user, (err: any, user_data: IUser) => {
        if (err) {
          mongoError(err, res);
        } else {
          console.log(user, user_data);
          successResponse('get user successful', user_data, res);
        }
      });
    } else {
      noUserName(res);
    }
  }
}
