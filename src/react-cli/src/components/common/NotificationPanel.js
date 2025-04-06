import { useContext } from "react";
import {NotificationContext} from '../../context/notification-context';
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
            return "danger";
        if(type==="success")
            return "success";
        if(type==="info")
            return "primary";
        if(type==="warning")
            return "warning";
         else
            return "light";
    }
    if(!notifications||notifications.length===0)
        return ''
    else
        return (
        <div>
            {notifications.map(notification => {
        return (
            <div className={'alert alert-'+getColor(notification.type)} style={{width:"100%"}}role="alert" key={notification.message}>
                <strong>{notification.type} : </strong>
                <span >{notification.message}</span>
                    <div style={{float:"right"}}><button type="button"  className={'btn btn-sm btn-'+getColor(notification.type)} onClick={() => hide()}><em className="bi bi-x-lg"></em></button></div>
                </div>)})}
            </div>)
            ;
}

export default NotificationPanel;