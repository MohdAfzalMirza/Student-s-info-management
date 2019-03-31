import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Components
import { StudentListComponent } from '../student/list/student-list.component';
import { StudentDetailsComponent } from '../student/details/student-details.component';
import { StudentAddComponent } from '../student/add/student-add.component';

// Services
import { routerTransition } from '../../services/config/config.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})


export class HomeComponent implements OnInit {
	view: boolean;
	role: string;
	active: string;
	constructor(private router: Router, private toastr: ToastrService) {
		// Detect route changes for active sidebar menu
		this.router.events.subscribe((val) => {
			this.routeChanged(val);
		});
		this.role = window.localStorage.getItem("role");
		if (this.role === 'Admin')
			this.view = true;
		else
			this.view = false;
	}

	ngOnInit() {
	}

	// Detect route changes for active sidebar menu
	routeChanged(val) {
		this.active = val.url;
	}

	// Logout User
	logOut() {
		this.toastr.success('Success', "Logged Out Successfully");
		localStorage.removeItem('userData');
		this.router.navigate(['/login']);
	}
}


// Define and export child routes of HomeComponent
export const homeChildRoutes: Routes = [
	{
		path: '',
		component: StudentListComponent
	},
	{
		path: 'add',
		component: StudentAddComponent
	},
	{
		path: 'update/:id',
		component: StudentAddComponent
	},
	{
		path: 'detail/:id',
		component: StudentDetailsComponent
	}
];

