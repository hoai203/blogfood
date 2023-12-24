import axios from "./api";

export const query = () => ({
  messenger: {
    getConversations: (infoId) => axios.get(`/conversations/${infoId}`),
    getMessages: (currenChatId) => axios.get(`/messages/${currenChatId}`),
    creteConversation: (infoConversation) =>
      axios.post(`/conversations/`, infoConversation),
    createMessage: (message) => axios.post("/messages", message),
    readMessage: ({ messageId, infoId }) =>
      axios.put(`/messages/${messageId}`, {
        friendId: infoId,
      }),
  },
  customers: {
    getSearchCustomer: ({ infoId, query }) => {
      const params = {
        key: query,
        infoId,
      };
      return axios.get(`/customer/searchCustomer`, {
        params,
      });
    },
  },
});
