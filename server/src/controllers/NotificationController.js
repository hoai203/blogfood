import Notification from "../models/Notification";
import BaseController from './Controller'
class NotificationController extends BaseController {
    constructor(model) {
        super(model)
    }
    getAllNotification = async (req, res) => {
        try {
            const data = await this.model.find();
            if (!data) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json(data);
        } catch (error) {
            console.log('err', error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    }
    getNotificationByCustomer = async (req, res) => {
        try {
            const id = req.customer.id;
            if (!id) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra!!!",
                });
            }
            const data = await this.model.find({ id_customer: id });
            if (!data) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json(data);

        } catch (error) {
            console.log('err', error);
            return res.status(500).json({
                message: "Lỗi server!!!",
            });
        }
    }
    getNotificationByAdmin = async (req, res) => {
        try {
            const data = await this.model.find({ id_customer: 'admin' });
            if (!data) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json(data);

        } catch (error) {
            console.log('err', error);
            return res.status(500).json({
                message: "Lỗi server!!!",
            });
        }
    }

    addNotification = async (req, res) => {
        const id_sender = req.customer?.id;
        const notification = req.body
        const timestamps = Date.now()
        try {
            if (notification) {
                const dataNotification = {
                    ...notification,
                    id_sender,
                    timestamps
                };
                const data = await this.model(dataNotification).save();
                if (data) {
                    return res.status(200).json({
                        message: true,
                    });
                } else {
                    return res.status(401).json({
                        message: false,
                    });
                }
            } else {
                return res.status(401).json({
                    message: "Lỗi Server",
                });
            }
        } catch (error) {
            console.log('err', error);
            return res.status(500).json({
                message: "Có lỗi xảy ra",
                error: error._message,
            });
        }
    }
    updateStatusNotification = async (req, res) => {
        const id_notification = req.query?.id;
        try {
            const dataModelStatus = await this.model.findByIdAndUpdate(
                id_notification,
                { status: false },
                {
                    new: true,
                }
            );
            if (!dataModelStatus) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json({
                message: `Cập nhật thành công`,
            });
        } catch (error) {
            console.log("err", error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    updateAllStatusNotificationByCustomer = async (req, res) => {
        const id_customer = req.customer?.id;
        try {
            const result = await this.model.updateMany({ id_customer: id_customer }, { $set: { status: false } });
            if (!result) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json({
                message: `Cập nhật thành công`,
            });
        } catch (error) {
            console.log("err", error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    deleteNotification = async (req, res) => {
        const id_notification = req.query?.id;
        try {
            const result = await this.model.findByIdAndDelete(id_notification);
            if (!result) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json({
                message: `Cập nhật thành công`,
            });
        } catch (error) {
            console.log("err", error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    deleteAllNotificationByCustomer = async (req, res) => {
        const id_customer = req.customer?.id;
        try {
            const dataModelStatus = await this.model.deleteMany({ id_customer });
            if (!dataModelStatus) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json({
                message: `Cập nhật thành công`,
            });
        } catch (error) {
            console.log("err", error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };

}

const notificationController = new NotificationController(Notification);
module.exports = notificationController;
