package com.tshirt.tshirtplatform.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class ProviderProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String supportedMaterials;
    // Example: "COTTON,POLYESTER,DRYFIT"

    private Integer minOrderQuantity;

    private Integer maxOrderQuantity;

    private Double pricePerUnit;
}