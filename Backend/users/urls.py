from rest_framework.routers import DefaultRouter

from .viewsets import (
    AddressViewSet,
    RoleViewSet,
    UserViewSet,
)

router = DefaultRouter()
router.register("roles", RoleViewSet)
router.register("users", UserViewSet)
router.register("addresses", AddressViewSet)
urlpatterns = router.urls
