import 'dotenv/config';
import * as joi from 'joi';

/* Configurando y validando las variables de entorno */

// Define una interfaz para las variables de entorno esperadas
interface EnvVars {
    PORT: number;
}

// Define el esquema de validación para las variables de entorno utilizando joi
const envsSchema = joi.object({
    /* Validaciones */
    PORT: joi.number().required()
}).unknown(true); // Permite otras variables no definidas en el esquema

// Valida las variables de entorno actuales (process.env) contra el esquema definido
const { error, value } = envsSchema.validate(process.env);

// Si hay un error de validación, lanza una excepción con un mensaje descriptivo
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

// Asigna las variables validadas a una constante tipada con la interfaz EnvVars
const envVars: EnvVars = value;

// Exporta las variables de entorno validadas y configuradas para su uso en otras partes de la aplicación
export const envs = {
    port: envVars.PORT,
}
