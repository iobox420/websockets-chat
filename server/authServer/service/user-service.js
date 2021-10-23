const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailJetApiService = require('./mail-jet-api-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      const isPassEquals = await bcrypt.compare(password, candidate.password);
      if (isPassEquals) {
        await MailJetApiService.sendMail(
          email,
          `${process.env.OUTSIDE_API_URL}/api/activate/${candidate.activationLink}`
        );

        return {
          status: 1,
          message: 'Send activation link again',
        };
      }
      if (!isPassEquals) {
        throw ApiError.BadRequest(`${email} already registered`);
      }
    }

    const hashPasssword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email,
      password: hashPasssword,
      activationLink,
    });

    MailJetApiService.sendMail(
      email,
      `${process.env.OUTSIDE_API_URL}/api/activate/${activationLink}`
    )
      .then((r) => console.log('responce mail service', r))
      .catch((er) => {
        console.log('error mail service', er);
      });

    const userDto = new UserDto(user); //id, email, isActivated
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRegistrationLink();
    }
    user.isActivated = true;
    await user.save();
  }
  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Wrong password');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

module.exports = new UserService();
