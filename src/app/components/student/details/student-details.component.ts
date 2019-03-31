
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Services
import { StudentService } from '../../../services/student/student.service';
import { routerTransition } from '../../../services/config/config.service';

import { ApiCommonService } from '../../../services/api-common.service';

@Component({
	selector: 'app-student-details',
	templateUrl: './student-details.component.html',
	styleUrls: ['./student-details.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})

export class StudentDetailsComponent implements OnInit {
	index: any;
	studentDetail: any;
	
	constructor(private apiCommonService: ApiCommonService, private router: Router, private route: ActivatedRoute, private studentService: StudentService, private toastr: ToastrService) {
		
		this.route.params.subscribe(params => {
			this.index = params['id'];
			if (this.index && this.index != null && this.index != undefined) {
				this.getStudentDetails(this.index);
			}
		});
	}

	ngOnInit() {
	}

	// Get student details 
	getStudentDetails(index: number) {
		this.apiCommonService.get('/getstudentsbyid/' + index).subscribe(getStudentDetail => {
			if (getStudentDetail) {
				this.studentDetail = getStudentDetail;
				console.log(this.studentDetail);
				this.toastr.success(getStudentDetail.message, "Fetched Success");
			}
		})
		// let getStudentDetail = this.studentService.getStudentDetails(index);
		// if(getStudentDetail) {
		// 	this.studentDetail = getStudentDetail.studentData;
		// 	this.toastr.success(getStudentDetail.message,"Success");
		// }
	}

}