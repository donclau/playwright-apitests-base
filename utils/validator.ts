import { UserSchema } from '../schemas/user.schema';

const schemas: any = {
  UserSchema
};

export function validateSchema(name: string, body: any) {
  if (!schemas[name]) {
    throw new Error(`Schema no encontrado: ${name}`);
  }
  schemas[name].parse(body);
}