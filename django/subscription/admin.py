from django.contrib import admin

from .models import Customer, Subscription, CustomerSubscription, Invoice

admin.site.register(Customer)
admin.site.register(Subscription)
admin.site.register(CustomerSubscription)
admin.site.register(Invoice)
# Register your models here.
