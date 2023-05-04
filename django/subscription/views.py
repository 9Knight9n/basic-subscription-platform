from rest_framework import generics, permissions, serializers, authentication
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Subscription, CustomerSubscription, Invoice


class CustomerAvailableSubscriptionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        subs = Subscription.objects.all().values()
        cus_subs = CustomerSubscription.objects.filter(customer__user__id=request.user.id).values()
        for sub in subs:
            sub['is_active'] = any([cus_sub['is_active'] and cus_sub['subscription_id']==sub['id'] for cus_sub in cus_subs])
        return Response({'available_subscription': subs})


class CustomerInvoicesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        invoices = Invoice.objects.filter(customer_subscription__customer__user__id=request.user.id).values()
        return Response({'customer_invoices': invoices})


class ActiveSubscriptionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        try:
            cus_sub = CustomerSubscription.objects.get(
                customer__user__id=request.user.id,
                subscription__id=request.data['subscription__id']
            )
        except CustomerSubscription.DoesNotExist:
            cus_sub = CustomerSubscription(
                customer__user__id=request.user.id,
                subscription__id=request.data['subscription__id']
            ).save()
        cus_sub.custom_save(not cus_sub.is_active)
        return Response({'is_active': cus_sub.is_active})
