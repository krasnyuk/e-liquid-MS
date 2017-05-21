import {Component} from "@angular/core";
import {DataAnalyticsService} from "../../core/services/data-analytics.service";
import {BaseComponent} from "../../core/base/base-component";

@Component({
    selector: 'appc-dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent extends BaseComponent {
    options: Object;
    optionsPieChart: Object = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares January, 2015 to May, 2015'
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
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Microsoft Internet Explorer',
                y: 56.33
            }, {
                name: 'Chrome',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Firefox',
                y: 10.38
            }, {
                name: 'Safari',
                y: 4.77
            }, {
                name: 'Opera',
                y: 0.91
            }, {
                name: 'Proprietary or Undetectable',
                y: 0.2
            }]
        }]
    };

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

    }
}