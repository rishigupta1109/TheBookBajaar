import React from 'react'
import { Link } from 'react-router-dom'
import "./Chatroom.css"
export default function Chatroom() {
  return (
    <div className='chatroom'>
        <h1>Your Chats</h1>
        <div className='chat-list'>
            <div className='chat-list-item'>
            <Link to="chats/rishi">
                Rishi Gupta
            </Link>
            </div>
        </div>
    </div>
  )
}
