package com.afzal.project.table;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long sNo;

    private Long rollNo;

    private String firstName;

    private String lastName;

    private String emailId;

    private String phoneNo;

    private Float aggPer;

    private int backlogs;

    private int gapYear;

    private float tenthMarks;

    private float twelthOrDiplomaMarks;
}
