package com.remont.back_end.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Arrays;
import java.util.Optional;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum StatusEnum {

    ABERTA((short)1, "ABERTA", "#627877"),
    ORCADA((short)2, "ORÇADA", "#7C3804"),
    REJEITADA((short)3, "REJEITADA", "#FF5E5B"),
    APROVADA((short)4, "APROVADA", "#FFAE36"),
    REDIRECIONADA((short)5, "REDIRECIONADA", "#8A84E2"),
    ARRUMADA((short)6, "ARRUMADA", "#2B3E61"),
    PAGA((short)7, "PAGA", "#EC7505"),
    FINALIZADA((short)8, "FINALIZADA", "#136947");

    private final Short id;

    @JsonProperty("nome")
    private final String name;

    @JsonProperty("cor")
    private final String color;

    StatusEnum(Short id, String name, String color) {
        this.id = id;
        this.name = name;
        this.color = color;
    }

    public Short getId() { return id; }

    public String getName() { return name; }

    public String getColor() { return color; }

    public static Optional<StatusEnum> fromId(Short id) {
        return Arrays.stream(values())
                .filter(s -> s.id.equals(id))
                .findFirst();
    }
}