// messageController.js
import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getIO, getReceiverSocketId } from "../socket/socket.js"; // ⬅️ import helpers

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
      await gotConversation.save();
    }

    // Emit socket event to receiver if online
    const receiverSocketId = getReceiverSocketId(receiverId);
    console.log("receiver socket id",receiverSocketId);
    if (receiverSocketId) {
      const io = getIO(); // <-- get io instance
      console.log("new Message",newMessage);
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({ newMessage });



  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to send message" });
  }
};



export const getMessage=async (req,res)=>{

  try{
   const receiverId=req.params.id;// th one i route :id 
   const senderId=req.id;//logged in user
   const conversation=await Conversation.findOne({
       participants:{$all : [senderId,receiverId]} 
   }).populate("messages");
    console.log(conversation);
    return res.status(200).json(conversation?.messages);

  }catch(err){
    console.log(err);
  }





}


