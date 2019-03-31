package com.afzal.project.service;

import com.afzal.project.repository.StudentRepo;
import com.afzal.project.table.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;

    public ResponseEntity save(Student student){
        try{
            studentRepo.save(student);
        }
        catch (Exception e){
            return new ResponseEntity("Failed to save", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity("Data Saved Successfully", HttpStatus.OK);
    }

    public ResponseEntity getAllStudent(){
        ArrayList<Student> list=new ArrayList<Student>();
        List<Student> students;
        try{
            students = (List<Student>) studentRepo.findAll();
        }
        catch (Exception e){
            return new ResponseEntity("Failed to get", HttpStatus.BAD_REQUEST);
        }
        list.addAll(students);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    public ResponseEntity deleteStudent(Long sNo){
        try{
            Student student = studentRepo.findBySNo(sNo);
            studentRepo.delete(student);
        }
        catch (Exception e){
            return new ResponseEntity("Invalid Student", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity("Successfully Deleted Student", HttpStatus.OK);
    }

    public ResponseEntity updateStudent(Student student){
//        Long sNo = student.getSNo();
        try{
//            Student studentObj = studentRepo.findBySNo(sNo);
//            studentObj.getAggPer(student.getAggPer());
//            studentObj.getBacklogs(studentgetBa);
//            studentObj.getEmailId();
//            studentObj.getFirstName();
//            studentObj.getGapYear();
//            studentObj.getLastName();
//            studentObj.getPhoneNo();
//            studentObj.getRollNo();
//            studentObj.getTenthMarks();
//            studentObj.getTwelthOrDiplomaMarks(""+student.getTwelthOrDiplomaMarks());
            studentRepo.save(student);
        }
        catch (Exception e){
            return new ResponseEntity("Invalid Student", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity("Successfully updated Student", HttpStatus.OK);
    }

    public ResponseEntity getStudentById(String id){
        Student selectedStudent = studentRepo.findBySNo(Long.parseLong(id));
        if(selectedStudent!=null)
            return new ResponseEntity<>(selectedStudent,HttpStatus.OK);
        else
            return new ResponseEntity<>("Invlaid Studnet Id",HttpStatus.BAD_REQUEST);
    }
}
