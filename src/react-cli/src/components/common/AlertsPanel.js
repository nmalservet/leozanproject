/**
 * panel to display alerts without context, according to the type, it will change the color
 * @param alerts. json structure, notification.message and message.type type : error, warning, info, success
 * @param close propage close to the parent, if clicked
 * @returns select list component.
 */
function AlertsPanel({alerts,onClose}) {
   //we set the messages to an empty array if clicked.
    function hide(){
        onClose();
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
    
        return (
        <div>
            {alerts.map(notification => {
        return (
            <div className={'alert alert-'+getColor(notification.type)} style={{width:"100%"}}role="alert" key={notification.message}>
                <span ><strong>{notification.message}</strong></span>
                    <div style={{float:"right"}}><button type="button"  className={'btn btn-sm btn-'+getColor(notification.type)} onClick={() => hide()}><em className="bi bi-x-lg"></em></button></div>
                </div>)})}
            </div>)
            ;
}

export default AlertsPanel;