import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'myDate',
    standalone: true
})
export class MyDatePipe implements PipeTransform {

    transform(value: string): string {

        if (value === undefined || value === "") {
            return value;
        }
        const year = value.toString().substring(0, 4);
        const month = value.toString().substring(4, 6);
        const day = value.toString().substring(6, 8);

        return `${year}-${month}-${day}`;
    }

}
