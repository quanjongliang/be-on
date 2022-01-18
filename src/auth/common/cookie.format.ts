export const getCookieToken = (token: string, expiredTime: string): string => {
  return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expiredTime}`;
};
