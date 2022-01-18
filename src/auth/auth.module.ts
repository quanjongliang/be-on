import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CoreModule, JWT } from 'src/core';
import { RepositoryModule } from 'src/repository';
import { AuthController } from './controllers';
import { AuthService, LocalStrategy, JwtStrategy } from './services';

@Module({
  imports: [
    RepositoryModule,
    CoreModule,
    PassportModule,
    JwtModule.register({
      secret: JWT.SECRET,
      signOptions: {
        expiresIn: JWT.EXPIRED_TIME,
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
