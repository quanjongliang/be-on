import { EntityRepository, Repository } from 'typeorm';

import { User } from 'src/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findOneByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ email, isDeleted: false });
  }

  findOneByUser(user: string): Promise<User | undefined> {
    return this.findOne({
      where: [
        { username: user, isDeleted: false },
        { email: user, isDeleted: false },
      ],
    });
  }
}
