package com.tshirt.tshirtplatform.repository;

import com.tshirt.tshirtplatform.entity.ProviderProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProviderProfileRepository extends JpaRepository<ProviderProfile, Long> {

    List<ProviderProfile> findBySupportedMaterialsContainingAndMinOrderQuantityLessThanEqualAndMaxOrderQuantityGreaterThanEqual(
            String material,
            Integer qty1,
            Integer qty2
    );
}