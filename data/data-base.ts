import { StudioInstance } from "./types";

export abstract class DataBase {
  abstract select: (studioInstance:StudioInstance) => Promise<StudioInstance | null>;
  abstract update: (studioInstance:StudioInstance) => Promise<number>;
  abstract insert: (studioInstance:StudioInstance) => Promise<void>;
  abstract delete: (studioInstance:StudioInstance) => Promise<void>;
}
