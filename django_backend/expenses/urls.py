from django.urls import path
from expenses import views

urlpatterns = [
    path('expenses/', views.expense_list),
    path('expenses/<int:pk>/', views.expense_detail),
    path('pmtTypes/', views.get_payment_types),
    path('lastX/<int:pk>/', views.get_last_pk)
]