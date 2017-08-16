import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'appc-app-build',
    templateUrl: 'app-build.component.html',
    styles: [`
        .build-date {
            text-align: center;
            font-family: monospace;
            font-size: 1em;
        }
    `]
})

export class AppBuildComponent implements OnInit {
    public appBuildDate: string;
    public appVersion: string;

    ngOnInit(){
        this.appBuildDate = process.env.BUILD_DATE;
        this.appVersion = process.env.APP_VERSION;
    }
}