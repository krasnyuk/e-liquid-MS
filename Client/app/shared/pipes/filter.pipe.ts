import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'paramFilter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], paramName: string, filterPattern: string, equals: boolean = false): any {
        if (!items || !filterPattern) {
            return items;
        }
        if (equals) {
            return items.filter(item => item[paramName].toLowerCase() === filterPattern.toLowerCase());
        }
        return items.filter(item => item[paramName].toLowerCase().includes(filterPattern.toLowerCase()));
    }
}
