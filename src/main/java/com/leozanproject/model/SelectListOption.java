package com.leozanproject.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "select_list_option")
public class SelectListOption {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column(name = "name", nullable = false, columnDefinition = "varchar(100)")
	private String name;


	@Column(name = "label", nullable = false)
	private String label;
	
	@Column(name = "display_order", nullable = false)
	private int displayOrder;
	
	@Column(name = "key", nullable = false)
	private String key;

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
	
	@Column(name = "select_list_id", nullable = false)
	private int selectListId;

	public int getSelectListId() {
		return selectListId;
	}

	public void setSelectListId(int selectListId) {
		this.selectListId = selectListId;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}
	
	
	
	

}
