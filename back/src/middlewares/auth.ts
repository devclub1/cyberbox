export const authenticated = async (ctx: any, next: any) => {
    if (ctx.session.passport && ctx.session.passport.user._id) {
      await next();
    } else {
      ctx.status = 401;
      ctx.body = {message: 'Unauthorized'};
    }
  };