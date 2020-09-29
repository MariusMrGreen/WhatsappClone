import React from 'react';
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVerticon from "@material-ui/icons/MoreVert";
import {Avatar, IconButton} from "@material-ui/core";
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./SidebarChat"

function Sidebar() {
    return (
        <div className='sidebar'>
           
            <div className="sidebar__header">
                <Avatar src="https://avatars1.githubusercontent.com/u/30297131?s=400&v=4"/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVerticon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start a new chat" type="text"></input>
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar
