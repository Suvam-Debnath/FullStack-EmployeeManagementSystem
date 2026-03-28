package com.suvam.ems.controller;

import com.suvam.ems.dto.DashboardDto;
import com.suvam.ems.repository.DepartmentRepository;
import com.suvam.ems.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/dashboard")
@AllArgsConstructor
public class DashboardController {
    private EmployeeRepository employeeRepository;
    private DepartmentRepository departmentRepository;

    @GetMapping
    public ResponseEntity<DashboardDto> getDashboardData() {
        DashboardDto dto = new DashboardDto();
        dto.setEmployeeCount(employeeRepository.count());
        dto.setDepartmentCount(departmentRepository.count());
        return ResponseEntity.ok(dto);
    }
}
