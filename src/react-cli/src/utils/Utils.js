
    
export const truncate= (str,size) => {
   return str.length > size ? str.substring(0, size-3) + "..." : str;
};


// Detect Base64 encoded documents using some crude heuristics
		// and generate a link for displaying that document
		
export const detectBase64= (text) =>{
	if(text.length>1000)
	if (text.length > 256							// assume a minimal document size
		&& text.match (/^[A-Za-z0-9+/]+=*$/))	{	// match a Base64 conformant string
		return true;
	}
	return false;
}

/**
 * current date minus the delay wit unit provided
 * @param {*} val 
 * @param {*} unit 
 * @returns 
 */
export   const getDateMinusDelay=(val,unit)=>{
	var valB =val;
	//convert the value according to the date inot seconds
	var delay=val;
	if(unit==="minutes")
		delay = 60*val;
	if(unit==="hours")
		delay=60*60*val;
	if(unit==="days")
		delay = 60*60*24*val;
	if(unit==="weeks")
		delay = 60*60*24*7*val;
	if(unit==="months")
		delay = 60*60*24*31*val;
	//convert the date minus the delay
	//expected date into string format concise /yyyymmddhhmmss
	var d1 = new Date();
		//get tz offset in minutes; aka the difference between GMT and local time. ex: if local is GMT+2, offset will be -120
	var tz = d1.getTimezoneOffset();
	//add offset to delay
	delay = delay + (tz*60)
	
	var d1m = d1.getTime()-(1000*delay);
	var d2 = new Date(d1m);

	//Issue : toIsoString is giving date in UTC without tz offset
	valB=d2.toISOString();
	valB = valB.replaceAll("T","");
	valB = valB.replaceAll(":","");
	valB = valB.replaceAll("-","");
	valB = valB.slice(0,14);
	return valB;
}

    //convert the delay from seconds to a string s/m/h/d
    export const displayTime=(delay)=>{
        if(delay<60)
            return ~~(delay)+" s";
        else{
            if(delay<3600)
                return  ~~(delay/60)+" m";
            if(delay<3600*24)
                return  ~~(delay/3600)+" h";
            else
            return  ~~(delay/(3600*24))+" d"; 
            
        }
    }
    