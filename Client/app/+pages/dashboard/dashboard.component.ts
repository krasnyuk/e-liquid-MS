import {Component} from "@angular/core";
import {DataAnalyticsService} from "../../core/services/data-analytics.service";
import {BaseComponent} from "../../core/base/base-component";

@Component({
    selector: 'appc-dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent extends BaseComponent {
    options: Object;
    optionsPieChart: Object;

    public dashboardInfo: any = {
        totalSold: 0,
        totalProfit: 0,
        thisMonth: 0,
        clientCount: 0,
        averageOrder: 0
    };

    constructor(private dataAnalyticsService: DataAnalyticsService) {
        super();
    }


    ngOnInit() {

        this.dataAnalyticsService.getDashboardInfo().subscribe(success => {
            this.dashboardInfo = success;
            this.dashboardInfo.totalProfit = Math.floor(success.totalProfit);
            this.dashboardInfo.averageOrder = Math.floor(success.averageOrder);
        });
        this.dataAnalyticsService.getOrdersChartData().subscribe((success: Array<any>) => {
            const dates: Array<string | null> = [];
            const orderItemsCount: Array<number> = [];

            success.forEach(item => {
                dates.push(this.formatDate(item.date));
                orderItemsCount.push(item.count);
            });
            this.options = {
                title: {
                    text: 'График продаж'
                },

                subtitle: {
                    text: '(количество/дата)'
                },

                yAxis: {
                    title: {
                        text: 'Количество единиц в заказе'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                xAxis: {
                    categories: dates
                },

                series: [{
                    name: 'Количество',
                    data: orderItemsCount
                }]
            };
        });
        this.dataAnalyticsService.getProductsPercentsChartData().subscribe((success: Array<any>) => {
            const seriesData: Array<any> = success.map(item => {
                return {name: item.name, y: item.percent}
            });
            this.optionsPieChart = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Соотношение продажи продуктов'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    name: 'Продукты',
                    colorByPoint: true,
                    data: seriesData
                }]
            };
        });
    }
}