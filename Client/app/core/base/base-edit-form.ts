import {FormGroup} from "@angular/forms";
import {OnInit} from "@angular/core";
import {BaseComponent} from "./base-component";

export class BaseEditForm extends BaseComponent {
    protected editForm: FormGroup;
    protected formTitle: string = "";
    protected isProcessing = false;
    protected submitted = false;

    protected submitForm() {
        this.submitted = true;
        if (this.editForm.valid) {
            this.isProcessing = true;
            return this.saveInternal();
        } else {
            return null;
        }
    }

    protected saveInternal() {
    }

    protected checkControlValidation(controlName: string, errorName: string) {
        return this.editForm.get(controlName).hasError(errorName) && !this.editForm.get(controlName).pristine;
    }

    protected resetForm() {
        this.editForm.reset();
    }

    ngOnInit() {
    }
}
