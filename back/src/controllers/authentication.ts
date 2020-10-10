export const logout = async (ctx: any) => {
  ctx.session = null;
  ctx.body = { message: 'Logged out' };
};
