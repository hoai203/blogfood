import Customer from "../models/Customer";
import BaseController from './Controller'
class AuthController extends BaseController {
    constructor(model) {
        super(model)
    }
    getDataCustomer = (req, res) => {
        try {
            const id = req.customer.id;
            const customer = req.customer;
            if (!id) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra!!!",
                });
            }
            return res.status(200).json({
                message: "Lấy dữ liệu thành công",
                customer,
            });
        } catch (error) {
            console.log('err', error);
            return res.status(500).json({
                message: "Lỗi server!!!",
            });
        }
    }


}

const authController = new AuthController(Customer);
module.exports = authController;
