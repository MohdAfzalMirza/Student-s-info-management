import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

// Services
import { ValidationService } from '../../../services/config/config.service';
//  import { StudentService } from '../../../services/student/student.service';
import { routerTransition } from '../../../services/config/config.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiCommonService } from '../../../services/api-common.service';

import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-student-add',
	templateUrl: './student-add.component.html',
	styleUrls: ['./student-add.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})

export class StudentAddComponent implements OnInit {
	// create studentAddForm of type FormGroup 
	private studentAddForm: FormGroup;
	index: any;
	student = [];
	constructor(private apiCommonService: ApiCommonService, private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {

		// Check for route params
		this.getAllStudent();
		this.route.params.subscribe(params => {
			this.index = params['id'];
			// check if ID exists in route & call update or add methods accordingly
			if (this.index && this.index != null && this.index != undefined) {
				this.getStudentDetails(this.index);
			} else {
				this.createForm(null);
			}
		});
	}

	getAllStudent() {
		this.student = [];

		this.apiCommonService.get('/getallstudents').subscribe(res => {

			res.forEach(element => {
				this.student.push(element);
			});
		})

	}

	ngOnInit() {
	}





	// Submit student details form
	doRegister() {
		// let studentRegister = this.studentService.doRegisterStudent(this.studentAddForm.value, this.index);

		const body = {
			"aggPer": this.studentAddForm.controls.agg_per.value,
			"backlogs": this.studentAddForm.controls.backlog.value,
			"emailId": this.studentAddForm.controls.email.value,
			"firstName": this.studentAddForm.controls.first_name.value,
			"gapYear": this.studentAddForm.controls.gap.value,
			"lastName": this.studentAddForm.controls.last_name.value,
			"phoneNo": this.studentAddForm.controls.phone.value,
			"rollNo": this.studentAddForm.controls.roll_no.value,
			"sno": this.studentAddForm.controls.sno.value,
			"tenthMarks": this.studentAddForm.controls.met_per.value,
			"twelthOrDiplomaMarks": this.studentAddForm.controls.int_dip_per.value
		}
		if (this.index && this.index != null && this.index != undefined) {

			// console.log(studentRegister);
			this.apiCommonService.post('/updatestudent', body).subscribe(res => {
				console.log("Successfully update student detail");
				// this.toastr.success("Successfully update student detail");
				this.router.navigate(['/']);
			}, err => {
				this.router.navigate(['/']);
				this.toastr.success("Successfully update student detail");

			}, () => {
				this.router.navigate(['/']);
				this.toastr.success("Successfully update student detail");
			});
			// window.location.reload();

		}
		else {
			this.index = null;
			this.studentAddForm.value.id = this.index;
			this.apiCommonService.post('/savestudents', body).subscribe(res => {
				this.toastr.success("Successfully registered student");
				this.router.navigate(['/']);
			}, err => {
				this.router.navigate(['/']);
				this.toastr.success("Successfully registered student");
			}, () => {
				this.router.navigate(['/']);
				this.toastr.success("Successfully registered student");
			});

			// window.location.reload();

		}



		// if (this.index && this.index != null && this.index != undefined) {
		// 	this.studentAddForm.value.id = this.index
		// }else{
		// 	this.index = null;
		// }
		// let studentRegister = this.studentService.doRegisterStudent(this.studentAddForm.value, this.index);
		// if(studentRegister) {
		// 	if (studentRegister.code == 200) {
		// 		this.toastr.success(studentRegister.message,"Success");
		// 		this.router.navigate(['/']);
		// 	}else{
		// 		this.toastr.error(studentRegister.message,"Failed");
		// 	}
		// }
	}

	// If this is update form, get user details and update form
	getStudentDetails(index: number) {

		this.apiCommonService.get('/getstudentsbyid/' + index).subscribe(res => {

			this.createForm(res);
		})

	}

	// If this is update request then auto fill form
	createForm(data) {
		console.log(data);
		if (data == null) {
			this.studentAddForm = this.formBuilder.group({
				first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				phone: ['', [Validators.required, ValidationService.checkLimit(5000000000, 9999999999)]],
				email: ['', [Validators.required, ValidationService.emailValidator]],


				gap: [''],
				met_per: ['',[Validators.required, ValidationService.checkLimit(0, 100)]],

				int_dip_per: ['',[Validators.required, ValidationService.checkLimit(0, 100)]],
				backlog: [''],
				agg_per: ['',[Validators.required, ValidationService.checkLimit(0, 100)]],
				roll_no: [''],
				sno: [0]
			});
		} else {
			this.studentAddForm = this.formBuilder.group({

				first_name: [data.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				last_name: [data.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				phone: [data.phoneNo, [Validators.required, ValidationService.checkLimit(5000000000, 9999999999)]],
				email: [data.emailId, [Validators.required, ValidationService.emailValidator]],

				gap: [data.gapYear, [Validators.required]],
				met_per: [data.tenthMarks, [Validators.required, ValidationService.checkLimit(0, 100)]],

				int_dip_per: [data.twelthOrDiplomaMarks, [Validators.required, ValidationService.checkLimit(0, 100)]],
				backlog: [data.backlogs],
				agg_per: [data.aggPer, [Validators.required, ValidationService.checkLimit(0, 100)]],
				roll_no: [data.rollNo],
				sno: [data.sno]
			});
		}
	}

}