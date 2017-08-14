import {Component} from "@angular/core";
import {DataAnalyticsService} from "../../../core/services/data-analytics.service";
import {BaseEditForm} from "../../../core/base/base-edit-form";
import {FormBuilder, Validators} from "@angular/forms";
import {ValidationService} from "../../../shared/forms/validation.service";
import {OrderModel, OrderReportModel} from "../../../core/models/order.model";

@Component({
    selector: 'appc-orders-report',
    templateUrl: 'orders-report.component.html'
})
export class OrdersReportComponent extends BaseEditForm {

    public ordersList: Array<OrderReportModel> = [];
    public reportInfo: any = {
        totalCount: 0,
        money: 0,
        salary: 0,
        averagePrice:0
    };
    constructor(private dataAnalyticsService: DataAnalyticsService,
                private fb: FormBuilder){
        super();
    }

    ngOnInit() {
        this.editForm = this.fb.group({
            firstDate: ["", Validators.required],
            secondDate: ["", Validators.required],
            salaryPercent: [50, [Validators.required, ValidationService.percentValidator]],
        });
    }

    protected saveInternal() {
        this.dataAnalyticsService.getOrdersByDate(this.editForm.get('firstDate').value, this.editForm.get('secondDate').value).subscribe(success => {
            this.ordersList = this.mapOrdersList(success);
        });
    }

    private mapOrdersList(ordersList: Array<OrderModel>): Array<OrderReportModel> {
        let result: Array<OrderReportModel> = [];
        ordersList.forEach(item => {
            result.push({
                id: item.id,
                clientName: item.client.name,
                totalAmount: item.orderDetails.reduce((a,b) => a + b.count, 0),
                pricePerUnit: item.orderDetails.reduce((a,b) => a + b.price, 0) / item.orderDetails.length,
                date: item.date,
                totalSum: item.orderDetails.reduce((a,b) => a + b.count * b.price, 0),
            });
        });
        this.reportInfo.totalCount = result.reduce((a, b) => a + b.totalAmount, 0);
        this.reportInfo.averagePrice = result.reduce((a,b) => a + b.pricePerUnit, 0) / result.length;
        this.reportInfo.money = result.reduce((a,b) => a + b.totalSum, 0);
        this.reportInfo.salary = (this.reportInfo.money / 100) * this.editForm.get('salaryPercent').value;
        return result;
    }
}