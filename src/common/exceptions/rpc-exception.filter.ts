import { Catch, RpcExceptionFilter, ArgumentsHost, UnauthorizedException } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { RpcException } from '@nestjs/microservices'

// Utiliza el decorador @Catch para indicar que este filtro manejará excepciones de tipo RpcException.
@Catch(RpcException)
export class RpcCustomExceptionFilter implements RpcExceptionFilter<RpcException> {
    // El método 'catch' es el que se ejecutará cuando se capture una excepción de tipo RpcException.
    // 'exception' es la excepción capturada, y 'host' es el contexto de los argumentos.
    catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
        console.log('Error captado por este filtro global');
        // Lanzando el error
        throw new UnauthorizedException('Error captado');
    }
}