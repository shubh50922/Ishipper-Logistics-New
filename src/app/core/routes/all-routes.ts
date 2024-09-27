import { Routes } from '@angular/router';

export const ALL_ROUTES: Routes = [
  {
    path: 'dashboardadmin',
    loadChildren: () =>
      import('../../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: 'faqs',
    loadChildren: () => import('../../faq/faq.module').then((m) => m.FaqModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../../user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'suppliers',
    loadChildren: () =>
      import('../../supplier/supplier.module').then((m) => m.SupplierModule),
  },

  {
    path: 'profile',
    loadChildren: () =>
      import('../../profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'order',
    loadChildren: () =>
      import('../../order/order.module').then((m) => m.OrderModule),
  },
  {
    path:'commission',
    loadChildren:()=>
      import('../../super-admin/super-admin.module').then((m)=>m.SuperAdminModule)
  },
  {
    path:'companydetails',
    loadChildren:()=>import('../../superadmin-details/superadmin-details.module').then((m)=>m.SuperadminDetailsModule)
  },
  {
    path: 'dashboardlayout',
    loadChildren: () =>
      import(
        '../../Customer-Panel/customer-dashboard/customer-dashboard.module'
      ).then((m) => m.CustomerDashboardModule),
  },
{
  path:'replica',
  loadChildren:()=>import('../../replica-cheapest/replica-cheapest.module').then((m)=>m.ReplicaCheapestModule)

},
  {
    path: 'deliverydetail',
    loadChildren: () =>
      import(
        '../../Customer-Panel/delivery-detail/delivery-detail.module'
      ).then((m) => m.DeliveryDetailModule),
  },
  {
    path: 'additional',
    loadChildren: () =>
      import(
        '../../Customer-Panel/additional-info/additional-info.module'
      ).then((m) => m.AdditionalInfoModule),
  },
  {
    path: 'shipments',
    loadChildren: () =>
      import(
        '../../Customer-Panel/summary-shipments/summary-shipments.module'
      ).then((m) => m.SummaryShipmentsModule),
  },
  {
    path: 'paydetails',
    loadChildren: () =>
      import(
        '../../Customer-Panel/payment-methods/payment-methods.module'
      ).then((m) => m.PaymentMethodsModule),
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
  
];
