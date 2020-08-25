from django.urls import path
from . import views

urlpatterns = [
    path('limitations-list/<str:type_of_technological_section>/', views.get_existing_limitations),
    path('limitation-create/', views.create_limitation),
    path('limitation-delete/<str:id_sautcom>/', views.delete_limitation),
    path('limitation-update/<str:id_sautcom>/', views.update_limitation),
]
