import {FormGroup} from "@angular/forms";
import {OnInit} from "@angular/core";

export class BaseEditForm implements OnInit {
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

    protected resetForm() {
        this.editForm.reset();
    }

    ngOnInit() {
    }
}
