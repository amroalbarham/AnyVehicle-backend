'use strict';

const UserModel = require('../Models/userModel');

class Interface {
  constructor(model) {
    this.model = model;
  }
}

const readRequest = async (email) => {
  if (email) {
    let userInfo = await this.model.findOne({ email: email });
    if (userInfo.role === 'user') {
      return {
        firstName: userInfo.firstName,
        lastName, email, password,
        email: userInfo.email,
        role: userInfo.role,
        repairRequests: userInfo.repairRequests,
      };
    } else if (userInfo.role === 'admin') {
      let usersData = await this.model.find({});
      let allRequests = [];

      usersData.forEach((user) => {
        let userRequest = [];
        user.repairRequests.forEach((request) => {
          userRequest.push({
            name: request.name,
            problemDomain: request.problemDomain,
            damageAmount: request.damageAmount,
            time: request.time,
            status: request.status,
            createdAt: request.createdAt,
            selelctedFile: request.selelctedFile,
            email: user.email,
          });
        });
        allRequests = [...allRequests, ...userRequest];
      });
      let requestStatus = {
        Accepted: 0,
        Declined: 0,
        Pending: 0,
      };
      allRequests.forEach((request) => {
        if (request.status === 'Accepted') {
          requestStatus.Accepted += 1;
        } else if (request.status === 'Pending') {
          requestStatus.Pending += 1;
        } else if (request.status === 'Declined') {
          requestStatus.Declined += 1;
        }
      });
      return {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        role: userInfo.role,
        repairRequests: allRequests,
        requestStatusData: requestStatus,
      }
    }
  }
};

const createRequest = async (obj) => {
  try {
    let userInfo = await this.model.findOne({ email: obj.email });
    for (let i = 0; i < userInfo.repairRequests.length; i++) {
      if (userInfo.repairRequests[i].name === obj.name) {
        throw new Error('this name exists')
      }
    }
    userInfo.repairRequests.push({
      name: obj.name,
      problemDomain: obj.problemDomain,
      damageAmount: obj.damageAmount,
      time: obj.time,
      createdAt: obj.createdAt,
      selelctedFile: obj.selelctedFile,
    });
    await userInfo.save();
    return {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      role: userInfo.role,
      repairRequests: userInfo.repairRequests,
    };
  } catch (error) {
    return error.message;
  }
};

const deleteRequest = async (obj) => {
  let userInfo = await this.model.findOne({ email: obj.email });
  const requestAfterDelete = user.repairRequests.filter(req => {
    if (req.name !== obj.name) {
      return repairRequests;
    }
  });
  userInfo.repairRequests = requestAfterDelete;
  await userInfo.save();

  return {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    role: userInfo.role,
    repairRequests: userInfo.repairRequests
  }
};

const updataRequest = async (obj) => {
  let userInfo = await this.model.findOne({ email: obj.email });
  const updatedRequest = userInfo.repairRequests.map((request) => {
    if (request.name === obj.name) {
      request.status === obj.status;
    }
    return request;
  });
  userInfo.repairRequests = updatedRequest;
  await userInfo.save();
}

module.exports = new Interface(UserModel);

