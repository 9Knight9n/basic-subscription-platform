from celery import shared_task
from subscription.models import CustomerSubscription, Invoice


@shared_task()
def create_invoice(cus_sub_id):
    cus_sub = CustomerSubscription.objects.get(
        id = cus_sub_id
    )
    if not cus_sub.is_active:
        return
    if  cus_sub.subscription.price <= cus_sub.customer.credit:
        Invoice(customer_subscription=cus_sub).save()
        cus_sub.customer.credit = cus_sub.customer.credit - cus_sub.subscription.price
        cus_sub.customer.save()
        create_invoice.apply_async(args=[cus_sub_id], countdown=cus_sub.subscription.renewal_period)
    else:
        cus_sub.is_active = False
        cus_sub.save()
