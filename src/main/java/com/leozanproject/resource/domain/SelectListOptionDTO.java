package com.leozanproject.resource.domain;


/**
 * dto to expose select list option.
 * @author nicolas
 *
 */
public class SelectListOptionDTO {

	private int id;

	private String name;
	
	private String key;


	private String label;
	
	private int displayOrder;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public int getDisplayOrder() {
		return displayOrder;
	}

	public void setDisplayOrder(int displayOrder) {
		this.displayOrder = displayOrder;
	}
	
	
	
	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public SelectListOptionDTO() {
		
	}

	public SelectListOptionDTO(int id, String name, String label, int displayOrder,String key) {
		super();
		this.id = id;
		this.name = name;
		this.label = label;
		this.displayOrder = displayOrder;
		this.key = key;
	}
	
	
	
}
