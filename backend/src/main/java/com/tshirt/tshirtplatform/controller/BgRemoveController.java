package com.tshirt.tshirtplatform.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class BgRemoveController {

    @Value("${clipdrop.api.key}")
    private String apiKey;

    @GetMapping("/bg-remove")
    public String testBgRemove() {
        return "bg-remove endpoint is working. Use POST with multipart file.";
    }

    @PostMapping("/bg-remove")
    public ResponseEntity<?> removeBackground(@RequestParam("image") MultipartFile file) {
        String url = "https://clipdrop-api.co/remove-background/v1";

        try {
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.set("x-api-key", apiKey);
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            // Build multipart body with filename
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

            org.springframework.core.io.ByteArrayResource imageResource =
                    new org.springframework.core.io.ByteArrayResource(file.getBytes()) {
                        @Override
                        public String getFilename() {
                            return (file.getOriginalFilename() != null) ? file.getOriginalFilename() : "upload.png";
                        }
                    };

            body.add("image_file", imageResource);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity<byte[]> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    requestEntity,
                    byte[].class
            );

            if (!response.getStatusCode().is2xxSuccessful()) {
                // return clipdrop error back to frontend
                return ResponseEntity.status(response.getStatusCode())
                        .contentType(MediaType.TEXT_PLAIN)
                        .body(response.hasBody() ? new String(response.getBody()) : "Clipdrop error");
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(response.getBody());

        } catch (org.springframework.web.client.HttpStatusCodeException ex) {
            // Clipdrop responded with an error code
            return ResponseEntity.status(ex.getStatusCode())
                    .contentType(MediaType.TEXT_PLAIN)
                    .body(ex.getResponseBodyAsString());

        } catch (Exception ex) {
            // Any other server-side failure
            return ResponseEntity.status(500)
                    .contentType(MediaType.TEXT_PLAIN)
                    .body("Server error: " + ex.getMessage());
        }
    }
    }