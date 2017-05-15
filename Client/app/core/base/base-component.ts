import {OnInit} from "@angular/core";
export class BaseComponent implements OnInit  {
    ngOnInit() {

    }

    protected removeFromObjArray(array: Array<any>, elementId: number): Array<any> {
        return array.splice(array.map(item => item.id).indexOf(elementId), 1);
    }
}
