from rest_framework import generics, permissions, serializers, authentication
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Subscription, CustomerSubscription, Invoice, Customer
from datetime import timedelta, datetime
from django.db.models import F, ExpressionWrapper, DurationField, DateTimeField


class CustomerAvailableSubscriptionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        subs = Subscription.objects.all().values()
        cus_subs = CustomerSubscription.objects.filter(customer__user__id=request.user.id).values()
        for sub in subs:
            sub['is_active'] = any([cus_sub['is_active'] and cus_sub['subscription_id']==sub['id'] for cus_sub in cus_subs])
        return Response({'available_subscription': subs})


class CustomerInvoiceView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        PAGE_SIZE = 5
        count = Invoice.objects.filter(customer_subscription__customer__user__id=request.user.id).count()
        page = int(self.request.query_params.get('page'))
        start = PAGE_SIZE*(page-1)
        end = min([PAGE_SIZE*page,count])
        invoices = Invoice.objects.filter(
            customer_subscription__customer__user__id=request.user.id
        )[start:end].values(
            'customer_subscription__subscription__renewal_period',
            'created_at',
            'customer_subscription__subscription__name',
            'customer_subscription__subscription__price'
        )
        return Response({'count': count, 'customer_invoices': invoices})


class ActivateSubscriptionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        customer = Customer.objects.get(user__id = request.user.id)
        try:
            cus_sub = CustomerSubscription.objects.get(
                customer=customer,
                subscription__id=request.data['subscription__id']
            )
        except CustomerSubscription.DoesNotExist:
            cus_sub = CustomerSubscription(
                customer=customer,
                subscription_id=request.data['subscription__id']
            )
            cus_sub.save()
        cus_sub.custom_save(not cus_sub.is_active)
        return Response({'is_active': cus_sub.is_active})
