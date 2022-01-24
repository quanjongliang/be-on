export const getCookieToken = (token = '', expiredTime = '0'): string => {
  return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expiredTime}`;
};
