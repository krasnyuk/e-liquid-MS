import {Component} from "@angular/core";
import {BaseComponent} from "../../../core/base/base-component";
import {ToastsManager} from "ng2-toastr";
import {OrderModel} from "../../../core/models/order.model";
import {OrdersService} from "../../../core/services/orders.service";

@Component({
    selector: 'appc-orders-list',
    templateUrl: 'orders-list.component.html'
})
export class OrdersListComponent extends BaseComponent {

    public orders: Array<OrderModel> = [];

    constructor(private ordersService: OrdersService,
                private notificationService: ToastsManager) {
        super();
    }

    ngOnInit() {
        this.ordersService.getOrders().subscribe((success: Array<any>) => {
            this.orders = success.sort((a, b) => {
                return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0);
            });
        });
    }

    public deleteOrder(orderModel: OrderModel): void {
        if (confirm('Удалить данный заказ?')) {
            this.ordersService.deleteOrder(orderModel.id).subscribe(success => {
                this.removeFromObjArray(this.orders, orderModel.id);
                this.notificationService.success(`Заказ клиент ${orderModel.client.name}  №${orderModel.id} успешно удалён!`);
            }, error => {
                this.notificationService.error('Server error. Details: ' + error);
            });
        }
    }
}
