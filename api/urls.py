from django.urls import path, include
from .views import getRoutes, getNote, getNotes
urlpatterns = [
    path('', getRoutes, name='routes'),
    path('notes/', getNotes, name='notes'),
    # path('note/create/', createNote, name='create-note'),
    # path('note/<str:pk>/update', updateNote, name='update-note'),
    # path('note/<str:pk>/delete', deleteNote, name='delete-note'),
    path('note/<str:pk>/', getNote, name='note'),
]