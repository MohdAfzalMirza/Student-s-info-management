package com.afzal.project.repository;

import com.afzal.project.table.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentRepo extends CrudRepository<Student,Long> {

    Student findBySNo(Long sno);

}
