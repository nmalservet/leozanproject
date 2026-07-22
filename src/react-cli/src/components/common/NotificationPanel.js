import { useContext } from "react";
import {NotificationContext} from '../../context/notification-context';
import { X } from 'lucide-react';
/**
 * panel to display notifications, according to the type, it will change the color
 * @param notification. json structure, notification.message and message.type type : error, warning, info, success
 * @param handleSelection is the function to provide the selection to the parent
 * @returns select list component.
 */
function NotificationPanel() {
    const { notifications, setNotifications } = useContext(NotificationContext);
    function hide(){
        setNotifications(null);
    }
    function getColor(type){
        if(type==="error")
            return "bg-red-100 text-red-800 border border-red-300";
        if(type==="success")
            return "bg-green-100 text-green-800 border border-green-300";
        if(type==="info")
            return "bg-primary-100 text-primary-800 border border-primary-300";
        if(type==="warning")
            return "bg-yellow-100 text-yellow-800 border border-yellow-300";
         else
            return "bg-gray-100 text-gray-800 border border-gray-300";
    }
    if(!notifications||notifications.length===0)
        return ''
    else
        return (
        <div>
            {notifications.map(notification => {
        return (
            <div className={getColor(notification.type)+' w-full rounded-lg px-4 py-2 flex items-center justify-between'} role="alert" key={notification.message}>
                <strong>{notification.type} : </strong>
                <span >{notification.message}</span>
                    <button type="button" className="ml-4" onClick={() => hide()}><X size={16} /></button>
                </div>)})}
            </div>)
            ;
}

export default NotificationPanel;
