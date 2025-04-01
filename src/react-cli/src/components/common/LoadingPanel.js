import {Loader2 } from 'lucide-react';

/**
 * panel to display a loading icon.
 */
function LoadingPanel() {

	return (
		<div className="">
			<Loader2 className="w-4 h-4 mr-2 animate-spin" /><span>Loading...</span>
		</div>)
		;
}


export default LoadingPanel;