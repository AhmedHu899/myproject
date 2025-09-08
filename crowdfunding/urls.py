from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),

    # 🔹 المشاريع
    path('projects/', views.projects_list, name='projects_list'),
    path('projects/create/', views.create_project, name='create_project'),
    path('projects/edit/<int:project_id>/', views.edit_project, name='edit_project'),
    path('projects/delete/<int:project_id>/', views.delete_project, name='delete_project'),

    # 🔹 صفحات ثابتة
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
]
