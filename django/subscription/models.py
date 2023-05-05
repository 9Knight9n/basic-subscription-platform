from django.db import models
from django.contrib.auth.models import User
import uuid
from django.db import transaction


class Customer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.DO_NOTHING)
    credit = models.PositiveIntegerField(verbose_name="customer credit", null=False, blank=False, default=0)

    def __str__(self):
        return self.user.username


class Subscription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(verbose_name="Subscription name", null=False, blank=False, unique=True)
    price = models.PositiveIntegerField(verbose_name="Subscription price", null=False, blank=False)
    renewal_period = models.PositiveIntegerField(
        verbose_name="time between Subscription renewal in seconds", null=False, blank=False, default=10 * 60
    )

    class Meta:
        ordering = ['price']

    def __str__(self):
        return self.name


class CustomerSubscription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.ForeignKey(Customer, on_delete=models.DO_NOTHING)
    subscription = models.ForeignKey(Subscription, on_delete=models.DO_NOTHING)
    is_active = models.BooleanField(verbose_name="is customer using Subscription", null=False, blank=False, default=False)

    class Meta:
        unique_together = ('customer', 'subscription')

    @transaction.atomic
    def custom_save(self, new_is_active):
        if new_is_active == self.is_active:
            return self, False
        if new_is_active:
            if self.subscription.price <= self.customer.credit:
                Invoice(customer_subscription=self).save()
                self.customer.credit = self.customer.credit - self.subscription.price
                self.customer.save()
            else:
                return self , False
        self.is_active = new_is_active
        self.save()
        return self , True


class Invoice(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer_subscription = models.ForeignKey(CustomerSubscription, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(
        verbose_name="date and time Invoice was created", null=False, blank=False, auto_now_add=True
    )

    class Meta:
        ordering = ['-created_at']
