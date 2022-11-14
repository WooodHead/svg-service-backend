import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './core/users/users.module';
import { UsersController } from './core/users/users.controller';
import { RolesController } from "./core/roles/roles.controller";
import { User } from "./core/users/users.model";
import { Role } from "./core/roles/roles.model";
import { UserRoles } from "./core/roles/user-roles.model";
import { RolesModule } from "./core/roles/roles.module";
import { AuthController } from "./auth/auth.controller";

@Module({
    controllers: [UsersController, RolesController, AuthController],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `${process.env.NODE_ENV}.env`
        }),

        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            models: [User, Role, UserRoles],
            autoLoadModels: true,
        }),
        RolesModule,
        AuthModule,
        UsersModule,
    ]
})
export class AppModule {

}