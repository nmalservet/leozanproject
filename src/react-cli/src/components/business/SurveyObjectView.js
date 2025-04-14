/**
 * survey object view component, to display the survey object in compact mode without edition
 */
function SurveyObjectView({ surveyObject }) {

	return (
		<div className="">
		<h1>Survey Object #{surveyObject.id}</h1>
			<form >
				<div className="grid grid-col-1 gap-1 m-2">
				{surveyObject.name}
				{surveyObject.style}
					
				</div>
			</form>

		</div>);
}

export default SurveyObjectView;