package com.afzal.project.controller;


import com.afzal.project.service.StudentService;
import com.afzal.project.table.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gbpant/")
public class StudentController {
    @Autowired
    private StudentService studentService;


    @GetMapping("/getallstudents")
    private ResponseEntity<?> getAllStudent(){
        return studentService.getAllStudent();
    }

    @PostMapping("/savestudents")
    private ResponseEntity<?> saveStudent(@RequestBody Student student){
        return studentService.save(student);
    }

    @DeleteMapping("/deletestudent")
    private ResponseEntity<?> deleteStudent(String sno){
        return studentService.deleteStudent(Long.parseLong(sno));
    }

    @PostMapping("/updatestudent")
    private ResponseEntity<?> updateStudent(@RequestBody Student student){
        return studentService.updateStudent(student);
    }

    @GetMapping("/getstudentsbyid/{id}")
    private ResponseEntity<?> getStudentById(@PathVariable String id){
        return studentService.getStudentById(id);
    }
}
