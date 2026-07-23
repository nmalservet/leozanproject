package com.leozanproject.service;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.leozanproject.constants.QuestionType;
import com.leozanproject.constants.SurveyObjectType;
import com.leozanproject.resource.domain.AnswerDTO;
import com.leozanproject.resource.domain.PatientDTO;
import com.leozanproject.resource.domain.SurveyObjectDTO;
import com.leozanproject.resource.domain.SurveyResponse;

/**
 * builds a PDF export of a filled-in survey response (questionnaire answers).
 */
@Component
public class SurveyResponsePdfService {

	private static final Font TITLE_FONT = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16);
	private static final Font SECTION_FONT = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
	private static final Font LABEL_FONT = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10);
	private static final Font VALUE_FONT = FontFactory.getFont(FontFactory.HELVETICA, 10);

	public byte[] generate(SurveyResponse response) throws Exception {
		Document document = new Document(PageSize.A4, 40, 40, 50, 50);
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		PdfWriter.getInstance(document, out);
		document.open();

		document.add(new Paragraph(response.getSurvey() != null ? response.getSurvey().getName() : "", TITLE_FONT));
		document.add(Chunk.NEWLINE);

		document.add(buildPatientInfo(response.getPatient()));
		document.add(Chunk.NEWLINE);

		document.add(buildAnswers(response));

		document.close();
		return out.toByteArray();
	}

	private PdfPTable buildPatientInfo(PatientDTO patient) {
		PdfPTable table = new PdfPTable(2);
		table.setWidthPercentage(100);
		if (patient != null) {
			addRow(table, "Name", (nullToEmpty(patient.getName()) + " " + nullToEmpty(patient.getFirstName())).trim());
			addRow(table, "MRN", patient.getMrn());
			if (patient.getBirthdate() != null)
				addRow(table, "Birthdate", new SimpleDateFormat("dd/MM/yyyy").format(patient.getBirthdate()));
		}
		return table;
	}

	/**
	 * one row per survey component, in position order: section titles (type=TEXT) as a
	 * heading, questions (type=QUESTION) as "label : answer".
	 */
	private PdfPTable buildAnswers(SurveyResponse response) {
		Map<Integer, String> answersByComponent = new HashMap<>();
		if (response.getAnswers() != null)
			for (AnswerDTO answer : response.getAnswers())
				answersByComponent.put(answer.getSurveyComponentId(), answer.getValue());

		PdfPTable table = new PdfPTable(1);
		table.setWidthPercentage(100);

		if (response.getSurveyObjects() != null) {
			for (SurveyObjectDTO surveyObject : response.getSurveyObjects()) {
				if (surveyObject.getType() != null && surveyObject.getType() == SurveyObjectType.TEXT.getValue()) {
					table.addCell(borderlessCell(new Paragraph(surveyObject.getName(), SECTION_FONT)));
					continue;
				}
				String value = answersByComponent.get(surveyObject.getId());
				Paragraph paragraph = new Paragraph();
				paragraph.add(new Chunk(surveyObject.getName() + " : ", LABEL_FONT));
				paragraph.add(new Chunk(formatValue(surveyObject, value), VALUE_FONT));
				PdfPCell cell = borderlessCell(paragraph);
				cell.setPaddingBottom(6f);
				table.addCell(cell);
			}
		}
		return table;
	}

	/**
	 * values are raw strings coming from the answer form: booleans for checkboxes,
	 * JSON payloads for file/image uploads, HTML for the rich text area.
	 */
	private String formatValue(SurveyObjectDTO surveyObject, String value) {
		if (value == null || value.isEmpty())
			return "-";
		int questionType = surveyObject.getQuestionType() != null ? surveyObject.getQuestionType() : QuestionType.INPUT.getValue();
		if (questionType == QuestionType.CHECKBOX.getValue())
			return "true".equalsIgnoreCase(value) ? "Yes" : "No";
		if (questionType == QuestionType.FILE.getValue() || questionType == QuestionType.IMAGE.getValue())
			return "[attached file, not included in the PDF]";
		if (questionType == QuestionType.TEXT_AREA.getValue())
			return stripHtml(value);
		return value;
	}

	private String stripHtml(String html) {
		return html.replaceAll("<[^>]+>", "")
				.replace("&nbsp;", " ")
				.replace("&amp;", "&")
				.replace("&lt;", "<")
				.replace("&gt;", ">")
				.trim();
	}

	private void addRow(PdfPTable table, String label, String value) {
		table.addCell(borderlessCell(new Paragraph(label, LABEL_FONT)));
		table.addCell(borderlessCell(new Paragraph(nullToEmpty(value), VALUE_FONT)));
	}

	private PdfPCell borderlessCell(Paragraph content) {
		PdfPCell cell = new PdfPCell(content);
		cell.setBorder(Rectangle.NO_BORDER);
		return cell;
	}

	private String nullToEmpty(String value) {
		return value != null ? value : "";
	}
}
