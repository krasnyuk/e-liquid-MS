import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {LoginModel} from "../core/models/login-model";
import {AccountService} from "../core/account/account.service";
import {UtilityService} from "../core/services/utility.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'appc-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    public editForm: FormGroup;
    public isProcessing = false;
    public submitted = false;

    constructor(public accountService: AccountService,
                public router: Router,
                private fb: FormBuilder,
                public utilityService: UtilityService) {
    }

    public save() {
        this.submitted = true;
        if (this.editForm.valid) {
            this.isProcessing = true;
            return this.login();
        } else {
            return null;
        }
    }

    public login(): void {
        this.accountService.login(this.editForm.value as LoginModel)
            .subscribe(() => {
                    this.utilityService.navigate('/pages');
                },
                (errors: any) => {
                    this.isProcessing = false;
                });
    };

    public ngOnInit() {
        this.editForm = this.fb.group({
            username: ["", Validators.required],
            password: ["", Validators.required]
        });
    }
}
