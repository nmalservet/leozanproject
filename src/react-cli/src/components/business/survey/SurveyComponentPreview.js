/**
 * survey object view component, to display the survey object in compact mode without edition
 */
function SurveyComponentPreview({ surveyComponent }) {

	return (
		<div className="">
		<h1>Survey Component #{surveyComponent.id}</h1>
			<form >
				<div className="grid grid-col-1 gap-1 m-2">
				{surveyComponent.name}
				{surveyComponent.style}
					
				</div>
			</form>

		</div>);
}

export default SurveyComponentPreview;