import { ErrorCase } from "@/protocols";
import { ValidationError } from "joi";

export function InvalidBodyError(errors: string[]): ErrorCase {
  return{
    name: "InvalidBodyError",
    message: errors
  }
}