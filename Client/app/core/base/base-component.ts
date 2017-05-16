import {OnInit} from "@angular/core";
import {Lang} from "../app-lang";
import {AppConst} from "../app-constants";
export class BaseComponent implements OnInit  {
    protected templateLang = Lang;
    protected templateConst = AppConst;

    ngOnInit() {
    }

    protected removeFromObjArray(array: Array<any>, elementId: number): Array<any> {
        return array.splice(array.map(item => item.id).indexOf(elementId), 1);
    }
}
