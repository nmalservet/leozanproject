package com.leozanproject.resource.domain;

/**
 * basic translation DTO.
 * 
 * @author nicolas malservet
 *
 */
public class TranslationDTO {

	Integer id;

	String fr;

	String de;

	String lb;

	String en;

	String pt;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFr() {
		return fr;
	}

	public void setFr(String fr) {
		this.fr = fr;
	}

	public String getDe() {
		return de;
	}

	public void setDe(String de) {
		this.de = de;
	}

	public String getLb() {
		return lb;
	}

	public void setLb(String lb) {
		this.lb = lb;
	}

	public String getEn() {
		return en;
	}

	public void setEn(String en) {
		this.en = en;
	}

	public String getPt() {
		return pt;
	}

	public void setPt(String pt) {
		this.pt = pt;
	}

	public TranslationDTO() {
	}

	public TranslationDTO(String fr, String de, String lb, String en, String pt) {
		super();
		this.fr = fr;
		this.de = de;
		this.lb = lb;
		this.en = en;
		this.pt = pt;
	}

}
