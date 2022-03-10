(()=>{"use strict";var e={636:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AppModule=void 0;const o=r(752),i=r(481),a=r(793),n=r(385),s=r(17),d=r(323),c=r(58),l=r(792);let u=class{};u=(0,o.__decorate)([(0,i.Module)({imports:[a.ConfigModule.forRoot(),n.ServeStaticModule.forRoot({rootPath:(0,s.join)(__dirname,"..","client")}),d.StorageModule,c.AuthModule,l.EventLoggerModule],controllers:[],providers:[]})],u),t.AppModule=u},58:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=r(752);(0,o.__exportStar)(r(540),t),(0,o.__exportStar)(r(500),t),(0,o.__exportStar)(r(965),t)},70:(e,t,r)=>{var o,i,a,n,s,d;Object.defineProperty(t,"__esModule",{value:!0}),t.AuthController=void 0;const c=r(752),l=r(481),u=r(860),p=r(965),_=r(500),g=r(984),y=r(323),v=r(732),m=r(702);let h=class{constructor(e){this.authService=e}signIn(e,t){return(0,c.__awaiter)(this,void 0,void 0,(function*(){const r=yield this.authService.checkEmailAndPassword(e.email,e.password),o=this.authService.encryptJwt(r);t.setHeader("Authorization",`Bearer ${o}`),t.send({token:o,user:r}),t.end()}))}signUp(e){return(0,c.__awaiter)(this,void 0,void 0,(function*(){return yield y.UserEntity.createUser(e.email,e.name,e.password)}))}getUser(e){return e}};(0,c.__decorate)([(0,l.Post)("sign-in"),(0,c.__param)(0,(0,l.Body)()),(0,c.__param)(1,(0,l.Res)()),(0,c.__metadata)("design:type",Function),(0,c.__metadata)("design:paramtypes",["function"==typeof(o=void 0!==p.SignInDto&&p.SignInDto)?o:Object,"function"==typeof(i=void 0!==u.Response&&u.Response)?i:Object]),(0,c.__metadata)("design:returntype",Promise)],h.prototype,"signIn",null),(0,c.__decorate)([(0,l.Post)("sign-up"),(0,c.__param)(0,(0,l.Body)()),(0,c.__metadata)("design:type",Function),(0,c.__metadata)("design:paramtypes",["function"==typeof(a=void 0!==v.SignUpDto&&v.SignUpDto)?a:Object]),(0,c.__metadata)("design:returntype",Promise)],h.prototype,"signUp",null),(0,c.__decorate)([(0,l.Get)("current-user"),(0,c.__param)(0,(0,_.CurrentUser)()),(0,c.__metadata)("design:type",Function),(0,c.__metadata)("design:paramtypes",["function"==typeof(n=void 0!==m.UserInterface&&m.UserInterface)?n:Object]),(0,c.__metadata)("design:returntype","function"==typeof(s=void 0!==m.UserInterface&&m.UserInterface)?s:Object)],h.prototype,"getUser",null),h=(0,c.__decorate)([(0,l.Controller)("auth"),(0,c.__metadata)("design:paramtypes",["function"==typeof(d=void 0!==g.AuthService&&g.AuthService)?d:Object])],h),t.AuthController=h},545:(e,t,r)=>{var o;Object.defineProperty(t,"__esModule",{value:!0}),t.AuthMiddleware=void 0;const i=r(752),a=r(481),n=r(984),s=r(323);let d=class{constructor(e){this.authService=e}use(e,t,r){var o;return(0,i.__awaiter)(this,void 0,void 0,(function*(){console.log(e.headers);const i=e.headers.Authorization;if(a.Logger.log(i),!i)throw new a.UnauthorizedException;const n=String(i).replace("Bearer ",""),d=this.authService.decryptJwt(n);if(!(null===(o=null==d?void 0:d.user)||void 0===o?void 0:o.email))throw new a.UnauthorizedException;let c=d.user;if(Date.now()>Number(String(d.exp)+"000")){c=yield s.UserEntity.getUserByEmail(d.user.email);const e=this.authService.encryptJwt(c);t.setHeader("Authorization",`Bearer ${e}`)}e.user=c,r()}))}};d=(0,i.__decorate)([(0,a.Injectable)(),(0,i.__metadata)("design:paramtypes",["function"==typeof(o=void 0!==n.AuthService&&n.AuthService)?o:Object])],d),t.AuthMiddleware=d},540:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AuthModule=void 0;const o=r(752),i=r(481),a=r(399),n=r(70),s=r(545),d=r(323),c=r(984),l=r(64);let u=class{configure(e){e.apply(s.AuthMiddleware).exclude({path:"api/auth/sign-in",method:i.RequestMethod.POST},{path:"api/auth/sign-up",method:i.RequestMethod.POST}).forRoutes({path:"*",method:i.RequestMethod.ALL})}};u=(0,o.__decorate)([(0,i.Module)({imports:[a.TypeOrmModule.forFeature([d.UserEntity,d.UserPasswordEntity]),l.JwtModule.register({secret:process.env.JWT_SECRET,signOptions:{expiresIn:"180s"}})],controllers:[n.AuthController],providers:[c.AuthService]})],u),t.AuthModule=u},984:(e,t,r)=>{var o;Object.defineProperty(t,"__esModule",{value:!0}),t.AuthService=void 0;const i=r(752),a=r(481),n=r(323),s=r(64);let d=class{constructor(e){this.jwtService=e}checkEmailAndPassword(e,t){return(0,i.__awaiter)(this,void 0,void 0,(function*(){const r=yield n.UserEntity.findOne({where:{email:e}});if(console.log(r),!r)throw new a.UnauthorizedException(`${e} не зарегистрирован!`,"AuthLocalStrategy.validate()");if(!(yield n.UserPasswordEntity.isPasswordOfUser(r,t)))throw new a.UnauthorizedException("Неверный пароль!","AuthLocalStrategy.validate()");if(!r.isActive)throw new a.ForbiddenException("Доступ запрещен!","AuthLocalStrategy.validate()");return r}))}encryptJwt(e){const t={user:e};return this.jwtService.sign(t)}decryptJwt(e){return this.jwtService.verify(e)}};d=(0,i.__decorate)([(0,a.Injectable)(),(0,i.__metadata)("design:paramtypes",["function"==typeof(o=void 0!==s.JwtService&&s.JwtService)?o:Object])],d),t.AuthService=d},500:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CurrentUser=void 0;const o=r(481);t.CurrentUser=(0,o.createParamDecorator)((e=>e.switchToHttp().getRequest().user))},965:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SignInDto=void 0;const o=r(752),i=r(849);class a{}(0,o.__decorate)([(0,i.IsEmail)(),(0,o.__metadata)("design:type",String)],a.prototype,"email",void 0),(0,o.__decorate)([(0,i.IsString)(),(0,i.Length)(1,64),(0,o.__metadata)("design:type",String)],a.prototype,"password",void 0),t.SignInDto=a},732:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SignUpDto=void 0;const o=r(752),i=r(849);class a{}(0,o.__decorate)([(0,i.IsEmail)(),(0,o.__metadata)("design:type",String)],a.prototype,"email",void 0),(0,o.__decorate)([(0,i.IsString)(),(0,i.Length)(1,255),(0,o.__metadata)("design:type",String)],a.prototype,"name",void 0),(0,o.__decorate)([(0,i.IsString)(),(0,i.Length)(1,64),(0,o.__metadata)("design:type",String)],a.prototype,"password",void 0),t.SignUpDto=a},702:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),(0,r(752).__exportStar)(r(117),t)},117:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},792:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=r(752);(0,o.__exportStar)(r(465),t),(0,o.__exportStar)(r(198),t)},440:(e,t,r)=>{var o,i,a;Object.defineProperty(t,"__esModule",{value:!0}),t.EventLoggerController=void 0;const n=r(752),s=r(481),d=r(323);let c=class{postRecord(){return(0,n.__awaiter)(this,void 0,void 0,(function*(){const e=`Тестовая запись ${Math.random().toString(32).slice(2)}`;return yield d.LoggerRecord.addRecord(d.LoggerRecordTypes.log,e,"EventLoggerController.postRecord()"),"Запись успешно добавлена."}))}getAllRecords(){return(0,n.__awaiter)(this,void 0,void 0,(function*(){return yield d.LoggerRecord.getAllRecords()}))}deleteAllRecords(){return(0,n.__awaiter)(this,void 0,void 0,(function*(){return yield d.LoggerRecord.removeAllRecords(),"Общий журнал событий полностью очищен."}))}};(0,n.__decorate)([(0,s.Get)("records/add-record"),(0,n.__metadata)("design:type",Function),(0,n.__metadata)("design:paramtypes",[]),(0,n.__metadata)("design:returntype","function"==typeof(o="undefined"!=typeof Promise&&Promise)?o:Object)],c.prototype,"postRecord",null),(0,n.__decorate)([(0,s.Get)("records"),(0,n.__metadata)("design:type",Function),(0,n.__metadata)("design:paramtypes",[]),(0,n.__metadata)("design:returntype","function"==typeof(i="undefined"!=typeof Promise&&Promise)?i:Object)],c.prototype,"getAllRecords",null),(0,n.__decorate)([(0,s.Get)("delete"),(0,n.__metadata)("design:type",Function),(0,n.__metadata)("design:paramtypes",[]),(0,n.__metadata)("design:returntype","function"==typeof(a="undefined"!=typeof Promise&&Promise)?a:Object)],c.prototype,"deleteAllRecords",null),c=(0,n.__decorate)([(0,s.Controller)("event-logger")],c),t.EventLoggerController=c},465:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EventLoggerModule=void 0;const o=r(752),i=r(481),a=r(399),n=r(323),s=r(198),d=r(440);let c=class{};c=(0,o.__decorate)([(0,i.Module)({imports:[a.TypeOrmModule.forFeature([n.LoggerRecord])],controllers:[d.EventLoggerController],providers:[s.EventLoggerService],exports:[s.EventLoggerService]})],c),t.EventLoggerModule=c},198:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EventLoggerService=void 0;const o=r(752),i=r(481),a=r(323);let n=class extends i.ConsoleLogger{log(e,t){a.LoggerRecord.addRecord(a.LoggerRecordTypes.log,e,t).catch((e=>{i.Logger.error(e.message,"EventLoggerService.log()")}))}error(e,t,r){a.LoggerRecord.addRecord(a.LoggerRecordTypes.error,e,r).catch((e=>{i.Logger.error(e.message,"EventLoggerService.error()")}))}warn(e,t){a.LoggerRecord.addRecord(a.LoggerRecordTypes.warn,e,t).catch((e=>{i.Logger.error(e.message,"EventLoggerService.warn()")}))}debug(e,t){a.LoggerRecord.addRecord(a.LoggerRecordTypes.debug,e,t).catch((e=>{i.Logger.error(e.message,"EventLoggerService.debug()")}))}verbose(e,t){a.LoggerRecord.addRecord(a.LoggerRecordTypes.verbose,e,t).catch((e=>{i.Logger.error(e.message,"EventLoggerService.verbose()")}))}};n=(0,o.__decorate)([(0,i.Injectable)()],n),t.EventLoggerService=n},323:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=r(752);(0,o.__exportStar)(r(4),t),(0,o.__exportStar)(r(293),t),(0,o.__exportStar)(r(285),t),(0,o.__exportStar)(r(193),t)},193:(e,t,r)=>{var o,i;Object.defineProperty(t,"__esModule",{value:!0}),t.UserPasswordEntity=void 0;const a=r(752),n=r(250),s=r(38),d=r(285),c=r(481);let l=o=class extends n.BaseEntity{static setPassword(e,t){return(0,a.__awaiter)(this,void 0,void 0,(function*(){if(t.length<8||t.length>64)throw new c.BadRequestException("Длина пароля должна быть от 8 до 64 символов!","UserPasswordEntity.setPassword()");let r=yield this.findOne({where:{user:e}});if(r)return r.passwordHashed=yield s.hash(t),void(yield this.save(r));r=new o,r.user=e,r.passwordHashed=yield s.hash(t)}))}static isPasswordOfUser(e,t){return(0,a.__awaiter)(this,void 0,void 0,(function*(){const r=yield this.findOne({where:{user:e}});return!!r&&(yield s.verify(r.passwordHashed,t))}))}};(0,a.__decorate)([(0,n.PrimaryGeneratedColumn)(),(0,a.__metadata)("design:type",Number)],l.prototype,"id",void 0),(0,a.__decorate)([(0,n.OneToOne)((()=>d.UserEntity),(e=>e.password)),(0,n.JoinColumn)(),(0,a.__metadata)("design:type","function"==typeof(i=void 0!==d.UserEntity&&d.UserEntity)?i:Object)],l.prototype,"user",void 0),(0,a.__decorate)([(0,n.Column)({type:"varchar",length:512,nullable:!1}),(0,a.__metadata)("design:type",String)],l.prototype,"passwordHashed",void 0),l=o=(0,a.__decorate)([(0,n.Entity)("COMMON_User_password")],l),t.UserPasswordEntity=l},285:(e,t,r)=>{var o,i,a,n;Object.defineProperty(t,"__esModule",{value:!0}),t.UserEntity=void 0;const s=r(752),d=r(250),c=r(849),l=r(481),u=r(193);let p=o=class extends d.BaseEntity{static createUser(e,t,r){return(0,s.__awaiter)(this,void 0,void 0,(function*(){if(yield this.findOne({where:{email:e}}))throw new l.BadRequestException(`${e} занят!`);const i=yield this.count({where:{name:t}});let a=new o;a.email=e,a.name=i?`${t} - ${i+1}`:t;const n=yield(0,c.validate)(a);if(n.length)throw new l.BadRequestException(n);a=yield this.save(a);try{yield u.UserPasswordEntity.setPassword(a,r)}catch(e){throw yield this.delete(a),new l.BadRequestException(e)}return a}))}static getUserByEmail(e){return(0,s.__awaiter)(this,void 0,void 0,(function*(){const t=yield this.findOne({where:{email:e}});if(!t)throw new l.UnauthorizedException;if(!(null==t?void 0:t.isActive))throw new l.ForbiddenException;return{email:t.email,name:t.name}}))}};(0,s.__decorate)([(0,c.IsEmail)(),(0,c.Length)(1,255),(0,d.PrimaryColumn)({type:"varchar",length:255,unique:!0}),(0,s.__metadata)("design:type",String)],p.prototype,"email",void 0),(0,s.__decorate)([(0,c.IsString)(),(0,c.Length)(1,255),(0,d.Column)({type:"varchar",length:255,unique:!0,nullable:!1}),(0,s.__metadata)("design:type",String)],p.prototype,"name",void 0),(0,s.__decorate)([(0,c.IsOptional)(),(0,c.IsBoolean)(),(0,d.Column)({type:"boolean",nullable:!1,default:!0}),(0,s.__metadata)("design:type",Boolean)],p.prototype,"isActive",void 0),(0,s.__decorate)([(0,d.CreateDateColumn)(),(0,s.__metadata)("design:type","function"==typeof(i="undefined"!=typeof Date&&Date)?i:Object)],p.prototype,"createTimestamp",void 0),(0,s.__decorate)([(0,d.UpdateDateColumn)(),(0,s.__metadata)("design:type","function"==typeof(a="undefined"!=typeof Date&&Date)?a:Object)],p.prototype,"updateTimestamp",void 0),(0,s.__decorate)([(0,d.OneToOne)((()=>u.UserPasswordEntity),(e=>e.user)),(0,s.__metadata)("design:type","function"==typeof(n=void 0!==u.UserPasswordEntity&&u.UserPasswordEntity)?n:Object)],p.prototype,"password",void 0),p=o=(0,s.__decorate)([(0,d.Entity)("COMMON_Users")],p),t.UserEntity=p},293:(e,t,r)=>{var o,i;Object.defineProperty(t,"__esModule",{value:!0}),t.LoggerRecord=t.LoggerRecordTypes=void 0;const a=r(752),n=r(250),s=r(849);var d;!function(e){e.log="log",e.error="error",e.warn="warn",e.debug="debug",e.verbose="verbose"}(d=t.LoggerRecordTypes||(t.LoggerRecordTypes={}));let c=o=class extends n.BaseEntity{static addRecord(e,t,r){return(0,a.__awaiter)(this,void 0,void 0,(function*(){const i=new o;return i.type=e,i.message=t,i.context=null!=r?r:null,yield(0,s.validate)(i),yield this.save(i)}))}static getAllRecords(){return(0,a.__awaiter)(this,void 0,void 0,(function*(){return yield this.find()}))}static removeAllRecords(){return(0,a.__awaiter)(this,void 0,void 0,(function*(){yield this.clear()}))}};(0,a.__decorate)([(0,n.PrimaryGeneratedColumn)(),(0,a.__metadata)("design:type",Number)],c.prototype,"id",void 0),(0,a.__decorate)([(0,n.CreateDateColumn)(),(0,a.__metadata)("design:type","function"==typeof(i="undefined"!=typeof Date&&Date)?i:Object)],c.prototype,"timestamp",void 0),(0,a.__decorate)([(0,s.IsEnum)(d),(0,n.Column)({type:"varchar",length:10,nullable:!1,enum:d}),(0,a.__metadata)("design:type",String)],c.prototype,"type",void 0),(0,a.__decorate)([(0,s.IsString)(),(0,s.Length)(1,1e3),(0,n.Column)({type:"varchar",length:1e3,nullable:!1}),(0,a.__metadata)("design:type",String)],c.prototype,"message",void 0),(0,a.__decorate)([(0,s.IsOptional)(),(0,s.IsString)(),(0,s.Length)(1,255),(0,n.Column)({type:"varchar",length:255,nullable:!0}),(0,a.__metadata)("design:type",String)],c.prototype,"context",void 0),c=o=(0,a.__decorate)([(0,n.Entity)("LOGGER_records")],c),t.LoggerRecord=c},4:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.StorageModule=void 0;const o=r(752),i=r(481),a=r(399),n=r(869);let s=class{};s=(0,o.__decorate)([(0,i.Module)({imports:[a.TypeOrmModule.forRoot(n.default)]})],s),t.StorageModule=s},869:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=r(17);t.default={type:"postgres",url:process.env.DATABASE_URL,ssl:{rejectUnauthorized:!1},autoLoadEntities:!0,synchronize:!1,retryAttempts:1,cli:{migrationsDir:(0,o.join)(__dirname,"libs","storage","src","lib","migrations")},entities:[(0,o.join)(__dirname,"libs","storage","src","lib","entities","*.entity.{ts,js}"),(0,o.join)(__dirname,"libs","storage","src","lib","entities","**","*.entity.{ts,js}")],migrations:[(0,o.join)(__dirname,"libs","storage","src","lib","migrations","*.{ts,js}"),(0,o.join)(__dirname,"libs","storage","src","lib","migrations","**","*.{ts,js}")],subscribers:[(0,o.join)(__dirname,"libs","storage","src","lib","subscribers","*.{ts,js}"),(0,o.join)(__dirname,"libs","storage","src","lib","subscribers","**","*.{ts,js}")]}},481:e=>{e.exports=require("@nestjs/common")},793:e=>{e.exports=require("@nestjs/config")},143:e=>{e.exports=require("@nestjs/core")},64:e=>{e.exports=require("@nestjs/jwt")},385:e=>{e.exports=require("@nestjs/serve-static")},399:e=>{e.exports=require("@nestjs/typeorm")},38:e=>{e.exports=require("argon2")},849:e=>{e.exports=require("class-validator")},860:e=>{e.exports=require("express")},752:e=>{e.exports=require("tslib")},250:e=>{e.exports=require("typeorm")},17:e=>{e.exports=require("path")}},t={};function r(o){var i=t[o];if(void 0!==i)return i.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,r),a.exports}var o={};(()=>{var e=o;Object.defineProperty(e,"__esModule",{value:!0});const t=r(752),i=r(481),a=r(143),n=r(636),s=r(793),d=r(792);(function(){return(0,t.__awaiter)(this,void 0,void 0,(function*(){let e={};e={bufferLogs:!0,logger:new d.EventLoggerService};const t=yield a.NestFactory.create(n.AppModule,e),r=t.get(s.ConfigService),o=yield r.get("PORT");t.setGlobalPrefix("api"),t.useGlobalPipes(new i.ValidationPipe),yield t.listen(o),i.Logger.log(`Сервер запущен в режиме "production" на: http://localhost:${o}/api`)}))})().catch((e=>{i.Logger.error("При запуске сервера возникла ошибка:","main.boostrap()"),console.error(e)}))})();var i=exports;for(var a in o)i[a]=o[a];o.__esModule&&Object.defineProperty(i,"__esModule",{value:!0})})();
//# sourceMappingURL=main.js.map