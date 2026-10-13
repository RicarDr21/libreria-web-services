from django.urls import path

from . import views

urlpatterns = [
    path("libros/", views.LibrosView.as_view()),
    path("libros/<str:id>/", views.LibroView.as_view()),
]
