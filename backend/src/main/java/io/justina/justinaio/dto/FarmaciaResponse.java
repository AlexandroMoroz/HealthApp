package io.justina.justinaio.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FarmaciaResponse {

    private Integer idFarmacia;
    private String nombre;
    private String direccion;
}
