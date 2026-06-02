from rest_framework.routers import DefaultRouter

from .viewsets import ReviewViewSet

router = DefaultRouter()
router.register("reviews", ReviewViewSet)
urlpatterns = router.urls
