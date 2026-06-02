from rest_framework.routers import DefaultRouter

from .viewsets import (
    OrderItemViewSet,
    OrderViewSet,
    PaymentViewSet,
)

router = DefaultRouter()
router.register("orders", OrderViewSet)
router.register("order-items", OrderItemViewSet)
router.register("payments", PaymentViewSet)
urlpatterns = router.urls
