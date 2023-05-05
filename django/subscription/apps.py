from django.apps import AppConfig


class SubscriptionConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'subscription'

    def ready(self):
        import os
        if os.environ.get('RUN_MAIN'):
            from .pre_load_data import pre_load_data
            from .models import CustomerSubscription
            pre_load_data()
            CustomerSubscription.objects.all().update(is_active=False)