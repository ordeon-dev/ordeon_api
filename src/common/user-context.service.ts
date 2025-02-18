import { Injectable } from '@nestjs/common';

@Injectable()
export class UserContextService {
  private user: any;

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}