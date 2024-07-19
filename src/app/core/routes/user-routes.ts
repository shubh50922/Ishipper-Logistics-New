import { Routes } from "@angular/router";
export const USER_ROUTES: Routes=[
    {
        path: '',
        loadChildren: () =>
          import(
            '../../Customer-Panel/customer-dashboard/customer-dashboard.module'
          ).then((m) => m.CustomerDashboardModule),
      },
      {
        path: 'deliverydetail',
        loadChildren: () =>
          import(
            '../../Customer-Panel/delivery-detail/delivery-detail.module'
          ).then((m) => m.DeliveryDetailModule),
      },
      {
        path: 'shipments',
        loadChildren: () =>
          import(
            '../../Customer-Panel/summary-shipments/summary-shipments.module'
          ).then((m) => m.SummaryShipmentsModule),
      },
    
      {
        path: 'warrenty',
        loadChildren: () =>
          import('../../Customer-Panel/warrenty-info/warrenty-info.module').then(
            (m) => m.WarrentyInfoModule
          ),
      },
    
      {
        path: 'contact',
        loadChildren: () =>
          import('../../contact/contact.module').then((m) => m.ContactModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../../profile/profile.module').then((m) => m.ProfileModule),
      },
]