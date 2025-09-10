import { Key } from "react";
import { Status } from "./enums";

export interface InputProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  id: string;
  type: string;
  placeholder: string;
}

export interface DataType {
  key: Key;
  name: string;
  age: number;
  country: string;
  city: string;
  dob: string;
  status: Status.ACTIVE | Status.INACTIVE;
  address: string;
}
