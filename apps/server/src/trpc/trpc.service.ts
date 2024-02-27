import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { initTRPC } from '@trpc/server';
import { createContext } from './trpc.router';

@Injectable()
export class TrpcService {
  trpc;
  constructor() {
    const transformer = {
      serialize: (value: any) => {
        const serializeValue = (obj: any): any => {
          if (obj instanceof Date) {
            return obj.toISOString();
          } else if (obj instanceof Decimal) {
            // Convert Decimal to a string for serialization
            return obj.toString();
          } else if (Array.isArray(obj)) {
            return obj.map(serializeValue);
          } else if (typeof obj === 'object' && obj !== null) {
            const serializedObj: Record<string, any> = {};
            for (const key in obj) {
              serializedObj[key] = serializeValue(obj[key]);
            }
            return serializedObj;
          }
          return obj;
        };

        return serializeValue(value);
      },
      deserialize: (value: any) => {
        const deserializeValue = (obj: any): any => {
          if (typeof obj === 'string') {
            // Attempt to parse string as Date
            const date = Date.parse(obj);
            if (!isNaN(date)) {
              return new Date(date);
            }
            // Attempt to parse string as Decimal
            if (/^-?\d+(\.\d+)?$/.test(obj)) {
              return new Decimal(obj);
            }
          } else if (Array.isArray(obj)) {
            return obj.map(deserializeValue);
          } else if (typeof obj === 'object' && obj !== null) {
            const deserializedObj: Record<string, any> = {};
            for (const key in obj) {
              deserializedObj[key] = deserializeValue(obj[key]);
            }
            return deserializedObj;
          }
          return obj;
        };

        return deserializeValue(value);
      },
    };
    this.trpc = initTRPC.context<typeof createContext>().create({
      transformer,
    });
  }
}
