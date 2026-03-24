package com.tshirt.tshirtplatform.controller;

import com.tshirt.tshirtplatform.entity.ProviderProfile;
import com.tshirt.tshirtplatform.service.ProviderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/providers")
public class ProviderController {

    private final ProviderService providerService;

    public ProviderController(ProviderService providerService) {
        this.providerService = providerService;
    }

    @GetMapping("/eligible")
    public List<ProviderProfile> eligibleProviders(
            @RequestParam String material,
            @RequestParam int quantity
    ) {
        return providerService.getEligibleProviders(material, quantity);
    }
}