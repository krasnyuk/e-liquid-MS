import {Component} from "@angular/core";
import {ClientsService} from "../../../core/services/clients.service";
import {ActivatedRoute} from "@angular/router";
import {BaseComponent} from "../../../core/base/base-component";
import {OrderModel} from "../../../core/models/order.model";
import {OrdersService} from "../../../core/services/orders.service";
import {ClientModel} from "../../../core/models/client.model";

@Component({
    selector: 'appc-details-order',
    templateUrl: 'order-details.component.html',
})
export class OrderDetailsComponent extends BaseComponent {

    public order: OrderModel = <OrderModel> {
        client: <ClientModel>{}
    };
    public orderTotal: number = 0;

    constructor(private ordersService: OrdersService,
                private clientsService: ClientsService,
                private router: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.router.params.subscribe(params => {
            const orderId = +params['orderId'];
            if (orderId) {
                this.ordersService.getOrder(orderId).subscribe(success => {
                    this.order = success;
                    this.order.orderDetails.forEach(item => {
                        this.orderTotal += item.count * item.price;
                    });
                    this.clientsService.getClient(this.order.clientId).subscribe(success => {
                        this.order.client = success;
                    });
                }, error => {});
            }
        });
    }
}
