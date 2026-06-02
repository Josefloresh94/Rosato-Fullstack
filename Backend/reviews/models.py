import uuid

from django.db import models

from catalog.models import ProductVariant
from orders.models import OrderItem
from users.models import User


# Create your models here.
class Review(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_item = models.OneToOneField(
        OrderItem, on_delete=models.CASCADE, related_name="review"
    )
    variant = models.ForeignKey(
        ProductVariant, on_delete=models.CASCADE, related_name="reviews"
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviews")
    rating = models.SmallIntegerField()  # Para almacenar de 1 a 5 estrellas
    title = models.CharField(max_length=150, blank=True, null=True)
    body = models.TextField()
    is_approved = models.BooleanField(default=False)  # Moderación activa
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reseña {self.id} - Calificación: {self.rating}"
