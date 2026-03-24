package com.tshirt.tshirtplatform.service;

import com.tshirt.tshirtplatform.entity.ProviderProfile;
import com.tshirt.tshirtplatform.repository.ProviderProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProviderService {

    private final ProviderProfileRepository providerRepo;

    public ProviderService(ProviderProfileRepository providerRepo) {
        this.providerRepo = providerRepo;
    }

    public List<ProviderProfile> getEligibleProviders(String material, int quantity) {
        return providerRepo
                .findBySupportedMaterialsContainingAndMinOrderQuantityLessThanEqualAndMaxOrderQuantityGreaterThanEqual(
                        material, quantity, quantity
                );
    }
}