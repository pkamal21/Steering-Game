from django.urls import path, include
from . import views
urlpatterns = [
    path('game/', views.index, name="index"),
]
