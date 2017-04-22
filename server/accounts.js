Accounts.onCreateUser(function (options, user) {
  if (user.services.facebook) {
    user.emails = [{
      address: user.services.facebook.email,
      verified: true
    }];
  }
  return user;
});
