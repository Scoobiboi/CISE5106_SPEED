"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const db_1 = require("../config/db");
async function bootstrap() {
    dotenv.config();
    const dbStatus = await (0, db_1.getConnectionInfo)();
    console.log(`Database connection status: ${dbStatus}`);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(process.env.PORT || 8080);
}
bootstrap();
//# sourceMappingURL=main.js.map