from django.db import models
from django.contrib.auth.models import User
import uuid


class Customer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.DO_NOTHING)
    credit = models.IntegerField(verbose_name="customer credit", null=False, blank=False, default=0)


class Subscription(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(verbose_name="Subscription name", null=False, blank=False, unique=True)
    price = models.IntegerField(verbose_name="Subscription price", null=False, blank=False)
    renewal_period = models.IntegerField(
        verbose_name="time between Subscription renewal in seconds", null=False, blank=False, default=10 * 60
    )
    credit = models.BigIntegerField(verbose_name="phone number", null=False, blank=False, default=0)
    class Meta:
            ordering = ['price']


class CustomerSubscription(models.Model):
    id = models.AutoField(primary_key=True)
    customer = models.OneToOneField(Customer, on_delete=models.DO_NOTHING)
    subscription = models.OneToOneField(Subscription, on_delete=models.DO_NOTHING)
    is_active = models.BooleanField(verbose_name="is customer using Subscription", null=False, blank=False, default=0)


class Invoice(models.Model):
    id = models.AutoField(primary_key=True)
    customer_subscription = models.OneToOneField(CustomerSubscription, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(
        verbose_name="date and time Invoice was created", null=False, blank=False, auto_now_add=True
    )
    class Meta:
        ordering = ['created_at']
