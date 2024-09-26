import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { TokenExpiredError } from "jsonwebtoken";

@Catch(HttpException, TokenExpiredError)
export class ErrorFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const res = host.switchToHttp().getResponse()

        if (exception instanceof HttpException){
            res.status(exception.getStatus()).json({
                errors: exception.getResponse()
            })
        }else if (exception instanceof TokenExpiredError) {
            res.status(401).json({
                errors: 'Token expired or invalid',
            });
        }else{
            res.status(500).json({
                errors: exception.message
            })
        }
    }
}