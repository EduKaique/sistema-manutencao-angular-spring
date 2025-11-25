package com.remont.back_end.model;

import java.util.Objects;
import jakarta.persistence.*;


@Entity
@Table(name = "category")

public class CategoryEquipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    private String icon;

    @Column(nullable = false)
    private boolean active = true;

    public CategoryEquipment() {
    }

    public CategoryEquipment(String name, String icon) {
        this.name = name;
        this.icon = icon;
    }

    public Integer getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CategoryEquipment that = (CategoryEquipment) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "CategoryEquipment{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", icon='" + icon + '\'' +
                '}';
    }
}