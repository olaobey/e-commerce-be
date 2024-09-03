/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
