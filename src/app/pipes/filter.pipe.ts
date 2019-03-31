import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filter'
})
export class FilterPipe implements PipeTransform {

	transform(value: any, args?: any): any {
		if (args != undefined && args != null && args != '' && window.localStorage.getItem('role') == 'Admin') {


			return value.filter(data =>
				(data.firstName.toLowerCase()).indexOf(args.toLowerCase()) > -1);
		}
		else {
			if (args != undefined) {
				var valueCopy = value;
				value = [];
				valueCopy.forEach(element => {
					if (element.aggPer >= args)
						value.push(element);
				});
			}

		}
		return value;
	}


}
