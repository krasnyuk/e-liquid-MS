import {FormGroup} from "@angular/forms";
import {BaseComponent} from "./base-component";

export class BaseEditForm extends BaseComponent {
    protected editForm: FormGroup;
    protected formTitle: string = "";
    protected isProcessing = false;
    protected submitted = false;
    protected isEditingMode = false;

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
        const control = this.editForm.get(controlName);
        return control.hasError(errorName) && (!control.pristine || control.touched);
    }

    protected resetForm() {
        this.editForm.reset();
    }

    ngOnInit() {
    }
}
