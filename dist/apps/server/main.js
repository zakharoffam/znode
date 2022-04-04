(()=>{"use strict";var e={4636:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AppModule=void 0;const o=r(752),a=r(6481),n=r(5793),i=r(5385),s=r(1017),d=r(6323),_=r(8058),c=r(7001),l=r(6576),p=r(1149),u=r(3025);let y=class{};y=(0,o.__decorate)([(0,a.Module)({imports:[n.ConfigModule.forRoot(),i.ServeStaticModule.forRoot({rootPath:(0,s.join)(__dirname,"..","client")}),p.ScheduleModule.forRoot(),d.StorageModule,l.EventLoggerModule,_.AuthModule,c.UsersModule,u.TelegramZnodeHelperBotModule],controllers:[],providers:[]})],y),t.AppModule=y},8058:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=r(752);(0,o.__exportStar)(r(2540),t),(0,o.__exportStar)(r(2500),t),(0,o.__exportStar)(r(7965),t)},5070:(e,t,r)=>{var o,a,n,i,s,d;Object.defineProperty(t,"__esModule",{value:!0}),t.AuthController=void 0;const _=r(752),c=r(6481),l=r(6860),p=r(7965),u=r(2500),y=r(1984),g=r(6323),v=r(7732),m=r(3702);let f=class{constructor(e){this.authService=e}signIn(e,t){return(0,_.__awaiter)(this,void 0,void 0,(function*(){const r=yield this.authService.checkEmailAndPassword(e.email,e.password),o=this.authService.encryptJwt(r);t.setHeader("Authorization",`Bearer ${o}`),t.send({token:o,user:r}),t.end()}))}signUp(e){return(0,_.__awaiter)(this,void 0,void 0,(function*(){return yield g.UserEntity.createUser(e.email,e.name,e.password)}))}getUser(e){return e}};(0,_.__decorate)([(0,c.Post)("sign-in"),(0,_.__param)(0,(0,c.Body)()),(0,_.__param)(1,(0,c.Res)()),(0,_.__metadata)("design:type",Function),(0,_.__metadata)("design:paramtypes",["function"==typeof(o=void 0!==p.SignInDto&&p.SignInDto)?o:Object,"function"==typeof(a=void 0!==l.Response&&l.Response)?a:Object]),(0,_.__metadata)("design:returntype",Promise)],f.prototype,"signIn",null),(0,_.__decorate)([(0,c.Post)("sign-up"),(0,_.__param)(0,(0,c.Body)()),(0,_.__metadata)("design:type",Function),(0,_.__metadata)("design:paramtypes",["function"==typeof(n=void 0!==v.SignUpDto&&v.SignUpDto)?n:Object]),(0,_.__metadata)("design:returntype",Promise)],f.prototype,"signUp",null),(0,_.__decorate)([(0,c.Get)("current-user"),(0,_.__param)(0,(0,u.CurrentUser)()),(0,_.__metadata)("design:type",Function),(0,_.__metadata)("design:paramtypes",["function"==typeof(i=void 0!==m.UserInterface&&m.UserInterface)?i:Object]),(0,_.__metadata)("design:returntype","function"==typeof(s=void 0!==m.UserInterface&&m.UserInterface)?s:Object)],f.prototype,"getUser",null),f=(0,_.__decorate)([(0,c.Controller)("auth"),(0,_.__metadata)("design:paramtypes",["function"==typeof(d=void 0!==y.AuthService&&y.AuthService)?d:Object])],f),t.AuthController=f},9545:(e,t,r)=>{var o;Object.defineProperty(t,"__esModule",{value:!0}),t.AuthMiddleware=void 0;const a=r(752),n=r(6481),i=r(1984);let s=class{constructor(e){this.authService=e}use(e,t,r){return(0,a.__awaiter)(this,void 0,void 0,(function*(){let o;const a=e.headers["x-access-token"];if(a){const n=this.authService.decryptJwt(String(a));if(Date.now()>Date.parse(n.exp+"000")){o={email:"guest@znode.ru",name:"Гость"};const a=this.authService.encryptJwt(o);t.setHeader("x-access-token",JSON.stringify(a)),e.user=o,r()}else e.user=n.user,r()}else{o={email:"guest@znode.ru",name:"Гость"};const a=this.authService.encryptJwt(o);t.setHeader("x-access-token",JSON.stringify(a)),e.user=o,r()}}))}};s=(0,a.__decorate)([(0,n.Injectable)(),(0,a.__metadata)("design:paramtypes",["function"==typeof(o=void 0!==i.AuthService&&i.AuthService)?o:Object])],s),t.AuthMiddleware=s},2540:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AuthModule=void 0;const o=r(752),a=r(6481),n=r(3399),i=r(5070),s=r(9545),d=r(6323),_=r(1984),c=r(2064);let l=class{configure(e){e.apply(s.AuthMiddleware).exclude({path:"api/auth/sign-in",method:a.RequestMethod.POST},{path:"api/users",method:a.RequestMethod.POST}).forRoutes({path:"*",method:a.RequestMethod.ALL})}};l=(0,o.__decorate)([(0,a.Module)({imports:[n.TypeOrmModule.forFeature([d.UserEntity,d.UserPasswordEntity]),c.JwtModule.register({secret:process.env.JWT_SECRET,signOptions:{expiresIn:"180s"}})],controllers:[i.AuthController],providers:[_.AuthService]})],l),t.AuthModule=l},1984:(e,t,r)=>{var o;Object.defineProperty(t,"__esModule",{value:!0}),t.AuthService=void 0;const a=r(752),n=r(6481),i=r(6323),s=r(2064);let d=class{constructor(e){this.jwtService=e}checkEmailAndPassword(e,t){return(0,a.__awaiter)(this,void 0,void 0,(function*(){const r=yield i.UserEntity.findOne({where:{email:e}});if(!r)throw new n.UnauthorizedException(`${e} не зарегистрирован!`,"AuthLocalStrategy.validate()");if(!(yield i.UserPasswordEntity.isPasswordOfUser(r,t)))throw new n.UnauthorizedException("Неверный пароль!","AuthLocalStrategy.validate()");if(!r.isActive)throw new n.ForbiddenException("Доступ запрещен!","AuthLocalStrategy.validate()");return r}))}encryptJwt(e){const t={user:e};return this.jwtService.sign(t)}decryptJwt(e){return this.jwtService.decode(e)}};d=(0,a.__decorate)([(0,n.Injectable)(),(0,a.__metadata)("design:paramtypes",["function"==typeof(o=void 0!==s.JwtService&&s.JwtService)?o:Object])],d),t.AuthService=d},2500:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CurrentUser=void 0;const o=r(6481);t.CurrentUser=(0,o.createParamDecorator)(((e,t)=>t.switchToHttp().getRequest().user))},7965:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SignInDto=void 0;const o=r(752),a=r(5849);class n{}(0,o.__decorate)([(0,a.IsEmail)(),(0,o.__metadata)("design:type",String)],n.prototype,"email",void 0),(0,o.__decorate)([(0,a.IsString)(),(0,a.Length)(1,64),(0,o.__metadata)("design:type",String)],n.prototype,"password",void 0),t.SignInDto=n},7732:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SignUpDto=void 0;const o=r(752),a=r(5849);class n{}(0,o.__decorate)([(0,a.IsEmail)(),(0,o.__metadata)("design:type",String)],n.prototype,"email",void 0),(0,o.__decorate)([(0,a.IsString)(),(0,a.Length)(1,255),(0,o.__metadata)("design:type",String)],n.prototype,"name",void 0),(0,o.__decorate)([(0,a.IsString)(),(0,a.Length)(1,64),(0,o.__metadata)("design:type",String)],n.prototype,"password",void 0),t.SignUpDto=n},3702:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),(0,r(752).__exportStar)(r(1117),t)},1117:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},6576:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=r(752);(0,o.__exportStar)(r(8977),t),(0,o.__exportStar)(r(4187),t),(0,o.__exportStar)(r(7301),t)},7301:(e,t,r)=>{var o;Object.defineProperty(t,"__esModule",{value:!0}),t.EventLoggerRecordDto=void 0;const a=r(752),n=r(6323),i=r(5849);class s{}(0,a.__decorate)([(0,i.IsEnum)(n.RecordTypes),(0,a.__metadata)("design:type","function"==typeof(o=void 0!==n.RecordTypes&&n.RecordTypes)?o:Object)],s.prototype,"type",void 0),(0,a.__decorate)([(0,i.IsString)(),(0,a.__metadata)("design:type",String)],s.prototype,"message",void 0),(0,a.__decorate)([(0,i.IsOptional)(),(0,i.IsString)(),(0,a.__metadata)("design:type",String)],s.prototype,"context",void 0),t.EventLoggerRecordDto=s},4410:(e,t,r)=>{var o,a,n;Object.defineProperty(t,"__esModule",{value:!0}),t.EventLoggerController=void 0;const i=r(752),s=r(6481),d=r(6323),_=r(7301);let c=class{postRecord(e){return(0,i.__awaiter)(this,void 0,void 0,(function*(){return yield d.EventLoggerRecordEntity.addRecord(e.type,e.message,e.context)}))}getRecords(){return(0,i.__awaiter)(this,void 0,void 0,(function*(){return yield d.EventLoggerRecordEntity.find()}))}};(0,i.__decorate)([(0,s.Post)("records"),(0,i.__param)(0,(0,s.Body)()),(0,i.__metadata)("design:type",Function),(0,i.__metadata)("design:paramtypes",["function"==typeof(o=void 0!==_.EventLoggerRecordDto&&_.EventLoggerRecordDto)?o:Object]),(0,i.__metadata)("design:returntype","function"==typeof(a="undefined"!=typeof Promise&&Promise)?a:Object)],c.prototype,"postRecord",null),(0,i.__decorate)([(0,s.Get)("records"),(0,i.__metadata)("design:type",Function),(0,i.__metadata)("design:paramtypes",[]),(0,i.__metadata)("design:returntype","function"==typeof(n="undefined"!=typeof Promise&&Promise)?n:Object)],c.prototype,"getRecords",null),c=(0,i.__decorate)([(0,s.Controller)("event-logger")],c),t.EventLoggerController=c},8977:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EventLoggerModule=void 0;const o=r(752),a=r(6481),n=r(3399),i=r(6323),s=r(4410),d=r(4187);let _=class{};_=(0,o.__decorate)([(0,a.Module)({imports:[n.TypeOrmModule.forFeature([i.EventLoggerRecordEntity])],controllers:[s.EventLoggerController],providers:[d.EventLoggerService],exports:[d.EventLoggerService]})],_),t.EventLoggerModule=_},4187:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EventLoggerService=void 0;const o=r(752),a=r(6481),n=r(6323);let i=class extends a.ConsoleLogger{stdout(e,t){console.log("EVENT LOGGER"),console.log("timestamp: "+(new Date).toISOString()),console.log("context: "+t),console.log("message: "+e),console.log()}log(e,t){this.stdout(e,t),n.EventLoggerRecordEntity.addRecord(n.RecordTypes.log,e,t)}warn(e,t){this.stdout(e,t),n.EventLoggerRecordEntity.addRecord(n.RecordTypes.warn,e,t)}erroe(e,t){this.stdout(e,t),n.EventLoggerRecordEntity.addRecord(n.RecordTypes.error,e,t)}verbose(e,t){this.stdout(e,t),n.EventLoggerRecordEntity.addRecord(n.RecordTypes.verbose,e,t)}debug(e,t){this.stdout(e,t),n.EventLoggerRecordEntity.addRecord(n.RecordTypes.debug,e,t)}};i=(0,o.__decorate)([(0,a.Injectable)()],i),t.EventLoggerService=i},6323:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=r(752);(0,o.__exportStar)(r(1004),t),(0,o.__exportStar)(r(4296),t),(0,o.__exportStar)(r(244),t),(0,o.__exportStar)(r(2374),t),(0,o.__exportStar)(r(6434),t),(0,o.__exportStar)(r(3501),t)},6434:(e,t,r)=>{var o;Object.defineProperty(t,"__esModule",{value:!0}),t.EventLoggerRecordEntity=t.RecordTypes=void 0;const a=r(752),n=r(5250);var i;!function(e){e.log="log",e.warn="warn",e.error="error",e.verbose="verbose",e.debug="debug"}(i=t.RecordTypes||(t.RecordTypes={}));let s=o=class extends n.BaseEntity{static addRecord(e,t,r){return(0,a.__awaiter)(this,void 0,void 0,(function*(){let a=new o;return a.type=e,a.message=t,a.context=null!=r?r:null,a=yield this.save(a),a}))}};(0,a.__decorate)([(0,n.PrimaryGeneratedColumn)(),(0,a.__metadata)("design:type",Number)],s.prototype,"id",void 0),(0,a.__decorate)([(0,n.CreateDateColumn)(),(0,a.__metadata)("design:type",String)],s.prototype,"timestamp",void 0),(0,a.__decorate)([(0,n.Column)({type:"varchar",nullable:!1,enum:i}),(0,a.__metadata)("design:type",String)],s.prototype,"type",void 0),(0,a.__decorate)([(0,n.Column)({type:"varchar",nullable:!1}),(0,a.__metadata)("design:type",String)],s.prototype,"message",void 0),(0,a.__decorate)([(0,n.Column)({type:"varchar",nullable:!0}),(0,a.__metadata)("design:type",String)],s.prototype,"context",void 0),s=o=(0,a.__decorate)([(0,n.Entity)()],s),t.EventLoggerRecordEntity=s},2374:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RoleEntity=void 0;const o=r(752),a=r(5250),n=r(5849),i=r(4296);let s=class extends a.BaseEntity{};(0,o.__decorate)([(0,a.PrimaryGeneratedColumn)(),(0,o.__metadata)("design:type",Number)],s.prototype,"id",void 0),(0,o.__decorate)([(0,n.IsString)(),(0,n.Length)(1,50),(0,a.Column)({type:"varchar",length:50,unique:!0,nullable:!1}),(0,o.__metadata)("design:type",String)],s.prototype,"title",void 0),(0,o.__decorate)([(0,a.ManyToMany)((()=>i.UserEntity),(e=>e.roles)),(0,o.__metadata)("design:type",Array)],s.prototype,"users",void 0),s=(0,o.__decorate)([(0,a.Entity)("Roles")],s),t.RoleEntity=s},3501:(e,t,r)=>{var o,a;Object.defineProperty(t,"__esModule",{value:!0}),t.TeleramUpdateEntity=void 0;const n=r(752),i=r(5250);let s=o=class extends i.BaseEntity{static addRecord(e){return(0,n.__awaiter)(this,void 0,void 0,(function*(){let t=new o;return t.message=e,t=yield this.save(t),t}))}};(0,n.__decorate)([(0,i.PrimaryGeneratedColumn)(),(0,n.__metadata)("design:type",String)],s.prototype,"id",void 0),(0,n.__decorate)([(0,i.CreateDateColumn)(),(0,n.__metadata)("design:type","function"==typeof(a="undefined"!=typeof Date&&Date)?a:Object)],s.prototype,"timestamp",void 0),(0,n.__decorate)([(0,i.Column)({type:"varchar"}),(0,n.__metadata)("design:type",String)],s.prototype,"message",void 0),s=o=(0,n.__decorate)([(0,i.Entity)("Telegram_update")],s),t.TeleramUpdateEntity=s},244:(e,t,r)=>{var o,a;Object.defineProperty(t,"__esModule",{value:!0}),t.UserPasswordEntity=void 0;const n=r(752),i=r(5250),s=r(38),d=r(4296),_=r(6481);let c=o=class extends i.BaseEntity{static setPassword(e,t){return(0,n.__awaiter)(this,void 0,void 0,(function*(){if(t.length<8||t.length>64)throw new _.BadRequestException("Длина пароля должна быть от 8 до 64 символов!","UserPasswordEntity.setPassword()");let r=yield this.findOne({where:{user:e}});if(r)return r.passwordHashed=yield s.hash(t),void(yield this.save(r));r=new o,r.user=e,r.passwordHashed=yield s.hash(t)}))}static isPasswordOfUser(e,t){return(0,n.__awaiter)(this,void 0,void 0,(function*(){const r=yield this.findOne({where:{user:e}});return!!r&&(yield s.verify(r.passwordHashed,t))}))}};(0,n.__decorate)([(0,i.PrimaryGeneratedColumn)(),(0,n.__metadata)("design:type",Number)],c.prototype,"id",void 0),(0,n.__decorate)([(0,i.OneToOne)((()=>d.UserEntity),(e=>e.password)),(0,i.JoinColumn)(),(0,n.__metadata)("design:type","function"==typeof(a=void 0!==d.UserEntity&&d.UserEntity)?a:Object)],c.prototype,"user",void 0),(0,n.__decorate)([(0,i.Column)({type:"varchar",length:512,nullable:!1}),(0,n.__metadata)("design:type",String)],c.prototype,"passwordHashed",void 0),c=o=(0,n.__decorate)([(0,i.Entity)("User_password")],c),t.UserPasswordEntity=c},4296:(e,t,r)=>{var o,a,n,i;Object.defineProperty(t,"__esModule",{value:!0}),t.UserEntity=void 0;const s=r(752),d=r(5250),_=r(5849),c=r(6481),l=r(244),p=r(2374);let u=o=class extends d.BaseEntity{static createUser(e,t,r){return(0,s.__awaiter)(this,void 0,void 0,(function*(){if(c.Logger.log("Создание нового пользователя.",`UserEntity.createUser(${e}, ${t})`),yield this.findOne({where:{email:e}}))throw c.Logger.warn(`${e} занят!`,`UserEntity.createUser(${e}, ${t})`),new c.BadRequestException(`${e} занят!`);const a=yield this.count({where:{name:t}});let n=new o;n.email=e,n.name=a?`${t} - ${a+1}`:t;const i=yield(0,_.validate)(n);if(i.length)throw c.Logger.warn(`${i}`,`UserEntity.createUser(${e}, ${t})`),new c.BadRequestException(i);n=yield this.save(n);try{yield l.UserPasswordEntity.setPassword(n,r)}catch(r){throw c.Logger.warn("Пароль не прошел валидацию! Создание пользователя прервано!",`UserEntity.createUser(${e}, ${t})`),yield this.delete(n),new c.BadRequestException(r)}if(1===(yield this.count())){c.Logger.log("Создан первый пользователь приложения.",`UserEntity.createUser(${e}, ${t})`),c.Logger.log("Инициализируем ролевую модель и назначаем администратора!",`UserEntity.createUser(${e}, ${t})`);let r=new p.RoleEntity;r.title="admin",r=yield p.RoleEntity.save(r),c.Logger.log('Создана роль "Администратор".',`UserEntity.createUser(${e}, ${t})`);const o=new p.RoleEntity;o.title="user",yield p.RoleEntity.save(o),c.Logger.log('Создана роль "Пользователь".',`UserEntity.createUser(${e}, ${t})`),n.roles=[r],yield this.save(n),c.Logger.log(`Пользователю ${t} присвоена роль "Администратор".`,`UserEntity.createUser(${e}, ${t})`)}const s=yield p.RoleEntity.findOne({where:{title:"user"}});return n.roles=[...n.roles,s],yield this.save(n),c.Logger.log(`Пользователю ${t} присвоена роль "Пользователь".`,`UserEntity.createUser(${e}, ${t})`),c.Logger.log(`Пользователь ${t} успешно зарегистрирован.`,`UserEntity.createUser(${e}, ${t})`),n}))}static getUserByEmail(e){return(0,s.__awaiter)(this,void 0,void 0,(function*(){const t=yield this.findOne({where:{email:e}});if(!t)throw new c.UnauthorizedException;if(!(null==t?void 0:t.isActive))throw new c.ForbiddenException;return{email:t.email,name:t.name}}))}};(0,s.__decorate)([(0,_.IsEmail)(),(0,_.Length)(1,255),(0,d.PrimaryColumn)({type:"varchar",length:255,unique:!0}),(0,s.__metadata)("design:type",String)],u.prototype,"email",void 0),(0,s.__decorate)([(0,_.IsString)(),(0,_.Length)(1,255),(0,d.Column)({type:"varchar",length:255,unique:!0,nullable:!1}),(0,s.__metadata)("design:type",String)],u.prototype,"name",void 0),(0,s.__decorate)([(0,_.IsOptional)(),(0,_.IsBoolean)(),(0,d.Column)({type:"boolean",nullable:!1,default:!0}),(0,s.__metadata)("design:type",Boolean)],u.prototype,"isActive",void 0),(0,s.__decorate)([(0,d.CreateDateColumn)(),(0,s.__metadata)("design:type","function"==typeof(a="undefined"!=typeof Date&&Date)?a:Object)],u.prototype,"createTimestamp",void 0),(0,s.__decorate)([(0,d.UpdateDateColumn)(),(0,s.__metadata)("design:type","function"==typeof(n="undefined"!=typeof Date&&Date)?n:Object)],u.prototype,"updateTimestamp",void 0),(0,s.__decorate)([(0,d.OneToOne)((()=>l.UserPasswordEntity),(e=>e.user)),(0,s.__metadata)("design:type","function"==typeof(i=void 0!==l.UserPasswordEntity&&l.UserPasswordEntity)?i:Object)],u.prototype,"password",void 0),(0,s.__decorate)([(0,d.ManyToMany)((()=>p.RoleEntity),(e=>e.users)),(0,d.JoinTable)(),(0,s.__metadata)("design:type",Array)],u.prototype,"roles",void 0),u=o=(0,s.__decorate)([(0,d.Entity)("Users")],u),t.UserEntity=u},1004:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.StorageModule=void 0;const o=r(752),a=r(6481),n=r(3399),i=r(6869);let s=class{};s=(0,o.__decorate)([(0,a.Module)({imports:[n.TypeOrmModule.forRoot(i.default)]})],s),t.StorageModule=s},3025:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),(0,r(752).__exportStar)(r(9316),t)},6569:(e,t,r)=>{var o,a,n,i;Object.defineProperty(t,"__esModule",{value:!0}),t.MainScene=void 0;const s=r(752),d=r(6182),_=r(832),c=r(1442),l=r(832);let p=class{onSceneEnter(e){return(0,s.__awaiter)(this,void 0,void 0,(function*(){return yield e.reply("ljljkjlk"),"Поздравляю, ты в главной сцене!"}))}onSceneLeave(e){return(0,s.__awaiter)(this,void 0,void 0,(function*(){yield e.reply("Инициирован выход из главной сцены..."),setTimeout((()=>(0,s.__awaiter)(this,void 0,void 0,(function*(){yield e.reply("До встречи!")}))),2e3)}))}onHearsWhoI(e){return(0,s.__awaiter)(this,void 0,void 0,(function*(){yield e.reply("Ты мой царь-государь!")}))}onCommandExit(e){return(0,s.__awaiter)(this,void 0,void 0,(function*(){yield e.scene.leave()}))}};(0,s.__decorate)([(0,d.SceneEnter)(),(0,s.__param)(0,(0,d.Ctx)()),(0,s.__metadata)("design:type",Function),(0,s.__metadata)("design:paramtypes",["function"==typeof(o=void 0!==_.Context&&_.Context)?o:Object]),(0,s.__metadata)("design:returntype",Promise)],p.prototype,"onSceneEnter",null),(0,s.__decorate)([(0,d.SceneLeave)(),(0,s.__param)(0,(0,d.Ctx)()),(0,s.__metadata)("design:type",Function),(0,s.__metadata)("design:paramtypes",["function"==typeof(a=void 0!==_.Context&&_.Context)?a:Object]),(0,s.__metadata)("design:returntype",Promise)],p.prototype,"onSceneLeave",null),(0,s.__decorate)([(0,d.Hears)("кто я?"),(0,s.__param)(0,(0,d.Ctx)()),(0,s.__metadata)("design:type",Function),(0,s.__metadata)("design:paramtypes",["function"==typeof(n=void 0!==_.Context&&_.Context)?n:Object]),(0,s.__metadata)("design:returntype",Promise)],p.prototype,"onHearsWhoI",null),(0,s.__decorate)([(0,d.Command)("exit"),(0,s.__param)(0,(0,d.Ctx)()),(0,s.__metadata)("design:type",Function),(0,s.__metadata)("design:paramtypes",["function"==typeof(i=void 0!==l.Scenes&&l.Scenes.SceneContext)?i:Object]),(0,s.__metadata)("design:returntype",Promise)],p.prototype,"onCommandExit",null),p=(0,s.__decorate)([(0,d.Scene)(c.MAIN_SCENE)],p),t.MainScene=p},1442:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MAIN_SCENE=void 0,t.MAIN_SCENE="MAIN_SCENE"},6268:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.sessionMiddleware=void 0;const o=r(832);t.sessionMiddleware=(0,o.session)()},9316:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.TelegramZnodeHelperBotModule=void 0;const o=r(752),a=r(6481),n=r(6182),i=r(3256),s=r(6569),d=r(6268);let _=class{};_=(0,o.__decorate)([(0,a.Module)({imports:[n.TelegrafModule.forRootAsync({botName:"@ZNodeHelperBot",useFactory:()=>({token:String(process.env.HELPER_BOT_TOKEN),middlewares:[d.sessionMiddleware]})})],providers:[i.ZnodeHelperBotUpdate,s.MainScene]})],_),t.TelegramZnodeHelperBotModule=_},3256:(e,t,r)=>{var o,a,n,i,s;Object.defineProperty(t,"__esModule",{value:!0}),t.ZnodeHelperBotUpdate=void 0;const d=r(752),_=r(6182),c=r(832),l=r(832),p=r(1442);let u=class{onStart(e,t){return(0,d.__awaiter)(this,void 0,void 0,(function*(){yield e.tg.sendMessage(-675102704,"У нас новый пользователь!"),yield e.tg.sendMessage(-675102704,`И зовут его ${t}`),yield e.reply(`Привет, ${t}!`),yield e.tg.sendChatAction(e.chat.id,"typing"),setTimeout((()=>(0,d.__awaiter)(this,void 0,void 0,(function*(){yield e.reply("Меня зовут ZNodeHelperBot.")}))),1e3),yield e.tg.sendChatAction(e.chat.id,"typing"),setTimeout((()=>(0,d.__awaiter)(this,void 0,void 0,(function*(){yield e.reply("Выбери что нужно сделать.",{reply_markup:{inline_keyboard:[[{text:"Войти в главную сцену",callback_data:"mainScene"}],[{text:"Справка",callback_data:"help"},{text:"Выйти",callback_data:"exit"}]]}})}))),2e3)}))}onAction(e,t){return(0,d.__awaiter)(this,void 0,void 0,(function*(){const r="data"in e.update.callback_query?e.update.callback_query.data:null;"mainScene"===r&&(yield e.scene.enter(p.MAIN_SCENE)),"help"===r&&(yield this.onHelp(e,t)),"exit"===r&&(yield e.reply("До новых встреч."))}))}onHelp(e,t){return(0,d.__awaiter)(this,void 0,void 0,(function*(){setTimeout((()=>(0,d.__awaiter)(this,void 0,void 0,(function*(){yield e.reply("Как только научусь это делать... :)")}))),1e3),yield e.reply(`Я тебе обязательно помогу, ${t}.`)}))}onHears(e){return(0,d.__awaiter)(this,void 0,void 0,(function*(){yield e.reply("П")}))}onCommandScene(e){return(0,d.__awaiter)(this,void 0,void 0,(function*(){yield e.scene.enter(p.MAIN_SCENE)}))}};(0,d.__decorate)([(0,_.Start)(),(0,d.__param)(0,(0,_.Ctx)()),(0,d.__param)(1,(0,_.Sender)("first_name")),(0,d.__metadata)("design:type",Function),(0,d.__metadata)("design:paramtypes",["function"==typeof(o=void 0!==c.Context&&c.Context)?o:Object,String]),(0,d.__metadata)("design:returntype",Promise)],u.prototype,"onStart",null),(0,d.__decorate)([(0,_.Action)(/mainScene|help|exit/),(0,d.__param)(0,(0,_.Ctx)()),(0,d.__param)(1,(0,_.Sender)("first_name")),(0,d.__metadata)("design:type",Function),(0,d.__metadata)("design:paramtypes",[Object,String]),(0,d.__metadata)("design:returntype",Promise)],u.prototype,"onAction",null),(0,d.__decorate)([(0,_.Help)(),(0,d.__param)(0,(0,_.Ctx)()),(0,d.__param)(1,(0,_.Sender)("first_name")),(0,d.__metadata)("design:type",Function),(0,d.__metadata)("design:paramtypes",["function"==typeof(a=void 0!==c.Context&&c.Context)?a:Object,String]),(0,d.__metadata)("design:returntype",Promise)],u.prototype,"onHelp",null),(0,d.__decorate)([(0,_.Hears)(["Привет","Здорова","Hi","Hello"]),(0,d.__param)(0,(0,_.Ctx)()),(0,d.__metadata)("design:type",Function),(0,d.__metadata)("design:paramtypes",["function"==typeof(n=void 0!==c.Context&&c.Context)?n:Object]),(0,d.__metadata)("design:returntype",Promise)],u.prototype,"onHears",null),(0,d.__decorate)([(0,_.Command)("scene"),(0,d.__param)(0,(0,_.Ctx)()),(0,d.__metadata)("design:type",Function),(0,d.__metadata)("design:paramtypes",["function"==typeof(i=void 0!==l.Scenes&&l.Scenes.SceneContext)?i:Object]),(0,d.__metadata)("design:returntype","function"==typeof(s="undefined"!=typeof Promise&&Promise)?s:Object)],u.prototype,"onCommandScene",null),u=(0,d.__decorate)([(0,_.Update)()],u),t.ZnodeHelperBotUpdate=u},7001:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=r(752);(0,o.__exportStar)(r(6546),t),(0,o.__exportStar)(r(5309),t)},5309:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CreateUserDto=void 0;const o=r(752),a=r(5849);class n{}(0,o.__decorate)([(0,a.IsEmail)(),(0,o.__metadata)("design:type",String)],n.prototype,"email",void 0),(0,o.__decorate)([(0,a.IsString)(),(0,a.Length)(1,255),(0,o.__metadata)("design:type",String)],n.prototype,"name",void 0),(0,o.__decorate)([(0,a.IsString)(),(0,a.Length)(7,64),(0,o.__metadata)("design:type",String)],n.prototype,"password",void 0),t.CreateUserDto=n},546:(e,t,r)=>{var o,a,n,i;Object.defineProperty(t,"__esModule",{value:!0}),t.UsersController=void 0;const s=r(752),d=r(6481),_=r(3418),c=r(5309);let l=class{constructor(e){this.usersService=e}createUser(e){return(0,s.__awaiter)(this,void 0,void 0,(function*(){return yield this.usersService.createUser(e)}))}getAllUsers(){return(0,s.__awaiter)(this,void 0,void 0,(function*(){return yield this.usersService.findAllUsers()}))}};(0,s.__decorate)([(0,d.Post)(),(0,s.__param)(0,(0,d.Body)()),(0,s.__metadata)("design:type",Function),(0,s.__metadata)("design:paramtypes",["function"==typeof(o=void 0!==c.CreateUserDto&&c.CreateUserDto)?o:Object]),(0,s.__metadata)("design:returntype","function"==typeof(a="undefined"!=typeof Promise&&Promise)?a:Object)],l.prototype,"createUser",null),(0,s.__decorate)([(0,d.Get)(),(0,s.__metadata)("design:type",Function),(0,s.__metadata)("design:paramtypes",[]),(0,s.__metadata)("design:returntype","function"==typeof(n="undefined"!=typeof Promise&&Promise)?n:Object)],l.prototype,"getAllUsers",null),l=(0,s.__decorate)([(0,d.Controller)("users"),(0,s.__metadata)("design:paramtypes",["function"==typeof(i=void 0!==_.UsersService&&_.UsersService)?i:Object])],l),t.UsersController=l},6546:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.UsersModule=void 0;const o=r(752),a=r(6481),n=r(3399),i=r(6323),s=r(6323),d=r(546),_=r(3418);let c=class{};c=(0,o.__decorate)([(0,a.Module)({imports:[n.TypeOrmModule.forFeature([i.UserEntity,i.UserPasswordEntity,s.RoleEntity])],controllers:[d.UsersController],providers:[_.UsersService]})],c),t.UsersModule=c},3418:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.UsersService=void 0;const o=r(752),a=r(6481),n=r(6323);let i=class{createUser(e){return(0,o.__awaiter)(this,void 0,void 0,(function*(){return yield n.UserEntity.createUser(e.email,e.name,e.password)}))}findAllUsers(){return(0,o.__awaiter)(this,void 0,void 0,(function*(){return n.UserEntity.find({relations:["roles"]})}))}};i=(0,o.__decorate)([(0,a.Injectable)()],i),t.UsersService=i},6869:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=r(1017);t.default={type:"postgres",url:process.env.DATABASE_URL,ssl:{rejectUnauthorized:!1},autoLoadEntities:!0,synchronize:!1,retryAttempts:1,cli:{migrationsDir:(0,o.join)(__dirname,"libs","storage","src","lib","migrations")},entities:[(0,o.join)(__dirname,"libs","storage","src","lib","entities","*.entity.{ts,js}"),(0,o.join)(__dirname,"libs","storage","src","lib","entities","**","*.entity.{ts,js}")],migrations:[(0,o.join)(__dirname,"libs","storage","src","lib","migrations","*.{ts,js}"),(0,o.join)(__dirname,"libs","storage","src","lib","migrations","**","*.{ts,js}")],subscribers:[(0,o.join)(__dirname,"libs","storage","src","lib","subscribers","*.{ts,js}"),(0,o.join)(__dirname,"libs","storage","src","lib","subscribers","**","*.{ts,js}")]}},6481:e=>{e.exports=require("@nestjs/common")},5793:e=>{e.exports=require("@nestjs/config")},143:e=>{e.exports=require("@nestjs/core")},2064:e=>{e.exports=require("@nestjs/jwt")},1149:e=>{e.exports=require("@nestjs/schedule")},5385:e=>{e.exports=require("@nestjs/serve-static")},3399:e=>{e.exports=require("@nestjs/typeorm")},38:e=>{e.exports=require("argon2")},5849:e=>{e.exports=require("class-validator")},6860:e=>{e.exports=require("express")},6182:e=>{e.exports=require("nestjs-telegraf")},832:e=>{e.exports=require("telegraf")},752:e=>{e.exports=require("tslib")},5250:e=>{e.exports=require("typeorm")},1017:e=>{e.exports=require("path")}},t={};function r(o){var a=t[o];if(void 0!==a)return a.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}var o={};(()=>{var e=o;Object.defineProperty(e,"__esModule",{value:!0});const t=r(752),a=r(6481),n=r(143),i=r(4636),s=r(5793);(function(){return(0,t.__awaiter)(this,void 0,void 0,(function*(){const e=yield n.NestFactory.create(i.AppModule),t=e.get(s.ConfigService).get("PORT");e.setGlobalPrefix("api"),e.useGlobalPipes(new a.ValidationPipe),yield e.listen(t),a.Logger.log(`Сервер запущен в режиме "production" на: http://localhost:${t}/api`)}))})().catch((e=>{a.Logger.error("При запуске сервера возникла ошибка:","main.boostrap()"),console.error(e)}))})();var a=exports;for(var n in o)a[n]=o[n];o.__esModule&&Object.defineProperty(a,"__esModule",{value:!0})})();
//# sourceMappingURL=main.js.map