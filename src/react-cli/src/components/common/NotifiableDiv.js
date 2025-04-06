import React,{useState,useEffect }from "react";
/**
 * panel to display notifications, according to the type, it will change the color
 * @param notification. json structure, notification.message and message.type type : error, warning, info, success
 * @param handleSelection is the function to provide the selection to the parent
 * @returns select list component.
 */
function NotifiableDiv({notifications}) {
    const [notifs, setNotifs ] = useState(notifications);
    console.log(notifications);
    function hide(){
        setNotifs(null);
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

   useEffect(() => {
        setNotifs(notifications);
      },[setNotifs,notifications])
   
        return (
        <div>
            {notifs&&notifs.map(notification => {
        return (
            <div className={'alert alert-'+getColor(notification.type)} style={{width:"100%"}}role="alert" key={notification.message}>
                <strong>{notification.type} : </strong>
                <span >{notification.message}</span>
                    <div style={{float:"right"}}><button type="button"  className={'btn btn-sm btn-'+getColor(notification.type)} onClick={() => hide()}><em class="bi bi-x-lg"></em></button></div>
                </div>)})}
            </div>)
}

export default NotifiableDiv;