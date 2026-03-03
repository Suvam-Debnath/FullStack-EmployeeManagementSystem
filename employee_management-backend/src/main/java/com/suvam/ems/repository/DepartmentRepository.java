package com.suvam.ems.repository;

import com.suvam.ems.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository  extends JpaRepository<Department, Long> {
}
