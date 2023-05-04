from django.urls import path
from knox import views as knox_views

from .views import CustomerAvailableSubscriptionView, CustomerInvoicesView

urlpatterns = [
    path('customer_available_subscription_view/', CustomerAvailableSubscriptionView.as_view(), name="get Available Subscriptions"),
    path('customer_invoices_view/', CustomerInvoicesView.as_view(), name="get customer invoices"),
]
