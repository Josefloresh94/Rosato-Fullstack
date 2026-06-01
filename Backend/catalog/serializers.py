from rest_framework import serializers

from .models import Category, Product, ProductImage, ProductVariant


class CategorySerializer(serializers.Serializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductSerializer(serializers.Serializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductVariantSerializer(serializers.Serializer):
    class Meta:
        model = ProductVariant
        fields = "__all__"


class ProductImageSerializer(serializers.Serializer):
    class Meta:
        model = ProductImage
        fields = "__all__"
