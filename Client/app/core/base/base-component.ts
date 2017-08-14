import {OnInit} from "@angular/core";
import {Lang} from "../app-lang";
import {AppConst} from "../app-constants";
import {DatePipe} from "@angular/common";

export class BaseComponent implements OnInit {
    protected templateLang = Lang;
    protected templateConst = AppConst;

    ngOnInit() {
    }

    protected removeFromObjArray(array: Array<any>, elementId: number): Array<any> {
        return array.splice(array.map(item => item.id).indexOf(elementId), 1);
    }

    protected formatDate(date: string) {
        const datePipe = new DatePipe('en-US');
        return datePipe.transform(date, 'dd/MM/yyyy');
    }

    protected dynamicSort(property: any, sortOrder: 1 | -1 = 1) {
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a: any, b: any) {
            const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    protected sortMultipleKeys(a, b) {
        if (a > b) return +1;
        if (a < b) return -1;
        return 0;
    }
}
