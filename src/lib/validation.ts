import { z } from 'zod';

// Password must be at least 8 characters, contain uppercase, lowercase, number and special character
export const passwordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" });

export const emailSchema = z.string()
  .trim()
  .email({ message: "Invalid email address" })
  .max(255, { message: "Email must be less than 255 characters" });

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  try {
    passwordSchema.parse(password);
    return { valid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, errors: error.issues.map(e => e.message) };
    }
    return { valid: false, errors: ["Invalid password"] };
  }
};

export const validateEmail = (email: string): { valid: boolean; errors: string[] } => {
  try {
    emailSchema.parse(email);
    return { valid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, errors: error.issues.map(e => e.message) };
    }
    return { valid: false, errors: ["Invalid email"] };
  }
};