import jwt from "jsonwebtoken";
import { generateAccessToken } from "../jwt";
import Role from "../models/Role";
import Admin from "../models/Admin";
import Customer from "../models/Customer";
const middlewareAuth = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    const usertype = req.headers.usertype;
    if (!token) return res.status(401).json({ message: "Bạn chưa đăng nhập để sử dụng dịch vụ!" });
    const accessToken = token.split(" ")[1];
    if (accessToken === 'null' || accessToken === '' || accessToken === 'undefined')
      return res.status(401).json({ message: "Bạn chưa đăng nhập để sử dụng dịch vụ!" });
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, async (err, customer) => {
      if (usertype === 'customer') {
        if (customer) {
          const dataCustomer = await Customer.findOne({ _id: customer.id })
          if (!dataCustomer || dataCustomer.status !== 'approved')
            return res.status(401).json({ message: `Bạn đã bị vô hiệu hóa tài khoản!` })
        }
      }
      if (err && err.name === 'TokenExpiredError') {
        let chosenRefreshToken = null
        const refreshToken = req.cookies.refreshToken;
        const refreshTokenAdmin = req.cookies.refreshTokenAdmin;
        if (usertype === 'customer') {
          chosenRefreshToken = refreshToken;
        } else if (usertype === 'admin') {
          chosenRefreshToken = refreshTokenAdmin;
        }
        if (!chosenRefreshToken) return res.status(401).json({ status: 'notAuth' });
        jwt.verify(chosenRefreshToken, process.env.JWT_REFRESH_KEY, (err, customer) => {
          if (err) return res.status(403).json({ status: 'notAuth' });
          const dataCustomer = { _id: customer?.id, admin: customer?.admin, role: customer?.role }
          const newAccessToken = generateAccessToken(dataCustomer);
          if (usertype === 'customer') {
            if (newAccessToken) {
              res.setHeader('new-token', newAccessToken);
            } else {
              res.setHeader('new-token', null);
            }
          } else if (usertype === 'admin') {
            if (newAccessToken) {
              res.setHeader('new-token-admin', newAccessToken);
            } else {
              res.setHeader('new-token-admin', null);
            }
          }
          req.customer = customer;
          next();
        });
      } else {
        req.customer = customer;
        next();
      }
    });
  },

  verifyTokenStaff: (req, res, next) => {
    middlewareAuth.verifyToken(req, res, async () => {
      const customer = req.customer
      const dataAdmin = await Admin.findOne({ _id: customer.id })
      if (customer && customer.admin === true) {
        if (dataAdmin.status === 'approved') {
          next();
        } else {
          res.status(403).json({ message: `Bạn đã bị vô hiệu hóa tài khoản!` });
        }
      } else {
        res.status(403).json({ message: `Bạn không phải là nhân viên!` });
      }
    });
  },
  verifyTokenAdmin: (req, res, next) => {
    middlewareAuth.verifyTokenStaff(req, res, async () => {
      const customer = req.customer;
      const dataRole = await Role.findOne({ _id: customer.role })
      if (customer && dataRole?.title === 'Admin') {
        next();
      } else {
        res.status(403).json({ message: `Bạn không phải là quản trị viên!` });
      }
    });
  },
};

module.exports = middlewareAuth;
