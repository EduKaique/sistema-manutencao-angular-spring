package com.remont.back_end.dto;

public class CategoryEquipmentDTO {

    private Integer id;
    private String name;
    private String icon;

    public CategoryEquipmentDTO() {}

    public CategoryEquipmentDTO(Integer id, String name, String icon) {
        this.id = id;
        this.name = name;
        this.icon = icon;
    }

    public int getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
}