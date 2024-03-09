import { UserService } from '@server/user/user.service';
import { createMock } from 'ts-auto-mock';
import { PrismaService } from '@server/prisma/prisma.service';
import { AuthService } from '@server/auth/auth.service';
import { EmailService } from '@server/email/email.service';
import { mock, mockDeep } from 'jest-mock-extended';
import { User } from '@prisma/client';

describe('UserService', () => {
  const prismaService = mockDeep<PrismaService>();
  const authService = mock<AuthService>();
  const emailService = createMock<EmailService>();

  const service = new UserService(prismaService, authService, emailService);

  describe('login', () => {
    it('should throw NotFoundException if user does not exist', async () => {
      prismaService.user.findFirst.mockResolvedValueOnce(null);
      await expect(
        service.login({ email: 'test', password: 'test' }),
      ).rejects.toThrowError('Invalid login');
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      prismaService.user.findFirst.mockResolvedValueOnce(createMock<User>());
      authService.verifyPassword.mockResolvedValueOnce(false);
      await expect(
        service.login({ email: 'test', password: 'test' }),
      ).rejects.toThrowError('Invalid login');
    });

    it('should return user if login is successful', async () => {
      const user = createMock<User>();
      prismaService.user.findFirst.mockResolvedValueOnce(user);
      authService.verifyPassword.mockResolvedValueOnce(true);

      const res = await service.login({ email: 'test', password: 'test' });

      expect(res).toEqual(expect.objectContaining({ user }));
    });
  });
});
