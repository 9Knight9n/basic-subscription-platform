from abc import ABC

from rest_framework import serializers
from .models import Customer, CustomerSubscription
from authentication.serializers import UserSerializer


class CustomerSerializer(serializers.Serializer):
    id = serializers.UUIDField(read_only=True)
    username = serializers.CharField(required=True, write_only=True)
    password = serializers.CharField(required=True, write_only=True)

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        user_serializer = UserSerializer(data={'username': username, 'password': password})
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        return Customer.objects.create(user=user)

    def update(self, instance, validated_data):
        pass

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['username'] = instance.user.username
        return representation
