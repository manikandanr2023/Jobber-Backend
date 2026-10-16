import { getAuthUserById, getAuthUserByVerificationToken, updateVerifyEmailField } from '@auth/services/auth.service';
import { BadRequestError, IAuthDocument } from '@manikandanr2023/jobber-shared';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
export async function update(req: Request, res: Response): Promise<void> {
  const { token } = req.body;
  const checkIfUserExist: IAuthDocument | undefined = await getAuthUserByVerificationToken(token);
  if (!checkIfUserExist) {
    throw new BadRequestError('Verification token is either invalid or is already user.', 'VerifyEmail update() method error');
  }
  await updateVerifyEmailField(checkIfUserExist.id!, 1);
  const updatedUser = await getAuthUserById(checkIfUserExist.id!);
  res.status(StatusCodes.OK).json({ message: 'Email verified successfully.', user: updatedUser });
}
