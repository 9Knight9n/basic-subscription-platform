from .models import Subscription
from django.db import IntegrityError, ProgrammingError


subscriptions = [
    {
        'name': 'Starter',
        'price': 75,
        'renewal_period': 10,
    },
    {
        'name': 'Advanced',
        'price': 115,
        'renewal_period': 10,
    },
    {
        'name': 'Professional',
        'price': 185,
        'renewal_period': 10,
    },
    {
        'name': 'Enterprise',
        'price': 350,
        'renewal_period': 10,
    },
]


def pre_load_data():
    for sub in subscriptions:
        try:
            Subscription(name=sub['name'], price=sub['price'], renewal_period=sub['renewal_period']).save()
        except IntegrityError as e:
            pass
