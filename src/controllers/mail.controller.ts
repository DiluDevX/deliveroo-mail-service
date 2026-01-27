import { Request, Response, NextFunction } from 'express';
import { sendResetPasswordEmail } from '../services/mail.service';
import { ResetPasswordDto } from '../dto/reset-password.dto';

export const requestPasswordReset = async (
  req: Request<unknown, unknown, ResetPasswordDto>,
  res: Response,
  next: NextFunction
) => {
  const { email, token } = req.body;
  try {
    await sendResetPasswordEmail(email, token);
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    next(error);
  }
};
