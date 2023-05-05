from django.urls import path
from knox import views as knox_views

from .views import CustomerAvailableSubscriptionView, CustomerInvoiceView, ActivateSubscriptionView, AddCreditView

urlpatterns = [
    path('customer_available_subscription_view/', CustomerAvailableSubscriptionView.as_view(), name="get Available Subscriptions"),
    path('customer_invoice_view/', CustomerInvoiceView.as_view(), name="get customer invoices"),
    path('activate_subscription_view/', ActivateSubscriptionView.as_view(), name="activate subscription"),
    path('add_credit_view/', AddCreditView.as_view(), name="add credit to customer"),
]
