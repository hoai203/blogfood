import Conversation from '../models/Conversation';

class ConversationController {
    constructor() {

    }

    createConversation = async (req, res) => {

        const newConversation = new Conversation({ members: [req.body.senderId, req.body.receiverId], timestamp: new Date() })
        try {
            const savedConversation = await newConversation.save();
            // res.status(200).json(savedConversation)
            // Sắp xếp cuộc trò chuyện sau khi thêm vào
            const sortedConversations = await Conversation.find().sort({ timestamp: -1 }).exec();
            res.status(200).json(sortedConversations);
        } catch (error) {
            res.status(500).json(error)

        }
    }
    getConversation = async (req, res) => {
        try {
            const conversation = await Conversation.find({ members: { $in: [req.params.userId] } })
            // res.status(200).json(conversation);
            const sortedConversations = conversation.sort((a, b) => b.timestamp - a.timestamp);
            res.status(200).json(sortedConversations);
        } catch (error) {
            res.status(500).json(error)

        }
    }

}
const conversationController = new ConversationController(Conversation);
module.exports = conversationController;
//senderId: req.body.senderId, receiverId: req.body.receiverId