import { Document, Schema, Types, model } from "mongoose";
import { number } from "zod";
import { required } from "zod/mini";

interface IShift {
  dayOfWeek: string,
  startTime: number;
  endTime: number;
  slotDuration: number;
}

export interface IDoctor extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
  gender: string;
  dob: Date;
  fee: number;
  speciality: string;
  profileUrl: string;
  available: boolean;
  shifts: IShift[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const shiftSchema = new Schema<IShift>({
  dayOfWeek: {
    type: String,
    enum: ["Mon", "Tue", "wed", "Thu", "Fri", "Sat", "Sun"],
    required: true,
  },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  slotDuration: { type: Number, default: 30 },
})
const doctorSchema = new Schema<IDoctor>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  dob: { type: Date, required: true },
  fee: { type: Number, required: true },
  speciality: { type: String, required: true },
  profileUrl: { type: String, required: true },
  available: { type: Boolean, default: true },
  shifts: { type: [shiftSchema], required: true, id: false },
})

export const DoctorModel = model<IDoctor>("Doctor", doctorSchema);