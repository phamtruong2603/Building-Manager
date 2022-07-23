import React from 'react';
import './boxChatCss.css';
import { AiOutlineSend } from "react-icons/ai";

const BoxChat = () => {
  const submitChat =(e) => {
    e.preventDefault()
  }
  return (
      <div class="chat-box">
        <div class="chat-box-header">
          ChatBox
        </div>
        <div class="chat-box-body">

        </div>
        <div class="chat-input">
          <form onSubmit={submitChat}>
            <input type="text" id="chat-input" placeholder="Send a message..." />
            <button class="chat-submit"><AiOutlineSend /></button>
          </form>
        </div>
      </div>
  )
}

export default BoxChat