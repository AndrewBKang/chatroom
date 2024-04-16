class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chatroom"
  end

  def receive(data)
    ActionCable.server.broadcast("chatroom", data)
  end
end
