import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { StudentService } from '../../../services/student/student.service';
import { routerTransition } from '../../../services/config/config.service';
import { ApiCommonService } from '../../../services/api-common.service';

import { Http } from '@angular/http';
import { FilterPipe } from '../../../pipes/filter.pipe';
declare var jsPDF: any;
@Component({
	selector: 'app-student-list',
	templateUrl: './student-list.component.html',
	styleUrls: ['./student-list.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})

export class StudentListComponent implements OnInit {
	studentCopy: any[];
	filterData: any;
	studentList: any;
	studentListData: any;
	student = [];
	role;
	view: boolean;
	columns = [
		{ title: "Roll No", dataKey: "rollNo" },
		{ title: "First Name", dataKey: "firstName" },
		{ title: "Last Name", dataKey: "lastName" },
		{ title: "Email", dataKey: "emailId" },
		{ title: "Phone", dataKey: "phoneNo" },
		{ title: "Aggregate %", dataKey: "aggPer" },
		{ title: "Backlog", dataKey: "backlogs" },
		{ title: "12th Marks", dataKey: "twelthOrDiplomaMarks" },
		{ title: "10th Marks", dataKey: "tenthMarks" },
		{ title: "Gap", dataKey: "gapYear" }];
	constructor(private filterPipe: FilterPipe, private studentService: StudentService, private toastr: ToastrService, private http: Http, private apiCommonService: ApiCommonService) {
		this.role = window.localStorage.getItem("role");
		if (this.role === 'Admin')
			this.view = true;
		else
			this.view = false;
		this.getAllStudent();
		this.filterData;

	}
	// Call student list function on page load 
	ngOnInit() {
		// this.getStudentList();
	}
	getAllStudent() {
		this.student = [];

		this.apiCommonService.get('/getallstudents').subscribe(res => {

			res.forEach(element => {
				console.log(element);
				this.student.push(element);
			});
		}, (err) => {
		}, () => {

		})
		this.studentCopy = this.student;
		console.log(this.student);


	}

	// Get student list from services
	getStudentList() {

		let studentList = this.studentService.getAllStudents();

		this.success(studentList)
	}

	// Get student list success
	success(data) {
		// this.studentListData = data.data;
		// for (var i = 0; i < this.studentListData.length; i++) {
		// 	this.studentListData[i].name = this.studentListData[i].firstName + ' ' + this.studentListData[i].lastName;
		// }
	}

	// Delete a student with its index
	deleteStudent(index: number, sno: number) {
		// get confirm box for confirmation
		let r = confirm("Are you sure?");

		if (r == true) {

			this.apiCommonService.delete('/deletestudent?sno=' + sno).subscribe(res => {
				this.toastr.success("Success", "Student Deleted");

			}, err => {
				this.getAllStudent();

			}, () => {

				this.getAllStudent();

			});
			this.toastr.success("student deleted successfully");



		}

	}
	download() {
		var doc = new jsPDF({
			orientation: 'landscape'
		});
		var temp = this.filterPipe.transform(this.student, this.filterData);

		doc.autoTable(this.columns, temp, {
			styles: { fillColor: [209,209,209] },
			columnStyles: {
				id: { fillColor: 255 }
			},
			margin: { top: 60 },
			addPageContent: function (data) {
				doc.text("G.B Pant Engineering College", 120, 30);
			}
		});
		doc.save('Shortlisted_Student.pdf');
	}
}
